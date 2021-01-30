import React, { Component } from 'react';
import './Menu.css';
import {BrowserRouter, Route, Switch, NavLink} from "react-router-dom";
import Default from '../Pages/Default';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.locationArray = window.location.href.split('/');
        this.state = {
            menu: [
                {id: 'menu_0', title: 'Main', url: '/main'},
                {id: 'menu_1', title: 'Doctrine', url: '/doctrine'},
                {id: 'menu_2', title: 'Token', url: '/token'},
            ],
            'currentPageIndex' : (window.location.pathname.substring(1).length > 0) ? window.location.pathname.substring(1) : 'Main',
            'menuHamburgerOpen' : false,
        };
        this.currentPageIndex = window.location.pathname.substring(1);
        this.hamburgerLinkHandler = this.hamburgerLinkHandler.bind(this)
        this.hamburgerToggle = this.hamburgerToggle.bind(this)
    }

    hamburgerToggle() {
        const pieceOutput = document.querySelector('.piece.output');
        const menuHamburger = document.getElementById('menuHamburger');

        if (this.state.menuHamburgerOpen) {
            this.setState({'menuHamburgerOpen' : false });
            menuHamburger.classList.add('d-none');
            menuHamburger.classList.add('animate__fadeOut');
            document.querySelector('footer').classList.remove('d-none');
            pieceOutput.classList.remove('overflow-hidden');
        } else {
            this.setState({'menuHamburgerOpen' : true });
            document.getElementById('menuHamburger').classList.remove('animate__fadeOut', 'd-none');
            document.querySelector('footer').classList.add('d-none');
            pieceOutput.classList.add('overflow-hidden');
        }
    }

    hamburgerLinkHandler(e) {
        const pieceOutput = document.querySelector('.piece.output');
        const menuHamburger = document.getElementById('menuHamburger');
        this.setState({
            'menuHamburgerOpen' : false,
            'currentPageIndex': e.target.textContent
        });
        menuHamburger.classList.add('d-none');
        pieceOutput.classList.remove('overflow-hidden');
        document.querySelector('footer').classList.remove('d-none');
    }

    render() {
        return (
        <div className="" id="menuMain">
            <BrowserRouter>
                <div id="menuMobile">
                    <img src={process.env.PUBLIC_URL + '/img/hamburger.png'} alt="Menu" className="d-none-min-1280 menu-hamburger" onClick={this.hamburgerToggle}/>
                    <div id="menuHamburger" className="d-none animate__animated animate__fadeIn animate__faster">
                        <img src={process.env.PUBLIC_URL + '/img/hamburger.png'} alt="Menu" className="d-none-min-1280 menu-hamburger menu-hamburger-close" onClick={this.hamburgerToggle}/>
                        <img src={process.env.PUBLIC_URL + '/img/hamburger-background.jpg'} alt="Menu Background" className="d-none-min-1280" id="menuHamburgerBackground"/>
                        <a role="button" href="/" className="link">Terminal</a>
                        { this.state.menu.map((item, key) => <NavLink key={item.id.toString() + "hamburger"} to={item.url} role="button" id={item.id} alt={item.title} className={"link"} onClick={this.hamburgerLinkHandler}>{item.title}</NavLink>)}
                        <a target="_blank" id="menu_4" alt="MVP" className="link" href="/">MVP</a>
                    </div>
                </div>
                <div id="menu" className="d-none-max-1280">
                    <span className="my-none"><a role="button" tabIndex="0" href="/" id="menu-placeholder" className="link">Terminal</a></span>
                    <span className="my-none"><a role="button" tabIndex="0" href="" id="menu-arrow" className="d-flex">></a></span>
                    { this.state.menu.map((item, key) => <span className="my-none" key={item.id.toString()}><NavLink to={item.url} id={item.id} alt={item.title} activeClassName={'active-link'} className={"link"} onClick={() => this.setState({'currentPageIndex' : item.title})}>{item.title}</NavLink></span>)}
                    <span className="my-none"><a target="_blank" id="menu_4" alt="MVP" className="link" href="/">MVP</a></span>
                </div>
                <div className="my-4 text-uppercase" id="currentlyOnPage">*** <span className="d-none-max-768">You are currently on page: </span> <span>{ this.state.currentPageIndex }</span> ***</div>
                <Switch>
                    <Route exact path="/">
                        <Default/>
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/main">
                        <Default/>
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/doctrine">
                        <div>Doctrine</div>
                    </Route>
                </Switch>
                <Switch>
                    <Route path="/token">
                        <div>Token</div>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
        );
      }
}

export default Menu;
