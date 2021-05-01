import React from "react";
import "./App.css";
import { RootStoreContext } from "../AppContext";
import { useObserver } from "mobx-react";
import { useStore } from "../AppContext";

const MainMenu = () => {
  const { generalStateStorage } = useStore();
  return useObserver(() => (
    <div>
      <RootStoreContext.Consumer>
        {(value) => {
          return (
            <menu>
              <ul>
                <li>
                  <button onClick={() => generalStateStorage.playFastGame()}>
                    fast play
                  </button>
                </li>
              </ul>
            </menu>
          );
        }}
      </RootStoreContext.Consumer>
    </div>
  ));
};

export default MainMenu;
