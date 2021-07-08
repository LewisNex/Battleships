import React, { useRef, useState } from "react";
import Draggable, { ControlPosition, DraggableEvent } from "react-draggable";

const stepSize = 1;

export default () => {
	return <> <table style={{
		borderStyle: "solid",
		borderColor: "black",
		borderWidth: "1px",	
		borderSpacing: 2}} className="board">		
		{Array.from({length: 8}, (_, k) => <Row key={k}/>)}
	</table>
	<Ship/> </>
}

export const Ship = () => {
	const [pos, setPos] = useState<ControlPosition>({x:0, y:0})
	const isDragged = useRef<boolean>(false); 
	
	const handleStart = (o: DraggableEvent) => {
		isDragged.current = true;
		console.log("Started", o)
	}

	const handleDrag = (o: DraggableEvent) => {
		console.log("Dragged", isDragged)

	}
	const handleStop = (o: DraggableEvent) => {
		console.log("Stopped", o)
		isDragged.current = false;
		setPos(s => {return  {x: s.x, y: s.y}})
	}

	return <Draggable
		axis="both"
		handle=".handle"
		position={pos}
		grid={[stepSize, stepSize]}
		scale={1}
		onStart={handleStart}
		onDrag={handleDrag}
		onStop={handleStop}>
			<div className="handle">
				<div>{isDragged.current ? "TRUE" : "FALSE"}Drag me</div>
				<img draggable={false} height={isDragged.current ? 100 : 50}  width={isDragged.current ? 100 : 50} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ship_diagram-numbers.svg/2000px-Ship_diagram-numbers.svg.png" />
				<div>This read me ...</div>
			</div>
	</Draggable>
}

export const Row = () => <tr>{Array.from({length: 8}, (_, k) => 
<td style={{
	borderStyle: "solid",
	borderColor: "black",
	borderWidth: "1px",
	height: "50px",
	backgroundColor: k % 2 == 0 ? "blue" : "blueviolet",
	width: "50px"}} key={k}/>)}</tr>
