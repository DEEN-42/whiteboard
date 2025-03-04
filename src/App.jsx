import Board from "./components/board/board";
import ToolBar from "./components/toolbar"
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/toolboxProvider";
import Toolbox from "./components/Toolbox";
function App() {
  return (
    <>
    <BoardProvider>
      <ToolboxProvider>
        <ToolBar/>
        <Board/>
        <Toolbox/>
      </ToolboxProvider>
    </BoardProvider>
    </>    
  );
}

export default App;