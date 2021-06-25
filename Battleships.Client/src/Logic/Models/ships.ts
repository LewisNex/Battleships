import { Coordinate } from "./coordinates";

type Grow<T, A extends Array<T>> = 
	((x: T, ...xs: A) => void) extends ((...a: infer X) => void) 
	? X 
	: never;

type GrowToSize<T, A extends Array<T>, N extends number> = { 
	0: A, 
	1: GrowToSize<T, Grow<T, A>, N>
}[A['length'] extends N ? 0 : 1];

export type FixedLengthArray<T, N extends number> = 
	GrowToSize<T, [], N>;

export enum ShipType {
	Carrier,
	Battleship,
	Cruiser,
	Submarine,
	Destroyer
}

type ShipStructure<Length extends number,
		T extends ShipType, 
		ReloadRate extends number> = {
	Coordinates: FixedLengthArray<Coordinate, Length>,
	ReloadRate: ReloadRate,
	Type: T
};

type Carrier = ShipStructure<5, ShipType.Carrier, 1>;
type Battleship = ShipStructure<4, ShipType.Battleship, 1>;
type Cruiser = ShipStructure<3, ShipType.Cruiser, 1>;
type Submarine = ShipStructure<3, ShipType.Submarine, 1>;
type Destroyer = ShipStructure<2, ShipType.Destroyer, 1>;

export type Ship = 
	| Carrier 
	| Battleship
	| Cruiser 
	| Submarine 
	| Destroyer;
