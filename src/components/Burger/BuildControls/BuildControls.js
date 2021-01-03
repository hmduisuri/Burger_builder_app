import React from "react"
import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"

const control = [
    {label: "Salad" , type: "salad"},
    {label: "Cheese" , type: "cheese"},
    {label: "Meat" , type: "meat"},
    {label: "Bacon" , type: "bacon"}
]

const buildControls = (props) => (
    <div className ={classes.BuildControls}>
        <p>Current Price Rs: <strong>{props.price.toFixed(2)}/=</strong></p>
        {control.map(ctrl => (
            <BuildControl 
            key = {ctrl.label} 
            label = {ctrl.label}
            added = {() => props.ingredientAdded(ctrl.type)}
            remove = {() => props.ingredientRemove(ctrl.type)}
            disabled = {props.disabled[ctrl.type]} />
        )) }
        <button className = {classes.OrderButton} disabled = {!props.purchasable} onClick = {props.ordered}>ORDER NOW</button>
    </div>
)
export default buildControls;