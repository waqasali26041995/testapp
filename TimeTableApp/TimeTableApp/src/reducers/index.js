import ChangeHeaderlogo from './headerlogo';
import ChangeHeaderTitle from './UpdateHeaderTitle';
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    ChangeHeaderlogo,
    ChangeHeaderTitle
});

export default rootReducer;