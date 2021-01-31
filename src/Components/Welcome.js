import React, {Component} from "react";
import "./Welcome.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Link
} from "react-router-dom";
import AdminManager from "../Game/AdminManager";
import Content from "../Content";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.audioJSON = {
      "radiation": new Audio(process.env.PUBLIC_URL + "/sounds/radiation.mp3")
    };
  }

  playAudio() {
    let audio = this.audioJSON.radiation;
    audio.volume = 0.2
    audio.paused ? audio.play() : audio.pause();
  }

  render() {
    if (!this.props.enter) {
      return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <div className="welcome-main" id="welcomeMain">
                  <div className="welcome-content">
                    <img
                        src={process.env.PUBLIC_URL + "/img/welcome-logo.png"}
                        alt="Welcome Logo"
                        className="welcome-logo"
                    />
                    <div className="welcome-buttons text-uppercase">
                      <Link
                          role="button"
                          tabIndex="0"
                          to="/main"
                          id="welcomeEnter"
                          className="welcome-button"
                      >
                        <span>Enter</span>
                      </Link>
                      <Link
                          role="button"
                          tabIndex="0"
                          to="/admin"
                          id="welcomeAdminPanel"
                          className="welcome-button"
                      >
                        <span>Admin</span>
                      </Link>
                    </div>
                  </div>
                  <div className="welcome-footer">
                    <img
                        src={process.env.PUBLIC_URL + "/img/welcome-footer.png"}
                        alt="Welcome Footer"
                        className="welcome-footer-image"
                        id="welcomeFooter"
                        onClick={this.playAudio.bind(this, "radiation")}
                    />
                  </div>
                </div>
              </Route>
            </Switch>
            <Switch>
              <Route path="/admin">
                <AdminManager/>
              </Route>
            </Switch>
            <Switch>
              <Route path="/main">
                <Content enter={true}/>
              </Route>
            </Switch>
          </BrowserRouter>
      );
    } else {
      return <div/>;
    }
  }
}

export default Welcome;
