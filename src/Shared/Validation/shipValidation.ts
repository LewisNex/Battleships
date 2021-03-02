import { Ship } from './../Models/ships';
import { GameState } from './../Models/types';
import { Coordinate } from '../Models/coordinates';

export const isShipValid = (ship: Ship, gameState: GameState): boolean =>
	areCoordinatesInline(...ship.Coordinates)
	&& isCoordinateChainAdjacent(...ship.Coordinates)
	&& areCoordinatesUnique(...ship.Coordinates)
	&& !isShipOverlapping(ship, ...gameState.Ships);

const areCoordinatesUnique = (...coords: Coordinate[]): boolean =>
	coords.map((x) => `${x.column}${x.row}`)
		.every((x, i, a) => a.lastIndexOf(x) === i)

const areCoordinatesHorizontal = (...coords: Coordinate[]): boolean =>
	coords.every(coord => coords[0].row === coord.row);

const areCoordinatesVertical = (...coords: Coordinate[]): boolean => 
	coords.every(coord => coords[0].column === coord.column);

const areCoordinatesInline = (...coords: Coordinate[]): boolean =>
	areCoordinatesHorizontal(...coords) || areCoordinatesVertical(...coords);

const isCoordinatePairAdjacent = (coord1: Coordinate, coord2: Coordinate): boolean => 
	Math.abs(coord1.row - coord2.row) === 1 
	|| Math.abs(coord1.column.charCodeAt(0) - coord2.column.charCodeAt(0)) === 1;

const isCoordinateChainAdjacent = (...coords: Coordinate[]): boolean =>
	coords.map((x, i) => [x, coords[i+1]] as const)
		  .filter(([_, y]) => y !== undefined)
		  .every(([x, y]) => isCoordinatePairAdjacent(x, y));

const isShipOverlapping = (ship: Ship, ...shipsOnBoard: Ship[]): boolean =>
	shipsOnBoard.some(
		shipOnBoard => shipOnBoard.Coordinates.some(
			coord => ship.Coordinates.includes(coord)
		)
	);
	