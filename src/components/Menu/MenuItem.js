// React
import React, { Component } from "react";
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Redux Thunk
import { addItemQuantity, removeItemQuantity } from '../../actions/index';
// React Native Components
import { View, TextInput, StyleSheet } from "react-native";
// Native Base UI Components
import { ListItem, Icon, Right, Button, Body, Text, Thumbnail } from "native-base";

class MenuItem extends Component {
  state = {
    orderQuantity: 0
  }

  componentWillMount() {
    console.log('will mount', this.props)
    let itemId = this.props.itemInfo.id;
    this.state.orderQuantity = this.props.data.orderItems[itemId] || 0;
  }

  addOrderQuantity(id) {
    if (this.state.orderQuantity >= 99) {
      return;
    }
    let newOrderQuantity = this.state.orderQuantity + 1;
    this.setState({orderQuantity: newOrderQuantity})
    this.props.addItemQuantity({itemId: id, quantity: newOrderQuantity});
  }

  removeOrderQuantity(id) {
    if (this.state.orderQuantity === 0) {
      return;
    }
    let newOrderQuantity = this.state.orderQuantity - 1;
    this.setState({orderQuantity: newOrderQuantity});
    this.props.removeItemQuantity({itemId: id, quantity: newOrderQuantity});
  }

  render() {
    return (
      <ListItem>
        <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
        <Body>
          <Text>{this.props.itemInfo.name}</Text>
          <Text note>Its really delicious</Text>
        </Body>
        <View style={{flexDirection: 'row'}}>
          <Button transparent danger
            onPress={() => this.removeOrderQuantity(this.props.itemInfo.id)}>
            <Icon active style={{fontSize: 30}} name="remove-circle" />
          </Button>
          <TextInput 
            value={this.state.orderQuantity.toString()}
            style={styles.menuItemInput} defaultValue="0" maxLength={2} keyboardType="numeric" />
          <Button transparent primary
            onPress={() => this.addOrderQuantity(this.props.itemInfo.id)}>
            <Icon active style={{fontSize: 30}} name="add-circle" />
          </Button>
        </View>
      </ListItem>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data,
    menus: state.menus
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    addItemQuantity: addItemQuantity,
    removeItemQuantity: removeItemQuantity
  }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(MenuItem);


const styles = StyleSheet.create({
  menuItem: {
    flex: 2,
    flexDirection: 'column',
    height: 20,
    borderWidth: 0.5,
    backgroundColor: 'red'
  },
  menuItemInput: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center', 
    height: 30, 
    width: 30, 
    marginTop: 6
  }
});
