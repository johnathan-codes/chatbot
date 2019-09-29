module.exports = app => {
  app.get('/', (req, res) => {
    res.send({
      'Up and': 'running'
    });
  });

  app.post('/api/dialogflow_text_query', (req, res) => {
    res.send({
      do: 'text query'
    });
  });

  app.post('/api/dialogflow_event_query', (req, res) => {
    res.send({
      do: 'event query'
    });
  });
};
