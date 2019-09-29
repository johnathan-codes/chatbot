'user strict';
const chatbot = require('../chatbot/chatbot');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({
      'Up and': 'running'
    });
  });

  app.post('/api/dialogflow_text_query', async (req, res) => {
    let responses = await chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameters
    );

    res.send(responses[0].queryResult);
  });

  app.post('/api/dialogflow_event_query', async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters
    );

    res.send(responses[0].queryResult);
  });
};
