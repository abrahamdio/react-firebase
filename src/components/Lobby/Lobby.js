import React, { Component } from "react";
import { Alert, View, ScrollView } from "react-native";
import { ListItem, Container, Header, Left, Body, Title, Content, Right, Icon, Button, Text, Spinner, List } from "native-base";
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
            return <Spinner color="grey" />;
        }

        return (
            <View style={{ padding: 15, flex: 1, backgroundColor: 'white' }}>
                <View sytle={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, padding: 5, textAlign: 'center' }}>Room ID</Text>
                    <Text selectable style={{ fontSize: 35, padding: 10, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>{this.props.data.roomId}</Text>
                    <Text style={{ fontSize: 15, padding: 10, marginBottom: 5 }}>Players: </Text>
                </View>
                <View sytle={{ flex: 1 }}>
                    <ScrollView>
                        <List
                            style={{ backgroundColor: 'white' }}
                            dataArray={this.props.data.roomPlayers.players}
                            renderRow={(item) =>
                                <ListItem style={{ backgroundColor: 'white', height: 40, padding: 8 }}>
                                    <Icon name="ios-man-outline" />
                                    <Text style={{ paddingLeft: 12, fontSize: 12 }}>{item.name}</Text>
                                </ListItem>
                            }
                        />
                    </ScrollView>
                </View>
            </View>
            
        );
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.getContent()}
            </View>
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