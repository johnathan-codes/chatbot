'use strict';
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const structjson = require('./structjson');

const projectID = config.GOOGLE_PROJECT_ID;
const credentials = {
  client_email: config.GOOGLE_CLIENT_EMAIL,
  private_key: config.GOOGLE_PRIVATE_KEY
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

const sessionPath = sessionClient.sessionPath(
  projectID,
  config.DIALOGFLOW_SESSION_LANGUAGE_CODE
);
module.exports = {
  textQuery: async function(text, params = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.DIALOGFLOW_SESSION_LANGUAGE_CODE
        }
      },
      queryParams: {
        payload: {
          data: params
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  eventQuery: async function(event, params = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(params),
          languageCode: config.DIALOGFLOW_SESSION_LANGUAGE_CODE
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  handleAction: function(responses) {
    return responses;
  }
};
