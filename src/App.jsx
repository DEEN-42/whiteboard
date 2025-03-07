import Board from "./components/board/board";
import ToolBar from "./components/toolbar"
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/toolboxProvider";
import Toolbox from "./components/Toolbox";
import { useState } from "react";
function App() {
  const [uploadedSrc, setUploadedSrc] = useState('');
  return (
    <>
      <BoardProvider>
        <ToolboxProvider>
          <ToolBar uploadedSrc={uploadedSrc} setUploadedSrc={setUploadedSrc}/>
          <Board uploadedSrc={uploadedSrc} setUploadedSrc={setUploadedSrc}/>
          <Toolbox/>
        </ToolboxProvider>
      </BoardProvider>
    </>    
  );
}

export default App;