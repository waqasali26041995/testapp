import ChangeHeaderlogo from './UpdateHeader/reducers/headerlogo';
import ChangeHeaderTitle from './UpdateHeader/reducers/UpdateHeaderTitle';
import DataLoaded from './loader/reducer/index';
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    ChangeHeaderlogo,
    ChangeHeaderTitle,
    DataLoaded
});

export default rootReducer;