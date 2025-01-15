import React, { useCallback, useRef } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  reconnectEdge,
} from '@xyflow/react';
import { TextUpdaterNode } from './TextUpdaterNode.jsx'; // Import the custom node
import '@xyflow/react/dist/style.css';

const DeleteEdgeDrop = () => {
  const edgeReconnectSuccessful = useRef(true);

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: '1',
      type: 'textUpdater',
      data: { label: 'Node A', deleteNode: () => {}, updateNode: () => {} },
      position: { x: 250, y: 0 },
    },
  ]);
  
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Function to delete a node and its connected edges
  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  // Function to update a node's label
  const updateNode = (nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  };

  // Function to add a new node
  const addNode = () => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type: 'textUpdater',
      data: {
        label: `Node ${newNodeId}`,
        deleteNode: deleteNode,
        updateNode: updateNode,
      },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Handle edge connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handling edge reconnections
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((eds) => applyEdgeChanges([reconnectEdge(oldEdge, newConnection)], eds));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeReconnectSuccessful.current = true;
  }, []);

  // Register custom node type
  const nodeTypes = {
    textUpdater: TextUpdaterNode,
  };

  return (
    <div>
      {/* Button to add new node */}
      <button onClick={addNode} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Add Node
      </button>

      {/* React Flow component */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds) =>
            applyNodeChanges(changes, nds).map((node) => ({
              ...node,
              data: {
                ...node.data,
                deleteNode: deleteNode,
                updateNode: updateNode,
              },
            }))
          )
        }
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        fitView
        style={{ backgroundColor: '#F7F9FB' }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default DeleteEdgeDrop;
