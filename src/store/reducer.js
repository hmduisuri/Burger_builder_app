import * as actionType from './actions';

const initialState = {
    ingredients: 
    {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 0,
}

const INGREDIENTS_PRICES = {
    salad: 10,
    cheese: 30,
    meat: 50,
    bacon: 70
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //assign to the '[action.ingredientName]:' in javascript object
                    [action.ingredientName]: state.ingredients[action.ingredientName] +1 
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
        
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    //assign to the '[action.ingredientName]:' in javascript object
                    [action.ingredientName]: state.ingredients[action.ingredientName] -1 
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            }
        default:
            return state;
            
    }
}

export default reducer;
