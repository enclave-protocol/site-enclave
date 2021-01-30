import React, {Component} from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Music.css";

class Music extends Component {
  constructor(props) {
    super(props);
    this.audio = null;
    this.musicHandler = this.musicHandler.bind(this)
  }

  musicHandler(e) {
      if (e.target.id === 'musicControlPause') {
          const play = document.getElementById("musicControlPlay")
          play.classList.toggle("d-none")
          e.target.classList.toggle("d-none")
          this.audio.audioEl.current.pause()
      } else if (e.target.id === 'musicControlPlay') {
          const pause = document.getElementById("musicControlPause")
          pause.classList.toggle("d-none")
          e.target.classList.toggle("d-none")
          this.audio.audioEl.current.play()
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
                onClick={this.musicHandler}
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
                onClick={this.musicHandler}
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
