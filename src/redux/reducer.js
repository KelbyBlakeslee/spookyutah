let initialState = {
    cart: []
}

const ADD_TO_CART = 'ADD_TO_CART'
    , UPDATE_CART = 'UPDATE_CART'

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return Object.assign({}, state, { cart: [...state.cart, action.payload] })
        case UPDATE_CART:
            return Object.assign({}, state, { cart: action.payload })
    }
    return state;
}

export function addToCart(product) {

    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export function updateCart(state) {

    return {
        type: UPDATE_CART,
        payload: state
    }
}

