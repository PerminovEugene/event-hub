import { updateActiveBoardItem } from './hover';
import { uiConfig } from './uiConfig';

export class UIAdapter {
    public convertMouseCoordinate(x: number, y: number) {
        const boardX = Math.floor((x - uiConfig.startX) / uiConfig.itemWidth);
        const boardY = Math.floor((y - uiConfig.startY) / uiConfig.itemHeigth);
        const crossroadsCoords = this.crossroadPosition(x, y, boardX, boardY);
    }

    public hover(x: number, y: number) {
        const boardX = Math.floor((x - uiConfig.startX) / uiConfig.itemWidth);
        const boardY = Math.floor((y - uiConfig.startY) / uiConfig.itemHeigth);
        const crossroadsCoords = this.crossroadPosition(x, y, boardX, boardY);
        if (crossroadsCoords) {
            updateActiveBoardItem({ crossroad: true, x: crossroadsCoords.x, y: crossroadsCoords.y});
        } else {
            updateActiveBoardItem({ crossroad: false, x: boardX, y: boardY });
        }
    }

    private crossroadPosition(x: number, y: number, boardX: number, boardY: number) {
        let crossroadX;
        let crossroadY;
        if ((x - uiConfig.startX) - (boardX * uiConfig.itemWidth) < uiConfig.dotRadius) {
            crossroadX = boardX;
        }
        if (((boardX + 1)* (uiConfig.itemWidth)) - (x - uiConfig.startX) < uiConfig.dotRadius) {
            crossroadX = boardX + 1;
        }
        if ((y - uiConfig.startY) - (boardY * uiConfig.itemHeigth) < uiConfig.dotRadius) {
            crossroadY = boardY;
        }
        if (((boardY + 1) * (uiConfig.itemHeigth)) - (y - uiConfig.startY) < uiConfig.dotRadius) {
            crossroadY = boardY + 1;
        }
        return crossroadX !== undefined && crossroadY !== undefined ? { x: crossroadX, y: crossroadY } : null;
            
    }
}
export const uiAdapter = new UIAdapter();