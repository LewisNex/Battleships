import React, { Ref, RefObject, useRef, useState } from "react";
import Draggable, { ControlPosition, DraggableData, DraggableEvent } from "react-draggable";
import { Row as RowType, Coordinate } from "../../Logic/Models/coordinates";

type BoardMapping = { [key: string]: Ref<HTMLTableDataCellElement>}

export default () => {
    const mapping = useRef<BoardMapping>({})
    mapping.current = {}

	return <> <table style={{
		borderStyle: "solid",
		borderColor: "black",
		borderWidth: "1px",	
		borderSpacing: 2}} className="board">	 	
        {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((r: RowType) =>
            <tr>
                {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((c: RowType) => {
                    let coordinate = new Coordinate(r, c)
                    return <Cell setRef={ref => mapping.current[coordinate.toString()] = ref} coordinate={coordinate} />
                })}
            </tr>)}
        </table>
        <Ship/> </>
}

export const Ship = () => {
	const [pos, setPos] = useState<ControlPosition>({x:0, y:0})
	const [isDragged, setIsDragged] = useState<boolean>(false);
	
	const handleStart = (o: DraggableEvent) => {
		setIsDragged(false);
	}

	const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
		setPos(s => { return { x: s.x + ui.deltaX, y: s.y + ui.deltaY } })
		setIsDragged(true);

	}
	const handleStop = (e: DraggableEvent, ui: DraggableData) => {
		setIsDragged(false);
	}

	return <Draggable
		axis="both"
		handle=".handle"
		position={pos}
		scale={1}
		onStart={handleStart}
		onDrag={handleDrag}
		onStop={handleStop}>
			<div className="handle">
			<div>{isDragged ? "TRUE" : "FALSE"}Drag me</div>
            <img draggable={false} height={isDragged ? 100 : 50} width={isDragged ? 100 : 50} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ship_diagram-numbers.svg/2000px-Ship_diagram-numbers.svg.png" />
				<div>This read me ...</div>
			</div>
	</Draggable>
}


type CellProps = {
	coordinate: Coordinate
    setRef: (ref: RefObject<HTMLTableDataCellElement>) => {}
}

const Cell = ({ setRef, coordinate }: CellProps) => {

    let ref = useRef(null)
    setRef(ref)

    return <td
        id={coordinate.toString()}
        ref={ref}
        style={{
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "1px",
            height: "50px",
            backgroundColor: "cyan",
            width: "50px"
        }} />
}