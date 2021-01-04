import React from "react";
import classes from "./DrawerTroggle.css"

const drawerTroggle = (props) => (
    <div className = {classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
    </div>

);

export default drawerTroggle;