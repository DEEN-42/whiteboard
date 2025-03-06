import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import {  TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import classes from "./index.module.css";

function Board() {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const {elements,
    toolActionType, 
    boardMouseDownHandler, 
    boardMouseMoveHandler, 
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo,
    redo,
  }= useContext(boardContext);

  const {toolboxState} = useContext(toolboxContext);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);

  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if(event.ctrlKey && event.key === "z"){
        undo();
      }
      else if(event.ctrlKey && event.key === "y"){
        redo();
      }
    }
    document.addEventListener("keydown",handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  },[undo, redo]);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas= rough.canvas(canvas);
    elements.forEach((element) => {
      if (element.type === TOOL_ITEMS.IMAGE) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s";
        const { x1, y1, x2, y2, opacity } = element;
        context.globalAlpha = opacity;
        context.drawImage(img, x1, y1, x2 - x1, y2 - y1);
        context.globalAlpha = 1;
        context.restore();
      } else {
        // Draw other elements
        switch (element.type) {
          case TOOL_ITEMS.LINE:
          case TOOL_ITEMS.CIRCLE:
          case TOOL_ITEMS.RECTANGLE:
          case TOOL_ITEMS.ARROW:
            roughCanvas.draw(element.roughEle);
            break;
  
          case TOOL_ITEMS.BRUSH: {
            context.fillStyle = element.stroke;
            context.fill(element.path);
            context.restore();
            break;
          }
  
          case TOOL_ITEMS.TEXT:
            context.textBaseline = "top";
            context.font = `${element.size}px Caveat`;
            context.fillStyle = element.stroke;
            context.fillText(element.text, element.x1, element.y1);
            context.restore();
            break;
  
          default:
            throw new Error("Type not recognized");
        }
      }
      
    });

    return() => {
      context.clearRect(0,0, canvas.width, canvas.height);
    }
  }, [elements]);

  useEffect(() => {
    const textarea = textAreaRef.current;
    if(toolActionType === TOOL_ACTION_TYPES.WRITING){
      setTimeout(() => {
        textarea.focus();
      }, 0);
      
    }
  }, [toolActionType]);
  const handleMouseDown=(event) =>{
    boardMouseDownHandler(event, toolboxState);
  };
  const handleMouseMove=(event) =>{
      boardMouseMoveHandler(event);
    
  };
  const handleMouseUp=() =>{
    boardMouseUpHandler();
  };


  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && <textarea
      type = "text"
      ref={textAreaRef}
      className={classes.textElementBox}
      style={{
        top :elements[elements.length -1].y1,
        left: elements[elements.length -1 ].x1,
        fontSize: `${elements[elements.length -1]?.size}px`,
        color: elements[elements.length -1]?.stroke,
      }}
      onBlur={(event) => textAreaBlurHandler(event.target.value)}
      />}
      <canvas ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} 
        />
    </>
      
  );
}

export default Board;