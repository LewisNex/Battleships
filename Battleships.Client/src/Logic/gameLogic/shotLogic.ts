import { GameState } from '../Models/types';
import { Coordinate } from '../Models/coordinates';

export const isEnemyShotHit = (enemyShot: Coordinate, gameState: GameState): boolean =>
    gameState.Ships.some(ship => !Coordinate.areUnique(enemyShot, ...ship.Coordinates))