import React, {Component} from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import "./Main.css";
import AdminManager from "./Game/AdminManager";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
        <div className="main">
          <div className="">
            <div className="frame">
              <div className="noise"/>
              <div className="scan"/>
              <div className="piece output">
                <BrowserRouter>
                  <Switch>
                    <Route path={["/main", "/doctrine", "/token"]} />
                  </Switch>
                  <Switch>
                    <Route exact path="/" />
                  </Switch>
                  <Switch>
                    <Route path="/admin">
                      <AdminManager />
                    </Route>
                  </Switch>
                </BrowserRouter>
              </div>
              <div className="piece scanlines noclick"/>
              <div className="piece glow noclick"/>
            </div>
          </div>
        </div>
    );
  }
}

export default Main;
