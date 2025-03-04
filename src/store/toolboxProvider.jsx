import React, { useReducer } from 'react'
import toolboxContext from './toolbox-context'
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from '../constants';

function toolboxReducer(state, action){
    switch (action.type){
        case TOOLBOX_ACTIONS.CHANGE_STROKE:{
            const newState = {...state};
            newState[action.payload.tool].stroke = action.payload.stroke;
            return newState;
        }
            
        
        case TOOLBOX_ACTIONS.CHANGE_FILL:{
            const newState = {...state};
            newState[action.payload.tool].fill = action.payload.fill;
            return newState;
        }
        
        case TOOLBOX_ACTIONS.CHANGE_SIZE:{
            const newState = {...state};
            newState[action.payload.tool].size = action.payload.size;
            return newState;
        }
        case TOOLBOX_ACTIONS.CHANGE_OPACITY: {
            const newState = {...state};
            newState[action.payload.tool].opacity = action.payload.opacity;
            return newState;
        }
        default:
            return state;
    }
}


const initialToolboxState ={
    [TOOL_ITEMS.BRUSH]:{
        stroke: COLORS.BLACK,
    },
    [TOOL_ITEMS.LINE]: {
        stroke: COLORS.BLACK,
        size: 1,
    },
    [TOOL_ITEMS.RECTANGLE]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1,
    },
    [TOOL_ITEMS.CIRCLE]: {
        stroke: COLORS.BLACK,
        fill: null,
        size: 1,
    },
    [TOOL_ITEMS.ARROW]: {
        stroke: COLORS.BLACK,
        size: 1,
    },
    [TOOL_ITEMS.TEXT]: {
        stroke: COLORS.BLACK,
        size: 32,
    },
    [TOOL_ITEMS.IMAGE]: {
        opacity: 1,
    }
}

const ToolboxProvider = ({children}) => {
    const [toolboxState, dispatchToolBoxAction] = useReducer(
        toolboxReducer, 
        initialToolboxState
    );

    const changeStrokeHandler = (tool, stroke) => {
        dispatchToolBoxAction({
            type : TOOLBOX_ACTIONS.CHANGE_STROKE,
            payload : {
                tool,
                stroke,
            }
        })
    }
    const changeFillHandler = (tool, fill) => {
        dispatchToolBoxAction({
            type : TOOLBOX_ACTIONS.CHANGE_FILL,
            payload : {
                tool,
                fill,
            }
        })
    }
    const changeSizeHandler = (tool, size) => {
        dispatchToolBoxAction({
            type : TOOLBOX_ACTIONS.CHANGE_SIZE,
            payload : {
                tool,
                size,
            }
        })
    }
    const changeOpacityHandler = (tool, opacity) => {
        dispatchToolBoxAction({
            type : TOOLBOX_ACTIONS.CHANGE_OPACITY,
            payload : {
                tool,
                opacity,
            }
        })
    }
    const toolboxContextValue = {
        toolboxState,
        changeStroke: changeStrokeHandler,
        changeFill:changeFillHandler,
        changeSize: changeSizeHandler,
        changeOpacity: changeOpacityHandler,
    };

  return <toolboxContext.Provider value={toolboxContextValue}>
    {children}
    </toolboxContext.Provider>
}

export default ToolboxProvider;
