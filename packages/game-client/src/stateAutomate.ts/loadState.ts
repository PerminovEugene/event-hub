import { State } from "./state";
import { getStore } from './storeData';

export class LoadingState implements State {
    public async start(): Promise<any> {
        return await this.loadData();
    }

    private async loadData() {
        // imitate request to server
        return new Promise((resolve) => {
            setTimeout(() => {
                return resolve(getStore());
            }, 0);
        });
    };
}