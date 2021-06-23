import { GameState } from './../../../Battleships.Core/src/models/types';
import { FixedLengthArray, Ship, ShipType } from './../../../Battleships.Core/src/models/ships';
import { Coordinate } from './../../../Battleships.Core/src/models/coordinates';
import { isShipValid } from "./../../../Battleships.Core/src/validation / shipValidation";

describe('Shared/Validation/shipValidation', () => {
	beforeEach(() => {
	})
	test('isShipValid return false for Destroyer coords ontop of eachother', () => 
		expectIsDestroyerValid(
			[new Coordinate(1, 'A'),
			 new Coordinate(1, 'A')]).toBe(false));
	test('isShipValid return false for Destroyer coords too far apart vertically', () => 
		expectIsDestroyerValid(
			[new Coordinate(1, 'A'),
			 new Coordinate(1, 'D')]).toBe(false));
	test('isShipValid return false for Destroyer coords too far apart horizontally', () =>
		expectIsDestroyerValid(
			[new Coordinate(1, 'A'),
			 new Coordinate(3, 'A')]).toBe(false));

	test('isShipValid return false for Destroyer coords too far apart horizontally and vertically', () =>
		expectIsDestroyerValid(
			[new Coordinate(1, 'A'),
			 new Coordinate(3, 'E')]).toBe(false));
	test('isShipValid return false for Destroyer coords backslash-diagonal', () =>
		expectIsDestroyerValid(
			[new Coordinate(1, 'A'),
			 new Coordinate(2, 'B')]).toBe(false));
	test('isShipValid return false for Destroyer coords forwardslash-diagonal', () => {
		expectIsDestroyerValid(
			[new Coordinate(5, 'C'),
			 new Coordinate(4, 'B')]).toBe(false);
	});
	test('isShipValid return true for valid horizontal Destroyer coords', () => {
		expectIsDestroyerValid(
			[new Coordinate(5, 'G'),
			 new Coordinate(5, 'F')]).toBe(true);
	});
	test('isShipValid return true for valid vertical Destroyer coords', () => {
		expectIsDestroyerValid(
			[new Coordinate(9, 'I'),
			 new Coordinate(10, 'I')]).toBe(true);
	});
	test('isShipValid return false for chained adjacent horizontal Carrier coords over 2 coordinates', () => {
		expectIsCarrierValid(
			[new Coordinate(10, 'E'),
			 new Coordinate(10, 'F'),
			 new Coordinate(10, 'G'),
			 new Coordinate(10, 'H'),
			 new Coordinate(10, 'G')]).toBe(false);
	});
	test('isShipValid return false for two ships ontop of each other vertically', () => {		
		let ship = getDestroyer([
				new Coordinate(8, 'E'),
				new Coordinate(9, 'E')]);
		let otherShip = getDestroyer([
				new Coordinate(9, 'E'),
				new Coordinate(10, 'E')]);
		let state: GameState = { 
			Ships: [otherShip],
			PlayerShots: [],
			EnemyShots: []
		};
		expect(isShipValid(ship, state)).toBe(false);
	});
	test('isShipValid return false for two ships crossed ontop of each other', () => {
		let ship = getDestroyer([
			new Coordinate(9, 'E'),
			new Coordinate(9, 'F')]);
		let otherShip = getDestroyer([
			new Coordinate(9, 'E'),
			new Coordinate(10, 'E')]);
		let state: GameState = { 
			Ships: [otherShip],
			PlayerShots: [],
			EnemyShots: []
		};
		expect(isShipValid(ship, state)).toBe(false);
	});
	test('isShipValid return true for two ships placed in corners of board not overlapping', () => {
		let ship = getDestroyer([
			new Coordinate(1, 'E'),
			new Coordinate(2, 'E')]);
		let otherShip = getDestroyer([
			new Coordinate(9, 'E'),
			new Coordinate(10, 'E')]);
		let state: GameState = { 
			Ships: [otherShip],
			PlayerShots: [],
			EnemyShots: []
		};
		expect(isShipValid(ship, state)).toBe(true);
	});
});

// Helpers:
const expectIsDestroyerValid = (coords: FixedLengthArray<Coordinate, 2>) => {
	let ship: Ship = getDestroyer(coords);
	let emptyState: GameState = { Ships:[], PlayerShots:[], EnemyShots:[] }
	return expect(isShipValid(ship, emptyState));
}
const expectIsCarrierValid = (coords: FixedLengthArray<Coordinate, 5>) => {
	let ship: Ship = { Coordinates: coords, ReloadRate: 1, Type: ShipType.Carrier };
	let emptyState: GameState = { Ships: [], PlayerShots: [], EnemyShots: [] }
	return expect(isShipValid(ship, emptyState));
}

const getDestroyer = (coords: FixedLengthArray<Coordinate, 2>) : Ship => {
	return { Coordinates: coords,	ReloadRate: 1, Type: ShipType.Destroyer	};
}
