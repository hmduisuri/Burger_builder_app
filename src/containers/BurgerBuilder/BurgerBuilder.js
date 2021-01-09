import React, { Component } from "react";
import Aux_ from "../../hoc/Aux_/Aux_";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENTS_PRICES = {
    salad: 10,
    cheese: 30,
    meat: 50,
    bacon: 70
}

class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        });
    };

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0 );
        this.setState({purchasable: sum > 0});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        // // alert("You are continue!");
        // this.props.history.push('/checkout')
        const queryParams = [];
        for(let i in this.state.ingredients) {
            //1st encode Key = second encode value
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        console.log(this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

render(){
    const disabledInfo = {
        ...this.state.ingredients
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    
    let burger = <Spinner/>;

    if(this.state.ingredients) {
        burger = (
        <Aux_>
            <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemove = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchasable = {this.state.purchasable}
                price = {this.state.totalPrice}
                ordered = {this.purchaseHandler}/>
        </Aux_>
    );
        orderSummary = 
            <OrderSummery 
                ingredients = {this.state.ingredients} 
                purchaseContinued = {this.purchaseContinueHandler} 
                purchaseCanceled = {this.purchaseCancelHandler}
                price = {this.state.totalPrice} />
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

export default  withErrorHandler(BurgerBuilder, axios)