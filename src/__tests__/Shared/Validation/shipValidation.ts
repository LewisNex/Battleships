import { Ship, ShipType } from "../../../Shared/Models/ships"
import { isShipValid } from "../../../Shared/Validation/shipValidation"

describe('Shared/Validation/shipValidation', () => {
	test('isShipValid return true for valid', () => {
		let ship: Ship = {
			Coordinates: [{row: 1, column:'A'},
						  {row: 1, column:'B'}],
			ReloadRate: 1,
			Type: ShipType.Destroyer
		}
		expect(isShipValid(ship)).toBe(true);
	});
	test('isShipValid return false for invalid', () => {
		let ship: Ship = {
			Coordinates: [{row: 2, column:'A'},
						  {row: 2, column:'A'}],
			ReloadRate: 1,
			Type: ShipType.Destroyer
		}
		expect(isShipValid(ship)).toBe(false);
	});
});