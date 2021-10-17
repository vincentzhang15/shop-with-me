// Import dependencies
import React, { componentWillUnmount, useRef, useContext, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./ShowMe_debug.css";
import { nextFrame } from "@tensorflow/tfjs";
import {label, updateRect, drawRect} from "./utilities"; 
import { PhotoContext } from "../context/PhotoContext";

function ShowMe_debug() {
  const { pageid } = useContext(PhotoContext);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var idd = 0;
  var idu = 0;

  // Main function
  const runCoco = async () => {
    const net = await tf.loadGraphModel('http://localhost:5000/tfmodel/model.json')
    idd = setInterval(() => { 
      if(pageid !== 2)
      {
        clearInterval(idd);
        clearInterval(idu);
        return;
      }
      try {
        detect(net); 
      } catch (error) {
        clearInterval(idd);
      }            
    }, 500);
    idu = setInterval(() => {
      if(pageid !== 2)
      {
        clearInterval(idd);
        clearInterval(idu);
        return;
      }
      try {
        drawRect(webcamRef.current.video.videoWidth, webcamRef.current.video.videoHeight, canvasRef.current.getContext("2d"));
      } catch (error) {
        clearInterval(idu);
      }            
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      console.log("canvasRef:", canvasRef.current)

      // 4. Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640,480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)
      
      //console.log("obj 0 = ", await obj[7].array())
      //const boxes = await obj[4].array()
      //const classes = await obj[5].array()
      //const scores = await obj[6].array()

      const boxes = await obj[1].array()
      const classes = await obj[7].array()
      const scores = await obj[0].array()
      
      requestAnimationFrame(()=>{updateRect(boxes[0], classes[0], scores[0], 0.9)}); 

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

      if(label.score > 89 && label.count <66)
      {


        if(label.id === "Apple")
        {
          fetch('http://localhost:5000/api/v1/item/apple')
          .then(response => response.json())
          .then(data => {
              //console.log(data)
              var description = document.getElementById('description');
              if(description)
              {
                description.innerHTML = "<p>text = " + data.text + "</p>";
              }
            });
        }
        else if(label.id === "Chocolate")
        {
          fetch('http://localhost:5000/api/v1/item/left')
          .then(response => response.json())
          .then(data => {
              //console.log(data)
              var description = document.getElementById('description');
              if(description)
              {
                description.innerHTML = "<p>text = " + data.text + "</p>";
              }
            });
        }
      }
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div>
      <div className="d_table">
        <div className="d_tr">
          <div className="d_td">
            <div style={{position: "relative"}} >
                <Webcam
                  ref={webcamRef}
                  muted={true} 
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 320,
                    height: 240,
                  }}
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 8,
                    width: 320,
                    height: 240,
                  }}
                />
            </div>
          </div>
          <div className="d_td" id="description">Some discriptions here  asdfasf asdfasdf </div>
        </div>
      </div>
    </div>
  );
}

//position: "absolute",
//position: "absolute",

//<header className="App-header">
//</header>

export default ShowMe_debug;




