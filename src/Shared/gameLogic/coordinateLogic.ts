import { Coordinate } from "../Models/coordinates";

const hashCoordinate = (coord: Coordinate): string =>
	`${coord.column}${coord.row}`;

export const areCoordinatesUnique = (...coords: Coordinate[]): boolean =>
	[...new Set(coords.map(hashCoordinate))].length === coords.length;