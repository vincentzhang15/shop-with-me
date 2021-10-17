// Import dependencies
import React, { useState, componentWillUnmount, useRef, useContext, useEffect } from "react";
import "../App.css";
import "./AskMe.css";

import axios from "axios";
import fs from "fs";
import { apiKey } from "../api/config";


// sound recorder and tts based on https://github.com/AssemblyAI/realtime-transcription-browser-js-example from Assembly AI

function AskMe() {

  return (
    <div>
      <div class="d_table">
        <div class="d_tr">
          <div class="d_td">
            <div class="d_tr" >
                Please ask a question to the MIC
                <div className="d_table">
                    <div className="d_tr" >
                        <div id="viz" className="d_td">
                          <div class="real-time-interface">
                            <p id="real-time-title" class="real-time-interface__title">Click start to begin recording!</p>
                            <p id="button" class="real-time-interface__button" style={{padding:'10px 50px'}} 
                                 >Start</p>
                            <p id="message" class="real-time-interface__message"></p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div class="d_td" id="description">Some discriptions here  asdfasf asdfasdf </div>
        </div>
      </div>
    </div>
  );
}

export default AskMe;

/// onClick={e => handleClick(e)} 


