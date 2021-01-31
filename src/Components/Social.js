import React, {Component} from "react";
import "./Social.css";

class Social extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={"social " + this.props.class}>
          <a href="/">
            <img
                src={process.env.PUBLIC_URL + "/img/social_G.png"}
                alt="Github"
                className="social-logo"
            />
          </a>
          <a href="/">
            <img
                src={process.env.PUBLIC_URL + "/img/social_T.png"}
                alt="Telegram"
                className="social-logo"
            />
          </a>
        </div>
    );
  }
}

export default Social;
