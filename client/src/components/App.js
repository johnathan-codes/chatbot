import React from 'react';
import {
  BrowserRouter
  //Route
} from 'react-router-dom';
//import Landing from './pages/Landing';
//import About from './pages/About';
//import Question from './questions/Questions';
import Header from './Header';
import Chatbot from './chatbot/Chatbot';

const App = () => (
  <div className='container'>
    <BrowserRouter>
      <div>
        <Header />
        <Chatbot />
      </div>
    </BrowserRouter>
  </div>
);

export default App;

/*
//TODO: needed?
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/questions" component={Question}></Route>
        <Route exact path='/' component={Landing}></Route>

*/
