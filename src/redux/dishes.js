import * as ActionTypes from './ActionTypes';

export const Dishes=(state={
    isLoading: true,
    errmessage: null,
    dishes: []
}, action)=>{
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errmessage:null, dishes: action.payload};
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errmessage:null, dishes: []};
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errmessage:action.payload, dishes: []};

        default: 
            return state;
    }
}