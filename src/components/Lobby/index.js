import Lobby from './Lobby';
import { StackNavigator } from 'react-navigation';
const WaitingRoomScreenRouter = StackNavigator(
    {
        Lobby: { screen: Lobby },
    }
);
export default WaitingRoomScreenRouter;
