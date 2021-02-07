import React from 'react';
import './App.css';
import { main, setValue } from './engine/mainLoop'
import { handleKeyboardEvent } from './engine/userActions';
import { Automate } from './stateAutomate.ts/automate';

class Canvas extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyboardEvent ,false);
        window.addEventListener('keyup', this.onKeyboardEvent ,false);
        const automate = new Automate();
        automate.start();
    }

    onchangeHandler = (e: any) => {
        setValue(e)
    }

    onKeyboardEvent = (event: KeyboardEvent) =>{
        handleKeyboardEvent(event.key, event.type);
    }


    render() {
        return ([
            <canvas id='canvas' width="888" height="789"/>,
            <div className="development-panel">
                <input type='number' onChange={this.onchangeHandler}/>
            </div>
        ])
    };
}

export default Canvas;
