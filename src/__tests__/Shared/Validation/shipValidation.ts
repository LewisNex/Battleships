import { GameState } from './../../../Shared/Models/types';
import { FixedLengthArray, Ship, ShipType } from './../../../Shared/Models/ships';
import { Coordinate } from './../../../Shared/Models/coordinates';
import { isShipValid } from "../../../Shared/Validation/shipValidation";

describe('Shared/Validation/shipValidation', () => {
	test('isShipValid return false for Destroyer coords ontop of eachother', () => 
		expectIsDestroyerValid(
			[{row: 1, column:'A'},
			 {row: 1, column:'A'}]).toBe(false));
	test('isShipValid return false for Destroyer coords too far apart vertically', () => 
		expectIsDestroyerValid(
			[{row: 1, column:'A'},
			 {row: 1, column:'D'}]).toBe(false));
	test('isShipValid return false for Destroyer coords too far apart horizontally', () =>
		expectIsDestroyerValid(
			[{row: 1, column:'A'},
			 {row: 3, column:'A'}]).toBe(false));
	test('isShipValid return false for Destroyer coords too far apart horizontally and vertically', () =>
		expectIsDestroyerValid(
			[{row: 1, column:'A'},
			 {row: 3, column:'E'}]).toBe(false));
	test('isShipValid return false for Destroyer coords backslash-diagonal', () =>
		expectIsDestroyerValid(
			[{row: 1, column:'A'},
			 {row: 2, column:'B'}]).toBe(false));
	test('isShipValid return false for Destroyer coords forwardslash-diagonal', () => {
		expectIsDestroyerValid(
			[{row: 5, column:'C'},
			 {row: 4, column:'B'}]).toBe(false);
	});
	test('isShipValid return true for valid horizontal Destroyer coords', () => {
		expectIsDestroyerValid(
			[{row: 5, column:'G'},
			 {row: 5, column:'F'}]).toBe(true);
	});
	test('isShipValid return true for valid vertical Destroyer coords', () => {
		expectIsDestroyerValid(
			[{row: 9, column:'I'},
			 {row: 10, column:'I'}]).toBe(true);
	});

	test('isShipValid return false for chained adjacent horizontal Carrier coords over 2 coordinates', () => {
		expectIsCarrierValid(
			[{row: 10, column:'E'},
			 {row: 10, column:'F'},
			 {row: 10, column:'G'},
			 {row: 10, column:'H'},
			 {row: 10, column:'G'}]).toBe(false);
	});

	test('isShipValid return false for two ships ontop of each other horizontally', () => {
		expectIsCarrierValid(
			[{row: 10, column:'E'},
			 {row: 10, column:'F'},
			 {row: 10, column:'G'},
			 {row: 10, column:'H'},
			 {row: 10, column:'I'}],
			[{Coordinates: [{row: 10, column:'E'}, {row: 10, column:'F'}],
			  ReloadRate: 1,
			  Type: ShipType.Destroyer}]
		).toBe(false);
	});

});



// Helpers:
const expectIsDestroyerValid = (coords: FixedLengthArray<Coordinate, 2>) => {
	let ship: Ship = { Coordinates: coords,	ReloadRate: 1, Type: ShipType.Destroyer	}
	let emptyState: GameState = { Ships:[], PlayerShots:[], EnemyShots:[] }
	return expect(isShipValid(ship, emptyState));
}
const expectIsCarrierValid = (coords: FixedLengthArray<Coordinate, 5>, otherShips?: Ship[]) => {
	let ship: Ship = { Coordinates: coords, ReloadRate: 1, Type: ShipType.Carrier }
	if (otherShips == null) {otherShips = []}
	let emptyState: GameState = { Ships: otherShips, PlayerShots: [], EnemyShots: [] }
	return expect(isShipValid(ship, emptyState));
}