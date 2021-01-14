import React, { Component } from "react";
import Aux_ from "../../hoc/Aux_/Aux_";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actionType from "../../store/actions";

// const INGREDIENTS_PRICES = {
//     salad: 10,
//     cheese: 30,
//     meat: 50,
//     bacon: 70
// }

class BurgerBuilder extends Component{
    state = {
        // ingredients: null,
        // totalPrice: 0,
        // purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data})
        // });
    };

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0 );
        return sum > 0
        // this.setState({purchasable: sum > 0});
    };

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];

    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        // // alert("You are continue!");
        // this.props.history.push('/checkout')

        // const queryParams = [];
        // for(let i in this.state.ingredients) {
        //     //1st encode Key = second encode value
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // console.log(this.state.totalPrice);
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        }

render(){
    const disabledInfo = {
        // ...this.state.ingredients
        ...this.props.ings
        
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    
    let burger = <Spinner/>;

    if(this.props.ings) {
        burger = (
        <Aux_>
            <Burger ingredients = {this.props.ings}/>
                <BuildControls 
                ingredientAdded = {this.props.onIngredientsAdded}
                ingredientRemove = {this.props.onIngredientsRemoved}
                disabled = {disabledInfo}
                purchasable = {this.updatePurchaseState(this.props.ings)}
                price = {this.props.price}
                ordered = {this.purchaseHandler}/>
        </Aux_>
    );
        orderSummary = 
            <OrderSummery 
                ingredients = {this.props.ings} 
                purchaseContinued = {this.purchaseContinueHandler} 
                purchaseCanceled = {this.purchaseCancelHandler}
                price = {this.props.price} />
    }

   if(this.state.loading) {
        orderSummary = <Spinner/>;
    }

    return(
        <Aux_>
            <Modal show = {this.state.purchasing} modelClosed = {this.purchaseCancelHandler}>
              {orderSummary}
            </Modal>
              {burger}   
        </Aux_>
    );
}

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIENT, ingredientName:ingName }),
        onIngredientsRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName:ingName })
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios))