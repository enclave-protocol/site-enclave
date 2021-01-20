import React, {Component} from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import "./Main.css";
import AdminManager from "./Game/AdminManager";
import Welcome from "./Components/Welcome";

class Main extends Component {
  constructor(props) {
    super(props);
    this.welcomeStatus = this.welcomeStatus.bind(this);
    this.state = {
      enter: this.props.enter,
      welcomeStatus: true
    };
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    const welcomeEnter = document.getElementById("welcomeEnter");

    if (welcomeEnter) {
      welcomeEnter.addEventListener("click", () => {
        this.setState({enter: true});
      });
    }
  }

  componentDidUpdate() {
  }

  welcomeStatus(status) {
    if (status) {
      this.setState({welcomeStatus: status});
    }
    return this.state.welcomeStatus;
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
                    <Route exact path="/">
                      <Welcome
                          enter={this.state.enter}
                          welcomeStatus={this.welcomeStatus}
                      />
                    </Route>
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
