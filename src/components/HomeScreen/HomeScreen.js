// React
import React from "react";
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// React Native Components
import { Alert, StatusBar, Text, View, StyleSheet } from "react-native";
// Native Base UI Components
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Form, Input, Item, Label } from "native-base";
// Expo Components
import { BarCodeScanner, Permissions } from 'expo';
// Action (Redux)
import { joinRoom, setPlayerThunk, createRoomThunk } from '../../actions/index';
// Navigation
import Lobby from '../Lobby/index.js';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      userName: ''
    };
  }
  
  componentWillMount() {

  }

  joinRoom() {
    const roomId = this.state.roomId;
    const userName = this.state.userName;

    if (!roomId || !userName){
      Alert.alert("Please fill in the form properly!");
      return;
    }

    const roomInfo = {roomId, userName };
    this.props.joinRoom(roomInfo);
    this.props.setPlayerThunk(userName);
    this.props.navigation.navigate('Lobby');
  }

  createRoom() {
    const roomId = this.state.roomId;
    const userName = this.state.userName;

    if (!userName) {
      Alert.alert("Please fill in the form properly!");
      return;
    }

    const roomInfo = { roomId, userName };
    this.props.createRoomThunk(userName);
    this.props.navigation.navigate('Lobby');
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Welcome!</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form
            style={{ marginBottom: 20 }}>
            <Item stackedLabel
              style={{ marginBottom: 20 }}>
              <Label>Room ID</Label>
              <Input value={this.state.roomId} onChangeText={(text) => this.setState({roomId: text})}/>
            </Item>
            <Item stackedLabel
              style={{ marginBottom: 20 }}>
              <Label>Your Name</Label>
              <Input value={this.state.userName} onChangeText={(text) => this.setState({userName: text })}/>
            </Item>
          </Form>
          <Button block info style={{ marginBottom: 20 }}
            onPress={() => this.joinRoom()}><Text> Join </Text></Button>
          <Button block success
            onPress={() => this.createRoom()}><Text> Create </Text></Button>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {};
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    joinRoom: joinRoom,
    setPlayerThunk: setPlayerThunk,
    createRoomThunk: createRoomThunk
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);
