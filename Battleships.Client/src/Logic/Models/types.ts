import { Ship } from "./ships";
import { Shot } from "./shots";

//GameState
export type GameState = {
	Ships: Array<Ship>,
	PlayerShots: Array<Shot>
	EnemyShots: Array<Shot>
};
