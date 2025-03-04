import { createContext } from "react";

const toolboxContext = createContext({
    toolboxState: {},
    changeStroke: () => {},
    changeFill: () => {},
    changeSize: () => {},
    changeOpacity: () => {},
});

export default toolboxContext; 