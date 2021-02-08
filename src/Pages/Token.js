import React, {Component} from "react";
import "./Token.css";

class Token extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ASCII_LOGO = ['&nbsp;@@@@@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@@@@@@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@@@@@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;&nbsp;@@@@@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@@@@@&nbsp;&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@@@@@@',
      '&nbsp;@@@@@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@@@@@@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@@@@@@@&nbsp;&nbsp;@@@@&nbsp;@@@&nbsp;&nbsp;@@@@@@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@@@@@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@&nbsp;&nbsp;@@@@@@@@',
      '&nbsp;&nbsp;@@!&nbsp;&nbsp;&nbsp;&nbsp;@@!&nbsp;&nbsp;@@@&nbsp;&nbsp;@@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@!@!@@@&nbsp;&nbsp;!@@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@@!&nbsp;&nbsp;@@@&nbsp;&nbsp;@@!&nbsp;&nbsp;@@@&nbsp;&nbsp;@@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      '&nbsp;&nbsp;!@!&nbsp;&nbsp;&nbsp;&nbsp;!@!&nbsp;&nbsp;@!@&nbsp;&nbsp;!@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!@!!@!@!&nbsp;&nbsp;!@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!@!&nbsp;&nbsp;@!@&nbsp;&nbsp;!@!&nbsp;&nbsp;@!@&nbsp;&nbsp;!@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      '&nbsp;&nbsp;@!!&nbsp;&nbsp;&nbsp;&nbsp;@!@!@!@!&nbsp;&nbsp;@!!!:!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@!!!:!&nbsp;&nbsp;&nbsp;&nbsp;@!@&nbsp;!!@!&nbsp;&nbsp;!@!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@!!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@!@!@!@!&nbsp;&nbsp;@!@&nbsp;&nbsp;!@!&nbsp;&nbsp;@!!!:!&nbsp;&nbsp;',
      '&nbsp;&nbsp;!!!&nbsp;&nbsp;&nbsp;&nbsp;!!!@!!!!&nbsp;&nbsp;!!!!!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!!!!!:&nbsp;&nbsp;&nbsp;&nbsp;!@!&nbsp;&nbsp;!!!&nbsp;&nbsp;!!!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!!!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!!!@!!!!&nbsp;&nbsp;!@!&nbsp;&nbsp;!!!&nbsp;&nbsp;!!!!!:&nbsp;&nbsp;',
      '&nbsp;&nbsp;!!:&nbsp;&nbsp;&nbsp;&nbsp;!!:&nbsp;&nbsp;!!!&nbsp;&nbsp;!!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!!:&nbsp;&nbsp;!!!&nbsp;&nbsp;:!!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!!:&nbsp;&nbsp;!!!&nbsp;&nbsp;:!:&nbsp;&nbsp;!!:&nbsp;&nbsp;!!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      '&nbsp;&nbsp;:!:&nbsp;&nbsp;&nbsp;&nbsp;:!:&nbsp;&nbsp;!:!&nbsp;&nbsp;:!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:!:&nbsp;&nbsp;!:!&nbsp;&nbsp;:!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:!:&nbsp;&nbsp;!:!&nbsp;&nbsp;&nbsp;::!!:!&nbsp;&nbsp;&nbsp;:!:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      '&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;:::&nbsp;&nbsp;&nbsp;::&nbsp;::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;::::&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;:::&nbsp;:::&nbsp;&nbsp;&nbsp;::&nbsp;::::&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;:::&nbsp;&nbsp;&nbsp;&nbsp;::::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;::::',
      '&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;:&nbsp;:&nbsp;&nbsp;:&nbsp;::&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;::&nbsp;::&nbsp;&nbsp;&nbsp;::&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;::&nbsp;::&nbsp;:&nbsp;&nbsp;:&nbsp;::&nbsp;:&nbsp;:&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;:&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;::&nbsp;::&nbsp;'];

    return (
        <div className="pageMain">
          <div className="the-enclave-ascii text-center">
            <p id="tokenJoinTitle">Join</p>
            {
              ASCII_LOGO.map((v, i) => {
                return React.createElement("p", {key: i, dangerouslySetInnerHTML: {__html: v}});
              })
            }
          </div>

          <div className="token-main">
            <div className="token-content">
              <div className="token-body">
                <div className="token-body-content">
                  <h3 style={{textAlign: "center"}}>Details will be announced soon</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Token;
