import React from "react";
import "./App.css";
import { setValue } from "../engine/mainLoop";
import {
  handleKeyboardEvent,
  handleMouseEvent,
  handleMouseMove,
} from "../engine/userActions";
import { Automate } from "../stateAutomate.ts/automate";
import { uiConfig } from "../engine/ui/uiConfig";
import { RootStoreContext } from "../AppContext";

type State = {
  width: number;
  height: number;
};

class Canvas extends React.Component<{}, State> {
  state: Readonly<State> = {
    width: uiConfig.itemWidth * 18 + uiConfig.startX * 2,
    height: uiConfig.itemHeigth * 18 + uiConfig.startY * 2,
  };

  componentDidMount() {
    const automate = new Automate();
    automate.start();
  }

  onMouseClick = (ev: any) => {
    handleMouseEvent(ev.clientX, ev.clientY);
  };

  onMouseMove = (ev: any) => {
    handleMouseMove(
      ev.clientX - ev.target.offsetLeft,
      ev.clientY - ev.target.offsetTop
    );
  };

  onchangeHandler = (e: any) => {
    setValue(e);
  };

  onKeyboardEvent = (event: KeyboardEvent) => {
    handleKeyboardEvent(event.key, event.type);
  };

  render() {
    const { width, height } = this.state;
    return (
      <div>
        <RootStoreContext.Consumer>
          {(value) => {
            return (
              <canvas
                id="canvas"
                width={width}
                height={height}
                onMouseMove={this.onMouseMove}
                style={{
                  margin: "auto",
                }}
              />
            );
          }}
        </RootStoreContext.Consumer>
      </div>
    );
  }
}

export default Canvas;
