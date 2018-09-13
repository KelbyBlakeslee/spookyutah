import React, { Component } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Nav extends Component {
    constructor() {
        super();

        this.state = {
            loggedUser: [],
            hover: false
        }

        this.userDisplay = this.userDisplay.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        this.userDisplay();
    }

    onMouseEnterHandler() {
        this.setState({hover: true})
    }

    onMouseLeaveHandler() {
        this.setState({hover: false})
    }

    userDisplay() {
        axios.get('/api/getUser')
            .then(response => {
                console.log(response)
                this.setState({ loggedUser: response.data })
            })
    }

    logoutUser() {
        axios.delete('/api/logoutUser')
        console.log('logged out')
        // this.props.history.push('/')
    }

    render() {
        let loggedUser = this.state.loggedUser.map((e, i) => {
            return (
                <div key={e.user_id}>
                    {e.first_name} {e.last_name}
                </div>
            )
        })
        return (
            <div>
                <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative" rel="stylesheet"></link>
                <div className="div-around-links">
                    <h1 className="site-title">SpookyUtah</h1>
                    <p>Welcome, {loggedUser}</p> 
                    <Link to="/home"><button className="nav-buttons">Home</button></Link>
                    <Link to="/store"><button className="nav-buttons">Store</button></Link>
                    <Link to="/identification"><button className="nav-buttons">Identification</button></Link>
                    <Link to=""><button className="nav-buttons" onClick={() => this.logoutUser()}>Logout</button></Link>
                </div>
            </div>
        )
    }
}

export default Nav;