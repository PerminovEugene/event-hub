import { createContext, useContext } from "react";
import { RootStore } from "./stores/root";

export const rootStore = new RootStore();

export const RootStoreContext = createContext<RootStore>(undefined!);

export const useStore = (): RootStore => useContext(RootStoreContext);
