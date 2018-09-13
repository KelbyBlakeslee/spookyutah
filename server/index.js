require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , controller = require('./controller')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session')
    , stripeCtrl = require('./stripeCtrl')


const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
} = process.env

const app = express();
app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );



//massive
massive(CONNECTION_STRING).then((db) => {
    console.log('db connected')
    app.set('db', db)
});

//Session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//Comes after Session
app.use(passport.initialize());
//Comes after Initialize
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {

    let db = app.get('db');
    let { givenName, familyName } = profile.name;
    let { id } = profile;

    db.find_user([id]).then((foundUser) => {
        if (foundUser[0]) {
            console.log('found user', foundUser[0])
            try {
                done(null, foundUser[0].user_id)
            } catch (err) {
                console.error(err)
            }
        } else {
            db.create_user([givenName, familyName, id]).then((user) => {
                console.log('found user', user[0])
                try {
                    done(null, user[0].user_id)
                } catch (err) {
                    console.error(err)
                }
            })
        }
    })
}
))


passport.serializeUser((id, done) => {
    console.log('serialize', id)
    done(null, id)
})

passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then((user) => {
        done(null, user[0])
    })
})


app.get('/login', (req, res, next) => {
    console.log('hit endpoint')
    next();
}, passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: 'https://google.com/'
}))
app.get('/auth/me', function (req, res) {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('ur mom gey')
    }
})




//endpoints
app.get('/api/getLocations', controller.getLocations);
app.get('/api/getLocationsById/:locId', controller.getLocationsById);
app.post('/api/addingComments/:locId', controller.addingComments);
app.get('/api/getUser', controller.getUser);
app.patch('/api/updateUser', controller.updateUser);
app.delete('/api/logoutUser', controller.logoutUser);
app.get('/api/getProducts', controller.getProducts);
app.post('/api/payment', stripeCtrl.handlePayment);
app.get('/api/getCart', controller.getCart);
app.post('/api/addToCart/:productId', controller.addToCart);
app.delete('/api/emptyCart', controller.emptyCart);


//SERVER
app.listen(SERVER_PORT, () => {
    console.log(`We are many, You are one on ${SERVER_PORT}`)
})