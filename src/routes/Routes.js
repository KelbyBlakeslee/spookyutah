import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Identification from '../identification/Identification';
import Location from '../location/Location';
import Cart from '../cart/Cart';



export default (
    <Switch>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/' component={Login}/>
        <Route exact path='/identification' component={Identification}/>
        <Route path='/location/:locId' component={Location}/>
        <Route exact path='/store' component={Cart}/>
    </Switch>
)