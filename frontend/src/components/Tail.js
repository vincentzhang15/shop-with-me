import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { PhotoContext } from "../context/PhotoContext";

const Tail = ({ history, handleSubmit }) => {

  const { setPage } = useContext(PhotoContext);

  //const history = useHistory();

  //clickMe(where) {
  const clickMe = (e, where,id) => {
    e.preventDefault();
    setPage(id)
    history.push("/"+where);
  }

  return (
    <nav className="main-nav" style={{position: "absolute", bottom: 0}}>
      {/*
      <ul>
        <li><button onClick={e => clickMe(e, "emailme",11)}>Email me</button></li>
        <li><button onClick={e => clickMe(e, "whatelse",12)}>What else</button></li>
        <li><button onClick={e => clickMe(e, "testupload",13)}>(Debug)Upload</button></li>
        <li><button onClick={e => clickMe(e, "showme_debug",14)}>(Debug)Show me</button></li>
      </ul>
      */}
    </nav>
  );
}
/*
<li><NavLink to="/">About</NavLink></li>
<li><NavLink to="/showme">Show me</NavLink></li>
<li><NavLink to="/askme">Ask me</NavLink></li>
<li><NavLink to="/findit">Find it</NavLink></li>
<li><NavLink to="/emailme">Email me</NavLink></li>
*/

// <Form history={history} handleSubmit={handleSubmit} />
// 

export default Tail;

