import React, { useContext, useState, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Container from "./Container";

import Cookies from 'universal-cookie';


const ShowMe = () => {
  const { pageid, lastSearch, setLastSearch, runSearch } = useContext(PhotoContext);
  var [seconds, setSeconds] = useState(0);
  var [label, setLabel] = useState("");
  const [currentTime, setCurrentTime] = useState(0); //////////////////////////////////
  const [productData, set_tfod_item] = useState(0); //////////////////////////////////

  const cookies = new Cookies();
  

  fetch('http://localhost:5000/api/v1/find/nothing')

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

                  //if(data.score < 89)
                  if(data.score < 80)
                  {
                    setLabel("_unknown_");
                    imageDescription.innerHTML +="<p></p>"
                  }
                  else
                  {
                    let last_label = cookies.get('label2');
                    if(last_label != data.label)
                    {
                      //setLastSearch(data.label);
                      cookies.set('label2', data.label, { path: '/' });

                      //if(data.label !== label)                                            

                      setLabel(data.label);
                      fetch('http://localhost:5000/api/v1/item/'+data.label)
                      .then(response => response.json())
                      .then(detail => {
                          //console.log(detail)
                          //console.log("search: ===", last_label, data.label, data, detail, detail.type)
                          console.log("search: ===", detail.type, (detail.type != 'sign'))
                          //console.log(detail.image, " _______ +++++++++++ DETAIL");
                          if(detail.type != 'sign' )
                          {
                            runSearch(data.label);
                            imageDescription.innerHTML += "<p>text = " + detail.text + "</p>";

                            set_tfod_item(detail);
                          }
                        })
                        .catch(err => {
                          console.log("Error: ", err);
                        })
                            
                    }
                  }
              }
              }
          )
          .catch(err => {
            console.log("Error: ", err);
          })
            
          /*
          ////////////////////////////////////
          fetch('http://localhost:5000/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
          })
          .catch(err => {
            console.log("Error: ", err);
          })
          */

          //console.log(data + " =======================================================")
          /*

          fetch('http://localhost:5000/api/v1/label')
          .then(response => response.json())
          .then(data => {

                  label = data.label
                  var address = 'http://localhost:5000/api/v1/item/' + label
                  // console.log(address, '--------------------------$$$$$$$$$')
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
          */
  

          ////////////////////////////////////

        }
      }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{paddingTop: "8vh"}}>
      <div className="d_table">
        <div className="d_tr">
          <div className="titleText" style={{marginBottom: "40px"}}>Take a photo</div> 
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
            <div  style={{borderStyle: "none", borderWidth: "1px", borderRadius: "30px", textAlign: "left", margin: "5px",padding: "1.5em", backgroundColor: "#adece9", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
            <Container searchTerm={"loblaw"} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMe;

