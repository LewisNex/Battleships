import React from "react";
import Draggable, { ControlPosition, DraggableEvent } from "react-draggable";

export default () => {
	return <table className="board">		
		{Array.from({length: 8}, (_, k) => <Row key={k}/>)}
	</table>
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

const Row = () => <tr>{Array.from({length: 8}, (_, k) => <td key={k}/>)}</tr>