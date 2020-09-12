import { GoLeftCommand, GoRightCommand, GoTopCommand, GoDownCommand } from './command';
import { queue } from './queue';
import { world } from './world/storage';

const keyMap = {
    ArrowLeft: GoLeftCommand,
    ArrowRight: GoRightCommand,
    ArrowUp: GoTopCommand,
    ArrowDown: GoDownCommand,
}

export const handleKeyboardEvent = (keyCode: string) => {
    const CommandClass = (keyMap as any)[keyCode];
    if (CommandClass) {
        queue.add(new CommandClass(world.player));
    }
}