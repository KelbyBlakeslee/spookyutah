import React, { Component } from 'react';
import './login.css';
import DarkForestTwo from '../images/dark_forest2.png';

class Login extends Component {
    constructor() {
        super();


        this.state = {

        }


    }

    render() {
        return (
            <div>
                <div>
                    <img className="background" src={DarkForestTwo} alt="Dark-Forest2.png" />
                </div>
                <div className="title-login-div">
                    <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative" rel="stylesheet"></link>
                    <h1 className="welcome-title">Please Login Adventurer</h1>
                    <a className="login-link" href={process.env.REACT_APP_LOGIN}>Login/Register</a>
                </div>
            </div>
        )
    }
}

export default Login;