//import React from "react";
import Form from "./Form";
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { PhotoContext } from "../context/PhotoContext";

const Header = ({ history, handleSubmit }) => {

  const { setPage } = useContext(PhotoContext);

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
      <div style={{width: "100%", display: "inline-block", verticalAlign: "middle"}}>
        <h1 style={{fontSize: "3.5em", float: "left", display: "inline-block", color: "#6bd9ca"}}>Shop With Me.</h1>
        <button className="blackButton" onClick={e => clickMe(e, "about",1)}>About</button>
        <button className="blackButton" onClick={e => clickMe(e, "showme",2)}>Show me</button>
        <button className="blackButton" onClick={e => clickMe(e, "askme",3)}>Ask me</button>
        <button className="blackButton" onClick={e => clickMe(e, "findit",4)}>Find it</button>
      </div>
      
    </div>
  );
};

// <Form history={history} handleSubmit={handleSubmit} />
// 

export default Header;
