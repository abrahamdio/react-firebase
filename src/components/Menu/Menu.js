// React
import React from "react";
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Redux Thunk
import { getMenus, getMenuThunk } from '../../actions/index';
// React Native Components
import { View } from "react-native";
// Native Base UI Components
import { Container, Header, List, Title, Left, Icon, Right, Button, Body, Content, Spinner } from "native-base";
// Custom Component
import MenuItem from './MenuItem'

class Menu extends React.Component {
  componentWillMount() {
    this.props.getMenuThunk()
  }

  getContent() {
    if (this.props.menus.length === 0) {
      return <Spinner color='blue' />
    }
    return (
      <List 
        dataArray={this.props.menus}
        renderRow={(item) => 
          <MenuItem itemInfo={item} />}
      />
    )
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#FFF' }}>
        <Content>
          { this.getContent() }    
        </Content>
      </Container>
    );
  }
}

Menu.navigationOptions = ({ navigation }) => ({
  header: (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Menu</Title>
      </Body>
      <Right />
    </Header>
  )
});


function mapStateToProps(state){
  return{
    menus : state.menus,
    data: state.data
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    getMenus: getMenus,
    getMenuThunk: getMenuThunk
  }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Menu);
