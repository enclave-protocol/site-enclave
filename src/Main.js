import React, {Component} from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import "./Main.css";
import AdminManager from "./Game/AdminManager";
import Welcome from "./Components/Welcome";
import Content from "./Content";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enter: this.props.enter
    };
  }

  render() {
    return (
        <div className="main">
          <div className="frame">
            <div className="noise"/>
            <div className="scan"/>
            <div className="piece output">
              <BrowserRouter>
                <Switch>
                  <Route path={["/main", "/doctrine", "/token"]}>
                    <Content enter={true} />
                  </Route>
                </Switch>
                <Switch>
                  <Route exact path="/">
                    <Welcome
                        enter={this.state.enter} />
                  </Route>
                </Switch>
                <Switch>
                  <Route path="/admin">
                    <AdminManager/>
                  </Route>
                </Switch>
                <Switch>
                </Switch>
              </BrowserRouter>
            </div>
            <div className="piece scanlines noclick"/>
            <div className="piece glow noclick"/>
          </div>
        </div>
    );
  }
}

export default Main;
