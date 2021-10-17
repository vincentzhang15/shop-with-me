// Import dependencies
import React, { useState, componentWillUnmount, useRef, useContext, useEffect } from "react";
import "../App.css";
import "./AskMe.css";

import axios from "axios";
import fs from "fs";
import { apiKey } from "../api/config";


// audio recorder code are based on https://webaudiodemos.appspot.com/AudioRecorder/index.html

function AskMe() {

    // upload a file to a server, try 1:

    const runSearch_test = query => {
      axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        console.log("photo:", response.data.photos.photo);
        //setImages(response.data.photos.photo);
        //setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
    };


    // upload a file to a server, try 2:

    async function fetchInfoOption() {
        const requestOptions = {
            method: 'OPTIONS',
            headers: { 
                       'Access-Control-Request-Method': 'POST',
                     }
        };
        console.log("post data");
        //const response = await fetch('https://valeriebackend.nn.r.appspot.com/text', requestOptions);
        //const response = await fetch('https://trypython2.nn.r.appspot.com/text', requestOptions);

        const response = await fetch('https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/test1', requestOptions);

        console.log("response =", response);
        const data = await response.text();
        console.log("post done", data);
    }


    /*
    OPTIONS /demo HTTP/1.1
    Host: www.baeldung.com
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
      AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36
    Accept: * / *
    Accept-language: nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7
    Connection: keep-alive
    Origin: http://foo.baeldung.com
    */
    

///////////////////////////    

    // upload a file to a server, try 3:

const fetchInfo_1 = query => {
    axios.get(
      //`https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/test1`
      `https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/test1`
    )
    .then(response => {
      console.log("fetchInfo_1:", response.data);
    })
    .catch(error => {
      console.log(
        "Encountered an error with fetching and parsing data",
        error
      );
    });
  };

    // upload a file to a server, try 4:

///////////////////////////
    async function fetchInfo() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
                       'Access-Control-Allow-Origin': '*',
                       'Access-Control-Allow-Headers': '*'
                     },
            body: JSON.stringify({ "id": "9" })
        };
        console.log("post data");
        //const response = await fetch('https://valeriebackend.nn.r.appspot.com/text', requestOptions);
        //const response = await fetch('https://trypython2.nn.r.appspot.com/text', requestOptions);

        const response = await fetch('https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/test1', requestOptions);

        console.log("response =", response);
        const data = await response.text();
        console.log("post done", data);
    }
///////////////////////////


    // upload a file to a server, try 5:

    const submitFile = (uploadFile) => {
  
      const dataArray = new FormData();
      dataArray.append("superHeroName", "name");
      dataArray.append("image", uploadFile);
  
      axios
        //.post("https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/upload", dataArray, {
        .post("http://localhost:8123/api/apiupload.php", dataArray, {
                headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
          console.log("successfully uploaded response", response)
        })
        .catch((error) => {
            console.log("error response", error)
        });
    };

    // upload a file to a server, try 6:

    const uploadFileToPhp = (blob) => {
  
        const dataArray = new FormData();
        dataArray.append("image", blob);
    
        axios
          //.post("https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/upload", dataArray, {
          .post("http://localhost:8123/api/apiupload.php", dataArray, {
                  headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then((response) => {
            console.log("successfully uploaded response", response)
          })
          .catch((error) => {
              console.log("error response", error)
          });
      };
  
    // upload a file to a server, try 7:

async function uploadAudioAsync(uri, blob) {

    console.log("Uploading " + uri);
    //let apiUrl = 'http://192.168.1.216:8888/upload.php';
    //let apiUrl = 'https://trypython2.nn.r.appspot.com/upload';
    //let apiUrl = 'https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/upload';
    let apiUrl = 'http://localhost:8123/api/apiupload.php';
    //let apiUrl = 'https://valeriebackend.nn.r.appspot.com//upload';

    //let uriParts = uri.split('.');
    //let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('image', {
      uri,
      name: `recording.wav`, // recording.${fileType},
      type: `audio/x-wav`,   //${fileType},
    });
    formData.append('image', uri)

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    let res = null;
    console.log("POSTing " + options + " to " + apiUrl);
    try {
      let response = await fetch(apiUrl, options) 
      //console.log(" RESPONSE  : ", JSON.stringify(response));
      console.log(" RESPONSE  : ", await response);
      const data = await response.json();

      let id = '0';
      console.log(".....................", id);

      console.log("--data--: ", data);

      id = data.id;
      console.log("id: ", id);

      playAnswer(id);
    }
    catch(err)
    {
      console.log("Err: ", err);
    }

    //const data = await response.json();
    //console.log("data: ", data);

    return res;
  }

    // download and play audio file:

    //const [sound, setSound] = useState();

    async function playAnswer(id)
    {
        //let url = 'https://trypython2.nn.r.appspot.com/mp3?id='+id
        let url = 'https://8080-cs-458434950931-default.cs-us-east1-pkhd.cloudshell.dev/mp3?id='+id;

        console.log(" play id ", id, url);

        console.log('Loading Sound');

        const { sound } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );

        //setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync(); 
        console.log('Playing Sound Done.');
    }

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

// the following audio recorder related code is based on https://webaudiodemos.appspot.com/AudioRecorder/js/main.js
/* Copyright 2021 Gracie

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


  var audioContext = new AudioContext();
  var audioInput = null,
      realAudioInput = null,
      inputPoint = null,
      audioRecorder = null;
  var rafID = null;
  var analyserContext = null;
  var canvasWidth, canvasHeight;
  var recIndex = 0;
  
  var analyserNode = null;
  var zeroGain = null;

  var recordingUrl = null; 


//////////////////////////// The function Recorder is based on view-source:https://webaudiodemos.appspot.com/AudioRecorder/js/recorderjs/recorder.js
/*License (MIT)

Copyright Â© 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of 
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

        
    var WORKER_PATH = 'js/recorderWorker.js';

    var Recorder = function(source, cfg){
        var config = cfg || {};
        var bufferLen = config.bufferLen || 4096;
        this.context = source.context;
        if(!this.context.createScriptProcessor){
           this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
        } else {
           this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
        }
       
        var worker = new Worker(config.workerPath || WORKER_PATH);
        worker.postMessage({
          command: 'init',
          config: {
            sampleRate: this.context.sampleRate
          }
        });
        var recording = false,
          currCallback;
    
        this.node.onaudioprocess = function(e){
          if (!recording) return;
          worker.postMessage({
            command: 'record',
            buffer: [
              e.inputBuffer.getChannelData(0),
              e.inputBuffer.getChannelData(1)
            ]
          });
        }
    
        this.configure = function(cfg){
          for (var prop in cfg){
            if (cfg.hasOwnProperty(prop)){
              config[prop] = cfg[prop];
            }
          }
        }
    
        this.record = function(){
          recording = true;
        }
    
        this.stop = function(){
          recording = false;
        }
    
        this.clear = function(){
          worker.postMessage({ command: 'clear' });
        }
    
        this.getBuffers = function(cb) {
            console.log("getBuffers called......")
          currCallback = cb || config.callback;
          worker.postMessage({ command: 'getBuffers' })
        }
    
        this.exportWAV = function(cb, type){
          currCallback = cb || config.callback;
          type = type || config.type || 'audio/wav';
          if (!currCallback) throw new Error('Callback not set');
          worker.postMessage({
            command: 'exportWAV',
            type: type
          });
        }
    
        this.exportMonoWAV = function(cb, type){
          currCallback = cb || config.callback;
          type = type || config.type || 'audio/wav';
          if (!currCallback) throw new Error('Callback not set');
          worker.postMessage({
            command: 'exportMonoWAV',
            type: type
          });
        }
    
        worker.onmessage = function(e){
          var blob = e.data;
          currCallback(blob);
        }
    
        source.connect(this.node);
        this.node.connect(this.context.destination);   // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.
      };
    
      Recorder.setupDownload = function(blob, filename){
        var url = (window.URL || window.webkitURL).createObjectURL(blob);

        //const uri = recording.getURI(); 
        //setUri(url);
        //console.log('Recording stopped and stored at', uri);
        //uploadAudioAsync(url);
        //uploadAudioAsync("C:\\Users\\frankz\\Downloads\\myRecording01(1).wav");
        //uploadAudioAsync("file:///C://Users//frankz//Downloads//myRecording01(1).wav", blob);
        //uploadAudioAsync("file:///D://Hackathons//python//google_cloud//bookshelf//images//output.mp3", blob);
        submitFile("file:///D://Hackathons//python//google_cloud//bookshelf//images//output.mp3");
   
    
        var link = document.getElementById("save");
        link.href = url;

        console.log("URL: ", link.href);
        /*
        /////////////////////////// Based on Assembly API Documentation
        //////////////////////////////////////// UPLOAD AUDIO FILE

      

        const assembly = axios.create({
            baseURL: "https://api.assemblyai.com/v2",
            headers: {
                authorization: "4fa6caee03fa4967b64a5602aac3eafb",
                "content-type": "application/json",
                "transfer-encoding": "chunked",
            },
        });

        const file = link.href;

        fs.readFile(file, (err, data) => {
            if (err) return console.error(err);

            assembly
                .post("/upload", data)
                .then((res) => {console.log("UPLOAD Result: " , res.data)})
                .catch((err) => {console.error("UPLOAD: ", err)});
        });


        /////////////////////////////////////// TRANSCRIBE
        assembly
          .post(`/transcript`, {
            audio_url: link.href
          })
          .then((res) => {console.log("TRANSCRIBE Result: " , res.data)})
          .catch((err) => {console.error("TRANSCRIBE: ", err)});
        //////////////////////////////////////////
        */
        link.download = filename || 'output.wav';
      }
    
      window.Recorder = Recorder;

      function convertToMono( input ) {
        var splitter = audioContext.createChannelSplitter(2);
        var merger = audioContext.createChannelMerger(2);
    
        input.connect( splitter );
        splitter.connect( merger, 0, 0 );
        splitter.connect( merger, 0, 1 );
        return merger;
    }
    
    function updateAnalysers(time) {
        if (!analyserContext) {
            var canvas = document.getElementById("analyser");
            if(canvas)
            {
              canvasWidth = canvas.width;
              canvasHeight = canvas.height;
              analyserContext = canvas.getContext('2d');
            }
        }
    
        // analyzer draw code here
        {
            var SPACING = 3;
            var BAR_WIDTH = 1;
            var numBars = Math.round(canvasWidth / SPACING);
            var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
    
            analyserNode.getByteFrequencyData(freqByteData); 
    
            analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
            analyserContext.fillStyle = '#F6D565';
            analyserContext.lineCap = 'round';
            var multiplier = analyserNode.frequencyBinCount / numBars;
    
            // Draw rectangle for each frequency bin.
            for (var i = 0; i < numBars; ++i) {
                var magnitude = 0;
                var offset = Math.floor( i * multiplier );
                // gotta sum/average the block, or we miss narrow-bandwidth spikes
                for (var j = 0; j< multiplier; j++)
                    magnitude += freqByteData[offset + j];
                magnitude = magnitude / multiplier;
                var magnitude2 = freqByteData[i * multiplier];
                analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
                analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
            }
        }
        
        rafID = window.requestAnimationFrame( updateAnalysers );
    }
    
    function toggleMono() {
        if (audioInput != realAudioInput) {
            audioInput.disconnect();
            realAudioInput.disconnect();
            audioInput = realAudioInput;
        } else {
            realAudioInput.disconnect();
            audioInput = convertToMono( realAudioInput );
        }
    
        audioInput.connect(inputPoint);
    }
    
    function gotStream(stream) {
        inputPoint = audioContext.createGain();
    
        // Create an AudioNode from the stream.
        realAudioInput = audioContext.createMediaStreamSource(stream);
        audioInput = realAudioInput;
        audioInput.connect(inputPoint);
    
    //    audioInput = convertToMono( input );
    
        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 2048;
        inputPoint.connect( analyserNode );
    
        audioRecorder = new Recorder( inputPoint );
    
        zeroGain = audioContext.createGain();
        zeroGain.gain.value = 0.0;
        inputPoint.connect( zeroGain );
        zeroGain.connect( audioContext.destination );
        updateAnalysers();
    }
    
    function initAudio() {
            if (!navigator.getUserMedia)
                navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!navigator.cancelAnimationFrame)
                navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
            if (!navigator.requestAnimationFrame)
                navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;
    
        navigator.getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, gotStream, function(e) {
                alert('Error getting audio');
                console.log(e);
            });
    }      
    
// function drawBuffer is based on:  https://webaudiodemos.appspot.com/AudioRecorder/js/audiodisplay.js    

    const drawBuffer = ( width, height, context, data ) => {
        var step = Math.ceil( data.length / width );
        var amp = height / 2;
        context.fillStyle = "silver";
        context.clearRect(0,0,width,height);
        for(var i=0; i < width; i++){
            var min = 1.0;
            var max = -1.0;
            for (var j=0; j<step; j++) {
                var datum = data[(i*step)+j]; 
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
        }
    };

    const gotBuffers = buffers => {
        console.log("gotBuffers called")
        var canvas = document.getElementById( "wavedisplay" );
    
        drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );
    
        // the ONLY time gotBuffers is called is right after a new recording is completed - 
        // so here's where we should set up the download.
        audioRecorder.exportWAV( doneEncoding );
    };

    const doneEncoding = blob => {
        Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
        recIndex++;
    }   ; 
    
    const toggleRecording = e => {
        e.preventDefault();
        var classList = document.getElementById("record").classList

        if (classList.contains("recording")) {
            console.log("stop recording ... ")
            // stop recording
            audioRecorder.stop();
            classList.remove("recording");
            audioRecorder.getBuffers( gotBuffers );
        } else {
            //fetchInfoOption();
            //fetchInfo();     
            //runSearch_test();       
            //fetchInfo_1();

            console.log("start recording ... ", audioRecorder)
            // start recording
            if (!audioRecorder)
                return;
            classList.add("recording");
            audioRecorder.clear();
            audioRecorder.record();
        }
      };
    
    useEffect(() => {
        initAudio()
    }, []);

  return (
    <div>
        <script src="audiodisplay.js"></script>
        <script src="audiorecorder.js"></script>
        <script src="audiomain.js"></script>        
      <div className="d_table">
        <div className="d_tr">
          <div className="d_td">
            <div className="d_tr" >
                Please ask a question to the MIC
                <div className="d_table">
                    <div className="d_tr" >
                        <div id="viz" className="d_td">
                            <canvas className="audiocanvas" id="analyser" width="1024" height="500"></canvas>
                        </div>
                        <div id="recordbutton"  className="d_td">
                            <button  onClick={e => toggleRecording(e)} ><img id="record" src="img/mic128.png" alt="record" /></button>
                        </div>
                    </div>
                    <div className="d_tr" >
                        <div id="viz" className="d_td">
                            <canvas className="audiocanvas" id="wavedisplay" width="1024" height="500"></canvas>
                        </div>
                        <div id="controls"  className="d_td">
                                <a id="save" href="#"><img src="img/save.svg" /></a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="d_td" id="description">Some discriptions here  asdfasf asdfasdf </div>
        </div>
      </div>
    </div>
  );
}

export default AskMe;




