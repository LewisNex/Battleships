type Row = 1|2|3|4|5|6|7|8|9|10;
type Column = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J';

export class Coordinate {
	row: Row;
	column: Column;

	constructor(row: Row, column: Column){
		this.row = row;
		this.column = column;
	}

	equals = (other: Coordinate) =>
		this.row === other.row 
			&& this.column === other.column;	

	static toString = (x: Coordinate) => 
		`${x.column}${x.row}`;	

	static areUnique = (...coords: Coordinate[]) => {
		let uniques = new Set(coords.map(Coordinate.toString));
		return [...uniques].length === coords.length;
	}
}