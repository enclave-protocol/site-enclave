import React, { Component } from 'react';
import './Menu.css';
import {BrowserRouter, Route, Switch, Link, NavLink} from "react-router-dom";
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
    }
    
    componentDidUpdate() {
    }
    
    componentWillUnmount() {
    }
    
    componentDidMount() {
        const self = this;

        let menu = document.getElementById('menu');
        let menuMobile = document.getElementById('menuMobile');
        menu.querySelectorAll('a').forEach((item) => {
            item.addEventListener('click', () => {
                this.setState({'currentPageIndex' : item.getAttribute('alt')});
            });
        });
        menuMobile.querySelectorAll('a').forEach((item) => {
            item.addEventListener('click', () => {
                this.setState({'currentPageIndex' : item.getAttribute('alt')});
            });
        });

        const menuHamburgerToggler = document.querySelectorAll('.menu-hamburger');
        const pieceOutput = document.querySelector('.piece.output');
        if (menuHamburgerToggler) {
            menuHamburgerToggler.forEach((toggler) => {
                const clickHandler = () => {
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
                toggler.addEventListener('click', clickHandler);
            });
        }

        const menuHamburger = document.getElementById('menuHamburger');
        menuHamburger.querySelectorAll('a').forEach((item) => {
            item.addEventListener('click', () => {
                this.setState({'menuHamburgerOpen' : false });
                menuHamburger.classList.add('d-none');
                pieceOutput.classList.remove('overflow-hidden');
                menuHamburger.querySelectorAll('a').forEach((item) => {
                    item.classList.remove('active');
                });
                item.classList.add('active');
                document.querySelector('footer').classList.remove('d-none');
            });
        });

        const menuTerminalButton = document.getElementById('menu-placeholder');
        menuTerminalButton.addEventListener('click', () => {
            this.props.welcomeStatus(true);
        });
    }

    render() {
        return (
        <div className="" id="menuMain">
            <BrowserRouter>
                <div id="menuMobile">
                    <img src={process.env.PUBLIC_URL + '/img/hamburger.png'} alt="Menu" className="d-none-min-1280 menu-hamburger"/>
                    <div id="menuHamburger" className="d-none animate__animated animate__fadeIn animate__faster">
                        <img src={process.env.PUBLIC_URL + '/img/hamburger.png'} alt="Menu" className="d-none-min-1280 menu-hamburger menu-hamburger-close"/>
                        <img src={process.env.PUBLIC_URL + '/img/hamburger-background.jpg'} alt="Menu Background" className="d-none-min-1280" id="menuHamburgerBackground"/>
                        { this.state.menu.map((item, key) => <Link key={item.id.toString() + "hamburger"} to={item.url} role="button" id={item.id} alt={item.title} className={"link " + (item.title.toLowerCase() === this.state.currentPageIndex ? 'active' : '')}>{item.title}</Link>)}
                        <a target="_blank" id="menu_4" alt="MVP" className="link" href="/">MVP</a>
                    </div>
                </div>
                <div id="menu" className="d-none-max-1280">
                    <span className="my-none"><a role="button" tabIndex="0" href="/" id="menu-placeholder" className="link">Terminal</a></span>
                    <span className="my-none"><a role="button" tabIndex="0" href="" id="menu-arrow" className="d-flex">></a></span>
                    { this.state.menu.map((item, key) => <span className="my-none" key={item.id.toString()}><NavLink to={item.url} id={item.id} alt={item.title} activeClassName={'active-link'} className={"link"}>{item.title}</NavLink></span>)}
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
