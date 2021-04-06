import React, { useEffect } from "react";
import Canvas from "./Canvas";
import "./App.css";
import Buildings from "./gameInterface/buildungs";
import { observer } from "mobx-react-lite";
import { rootStore } from "./AppContext";
import { RootStoreContext } from "./AppContext";

const App = observer(() => {
  useEffect(() => {
    // code to run on component mount
    rootStore.init().catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      <RootStoreContext.Provider value={rootStore}>
        <Canvas />
        <Buildings />
      </RootStoreContext.Provider>
    </div>
  );
});

export default App;
