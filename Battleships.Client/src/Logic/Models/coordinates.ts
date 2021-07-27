export type Row = 1|2|3|4|5|6|7|8|9|10;
export type Column = 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J';

export class Coordinate {
	row: Row;
	column: Column;

    constructor(row: Row, column: Column | Row) {
        if (typeof (column) === "number") column = mapIntToColumn(column)
        this.row = row;
		this.column = column;
	}

	toString = () => 
		Coordinate.toString(this);

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

const mapIntToColumn = (i: Row): Column => {
    const mapping = {1:'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G', 8:'H', 9:'I', 10:'J'} as  const
    return mapping[i]
}