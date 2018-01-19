import React, { Component } from "react";
import Menu from "./Cart";
import { StackNavigator } from "react-navigation";
const CartScreenRouter = StackNavigator(
  {
    Cart: { screen: Cart },
  }
);
export default CartScreenRouter;