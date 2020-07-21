import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">Recipe Book</NavLink>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shopping-list">Shopping List</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;