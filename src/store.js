import { createStore } from 'redux';
import spooky_reducer from './redux/reducer';

export default createStore(spooky_reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );