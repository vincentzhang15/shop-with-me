import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Tail from "./components/Tail";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import Content from "./components/Content";
import Container from "./components/Container";
import FindIt from "./components/FindIt";
import Check from "./components/ShowMe";
import AskMe from "./components/AskMe";
import TestUpload from "./components/TestUpload";
import ShowMe_debug from "./components/ShowMe_debug";
import ShowMe from "./components/ShowMe";

const pageInfo = {
  id: 0
}

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };
  
  render() {
    return (
      <PhotoContextProvider>
        <HashRouter basename="/">
          <div className="container">
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/about" />}
              />
              <Route
                path="/about"
                render={() => <Content />}
              />
              <Route
                path="/showme"
                render={() => <ShowMe />}
              />
              <Route
                path="/askme"
                render={() => <AskMe />}
              />
              <Route
                path="/findit"
                render={props => (
                  <FindIt
                    handleSubmit={this.handleSubmit}
                    history={props.history}
                  />
                )}
              />
              <Route
                path="/emailme"
                render={() => <Container />}
              />
              <Route
                path="/whatelse"
                render={() => <Container />}
              />
              <Route
                path="/testUpload"
                render={() => <TestUpload />}
              />
              <Route
                path="/showme_debug"
                render={() => <ShowMe_debug />}
              />
              <Route component={NotFound} />
            </Switch>
            <Route
              render={props => (
                <Tail
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
          </div>
        </HashRouter>
      </PhotoContextProvider>
    );
  }
}

/*
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/mountain" />}
              />

              <Route
                path="/mountain"
                render={() => <Item searchTerm="mountain" />}
              />
              <Route path="/beach" render={() => <Item searchTerm="beach" />} />
              <Route path="/bird" render={() => <Item searchTerm="bird" />} />
              <Route path="/food" render={() => <Item searchTerm="food" />} />
              <Route
                path="/search/:searchInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              />
              <Route component={NotFound} />
            </Switch>

*/

export default App;
