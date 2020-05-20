//App.js
import React from 'react';
import GlobalProvider from '../context/global_context';
import Boot from './boot.js';

function App(){
  return (
    <GlobalProvider>
      <Boot/>
    </GlobalProvider>
  );
}//App

export default App;