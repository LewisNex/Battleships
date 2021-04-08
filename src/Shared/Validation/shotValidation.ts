import { GameState } from './../Models/types';
import { Coordinate } from './../Models/coordinates';
import { areCoordinatesUnique } from '../gameLogic/coordinateLogic';

export const isPlayerShotValid = (playerShot: Coordinate, gameState: GameState): boolean =>
    areCoordinatesUnique(playerShot, ...gameState.PlayerShots.map( x => x.Coord ))
