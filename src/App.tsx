import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ArtController } from './components/artList/ArtController';
import { ArtworkListProvider } from './context/ArtworkContext';

function App() {
  return (
    <div className="App">
      <ArtworkListProvider>
        <ArtController />
      </ArtworkListProvider> 
    </div>
  );
}

export default App;
