// import { act } from '@testing-library/react';
// import { DynamicActor, Direction, State } from '../world/actors/dynamic/dynamicActor';
// import { GameActor } from '../world/gameActor';
// import { StaticActor } from '../world/static/staticActor';


// enum Pos {
//     realX = 'realX',
//     realY = 'realY',
// }
// enum Side  {
//     right = 'right',
//     left = 'left',
//     bottom = 'bottom',
//     top = 'top'
// }
// type RollbackMovementConfig = Array<string>;

// export class MovementManager {
//     public updatePosition(
//         dynamicActors: Array<DynamicActor>,
//         staticActors: Array<StaticActor>
//     ) {
//         dynamicActors.forEach(actor => {
//             const { newDirection } = actor;
//             if ((actor.newState === State.Go && actor.state === State.Stay) ||
//                 (actor.state === State.Go && actor.newState === null)) {
//                 this.recountSpeed(actor);
//                 if (newDirection === Direction.Top) {
//                     actor.realY -= actor.speed;
//                 }
//                 if (newDirection === Direction.Down) {
//                     actor.realY += actor.speed;
//                 }
//                 if (newDirection === Direction.Right) {
//                     actor.realX += actor.speed;
//                 }
//                 if (newDirection === Direction.Left) {
//                     actor.realX -= actor.speed;
//                 }
//             }

//             if (actor.newState !== null) {
//                 actor.state = actor.newState;
//                 actor.newState = null;
//             }
//             actor.direction = actor.newDirection;

//             dynamicActors.forEach(comparedActor => {
//                 if (actor !== comparedActor && 
//                     actor.state !== State.Stay && comparedActor.state !== State.Stay) {
//                     if (this.hasCollision(actor, comparedActor)) {
//                         this.correctPossitionBecauseOfCollision(actor, comparedActor);
//                     }
//                 }
//             });
//             staticActors.forEach((comparedActor) => {
//                 if (actor.state !== State.Stay && this.hasCollision(actor, comparedActor)) {
//                     this.correctPossitionBecauseOfCollision(actor, comparedActor);
//                 }
//             });

//             if (actor.newState !== null) {
//                 actor.state = actor.newState;
//                 actor.newState = null;
//             }
//             actor.direction = actor.newDirection;
//         })
//     }

//     private returnBackMap: {[key in Direction]: RollbackMovementConfig} = {
//         [Direction.Down]: ['realY', 'top', 'pHeight'],
//         [Direction.Top]: ['realY', 'bottom'],
//         [Direction.Left]: ['realX', 'right',],
//         [Direction.Right]: ['realX', 'left', 'pWidth' ],
//     }
//     private correctPossitionBecauseOfCollision = (
//         activeActor: DynamicActor,
//         collidedActor: GameActor
//     ) => {
//         if (activeActor.direction === Direction.Top) {
//             activeActor.realY = collidedActor.bottom - activeActor.verticalOffset + 1;
//         } else if (activeActor.direction === Direction.Down) {
//             activeActor.realY = collidedActor.top - activeActor.verticalOffset - activeActor.pHeight - 1;
//         } else  if (activeActor.direction === Direction.Left) {
//             activeActor.realX = collidedActor.right - activeActor.horisontalOffset + 1;
//         } else if (activeActor.direction === Direction.Right) {
//             activeActor.realX = collidedActor.left - activeActor.horisontalOffset - activeActor.pWidth - 1 ;
//         }
        
//         // TODO Not swag
//         activeActor.speed = 0;
//         activeActor.maxQuant = 0;
//         activeActor.newState =  State.Stay;
//         activeActor.resetQuant();
//     }

//     private partialInterception(x1: number, x2: number, d1: number, d2: number) {
//         return x1 <= d1 && d1 <= x2;
//     }

//     private wholeInterception(x1: number, x2: number, d1: number, d2: number) {
//         return d1 < x1 && x2 < d2; 
//     }


//     private hasCollision(a: GameActor, b: GameActor) {
//         const horisonalCollision = 
//             this.partialInterception(a.left, a.right, b.left, b.right) ||
//             this.partialInterception(b.left, b.right, a.left, a.right) ||
//             this.wholeInterception(a.left, a.right, b.left, b.right) ||
//             this.wholeInterception(b.left, b.right, a.left, a.right);

//         const verticalCollision = 
//             this.partialInterception(a.top, a.bottom, b.top, b.bottom) ||
//             this.partialInterception(b.top, b.bottom, a.top, a.bottom) ||
//             this.wholeInterception(a.top, a.bottom, b.top, b.bottom) ||
//             this.wholeInterception(b.top, b.bottom, a.top, a.bottom);
//         return horisonalCollision && verticalCollision;
//     }

//     private recountSpeed(actor: DynamicActor) {
//         if (actor.speed < actor.maxSpeed) {
//             actor.speed += actor.acceleration;
//         }
//     }
// }

