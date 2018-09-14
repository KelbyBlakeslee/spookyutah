import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateCart } from '../redux/reducer';
import './cart.css';
import StripeCheckout from '../checkout/StripeCheckout';
import DarkForest from '../images/dark_forest2.png';


class Cart extends Component {
    constructor() {
        super();

        this.state = {
            products: []
        }
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        axios.get('/api/getProducts')
            .then(response => {
                console.log(response)
                this.setState({ products: response.data })
            })
    }

    addToCart(product_id) {
        axios.post(`/api/addToCart/${product_id}`)
            .then(response => {
                this.props.updateCart(response.data)
                // console.log(response)
            })
    }


    render() {
        let products = this.state.products.map(prods => {
            return (
                <div className="single-product" key={prods.product_id}>
                    <h4>{prods.product}</h4>
                    <img className="product-images" src={prods.image} alt="product" />
                    <p>{prods.price + '$'}</p>
                    <button className="product-button" onClick={() => this.addToCart(prods.product_id)}>Add to Cart</button>
                </div>
            )
        })
        return (
            <div>
                <img className="background" src={DarkForest} alt="Dark-Forest.png" />

                        <div className="store-titles">
                            <h1 className="all-text">Store</h1>
                            <h1 className="all-text">Your Cart</h1>
                        </div>
                        <hr></hr>
                        <div className="products-and-cart">
                            <div className="products">
                                {products}
                            </div>
                            <div className="cart">
                                {this.props.cart[0] ?
                                    <div>
                                        {this.props.cart.map(item => {
                                            return (
                                                <div key={item.product_id}>
                                                    {item.product} {item.price + '$'}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    :
                                    'Nothing in your cart'}
                            </div>
                        </div>
                }
                <StripeCheckout />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { cart } = state
    return {
        cart
    }
}

export default connect(mapStateToProps, { updateCart })(Cart);