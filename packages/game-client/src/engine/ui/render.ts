import { WorldStorage } from "../world/storage";
import { GameActor } from "../world/gameActor";
import { drawBoard } from "./board";
import { uiConfig } from "./uiConfig";
import { drawUserActiveItem } from "./hover";

let canvas: HTMLCanvasElement;
let dynamicOffscreen: OffscreenCanvas;

type DrawConfig = {
  // DEBUG PROPS
  showPhysicBorders?: boolean;
};

export const render = (world: WorldStorage) => {
  canvas = canvas || document.getElementById("canvas");

  if (!canvas) {
    return;
  }
  if (!dynamicOffscreen) {
    dynamicOffscreen = new OffscreenCanvas(canvas.width, canvas.height);
  }
  const showPhysicBorders = true;
  const dynamicCtx = dynamicOffscreen.getContext(
    "2d"
  ) as OffscreenCanvasRenderingContext2D;
  world.dynamic.forEach((gameActor: GameActor) => {
    gameActor.draw(dynamicCtx);
    if (showPhysicBorders) {
      drawActorPhysicBorder(dynamicCtx, gameActor);
    }
  });
  world.static.forEach((gameActor: GameActor) => {
    gameActor.draw(dynamicCtx);
    if (showPhysicBorders) {
      drawActorPhysicBorder(dynamicCtx, gameActor);
    }
  });

  drawBoard(dynamicCtx, 19, uiConfig);
  drawUserActiveItem(dynamicCtx, uiConfig);
  const bitmapDynamic = dynamicOffscreen.transferToImageBitmap();
  canvas.getContext("bitmaprenderer")?.transferFromImageBitmap(bitmapDynamic);
};

const drawActorPhysicBorder = (
  ctx: OffscreenCanvasRenderingContext2D,
  actor: GameActor
) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";
  // console.log(actor.left)
  ctx.strokeRect(actor.left, actor.top, actor.pWidth, actor.pHeight);
};
