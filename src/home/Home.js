import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';
import FadeIn from 'react-fade-in';
import { Parallax } from 'react-parallax';
import Forest from '../images/Dark-Forest.png';


class Home extends Component {
    constructor() {
        super();

        this.state = {
            locations: []
        }

        this.locationDisplay = this.locationDisplay.bind(this);
    }

    componentDidMount() {
        this.locationDisplay();
    }

    locationDisplay() {
        axios.get('/api/getLocations')
            .then(response => {
                console.log(response);
                this.setState({ locations: response.data })
            })
    }




    render() {
        let locations = this.state.locations.map(location => {
            return (
                <FadeIn>
                    <div className="locations-background" key={location.loc_id}>
                        <div className="div-around-locations">
                            <h2 className="name-address">{location.name} || {location.address}</h2>
                            <div>
                                <h3 className="location-description">{location.description}</h3>
                                <Link to={`/location/${location.loc_id}`} className="location-link">Click here for complete Location</Link>
                            </div>
                        </div>

                    </div>
                </FadeIn>

            )
        })
        return (
            <div>
                <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative" rel="stylesheet"></link>
                <Parallax
                    blur={1}
                    bgImage={Forest}
                    bgImageAlt="Dark-Forest.png"
                    strength={200}
                    bgHeight={'100%'}
                    bgWidth={'100vw'}
                >
                    {locations}
                </Parallax>
            </div>
        )
    }
}

export default Home;