import React from 'react';
import './App.css';
import Chat from "./components/chat/Chat";
import Store from './Store'

function App() {
    return (
        <div className="App" style={{display: 'flex', justifyContent: 'center'}}>
            <Store>
                <Chat/>
            </Store>
        </div>
    );
}

export default App;
