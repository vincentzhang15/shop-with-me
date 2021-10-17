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
                var imageDescription = document.getElementById('description');
                if(imageDescription)
                {
                  imageDescription.innerHTML = "<p>id = " + data.id + "<br/>"
                                              +"label = " + data.label + "<br/>"
                                              +"score = " + data.score + "<br/>"
                                              +"time = " + data.time + "</p>";
                  if(data.score < 89)
                  {
                    setLabel("_unknown_");
                    imageDescription.innerHTML +="<p> instruction on how to use this.</p>"
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
                      });
                            
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
          });

          //console.log(data + " =======================================================")


          fetch('http://localhost:5000/api/v1/label')
          .then(response => response.json())
          .then(data => {

                  label = data.label
                  var address = 'http://localhost:5000/api/v1/item/' + label
                  console.log(address, '--------------------------$$$$$$$$$')
                  fetch(address).then(res => res.json()).then(data => {
                    set_tfod_item(data);
                  });
        
          })
  

          ////////////////////////////////////

        }
      }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="d_table">
        <div className="d_tr">
          <div className="d_td"><img id="myImage" src="https://en.pimg.jp/062/891/255/1/62891255.jpg" alt="text"  width="320" height="220"/></div>
          <div className="d_td" id="description">Some discriptions here  asdfasf asdfasdf  {seconds}</div>
          <div><h1>{productData.desc} </h1></div>
          <div><h1>{productData.desc} </h1></div>
          <div><h1>{productData.desc} </h1></div>
          <div><h1>{productData.desc} </h1></div>

        </div>
      </div>
    </div>
  );
};

export default ShowMe;

