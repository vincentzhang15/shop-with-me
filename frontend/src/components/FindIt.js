import React, { useContext, useState, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Container from "./Container";
import Gallery from "./Gallery";
import Loader from "./Loader";
import Form from "./Form";

const FindIt = ( handleSubmit, history ) => {
  const { pageid, lastSearch, setLastSearch } = useContext(PhotoContext);
  var [seconds, setSeconds] = useState(0);
  var [label, setLabel] = useState("");
  //var [lastSearch, setLastSearch] = useState("");
  const [searching, setSearching] = useState(0);
  //var searching = 0;
  const { images, loading, runSearch } = useContext(PhotoContext);

  const onSubmit = async (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    // history.push(searchInput);
    if(!searchInput)
      return;

    fetch('http://localhost:5000/api/v1/find/'+searchInput)
    .then(response => response.json())
    .then( data => {
      let d = data
      console.log("return from find", d)
      setSearching(0);
      //searching = 0;
      console.log("ok=", d.ok)
      //if(d.ok == 'ok')
      {
        setLastSearch(searchInput);
        if(lastSearch != searchInput)
        {
          runSearch(searchInput);
        }
        setSearching(1);
        //searching = 1;
        console.log("return from find searching=", searching)
      }
    })
    .catch(error=>{
      setSearching(0);
      //searching = 0;
      console.log("return from find", error)
    }) ;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("pageid=", pageid)
      if(pageid != 4)
      {
        clearInterval(interval);
        return;
      }
      seconds = (seconds === 1)?0:1;
      setSeconds(seconds);
      
      //if(searching == 1)
      {
        try {
          fetch('http://localhost:5000/api/v1/label')
            .then(response => response.json())
            .then(data => {
                if(pageid == 4)
                {
                  //console.log(data)
                  var myImageElement = document.getElementById('myImage');
                  if(myImageElement)
                  {
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
              }
              );} catch(err) {
                console.log("Error: ", err);
          }
       }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{paddingTop: "8vh"}}>
      <div className="d_table">
        <div className="d_tr">
          <div >
            <div className="titleText" style={{marginBottom: "40px"}}>Follow the Arrows</div> 
            <img id="myImage" src="/img/cameraIcon.jpg" alt="text"  width="320" height="220" style={{borderStyle: "dashed", borderWidth: "1px", borderRadius: "30px"}}/>
            <Form history={history} handleSubmit={onSubmit} />
          </div>
          <div  style={{borderStyle: "none", borderWidth: "1px", borderRadius: "30px", textAlign: "left", margin: "5px",padding: "1.5em", backgroundColor: "#adece9", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"}}>
                  <Container searchTerm={"loblaw"} />
          </div>
          {/*
          */}
        </div>
      </div>
    </div>
  );
};

//<div className="d_td" id="description">Some discriptions for find it  {seconds}</div>
//<div id="searchresult"></div>

export default FindIt;

