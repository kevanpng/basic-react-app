import React from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import {
  tokenUrl, instanceLocator, userId, roomId,
} from './config';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }


  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl,
      }),
    });
    chatManager.connect()
      .then((currentUser) => {
        this.currentUser = currentUser
        this.currentUser.subscribeToRoom({
          roomId,
          hooks: {
            onNewMessage: (message) => {
              this.setState({
                messages: [...this.state.messages, message],
              });
            },
          },
        });
      });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId,
    })
  }
  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}
export default App;
