import React from "react";
import { useSelector } from 'react-redux';
import Flows from "./components/Flows";
import SideMenu from "./components/SideMenu";

function App() {
  const activeFlow = useSelector(state => state.flows.selectedFlow);
  const flows = useSelector(state => state.flows.flowList);

  return (
    <div className="flex flex-row w-full h-[100vh]">
      {/* Side menu */}
      <SideMenu />

      {/* Main nodes (React Flow component) */}
      <div className="w-[70%]">
        {activeFlow && flows.length > 0 ? (
          <Flows />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Select or create a flow to start working with React Flow
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
