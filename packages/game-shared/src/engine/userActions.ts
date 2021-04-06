import { GoLeftCommand, GoRightCommand, GoTopCommand, GoDownCommand } from './command';
import { StopGoLeftCommand, StopGoRightCommand, StopGoTopCommand, StopGoDownCommand } from './command';
import { queue } from './queue';
import { world } from './world/storage';

const keyMap = {
    ArrowLeft: { keydown: GoLeftCommand, keyup: StopGoLeftCommand },
    ArrowRight: { keydown: GoRightCommand, keyup: StopGoRightCommand },
    ArrowUp: { keydown: GoTopCommand, keyup: StopGoTopCommand },
    ArrowDown: { keydown: GoDownCommand, keyup: StopGoDownCommand },
}

export const handleKeyboardEvent = (keyCode: string, type: string) => {
    if ((keyMap as any)[keyCode]) {
        const CommandClass = (keyMap as any)[keyCode][type];
        if (CommandClass) {
            queue.add(new CommandClass(world.player, CommandClass.name));
        }
    }
    
}