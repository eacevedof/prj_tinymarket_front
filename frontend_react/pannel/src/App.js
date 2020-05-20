//App.js
import React from 'react';
import GlobalProvider from './components/context/global_context';
import Boot from './components/boot/boot';
import "./index.css"

function App(){
  return (
    <GlobalProvider>
      <Boot/>
    </GlobalProvider>
  );
}//App

export default App;