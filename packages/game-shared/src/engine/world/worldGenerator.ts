import { Tree } from "./actors/static/tree";

export class WorldGenerator {
    public generateTrees(count: number = 10) {
        let result = [];
        /**
         * dummy generation
         */
        for (let i = 0; i < count; i++) {
            result.push(new Tree(i * 15, i * 20))
        }
        return result; 
    }
}