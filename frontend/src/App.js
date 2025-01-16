import React from "react";
import { useSelector } from 'react-redux';
import Flows from "./components/Flows";
import SideMenu from "./components/SideMenu";

function App() {
  const activeFlow = useSelector(state => state.flows.selectedFlow);
  const flows = useSelector(state => state.flows.flowList);

  return (
    <div className="flex flex-row w-full h-[100vh]">
      {/* Conditionally render the SideMenu based on activeFlow */}
      {!activeFlow ? (
        <SideMenu />
      ) : (
        <div className="w-[30%] flex justify-center items-center bg-gray-200 opacity-80 pointer-events-none">
          Please close a flow first
        </div>
      )}

      {/* Main nodes (React Flow component) */}
      <div className="w-[70%]">
        {activeFlow && flows.length > 0 ? (
          <Flows activeFlow={activeFlow} />
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
