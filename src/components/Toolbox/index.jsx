import React, { useContext } from 'react';
import { COLORS, FILL_TOOL_TYPES, STROKE_TOOL_TYPES, TOOL_ITEMS, SIZE_TOOL_TYPES, OPACITY_TOOL_TYPES } from '../../constants';
import cx from "classnames";
import classes from "./index.module.css";
import toolboxContext from '../../store/toolbox-context';
import boardContext from '../../store/board-context';
const Toolbox = () => {
    const {activeToolItem} =useContext(boardContext);
    const {toolboxState, changeStroke, changeFill, changeSize, changeOpacity} 
    = useContext(toolboxContext);

    const strokeColor = toolboxState[activeToolItem]?.stroke;
    const fillColor = toolboxState[activeToolItem]?.fill;
    const size = toolboxState[activeToolItem]?.size;
    const opacity = toolboxState[activeToolItem]?.opacity;
  return (
    <div className={classes.container}>
        {STROKE_TOOL_TYPES.includes(activeToolItem) && <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Stroke Color</div>
            <div className={classes.colorsContainer}>
                <div> 
                    <input className= {classes.colorPicker}
                    type="color"
                    value={
                        strokeColor
                    }
                    onChange={(e) => changeStroke(activeToolItem, e.target.value)}
                    ></input>
                </div>
                {Object.keys(COLORS).map((k) => {
                    return <div key= {k} className={cx(classes.colorBox,
                         {[classes.activeColorBox]: strokeColor === COLORS[k],
                         })}
                     style={{backgroundColor: COLORS[k]}}
                     onClick={() => changeStroke(activeToolItem, COLORS[k])}
                     ></div>
                })}
            </div>
        </div>}
        {FILL_TOOL_TYPES.includes(activeToolItem) && <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Fill Color</div>
            <div className={classes.colorsContainer}>
            {fillColor === null ? (
                <div className={cx(classes.colorPicker, classes.noFillColorBox)}
                onClick={() => changeFill(activeToolItem, COLORS.BLACK)}
                >
                </div>
            ) : (
                <div> 
                    <input className= {classes.colorPicker}
                    type="color"
                    value={
                        fillColor
                    }
                    onChange={(e) => changeFill(activeToolItem, e.target.value)}
                    ></input>
                </div>
            )}

                    <div className={cx(classes.colorBox, classes.noFillColorBox,
                         {[classes.activeColorBox]: fillColor === null,
                         })}
                     style={{backgroundColor: null}}
                     onClick={() => changeFill(activeToolItem,null)}
                     ></div>
            
                
                {Object.keys(COLORS).map((k) => {
                    return <div key= {k}  className={cx(classes.colorBox,
                         {[classes.activeColorBox]: fillColor === COLORS[k],
                         })}
                     style={{backgroundColor: COLORS[k]}}
                     onClick={() => changeFill(activeToolItem, COLORS[k])}
                     ></div>
                })}
            </div>
        </div>}
        {SIZE_TOOL_TYPES.includes(activeToolItem) && 
        (<div className={classes.selectOptionContainer}>
            <label className={classes.toolBoxLabel}>
                {activeToolItem === TOOL_ITEMS.TEXT ? "Font Size" : "Brush Size"}
            </label>
            <input 
            type= "range"
            min={activeToolItem === TOOL_ITEMS.TEXT ? 12:1}
            max={activeToolItem === TOOL_ITEMS.TEXT ? 64:10}
            step={1}
            value={size}
            onChange={(event) => changeSize(activeToolItem, event.target.value)}
            ></input>
        </div>)}
        {OPACITY_TOOL_TYPES.includes(activeToolItem) && 
        (<div className={classes.selectOptionContainer}>
            <label className={classes.toolBoxLabel}>
                Opacity
            </label>
            <input 
            type= "range"
            min={0}
            max={1}
            step={0.01}
            value={opacity}
            onChange={(event) => changeOpacity(activeToolItem, event.target.value)}
            ></input>
        </div>)}
    </div>
  )
};

export default Toolbox;
