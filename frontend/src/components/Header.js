//import React from "react";
import Form from "./Form";
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { PhotoContext } from "../context/PhotoContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faMicrophone, faEye, faHome } from '@fortawesome/free-solid-svg-icons'

const Header = ({ history, handleSubmit }) => {

  const { setPage } = useContext(PhotoContext);
  //const [showMobile, setShowMobile] = React.useState(false)
  const width = window.innerWidth;
  const breakpoint = 768;

  const clickMe = (e, where,id) => {
    e.preventDefault();
    setPage(id)
    history.push("/"+where);
  }

  return (
    /*
    <div style={{backgroundImage: `url("img/blob.png")`, height: "50vh", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
    */
    <div>
      {width > breakpoint ? 
      <div className="headerDiv">
      <h1 onClick={e => clickMe(e, "about",1)}>Shop With Me.</h1>
      <button className="blackButton" onClick={e => clickMe(e, "findit",4)}>Find me</button>
      <button className="blackButton" onClick={e => clickMe(e, "askme",3)}>Ask me</button>
      <button className="blackButton" onClick={e => clickMe(e, "showme",2)}>Show me</button>
      <button className="blackButton" onClick={e => clickMe(e, "about",1)}>About</button>
    </div> 
      :
      <div className="mobileHeaderDiv">
        <h1 onClick={e => clickMe(e, "about",1)}>Shop With Me.</h1>
        <button className="blackIcon" onClick={e => clickMe(e, "findit",4)}><FontAwesomeIcon icon={faCompass} /></button>
        <button className="blackIcon" onClick={e => clickMe(e, "askme",3)}><FontAwesomeIcon icon={faMicrophone} /></button>
        <button className="blackIcon" onClick={e => clickMe(e, "showme",2)}><FontAwesomeIcon icon={faEye} /></button>
        <button className="blackIcon" onClick={e => clickMe(e, "about",1)}><FontAwesomeIcon icon={faHome} /></button>
      </div>
      }
           
    </div>
  );
};

// <Form history={history} handleSubmit={handleSubmit} />
// 

export default Header;
