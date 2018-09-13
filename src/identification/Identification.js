import React, { Component } from 'react';
import axios from 'axios';
import DarkForest from '../images/Dark_Forest.png';
import './identification.css';
import FadeIn from 'react-fade-in';

class Identification extends Component {
    constructor() {
        super();

        this.state = {
            first_name_input: '',
            last_name_input: '',
            loggedUser: [],
            user: []
        }


        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.userDisplay = this.userDisplay.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }



    handleFirstName(e) {
        e.preventDefault();
        this.setState({ first_name_input: e.target.value })
    }

    handleLastName(e) {
        e.preventDefault();
        this.setState({ last_name_input: e.target.value })
    }

    componentDidMount() {
        this.userDisplay();
    }

    updateUser() {
        axios.patch('/api/updateUser', this.state)
            .then(response => {
                console.log(response)
                this.setState({ user: response.data })
                this.props.history.push('/')
            })
    }

    userDisplay() {
        axios.get('/api/getUser')
            .then(response => {
                console.log(response)
                this.setState({ loggedUser: response.data })
            })
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
                <img className="background" src={DarkForest} alt="Dark-Forest.png" />
                <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative" rel="stylesheet"></link>
                <FadeIn>
                    <div>
                        <h1 className="logged-user">{loggedUser}</h1>
                    </div>
                    <h3 className="logged-user">First Name:</h3>
                    <input className="input-box" value={this.state.first_name_input} placeholder="Change First Name here" onChange={(e) => this.handleFirstName(e)} />
                    <h3 className="logged-user">Last Name</h3>
                    <input className="input-box" value={this.state.last_name_input} placeholder="Change Last Name here" onChange={(e) => this.handleLastName(e)} />
                    <div className="credentials-div">
                        <button className="credentials-button" onClick={() => this.updateUser()}>Change Credentials</button>
                    </div>
                </FadeIn>
            </div>
        )
    }
}

export default Identification