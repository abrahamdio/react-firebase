import React, { Component } from "react";
import Menu from "./Menu";
import { StackNavigator } from "react-navigation";
const MenuScreenRouter = StackNavigator(
  {
    Menu: { screen: Menu },
  }
);
export default MenuScreenRouter;