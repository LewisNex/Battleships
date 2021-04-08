import { GameState } from '../Models/types';
import { Coordinate } from '../Models/coordinates';
import { areCoordinatesUnique } from './coordinateLogic';

export const isEnemyShotHit = (enemyShot: Coordinate, gameState: GameState): boolean =>
    gameState.Ships.some(ship => !areCoordinatesUnique(enemyShot, ...ship.Coordinates))