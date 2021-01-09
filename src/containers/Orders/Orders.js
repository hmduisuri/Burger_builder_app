import React, { Component } from "react"; 
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Order from "../../components/Order/Order";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
        .then(res => {
            //res.Data is object and we have to convert it into array for that below for loop
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({loading: false, orders:  fetchedOrders});
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <div>
               {this.state.orders.map(order => (
                   <Order key = {order.id}
                   ingredients = {order.ingredients}
                   price = {order.price}/>
               ))}
            </div>
            );
        }
    }

export default withErrorHandler(Orders, axios);