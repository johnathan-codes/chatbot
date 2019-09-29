'use strict';
const dialogFlow = require('dialogFlow');
const config = require('../config/keys');
const structjson = require('./structjson');

const projectID = config.googleProjectID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

const sessionClient = new dialogFlow.SessionsClient({ projectID, credentials });

const sessionPath = sessionClient.sessionPath(
  projectID,
  config.dialogFlowSessionID
);
module.exports = {
  textQuery: async function(text, params = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogFlowSessionLanguageCode
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
          languageCode: config.dialogFlowSessionLanguageCode
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
