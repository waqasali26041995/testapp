import React from 'react';
import ReactDOM from 'react-dom';
import './LeftMenu.css';
import { FaAlignLeft } from '@react-icons/all-files/fa/FaAlignLeft';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { Link, BrowserRouter, Route } from "react-router-dom";

const navLinks = [
    { url: '/event/list', name: 'Events' },
    { url: '/user/list', name: 'Users' }
];

class LeftMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            style: "menu",
            menuStatus: "open"
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        switch (this.state.menuStatus) {
            case "open":
                this.setState({
                    menuStatus: "close",
                    style: "menu active"
                });
                break;
            case "close":
                this.setState({
                    menuStatus: "open",
                    style: "menu"
                });
                break;
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-menu" onClick={this.handleClick}><FaAlignLeft /></button>
                <div className={this.state.style}>
                    <div>
                        <a href="/" className="menu-logo">
                            <img className="img-fluid" src="/logo.png" alt="" /> </a>
                        <a className="menu-close" onClick={this.handleClick}><FaTimes /></a>
                    </div>
                    <ul>
                        {navLinks.map(({ url, name }) => (
                            <li>
                                <Link to={url} onClick={this.handleClick}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default LeftMenu;