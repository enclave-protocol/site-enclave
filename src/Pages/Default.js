import React, { Component } from "react";
import GlitchClip from "react-glitch-effect/core/Clip";
import "../Main.css";
import "./Default.css";

class Default extends Component {
  constructor(props) {
    super(props);
    this.contentArray = [
      `Just who is the Enclave? Well now thats simple, the Enclave is you
      DeFi. The Enclave is brother, your sister, your aunt, your neighbor.
      And most importantly the Enclave is your friend.`,
      `What is our purpose? To rebuild DeFi! You see we live now in an age
      of greed and poverty. Our former leaders let America die, In the
      post-apocolyptic world we live now, we face many enemies only this
      time they come from within.`,
      `Who are our enemies? Our enemies are the Brotherhood of Scum and
      their Outcasts. We also face the threat of Rug-pullerss, Raiders,
      and Slavers. These radical malcontents will fall. Sweetest crypto,
      rest assured that the Enclave will save the Capital Wasteland, all
      we need is a little time, a little faith.`,
    ];
    this.state = {
      isDisabled: true
    };
  }

  glitchInterval() {
    this.setState({
      isDisabled: !this.state.isDisabled
    })
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  componentDidMount() {
    this.glitchInterval()

    this.intervalId = setInterval(this.glitchInterval.bind(this), 8000);

    let isPlaying = function (audio) {
      return (
          audio &&
          audio.currentTime > 0 &&
          !audio.paused &&
          !audio.ended &&
          audio.readyState > 2
      );
    };

    const logoWithSounds = document.getElementById("logoWithSounds");
    const soundsName = [
      "1_enclave_here",
      "2_who_is",
      "2_who2",
      "3_trasing",
      "4_ass",
      "5_1locationmp3",
      "5_location2",
      "6_swart",
      "7_seс",
    ];
    let sounds = [];
    let arrayCounter = 0;
    soundsName.forEach((soundName) => {
      sounds.push(
          new Audio(process.env.PUBLIC_URL + "/sounds/" + soundName + ".mp3")
      );
    });
    logoWithSounds.addEventListener("click", () => {
      if (arrayCounter === sounds.length) {
        arrayCounter = 0;
      }
      if (isPlaying(sounds[arrayCounter - 1])) {
      } else {
        sounds[arrayCounter].play();
        arrayCounter++;
      }
    });
  }

  render() {
    return (
        <div className="pageMain my-4">
          <div className="header-image-with-title my-4">
            <GlitchClip iterationCount="1" duration="6s" disabled={this.state.isDisabled} className="d-flex w-100-max-768 justify-center">
              <img
                  src={process.env.PUBLIC_URL + "/img/main-logo.svg"}
                  alt="Logo"
                  className="header-logo"
                  id="logoWithSounds"
              />
            </GlitchClip>
            <div className="text-uppercase header-title">
              <div className="ascii-main font-lucida-console">
                <span className="ascii-line">███████╗███╗&nbsp;&nbsp;&nbsp;██╗&nbsp;██████╗██╗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█████╗&nbsp;██╗&nbsp;&nbsp;&nbsp;██╗███████╗</span>
                <span className="ascii-line">██╔════╝████╗&nbsp;&nbsp;██║██╔════╝██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██╔══██╗██║&nbsp;&nbsp;&nbsp;██║██╔════╝</span>
                <span className="ascii-line">█████╗&nbsp;&nbsp;██╔██╗&nbsp;██║██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███████║██║&nbsp;&nbsp;&nbsp;██║█████╗&nbsp;&nbsp;</span>
                <span className="ascii-line">██╔══╝&nbsp;&nbsp;██║╚██╗██║██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██╔══██║╚██╗&nbsp;██╔╝██╔══╝&nbsp;&nbsp;</span>
                <span className="ascii-line">███████╗██║&nbsp;╚████║╚██████╗███████╗██║&nbsp;&nbsp;██║&nbsp;╚████╔╝&nbsp;███████╗</span>
                <span className="ascii-line">╚══════╝╚═╝&nbsp;&nbsp;╚═══╝&nbsp;╚═════╝╚══════╝╚═╝&nbsp;&nbsp;╚═╝&nbsp;&nbsp;╚═══╝&nbsp;&nbsp;╚══════╝</span>
              </div>
              <h2 className="mb-none mt-none">The National Portal</h2>
              <hr className="dashed"/>
              <p className="mt-4">
                YOUR PRIVACY PROVIDER V 0.9.2{" "}
                <span className="my-none"> Setup, prove, verify</span>
              </p>
              <p className="my-none">- SERVER 1.02 -</p>
            </div>
          </div>
          <hr className="dashed"/>
          <hr className="dashed"/>
          <div className="main-description text-uppercase" id="defaultContent">
            <p>
              Just what is the Enclave? Well, now that’s simple, the Enclave is your privacy. The Enclave is your
              brother, your sister, your aunt, your neighbor. And most importantly the Enclave is your friend.
            </p>
            <p>
              What is our goal? To rebuild DeFi! We now live in the age of greed and poverty. As our former leaders let
              America die, in the post-apocalyptic world we live now, we face many enemies only this time they come from
              within.
            </p>
            <p>
              Who are our enemies? Our enemies are the Brotherhood of Scum and their Outcasts. We also face the threat
              of Big Brother, Raiders, and Slavers. These radical malcontents will fall. Sweetest crypto, rest assured
              that the Enclave will save the Capital Wasteland, all we need is a little time, a little faith.
            </p>
          </div>
          <hr className="dashed"/>
          <hr className="dashed"/>
        </div>
    );
  }
}

export default Default;