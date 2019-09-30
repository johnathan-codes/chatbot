import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  textInput;

  constructor(props) {
    super(props);

    this.onPressHandle = this.onPressHandle.bind(this);
    this.state = {
      messages: [],
      currentInput: ''
    };

    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), { path: '/' });
    }
    console.log(cookies.get('userID'));
  }

  componentDidMount() {
    this.dialogflow_event_query('Welcome');
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    this.textInput.focus();
  }

  async dialogflow_text_query(text) {
    let says = {
      speaks: 'ja',
      msg: {
        text: {
          text: text
        }
      }
    };
    this.setState({ messages: [...this.state.messages, says] }); //push new msg into the array
    const res = await axios.post('/api/dialogflow_text_query', {
      text,
      userID: cookies.get('userID')
    });
    if (res.data.fulfillmentMessages) {
      for (let msg of res.data.fulfillmentMessages) {
        says = {
          speaks: 'bot',
          msg: msg
        };
        this.setState({ messages: [...this.state.messages, says] });
      }
    }
  }

  async dialogflow_event_query(event) {
    const res = await axios.post('/api/dialogflow_event_query', {
      event,
      userID: cookies.get('userID')
    });
    if (res.data.fulfillmentMessages) {
      for (let msg of res.data.fulfillmentMessages) {
        let says = {
          speaks: 'bot',
          msg: msg
        };
        this.setState({ messages: [...this.state.messages, says] });
      }
    }
  }

  renderMessages(messages) {
    if (!_.isNil(messages) && _.size(messages)) {
      return messages.map((message, i) => {
        return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
      });
    } else {
      return null;
    }
  }

  onPressHandle(e) {
    if (e.key === 'Enter') {
      if (e.target.value) {
        this.dialogflow_text_query(e.target.value);
        e.target.value = '';
      }
    }
  }

  render() {
    return (
      <div style={{ height: 500, width: 400, float: 'right' }}>
        <div id='chatbot' style={{ height: '100%', width: '100%', overflow: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>Chatbot</h2>
          {this.renderMessages(this.state.messages)}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={element => {
              this.messagesEnd = element;
            }}
          ></div>
          <input
            type='text'
            onKeyPress={this.onPressHandle}
            ref={input => {
              this.textInput = input;
            }}
          ></input>
        </div>
      </div>
    );
  }
}
export default Chatbot;
