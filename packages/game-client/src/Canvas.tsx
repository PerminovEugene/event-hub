import React from 'react';
import './App.css';
import { setValue } from './engine/mainLoop'
import { handleKeyboardEvent, handleMouseEvent, handleMouseMove } from './engine/userActions';
import { Automate } from './stateAutomate.ts/automate';
import { uiConfig } from './engine/ui/uiConfig';

type State = {
    width: number;
    height: number;
}

class Canvas extends React.Component<{}, State> {
    state: Readonly<State> = {
        width: uiConfig.itemWidth * 18 + uiConfig.startX * 2,
        height: uiConfig.itemHeigth * 18 + uiConfig.startY * 2,
    };


    componentDidMount() {
        // window.addEventListener('keydown', this.onKeyboardEvent ,false);
        // window.addEventListener('keyup', this.onKeyboardEvent ,false);
        // window.addEventListener('click', (ev) => this.onMouseClick);
        const automate = new Automate();
        
        automate.start();
    }

    onMouseClick = (ev: any) => {
        handleMouseEvent(ev.clientX, ev.clientY);
    }

    onMouseMove = (ev: any) => {
        handleMouseMove(ev.clientX - ev.target.offsetLeft, ev.clientY - ev.target.offsetTop);
    }

    onAddBuilding = () => {
        handleMouseMove();
    }

    onAddUnit = () => {
        addUnit();
    }

    onchangeHandler = (e: any) => {
        setValue(e);
    }

    onKeyboardEvent = (event: KeyboardEvent) =>{
        handleKeyboardEvent(event.key, event.type);
    }


    render() {
        const { width, height } = this.state;
        return (
            <div>
                <canvas id='canvas'
                    width={width}
                    height={height}
                    onMouseMove={this.onMouseMove}
                    style={{
                        margin: 'auto',
                    }}
                />
                <div className="development-panel">
                    <button onClick={this.onAddUnit}>add unit</button>
                    <button onClick={this.onAddBuilding}>add unit</button>
                </div>
            </div>
        )
    };
}

export default Canvas;
