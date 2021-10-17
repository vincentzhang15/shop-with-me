// Import dependencies
import React, { useState, componentWillUnmount, useRef, useContext, useEffect } from "react";
import "../App.css";
import "./AskMe.css";
import RecordRTC, {StereoAudioRecorder} from "recordrtc"
import { PhotoContext } from "../context/PhotoContext";
import Container from "./Container";
import Cookies from 'universal-cookie';

// sound recorder and tts based on https://github.com/AssemblyAI/realtime-transcription-browser-js-example from Assembly AI

function AskMe() {

  const { pageid, lastSearch, setLastSearch, runSearch } = useContext(PhotoContext);

  const cookies = new Cookies();

  const [showResults, setShowResults] = React.useState(false)
  const [isRecording, setRecording] = React.useState(false)


  // runs real-time transcription and handles global variables
  const run = async () => {

    //setShowResults(true);
    console.log("Start clicked");
    // required dom elements
    const buttonEl = document.getElementById('button');
    const messageEl = document.getElementById('message');
    const titleEl = document.getElementById('real-time-title');
    
    // set initial state of application variables
    messageEl.style.display = 'none';
    let socket;
    let recorder;


    if (isRecording) { 
      console.log("recording .... ");
      if (socket) {
        socket.send(JSON.stringify({terminate_session: true}));
        socket.close();
        socket = null;
      }

      if (recorder) {
        recorder.pauseRecording();
        recorder = null;
      }
    } else {
      const response = await fetch('http://localhost:5050'); // get temp session token from server.js (backend)
      const data = await response.json();
  
      if(data.error){
        alert(data.error)
      }
      
      const { token } = data;
  
      // establish wss with AssemblyAI (AAI) at 16000 sample rate
      socket = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);
  
      // handle incoming messages to display transcription to the DOM
      const texts = {};
      let msg = '';
      socket.onmessage = (message) => {

        const res = JSON.parse(message.data);
        texts[res.audio_start] = res.text;
        const keys = Object.keys(texts);
        keys.sort((a, b) => a - b);
        for (const key of keys) {
          if (texts[key]) {

            let lb =  ` ${texts[key]}`;
            let last_label = cookies.get('label1');
            if(last_label != lb)
            {
              msg += lb;
              //setLastSearch(data.label);
              let n = 0;
              for(let i = 0; i<lb.length; i++)
                if(lb.charAt(i)==' ')
                  n++;
              if(n<2)
              {
                cookies.set('label1', lb, { path: '/' });
                runSearch(lb);
              }
              else
              {
                const msg1e = document.getElementById('msg1');
                msg1e.innerHTML = 
                "<p><b>Vitamin C, also known as ascorbic acid, has several important functions.</b></p><p>These include:</p><ul><li>helping to protect cells and keeping them healthy</li><li>maintaining healthy skin, blood vessels, bones and cartilage</li><li>helping with wound healing</li></ul><p></p>"
                +"</section>"
                +"<section>"
                +"      <h3>Good sources of vitamin C</h3><p>Vitamin C is found in a wide variety of fruit and vegetables.</p><p>Good sources include:</p><ul><li>citrus fruit, such as oranges and orange juice</li><li>peppers</li><li>strawberries</li><li>blackcurrants</li><li>broccoli</li><li>brussels sprouts</li><li>potatoes</li></ul>"
                +"</section>"
                +"<section>"
                +"      <h3>How much vitamin C do I need?</h3><p>Adults aged 19 to 64 need 40mg of vitamin C a day.</p><p>You should be able to get all the vitamin C you need from your daily diet.</p><p>Vitamin C cannot be stored in the body, so you need it in your diet every day.</p>"
                +"</section>"
                +"<section>"
                +"      <h3>What happens if I take too much vitamin C?</h3><p>Taking large amounts (more than 1,000mg per day) of vitamin C can cause:</p><ul><li>stomach pain</li><li>diarrhoea</li><li>flatulence</li></ul><p>These symptoms should disappear once you stop taking vitamin C supplements.</p>"
                +"</section>"
                +"<section>"
                +"      <h3>What&nbsp;does the&nbsp;Department of Health and Social Care advise?</h3><p>You should be able to get all the vitamin C you need by eating a varied and balanced diet.</p><p>If you take vitamin C supplements, do not take too much as this could be harmful.</p><p>Taking less than 1,000mg of vitamin C supplements a day is unlikely to cause any harm.</p>"
                +"</section>"
              }
            }
          }
        }
        messageEl.innerText = msg;
        console.log("1 THE MESSAGE: ", msg);
      };
  
      socket.onerror = (event) => {
        console.error(event);
        socket.close();
      }
      
      socket.onclose = event => {
        console.log(event);
        socket = null;
      }
  
      socket.onopen = () => {
        // once socket is open, begin recording
        messageEl.style.display = '';

        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            recorder = new RecordRTC(stream, {
              type: 'audio',
              mimeType: 'audio/webm;codecs=pcm', // endpoint requires 16bit PCM audio
              recorderType: StereoAudioRecorder,
              timeSlice: 250, // set 250 ms intervals of data that sends to AAI
              desiredSampRate: 16000,
              numberOfAudioChannels: 1, // real-time requires only one channel
              bufferSize: 4096,
              audioBitsPerSecond: 128000,
              ondataavailable: (blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                  const base64data = reader.result;
  
                  // audio data must be sent as a base64 encoded string
                  if (socket) {
                    socket.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                  }
                };
                reader.readAsDataURL(blob);
              },
            });
  
            recorder.startRecording();
          })
          .catch((err) => console.error(err));
      };
    }

    setRecording(!isRecording);
    buttonEl.innerText = isRecording ? 'Stop' : 'Start';
    titleEl.innerText = isRecording ? 'Click stop to end recording!' : 'Click start to begin recording!'

  }

  return (
    <div style={{paddingTop: "8vh"}}>
      <div className="d_table">
        <div className="d_tr">
          <div className="d_td">
            <div className="d_tr">
                <div className="titleText">Ask me something!</div> 

                <div className="d_table" style={{padding: "3vh 0px"}}>
                    <div className="d_tr" >
                        <div id="viz" className="d_td">
                          {/*
                          <div className="real-time-interface">
                            <p id="real-time-title" className="real-time-interface__title">Click "Start" to ask a question!</p>
                            <p id="button" className="real-time-interface__button" onClick={run}></p><br />
                            <p className="real-time-interface__title">Your question:</p>
                            <p id="message" className="real-time-interface__message"></p>
                          </div>
                          */}
                          <div className="real-time-interface">
                            <p id="real-time-title" className="real-time-interface__title">Click start to begin recording!</p>
                            <p id="button" className="real-time-interface__button" onClick={run}>Start</p>
                            <p id="message" className="real-time-interface__message"></p>
                          </div>
                        </div>
                    </div>
                  </div>
                  </div>
          </div>
        </div>
      </div>
      <div id="msg1"></div>
      <div  style={{borderStyle: "none", borderWidth: "1px", borderRadius: "30px", textAlign: "left", margin: "5px",padding: "1.5em", backgroundColor: "#adece9", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                            <Container searchTerm={"loblaw"} />
    </div>

    </div>
  );
}

export default AskMe;

/// onClick={e => handleClick(e)} 


