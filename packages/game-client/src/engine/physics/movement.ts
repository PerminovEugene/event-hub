import { DynamicActor } from '../world/dynamic/dynamicActor';
import {  Direction, State } from '../types';
import { GameActor } from '../world/gameActor';
import { StaticActor } from '../world/static/staticActor';

export class MovementManager {
    public updatePosition(
        dynamicActors: Array<DynamicActor>,
        staticActors: Array<StaticActor>
    ) {
        dynamicActors.forEach(actor => {
            const { newDirection } = actor;
            if ((actor.newState === State.Go && actor.state === State.Stay) ||
                (actor.state === State.Go && actor.newState === State.Same)) {
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

            if (actor.newState !== State.Same) {
                actor.state = actor.newState;
                actor.newState = State.Same;
            }
            actor.direction = actor.newDirection;

            dynamicActors.forEach(comparedActor => {
                if (actor !== comparedActor &&
                    // TODO I suppose there is extra condition
                    actor.state !== State.Stay && comparedActor.state !== State.Stay) {
                    if (this.hasCollision(actor, comparedActor)) {
                        this.correctPositionOnCollision(actor, comparedActor);
                    }
                }
            });
            staticActors.forEach((comparedActor) => {
                if (actor.state !== State.Stay && this.hasCollision(actor, comparedActor)) {
                    this.correctPositionOnCollision(actor, comparedActor);
                }
            });

            if (actor.newState !== State.Same) {
                actor.state = actor.newState;
                actor.newState = State.Same;
            }
            actor.direction = actor.newDirection;
        })
    }

    private correctPositionOnCollision = (
        activeActor: DynamicActor,
        collidedActor: GameActor
    ) => {
        if (activeActor.direction === Direction.Top) {
            activeActor.realY = collidedActor.bottom - activeActor.verticalOffset + 1;
        } else if (activeActor.direction === Direction.Down) {
            activeActor.realY = collidedActor.top - activeActor.verticalOffset - activeActor.pHeight - 1;
        } else  if (activeActor.direction === Direction.Left) {
            activeActor.realX = collidedActor.right - activeActor.horisontalOffset + 1;
        } else if (activeActor.direction === Direction.Right) {
            activeActor.realX = collidedActor.left - activeActor.horisontalOffset - activeActor.pWidth - 1 ;
        }
        
        // TODO Not swag
        activeActor.speed = 0;
        activeActor.newState = State.Stay;
        activeActor.updateMaxQuant();
        activeActor.resetQuant();
    }

    private partialInterception(x1: number, x2: number, d1: number, d2: number) {
        return x1 <= d1 && d1 <= x2;
    }

    private wholeInterception(x1: number, x2: number, d1: number, d2: number) {
        return d1 < x1 && x2 < d2; 
    }

    private hasCollision(a: GameActor, b: GameActor) {
        const horisonalCollision = 
            this.partialInterception(a.left, a.right, b.left, b.right) ||
            this.partialInterception(b.left, b.right, a.left, a.right) ||
            this.wholeInterception(a.left, a.right, b.left, b.right) ||
            this.wholeInterception(b.left, b.right, a.left, a.right);

        const verticalCollision = 
            this.partialInterception(a.top, a.bottom, b.top, b.bottom) ||
            this.partialInterception(b.top, b.bottom, a.top, a.bottom) ||
            this.wholeInterception(a.top, a.bottom, b.top, b.bottom) ||
            this.wholeInterception(b.top, b.bottom, a.top, a.bottom);
        return horisonalCollision && verticalCollision;
    }

    private recountSpeed(actor: DynamicActor) {
        if (actor.speed < actor.maxSpeed) {
            actor.speed += actor.acceleration;
        }
    }
}

