import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavBar'
import BookList from './components/BookList'

function App() {
  return (
    <div className="App">
     <AppNavbar/>
     <BookList/>
    </div>
  );
}

export default App;
