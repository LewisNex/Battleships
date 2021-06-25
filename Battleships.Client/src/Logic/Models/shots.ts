import { Coordinate } from "./coordinates";

export enum ShotState {
	Miss,
	Hit,
}
type HitShot = {
	Coord: Coordinate,
	State: ShotState.Hit,
};
type MissShot = {
	Coord: Coordinate,
	State: ShotState.Miss
};
export type Shot = HitShot | MissShot;