// Import dependencies
import Typist from 'react-typist';
import React, { useState, componentWillUnmount, useRef, useContext, useEffect } from "react";
import "../App.css";
import "./AskMe.css";

import axios from "axios";
import fs from "fs";
import { apiKey } from "../api/config";


// sound recorder and tts based on https://github.com/AssemblyAI/realtime-transcription-browser-js-example from Assembly AI

function AskMe() {

  const [showResults, setShowResults] = React.useState(false)
  const onClickStart = () => setShowResults(true)

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
                          <div className="real-time-interface">
                            <p id="real-time-title" className="real-time-interface__title">Click "Start" to ask a question!</p>
                            <p id="button" className="real-time-interface__button" onClick={onClickStart}>Start</p><br />
                            <p className="real-time-interface__title">Your question:</p>
                            <p id="message" className="real-time-interface__message"><Typist>What food contains Vitamin C?</Typist></p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="d_td" id="description"> </div>
        </div>
        
        {/* Hardcoded; change if there's time*/}
        { showResults ?
      <div id="results" style={{marginTop: "50px"}}>
        <div className="real-time-interface__title">Results for "What food contains Vitamin C?"</div>
        <div className="row">
          <div className="column">
            <img className="prodImg" src="/img/kiwi.png" />
          </div>
          <div className="column">
            <img className="prodImg" src="/img/orange.png" />
          </div>
          <div className="column">
            <img className="prodImg" src="/img/strawberries.png" />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <img className="prodImg" src="/img/papaya.png" />
          </div>
          <div className="column">
            <img className="prodImg" src="/img/tomatoes.png" />
          </div>
          <div className="column">
            <img className="prodImg" src="/img/bellpeppers.png" />
          </div>
        </div>
      </div>
      : null }


      </div>
    </div>
  );
}

export default AskMe;

/// onClick={e => handleClick(e)} 


