import React from "react";

export default () => {
	return <table className="board">		
		{Array.from({length: 8}, (_, k) => <Row key={k}/>)}
	</table>
}

const Row = () => <tr>{Array.from({length: 8}, (_, k) => <td key={k}/>)}</tr>