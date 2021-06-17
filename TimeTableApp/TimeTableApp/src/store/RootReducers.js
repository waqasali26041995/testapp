import ChangeHeaderlogo from './UpdateHeader/reducers/headerlogo';
import ChangeHeaderTitle from './UpdateHeader/reducers/UpdateHeaderTitle';
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    ChangeHeaderlogo,
    ChangeHeaderTitle
});

export default rootReducer;