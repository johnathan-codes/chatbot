import React from 'react';

const About = () => (
  <div>
    <h1>O botovi</h1>
    <div>
      <h3>Použité technológie</h3>
      <ul>
        <li>
          BackEnd -
          <a href='https://nodejs.org/en/' target='_blank' rel='noopener noreferrer'>
            Nodejs
          </a>
          (
          <a href='https://expressjs.com/' target='_blank' rel='noopener noreferrer'>
            s Express frameworkom
          </a>
          )
        </li>
        <li>
          FrontEnd -
          <a href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>
            React
          </a>
        </li>
        <li>
          Databáza -
          <a href='https://www.mongodb.com/' target='_blank' rel='noopener noreferrer'>
            MongoDB
          </a>
        </li>
        <li>
          Konverzácia -
          <a href='https://dialogflow.cloud.google.com' target='_blank' rel='noopener noreferrer'>
            DialogFlow
          </a>
        </li>
        <li></li>
      </ul>
    </div>
  </div>
);

export default About;
