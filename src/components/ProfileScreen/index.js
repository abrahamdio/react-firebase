import React, { Component } from "react";
import Profile from "./Profile";
import EditScreenOne from "./EditScreenOne.js";
// import EditScreenTwo from "./EditScreenTwo.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  Profile: { screen: Profile }
}));