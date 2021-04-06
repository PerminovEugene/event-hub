import { useObserver } from "mobx-react";
import React from "react";
import { useStore } from "../../AppContext";

const Buildings = () => {
  const { buildingsStore, uiStore } = useStore();
  return useObserver(() => (
    <div className="development-panel">
      {buildingsStore.availableBuildings.map((building) => (
        <button
          onClick={() => uiStore.selectBuilding(building)}
          key={`building${building.id}`}
        >
          {building.name}
        </button>
      ))}
    </div>
  ));
};

export default Buildings;
