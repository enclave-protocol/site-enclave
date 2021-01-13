import React, {Component} from "react";
import "./AdminManager.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";

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
              <Route exact path="/admin" />
              <Route path="/admin/game" />
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

export default AdminManager;
