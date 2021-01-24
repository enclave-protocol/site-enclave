import React, {Component} from "react";
import "./Main.css";
import Footer from "./Components/Footer";
import "./Content.css";
import Menu from "./Components/Menu";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  render() {
    if (this.props.enter) {
      return (
          <div
              className="output-with-console animate__animated animate__fadeIn animate__faster"
              id="contentMain"
          >
            <div className="output-content">
              <Menu welcomeStatus={this.props.welcomeStatus}/>
              <div className="content" id="contentArea">
                <div className="content" id="consoleHistory"/>
              </div>
            </div>
            <Footer/>
          </div>
      );
    } else {
      return <div/>;
    }
  }
}

export default Content;
