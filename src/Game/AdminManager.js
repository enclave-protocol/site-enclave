import React, {Component} from "react";
import "./AdminManager.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Console from "../Components/Console";
import Asteroids from "./Asteroids";

class AdminManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  setStatus(status) {
    this.setState({gameStatus: status});
    return status;
  }

  render() {
    return (
        <div id="adminManagerMain" className="overflow-x-hidden-desktop">
          <BrowserRouter>
            <Switch>
              <Route exact path="/admin">
                <Console/>
              </Route>
              <Route path="/admin/game">
                <Asteroids/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default AdminManager;
