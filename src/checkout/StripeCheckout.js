import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { connect } from 'react-redux';
import { updateCart } from '../redux/reducer';


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: 20500
         }
    }

    onToken = (token) => {
        token.card = void 0
        axios.post('/api/payment', {token, amount: this.state.amount}).then(res => {
            console.log(res)
            axios.delete('/api/emptyCart')
                .then(response => {
                    // console.log('deleted', response)
                    this.props.updateCart(response.data)
                })
        })
    }

    render() { 
        console.log(process.env.REACT_APP_STRIPE_KEY)
        return ( 
           <StripeCheckout
                name="Stripe Demo inc."
                description="Dolla Dolla Bills"
                image="http://via.placeholder.com/100x100"
                token= {this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={this.state.amount}
            />
         );
    }
}

function mapStateToProps(state) {
    const { cart } = state
    return {
        cart
    }
}
 
export default connect(mapStateToProps, { updateCart })(Checkout);
