import { MarkerType } from "reactflow";

const styleLine = {
    strokeWidth: 20,
    stroke: "#ffaa00",
};




export const edgePRU = [
    {
        id: "line1-line2",
        source: "line1",
        target: "line2",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line2-line3",
        source: "line2",
        target: "line3",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line2-line4",
        source: "line2",
        target: "line4",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
]