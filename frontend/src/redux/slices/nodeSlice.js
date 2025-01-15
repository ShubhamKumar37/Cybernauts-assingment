// nodeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nodes: [],
    edges: [],
};

const nodeSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode: (state, action) => {
            state.nodes.push(action.payload);
        },
        deleteNode: (state, action) => {
            state.nodes = state.nodes.filter((node) => node.id !== action.payload);
            state.edges = state.edges.filter(
                (edge) => edge.source !== action.payload && edge.target !== action.payload
            );
        },
        updateNodeLabel: (state, action) => {
            const { nodeId, newLabel } = action.payload;
            state.nodes = state.nodes.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, label: newLabel } }
                    : node
            );
        },

        setNodes: (state, action) => {
            state.nodes = action.payload;
        },
        setEdges: (state, action) => {
            state.edges = action.payload;
        },
    },
});

export const { addNode, deleteNode, updateNodeLabel, setNodes, setEdges } = nodeSlice.actions;

export default nodeSlice.reducer;
