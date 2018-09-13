module.exports = {
    getLocations: function (req, res) {
        const db = req.app.get('db')
        db.get_all_locations([])
            .then(response => {
                res.status(200).send(response)
            })
    },
    getLocationsById: function (req, res) {
        const db = req.app.get('db')
        console.log('location hit')
        let { locId } = req.params
        db.get_location_id([locId])
            .then(response => {
                console.log('response from DB ', response)
                res.status(200).send(response)
            })
    },
    addingComments: function (req, res) {
        const db = req.app.get('db')
        let { locId } = req.params
        let { comment } = req.body
        let user_id = req.session.passport.user
        db.adding_comment([user_id, comment, locId])
            .then(() => {
                db.get_location_id([locId])
                    .then(response => {
                        res.status(200).send(response)
                    })
            })

    },
    getUser: function (req, res) {
        const db = req.app.get('db')
        let user_id = req.session.passport.user
        db.get_user([user_id])
            .then(response => {
                res.status(200).send(response)
            })
    },
    updateUser: function (req, res) {
        const db = req.app.get('db')
        let { first_name_input, last_name_input } = req.body
        let user_id = req.session.passport.user
        db.update_user([first_name_input, last_name_input, user_id])
            .then(response => {
                res.status(200).send(response)
            })
    },
    logoutUser: function (req) {
        req.session.destroy();
    },
    getProducts: function (req, res) {
        const db = req.app.get('db')
        db.get_all_products([])
            .then(response => {
                res.status(200).send(response)
            })
    },
    getCart: function (req, res) {
        const db = req.app.get('db')
        let user_id = req.session.passport.user
        db.get_cart([user_id])
            .then(response => {
                res.status(200).send(response)
            })
    },
    addToCart: function (req, res) {
        const db = req.app.get('db')
        let { productId } = req.params
        let user_id = req.session.passport.user
        db.find_product_in_cart([user_id, productId])
            .then(product => {
                console.log(product)
                if (product.length) {
                    //increase quantity
                    db.increase_product([product[0].quantity + 1, productId, user_id])
                        .then(newCopy => {
                            res.status(200).send(newCopy)
                        })
                } else {
                    //add new product to cart
                    db.add_to_cart([user_id, +productId, 1])
                        .then(newCopy => {
                            res.status(200).send(newCopy)
                        })
                }
            })
    },
    emptyCart: function (req, res) {
        const db = req.app.get('db')
        let user_id = req.session.passport.user
        db.empty_cart([user_id])
            .then(response => {
                res.status(200).send(response)
            })
    }
}