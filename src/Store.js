import React, {useReducer} from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initialState = {
    general: [
        // {from: 'scotty', msg: 'hello'},
        // {from: 'todd', msg: 'what going on?'},
        // {from: 'philip', msg: 'things are great!'}
    ],
    opportunities: [
        // {from: 'scotty', msg: 'Whats going on with that opp?'},
        // {from: 'todd', msg: 'Add notes to the system.'},
        // {from: 'philip', msg: 'Im happy with the direction its going so we should stay the course.'}
    ]
}

function reducer(state, action) {
    const {from, msg, topic, time} = action.payload;
    let user = 'SYS';

    if(from.includes(".")){
        user = from.slice(-2)
    }

    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {user, msg, time}
                ]
            }
        default:
            return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {

    const [allChats, dispatch] = useReducer(reducer, initialState);

    if (!socket) {
        socket = io('http://localhost:8000');

        // client listener for messages
        socket.on('chat message', function(msg){
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
        })

        socket.on('alerts', function(msg){
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
        })
    }

    const user = 'todd' + Math.random(100).toFixed(2);
    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}