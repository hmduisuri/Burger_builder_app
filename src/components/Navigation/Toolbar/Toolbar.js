import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo"
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems"
import DrawerTroggle from "../SideDrawer/DrawerTroggle/DrawerTroggle"

const toolbar = (props) => (
    <header className = {classes.Toolbar}>
            <DrawerTroggle clicked = {props.drawerTroggleClicked}/>
            <div className = {classes.Logo}>
            <Logo/>
            </div>
            <nav className = {classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
    </header>
);

export default toolbar