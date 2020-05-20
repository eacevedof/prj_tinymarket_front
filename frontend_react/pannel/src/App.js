//App.js
import React from 'react';
import GlobalProvider from './components/context/global_context';
import Boot from './components/boot/boot';

function App(){
  return (
    <GlobalProvider>
      <Boot/>
    </GlobalProvider>
  );
}//App

export default App;