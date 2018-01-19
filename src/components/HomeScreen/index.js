import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import SideBar from "../SideBar/SideBar.js";
import Lobby from '../Lobby/index.js';
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Lobby: { screen: Lobby }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
