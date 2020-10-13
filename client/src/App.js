import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavBar';
import BookList from './components/BookList';

import {Provider} from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <AppNavbar/>
      <BookList/>
      </div>
    </Provider>
  );
}

export default App;
