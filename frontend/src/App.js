import React, { useState } from "react";
import Flows from "./components/Flows"

function App() {
  const [flows, setFlows] = useState([]);
  const [activeFlow, setActiveFlow] = useState(null);
  const [newFlowName, setNewFlowName] = useState("");
  const [editFlowName, setEditFlowName] = useState(""); // For storing the flow name while editing
  const [isEditing, setIsEditing] = useState(false); // For toggle edit mode

  // Function to handle creating a new flow
  const createNewFlow = () => {
    if (newFlowName.trim()) {
      setFlows((prevFlows) => [...prevFlows, newFlowName]);
      setActiveFlow(newFlowName);
      setNewFlowName("");
    }
  };

  // Function to handle flow selection
  const handleFlowSelect = (flowName) => {
    setActiveFlow(flowName);
  };

  // Function to handle editing a flow's name
  const handleEditFlow = (flowName) => {
    setIsEditing(true);
    setEditFlowName(flowName);
  };

  // Function to save the edited flow name
  const saveEditedFlow = () => {
    if (editFlowName.trim()) {
      setFlows((prevFlows) =>
        prevFlows.map((flow) =>
          flow === activeFlow ? editFlowName : flow // Replace only the active flow name
        )
      );
      setActiveFlow(editFlowName); // Update active flow to the new name
      setIsEditing(false); // Close the edit mode
    }
  };

  // Function to handle deleting a flow
  const handleDeleteFlow = (flowName) => {
    setFlows((prevFlows) => prevFlows.filter((flow) => flow !== flowName));
    if (activeFlow === flowName) {
      setActiveFlow(null); // Reset active flow if deleted
    }
  };

  return (
    <div className="flex flex-row w-full h-[100vh]">
      {/* Side menu */}
      <div className="w-[30%] bg-red-500 p-4">
        <h2 className="text-white mb-4">Create New Flow</h2>
        <input
          type="text"
          placeholder="Enter flow username"
          value={newFlowName}
          onChange={(e) => setNewFlowName(e.target.value)}
          className="mb-2 p-2 w-full border border-gray-300 rounded"
        />
        <button
          onClick={createNewFlow}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Create Flow
        </button>

        {/* List of created flows */}
        <h2 className="text-white mt-6 mb-4">Existing Flows</h2>
        <ul className="text-white">
          {flows.map((flow, index) => (
            <li
              key={index}
              className={`cursor-pointer mb-2 p-2 rounded hover:bg-gray-700 ${activeFlow === flow ? "bg-gray-500" : ""
                }`}
              onClick={() => handleFlowSelect(flow)}
            >
              {isEditing && editFlowName === flow ? (
                // Input for editing flow name
                <input
                  type="text"
                  value={editFlowName}
                  onChange={(e) => setEditFlowName(e.target.value)}
                  className="border rounded p-1"
                />
              ) : (
                flow
              )}

              {/* Edit and Delete buttons */}
              {isEditing && editFlowName === flow ? (
                // Input for editing flow name
                <input
                  type="text"
                  value={editFlowName}
                  onChange={(e) => setEditFlowName(e.target.value)}
                  className="border rounded p-1"
                />
              ) : (
                flow
              )}

              {/* Edit and Delete buttons */}
              <div className="ml-2 inline-block">
                {isEditing && editFlowName === flow ? (
                  // Save button while editing
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveEditedFlow();
                    }}
                    className="ml-2 p-1 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering onClick for selecting flow
                      handleEditFlow(flow);
                    }}
                    className="ml-2 p-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFlow(flow);
                  }}
                  className="ml-2 p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main nodes (React Flow component) */}
      <div className="w-[70%]">
        {activeFlow ? (
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
