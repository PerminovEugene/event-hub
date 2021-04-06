import { rootStore } from "../../AppContext";
import { UIConfig } from "./uiConfig";

let crossroad: boolean = false;
let x: number = -1;
let y: number = -1;

export const drawUserActiveItem = (
  ctx: OffscreenCanvasRenderingContext2D,
  uiConfig: UIConfig
) => {
  const { uiStore } = rootStore;
  if (crossroad) {
    if (!(x < 0 || y < 0 || x > 18 || y > 18)) {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.arc(
        uiConfig.startX + x * uiConfig.itemWidth,
        uiConfig.startY + y * uiConfig.itemHeigth,
        uiConfig.dotRadius - 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  } else {
    if (!(x < 0 || y < 0 || x > 17 || y > 17)) {
      ctx.lineWidth = 1;
      ctx.fillStyle = uiStore.selectedGameObject ? "green" : "blue";
      ctx.fillRect(
        uiConfig.startX + x * uiConfig.itemWidth + 2,
        uiConfig.startY + y * uiConfig.itemHeigth + 2,
        uiConfig.itemWidth - 4,
        uiConfig.itemHeigth - 4
      );
    }
  }
};

const drawPlanndedBuilding = (
  ctx: OffscreenCanvasRenderingContext2D,
  uiConfig: UIConfig
) => {
  const { uiStore } = rootStore;
  if (uiStore.selectedGameObject) {
    ctx.lineWidth = 1;
    ctx.fillStyle = "green";
    ctx.fillRect(
      uiConfig.startX + x * uiConfig.itemWidth + 2,
      uiConfig.startY + y * uiConfig.itemHeigth + 2,
      uiConfig.itemWidth - 4,
      uiConfig.itemHeigth - 4
    );
  }
};

export const updateActiveBoardItem = (newItem: {
  crossroad: boolean;
  x: number;
  y: number;
}) => {
  crossroad = newItem.crossroad;
  x = newItem.x;
  y = newItem.y;
};
