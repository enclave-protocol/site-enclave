import React, {Component} from "react";
import "./AdminManager.css";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Console from "../Components/Console";
import Login from "./Login";

class AdminManager extends Component {
  constructor(props) {
    super(props);
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
                <Login/>
              </Route>
              <Route path="/admin/console">
                <Console/>
              </Route>
            </Switch>
            <Switch>
              <Redirect to='/admin'/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default AdminManager;
