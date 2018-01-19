import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";
import HomeScreen from "../HomeScreen";
import fire from "../../fire";
export default class LucyChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {score: 0};
    // fire.database().ref('users/dio').on('value', (snapshot) => {
    //   const highscore = snapshot.val().highscore;
    //   this.setState({ score: highscore })
    //   console.log("New high score: " + highscore);
    // });
  }
  
  storeHighScore(score) {
    console.log('highscore' + score)
    fire.database().ref('users/dio').set({
      highscore: 999
    });
  }

  componentDidMount() {
    fire.database().ref('users/dio').on('value', (snapshot) => {
      const highscore = snapshot.val().highscore;
      this.setState({ score: highscore })
      console.log("New high score: " + highscore);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
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
            <Title>Lucy Chat</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Lucy Chat</Label>
            <Input />
          </Item>
          <Button rounded danger
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => this.storeHighScore(2)}>
            <Text>Goto Lucy Profile</Text>
          </Button>
          <Text>{this.state.score}</Text>
        </Content>
      </Container>
    );
  }
}
