import { Coordinate } from '../Models/coordinates';
import { Ship } from "../Models/ships";

export const isShipValid = (ship: Ship): boolean =>
	areCoordinatesInline(...ship.Coordinates)
	&& isCoordinateChainAdjacent(...ship.Coordinates)
	&& areCoordinatesUnique(...ship.Coordinates);

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
		  .every(([x, y]) => isCoordinatePairAdjacent(x, y))
	