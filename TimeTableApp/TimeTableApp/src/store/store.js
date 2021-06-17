import {createStore} from 'redux';
import rootReducer from './RootReducers';

const store = createStore(rootReducer);

export default store; 