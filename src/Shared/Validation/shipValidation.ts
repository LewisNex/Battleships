import { Ship } from "../Models/ships";

export const isShipValid = (ship: Ship): boolean => {
	return ship.Coordinates[0].row === 1;
}