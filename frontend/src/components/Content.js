import React, { useContext, useState, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import Navigation from "./Navigation";

const Content = () => {
/*
  var [seconds, setSeconds] = useState(0);
  //let seconds = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      seconds = (seconds === 1)?0:1;
      setSeconds(seconds);


      var myImageElement = document.getElementById('myImage');
      if( seconds === 0)
        myImageElement.src = 'https://en.pimg.jp/062/891/255/1/62891255.jpg';      
      else
        myImageElement.src = 'https://www.theglobeandmail.com/resizer/bD5ER11MKGV6jvoYhD0EC-R80mY=/620x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/2P7OCLRNWBG7HO3QR6MZ62BXPA';

    }, 1000);
    return () => clearInterval(interval);
  }, []);
*/
  //ABOUT PAGE
  return (
    <div>
      <div className="d_table">
        <div style={{paddingTop: "8vh"}}>
          {/*<div className="d_td"><img id="myImage" src="https://en.pimg.jp/062/891/255/1/62891255.jpg" alt="text"/></div>*/}
          <div className="titleText">
            Wish <b className="emphasisText">grocery shopping</b> was <b className="emphasisText">fun</b> and <b className="emphasisText">easy</b>?
          </div>
          <div className="subText">
            "Shop with me" is the ultimate tool for making your shopping faster and easier. No more wasting time looking for a food item or squinting at a nutrition fact label.
          </div>
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Content;

