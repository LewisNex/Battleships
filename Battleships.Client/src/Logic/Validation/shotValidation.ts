import { GameState } from './../Models/types';
import { Coordinate } from './../Models/coordinates';

export const isPlayerShotValid = (playerShot: Coordinate, gameState: GameState): boolean =>
	Coordinate.areUnique(playerShot, ...gameState.PlayerShots.map( x => x.Coord ))
