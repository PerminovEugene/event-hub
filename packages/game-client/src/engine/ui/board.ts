import { UIConfig } from "./uiConfig";

export const drawBoard = (
    ctx: OffscreenCanvasRenderingContext2D,
    size: number = 19,
    uiConfig: UIConfig,
) => {
    const { startX, startY, itemHeigth, itemWidth, dotRadius } = uiConfig;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    for (let i = 0; i < size-1; i ++) {
        for (let j = 0; j < size-1; j ++) {
            ctx.strokeRect(
                startX + i * itemWidth,
                startY + j * itemHeigth,
                itemHeigth,
                itemWidth
            );
        }
    }
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size; j ++) {
            let radius = dotRadius - 3;
            if (fatDot.has(i) && fatDot.has(j)) {
                radius = dotRadius;;
            }
            ctx.beginPath();
            ctx.fillStyle = "black"
            ctx.arc(
                startX + i * itemWidth,
                startY + j * itemHeigth,
                radius,
                0,
                2 * Math.PI
            );
            ctx.fill();
        }
    }
}
const fatDot = new Set();
fatDot.add(3);
fatDot.add(9);
fatDot.add(15);