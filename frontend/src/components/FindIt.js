import React, { useContext, useState, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import Form from "./Form";

const FindIt = ( history, handleSubmit ) => {
  const { pageid } = useContext(PhotoContext);
  var [seconds, setSeconds] = useState(0);
  var [label, setLabel] = useState("");
  var [lastSearch, setLastSearch] = useState("");
  var [searching, setSearching] = useState(0);

  const onSubmit = async (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    // history.push(searchInput);
    if(!searchInput)
      return;

    fetch('http://localhost:5000/api/v1/find/'+searchInput)
    .then(response => response.json())
    .then( async data => {
      console.log("return from find", await data)
      setSearching(0);
      if(data.ok === 'ok')
      {
        setLastSearch(searchInput);
        setSearching(1);
      }
    })
    .catch(error=>{
      setSearching(0);
      console.log("return from find", error)
    })
    ;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if(pageid != 4)
      {
        clearInterval(interval);
        return;
      }
      seconds = (seconds === 1)?0:1;
      setSeconds(seconds);
      
      if(searching == 1)
      {
        try {
          fetch('http://localhost:5000/api/v1/label')
            .then(response => response.json())
            .then(data => {
                if(pageid == 4)
                {
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
                      imageDescription.innerHTML +="<p> instruction on how to use this.</p>"
                    }
                    else if(data.label !== label)                                            
                    {
                      setLabel(data.label);
                      fetch('http://localhost:5000/api/v1/item/apple')
                      .then(response => response.json())
                      .then(detail => {
                          //console.log(detail)
                          imageDescription.innerHTML += "<p>text = " + detail.text + "</p>";
                        });
                    }
                  }
                }
              }
              );} catch(err) {
                console.log("Error: ", err);
          }
       }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div class="d_table">
        <div class="d_tr">
          <div class="d_td">
            <img id="myImage" src="https://en.pimg.jp/062/891/255/1/62891255.jpg" alt="text"  width="320" height="220"/>
            <Form history={history} handleSubmit={onSubmit} />
          </div>
          <div class="d_td" id="description">Some discriptions for find it  {seconds}</div>
        </div>
      </div>
    </div>
  );
};

export default FindIt;

