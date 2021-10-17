import React, { useContext, useState, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";

const ShowMe = () => {
  const { pageid } = useContext(PhotoContext);
  var [seconds, setSeconds] = useState(0);
  var [label, setLabel] = useState("");
  const [currentTime, setCurrentTime] = useState(0); //////////////////////////////////
  const [productData, set_tfod_item] = useState(0); //////////////////////////////////

  useEffect(() => {
    const interval = setInterval(() => {
      if(pageid != 2)
      {
        clearInterval(interval);
        return;
      }
      seconds = (seconds === 1)?0:1;
      setSeconds(seconds);

      if(pageid == 2)
      {

        fetch('http://localhost:5000/api/v1/label')
        .then(response => response.json())
        .then(data => {
                //console.log(data)
                var myImageElement = document.getElementById('myImage');
                myImageElement.src = 'http://localhost:5000/image?id='+data.id;      
                var imageDescription = document.getElementById('showMeDescription');
                if(imageDescription)
                {
                  imageDescription.innerHTML = "<p><b>ID:</b> " + data.id + "<br/>"
                                              +"<b>Label:</b> " + data.label + "<br/>"
                                              +"<b>Score:</b> " + data.score + "<br/>"
                                              +"<b>Time:</b> " + data.time + "</p>";
                  if(data.score < 89)
                  {
                    setLabel("_unknown_");
                    imageDescription.innerHTML +="<p><b>Instructions:</b><br/> 1. Point your camera at a label with <br/>a circular sticker.<br/>2. Follow the arrow on the screen.</p>"
                  }
                  else if(data.label !== label)                                            
                  {
                    setLabel(data.label);
                    fetch('http://localhost:5000/api/v1/item/'+data.label)
                    .then(response => response.json())
                    .then(detail => {
                        //console.log(detail)
                        //console.log(detail.image, " _______ +++++++++++ DETAIL");
                        imageDescription.innerHTML += "<p>text = " + detail.text + "</p>";
                      })
                      .catch(err => {
                        console.log("Error: ", err);
                      })
                            
                  }
                }
              }
          )
          .catch(err => {
            console.log("Error: ", err);
          })
            
          ////////////////////////////////////
          fetch('http://localhost:5000/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
          })
          .catch(err => {
            console.log("Error: ", err);
          })

          //console.log(data + " =======================================================")


          fetch('http://localhost:5000/api/v1/label')
          .then(response => response.json())
          .then(data => {

                  label = data.label
                  var address = 'http://localhost:5000/api/v1/item/' + label
                  console.log(address, '--------------------------$$$$$$$$$')
                  fetch(address).then(res => res.json()).then(data => {
                    set_tfod_item(data);
                  })
                  .catch(err => {
                    console.log("Error: ", err);
                  })
        
          })
          .catch(err => {
            console.log("Error: ", err);
          })
  

          ////////////////////////////////////

        }
      }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{paddingTop: "8vh"}}>
      <div className="d_table">
        <div className="d_tr">
          <div className="titleText" style={{marginBottom: "40px"}}>Follow the Arrows</div> 
        </div>
        <div className="d_tr" id="group">
          <img id="myImage" src="/img/cameraIcon.jpg" alt="text"  width="320" height="220" style={{borderStyle: "dashed", borderWidth: "1px", borderRadius: "30px"}}/>
          
          {/*<div className="d_td" id="description">Seconds: {seconds}</div>*/}
          <div id="showMeDescription" style={{borderStyle: "none", borderWidth: "1px", borderRadius: "30px", textAlign: "left", margin: "5px",padding: "1.5em", backgroundColor: "#adece9", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}></div>
        </div>
      </div>
      
      <div className="d_table" style={{marginTop: "50px"}}>
        <div className="d_tr">
            <div>{productData.desc}</div>
            <div>{productData.desc}</div>
            <div>{productData.desc}</div>
            <div>{productData.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowMe;

