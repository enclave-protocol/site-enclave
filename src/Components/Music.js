import React, {Component} from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Music.css";

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.audio = null;
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    const play = document.getElementById("musicControlPlay");
    const pause = document.getElementById("musicControlPause");
    const enter = document.getElementById("welcomeEnter");
    if (enter) {
      enter.addEventListener("click", () => {
        musicToggler(this, true);
      });
    }
    if (play && pause) {
      play.addEventListener("click", () => {
        musicToggler(this, true);
      });
      pause.addEventListener("click", () => {
        musicToggler(this, false);
      });
    }

    function musicToggler(context, status) {
      pause.classList.toggle("d-none");
      play.classList.toggle("d-none");
      status
          ? context.audio.audioEl.current.play()
          : context.audio.audioEl.current.pause();
    }
  }

  render() {
    return (
        <div
            className={
              "music-main" + this.props.customClassName
                  ? "music-main " + this.props.customClassName
                  : "music-main"
            }
        >
          <div className="music-controls">
            <img
                src={
                  process.env.PUBLIC_URL +
                  "/img/" +
                  (this.props.playImg ? this.props.playImg : "play") +
                  ".png"
                }
                alt="Play"
                className="music-control music-control-play d-none"
                id="musicControlPlay"
                data-tip="We recommend<br>to enable <br>this."
            />
            <img
                src={
                  process.env.PUBLIC_URL +
                  "/img/" +
                  (this.props.pauseImg ? this.props.pauseImg : "pause") +
                  ".png"
                }
                alt="Pause"
                className="music-control music-control-pause"
                id="musicControlPause"
                data-tip="Click to<br> stop<br>the music."
            />
          </div>
          <ReactAudioPlayer
              src={
                process.env.PUBLIC_URL + "/sounds/" + this.props.audioName + ".mp3"
              }
              loop={true}
              id={"background-audio"}
              autoPlay={true}
              ref={(element) => {
                this.audio = element;
              }}
          />
        </div>
    );
  }
}

export default Music;
