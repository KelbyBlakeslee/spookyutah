import React, { Component } from 'react';
import axios from 'axios';
import './location.css';
import FadeIn from 'react-fade-in/lib/FadeIn';

class Location extends Component {
    constructor() {
        super();


        this.state = {
            location: [],
            comment_input: '',
            comments: []
        }

        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.addComment = this.addComment.bind(this);
    }


    componentDidMount() {
        console.log('something ', this.props.match.params.locId)
        axios.get(`/api/getLocationsById/${this.props.match.params.locId}`)
            .then(response => {
                this.setState({ location: response.data })
            })
    }

    handleCommentInput(e) {
        e.preventDefault();
        this.setState({ comment_input: e.target.value })
    }

    addComment() {
        console.log('hit addComment')
        axios.post(`/api/addingComments/${this.props.match.params.locId}`, { comment: this.state.comment_input })
            .then(response => {
                this.setState({ location: response.data })
            })
    }



    render() {
        let comment = this.state.location.map(comments => {
            return (
                <div key={comments.comment_id}>
                    <p className="comments">{comments.comment}</p>
                </div>
            )
        })
        let location = this.state.location[0] ?
            <div className="location-style">
                <img className="shadow" src={this.state.location[0].image} alt="location" />
                <div className="locations-details">
                    <h2 className="all-text">{this.state.location[0].name}</h2>  <h2 className="all-text">{this.state.location[0].address}</h2>
                    <p className="all-text">{this.state.location[0].description}</p>
                </div>
            </div>
            :
            'loading location'
        return (
            <div className="whole-location-div">
                <link href="https://fonts.googleapis.com/css?family=Cinzel+Decorative" rel="stylesheet"></link>
                {this.state.location[0] &&
                    <FadeIn>
                        {location}
                        <div className="input-div">
                            <input className="comment-input" value={this.state.comment_input} placeholder="Leave a comment here" onChange={(e) => this.handleCommentInput(e)} />
                        </div>
                        <div className="button-div">
                            <button className="product-button" onClick={() => this.addComment(this.state.comment_input)}>Add Comment</button>
                        </div>
                        <div className="comments-div">
                            {comment}
                        </div>
                    </FadeIn>
                }
            </div>
        )
    }
}

export default Location