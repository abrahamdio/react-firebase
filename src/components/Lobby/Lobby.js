import React, { Component } from "react";
import { AppRegistry, Alert } from "react-native";
import { Container, Header, Left, Body, Item, Input, Title, Card, CardItem, Content, Right, Icon, Button, Text, Spinner, List } from "native-base";
import { StackNavigator } from "react-navigation";
import fire from '../../fire';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlayersThunk, getPlayersAdded, resetRoomInfo } from '../../actions/index';

class WaitingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        this.props.getPlayersThunk();
    }
    componentDidMount() {
        if (this.props.roomPlayers && this.props.roomPlayers.players) {
            Alert.alert("No Users Found", "Oops, Looks like you are not signed in");
            return;
        }
        const roomId = this.props.data.roomId;
        fire.database().ref('lobby/' + roomId).on('value', (snapshot) => {
            const updatedPlayers = snapshot.val();
            this.props.getPlayersAdded(updatedPlayers);
            // console.log("New high score: " + highscore);
        });
    }
    // componentWillUpdate() {
    //     const roomId = this.props.data.roomId;
    //     fire.database().ref('lobby/' + roomId).on('value', (snapshot) => {
    //         const updatedPlayers = snapshot.val();
    //         this.props.getPlayersAdded(updatedPlayers);
    //         // console.log("New high score: " + highscore);
    //     });
    // }
    getContent() {
        if (this.props.data.roomStatus !== 'READY') {
            return <Spinner color="blue" />;
        }
        return (
            <Content>
                <Text selectable style={{fontSize: 25, marginBottom: 25}}>{this.props.data.roomId}</Text>
                <List
                    dataArray={this.props.data.roomPlayers.players}
                    renderRow={(item) =>
                        <Text style={{fontSize: 15}}>{item.name}</Text>}
                />    
            </Content>
            
        );
    }
    render() {
        return (
            <Container>
                <Content padder>
                    {this.getContent()}
                </Content>
            </Container>
        );
    }
}

WaitingRoom.navigationOptions = ({ navigation }) => ({
    header: (
        <Header>
            <Left>
                <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" />
                </Button>
            </Left>
            <Body>
                <Title>Lobby</Title>
            </Body>
            <Right />
        </Header>
    )
});

function mapStateToProps(state) {
    return {
        data: state.data
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getPlayersThunk: getPlayersThunk,
        getPlayersAdded: getPlayersAdded,
        resetRoomInfo: resetRoomInfo
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(WaitingRoom);