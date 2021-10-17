import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { PhotoContext } from "../context/PhotoContext";

const Navigation = () => {

  const { setPage } = useContext(PhotoContext);

  const history = useHistory();

  //clickMe(where) {
  const clickMe = (e, where,id) => {
    e.preventDefault();
    setPage(id)
    history.push("/"+where);
  }

  return (
    
    <nav className="main-nav2">
      <ul>
        <li><button onClick={e => clickMe(e, "showme",2)}>Show me</button></li>
        <li><button onClick={e => clickMe(e, "askme",3)}>Ask me</button></li>
        <li><button onClick={e => clickMe(e, "findit",4)}>Find me</button></li>
      </ul>
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

export default Navigation;
