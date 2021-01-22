import React, {Component} from 'react';
import './Footer.css';
import Social from './Social';
import Music from './Music';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  render() {
    return (
        <footer className="">
          <Social class="hidden d-none-max-1280"/>
          <Social class=""/>
          <Music audioName={"fallout_ost"}/>
        </footer>
    );
  }
}

export default Footer;
