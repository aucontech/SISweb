import { MarkerType } from "reactflow";

const styleLine1 = {
    strokeWidth: 14,
    stroke: "#ff7f00",
};


const styleLine2 = {
    strokeWidth: 14,
    stroke: "#ffaa00",
};
const styleLine3 = {
    strokeWidth: 14,
    stroke: "#ffe900",
};

export const edgePRU = [
    {
        id: "line1-line2",
        source: "line1",
        target: "line2",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },

    {
        id: "line2-line3",
        source: "line2",
        target: "line3",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },
    {
        id: "line2-line4",
        source: "line2",
        target: "line4",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
        
    },
    {
        id: "line3-line5",
        source: "line3",
        target: "line5",
        type: "smoothstep",

        style: {
            ...styleLine2,
        },
        
    },
    {
        id: "line4-line6",
        source: "line4",
        target: "line6",
        type: "smoothstep",

        style: {
            ...styleLine2,
        },
        
    },
    {
        id: "line5-line7",
        source: "line5",
        target: "line7",
        type: "smoothstep",

        style: {
            ...styleLine3,
        },
        
    },
    {
        id: "line6-line8",
        source: "line6",
        target: "line8",
        type: "smoothstep",

        style: {
            ...styleLine3,
        },
        
    },
    {
        id: "line7-line9",
        source: "line7",
        target: "line9",
        type: "smoothstep",

        style: {
            ...styleLine3,
        },
        
    },
    {
        id: "line8-line9",
        source: "line8",
        target: "line9",
        type: "smoothstep",

        style: {
            ...styleLine3,
        },
        
    },
]