import { DynamicActor, Direction, State } from '../world/dynamic/dynamicActor';
import { GameActor } from '../world/gameActor';

export class MovementManager {
    public updatePosition(
        actors: Array<DynamicActor>,
    ) {
        actors.forEach(actor => {
            
            const { newDirection } = actor;
            if ((actor.newState === State.Go && actor.state === State.Stay) ||
                (actor.state === State.Go && actor.newState === null)) {
                this.recountSpeed(actor);
                if (newDirection === Direction.Top) {
                    actor.realY -= actor.speed;
                }
                if (newDirection === Direction.Down) {
                    actor.realY += actor.speed;
                }
                if (newDirection === Direction.Right) {
                    actor.realX += actor.speed;
                }
                if (newDirection === Direction.Left) {
                    actor.realX -= actor.speed;
                }
            }
            if (actor.newState !== null) {
                actor.state = actor.newState;
                actor.newState = null;
            }
            actor.direction = actor.newDirection;
            console.log(newDirection, actor.state)


            
            // if (actor.state !== newState) {
            //     if (actor.direction !== newDirection) {

            //     }
            // }
            if (actor.acceleration) {
                
            }
            // actors.forEach(comparedActor => {
            //     if (this.hasCollision(actor, comparedActor)) {
    
            //     }
            // });
        })
    }

    private hasCollision(a: GameActor, b: GameActor) {
        return false
    }

    private recountSpeed(actor: DynamicActor) {
        if (actor.speed < actor.maxSpeed) {
            actor.speed += actor.acceleration;
        }
    }
}

