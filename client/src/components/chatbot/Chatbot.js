import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Card from './Card';

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
        //console.log(JSON.stringify(msg));
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

  renderCards(cards) {
    console.log(cards);
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (
      message.msg &&
      //message.msg.payload &&
      //message.msg.payload.fields &&
      message.msg.payload.fields.cards
    ) {
      return (
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: 'hidden' }}>
              <div className="col s2">
                <a
                  className="btn-floating btn-large waves-effect waves-light red"
                  href="#!"
                >
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                <div
                  style={{
                    height: 300,
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      340
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderMessages(messages) {
    if (!_.isNil(messages) && _.size(messages)) {
      return messages.map((message, i) => {
        return this.renderOneMessage(message, i);
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
      <div
        style={{
          height: '85%',
          width: '66.5%',
          position: 'absolute',
          bottom: 10,
          border: '1px solid red'
        }}
      >
        <div
          id="chatbot"
          style={{ height: '100%', width: '100%', overflow: 'auto' }}
        >
          {this.renderMessages(this.state.messages)}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={element => {
              this.messagesEnd = element;
            }}
          ></div>
          <input
            type="text"
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
