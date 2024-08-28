import { MarkerType } from "reactflow";

const styleLine1 = {
    strokeWidth: 20,
    stroke: "#ff7f00",
};
const styleLine2 = {
    strokeWidth: 20,
    stroke: "blue",
};


const styleLine3 = {
    strokeWidth: 20,
    stroke: "#ffcc00",
};

const styleLine4 = {
    strokeWidth: 3,
    stroke: "gray",
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
            ...styleLine2,
        },
    },
    {
        id: "LineTankLeft1-LineTankLeft2",
        source: "LineTankLeft1",
        target: "LineTankLeft2",
        type: "smoothstep",

        style: {
            ...styleLine3,
        },
    },

    {
        id: "LineTankRight1-LineTankRight2",
        source: "LineTankRight1",
        target: "LineTankRight2",
        type: "smoothstep",

        style: {
            ...styleLine3,
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
        id: "line5-line5_1",
        source: "line5",
        target: "line5_1",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },
    {
        id: "line4-line4_1",
        source: "line4",
        target: "line4_1",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },
    {
        id: "line3-line3_1",
        source: "line3",
        target: "line3_1",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },
    {
        id: "line3_1-line_Top_6",
        source: "line3_1",
        target: "line_Top_6",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },

    {
        id: "line4_1-line_Top_6",
        source: "line4_1",
        target: "line_Top_6",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },
    {
        id: "line5_1-line_Top_6",
        source: "line5_1",
        target: "line_Top_6",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },
    {
        id: "line_Top_6-line6",
        source: "line_Top_6",
        target: "line6",
        type: "smoothstep",

        style: {
            ...styleLine1,
        },
    },
    {
        id: "GAUGE1_none-GAUGE1_DATA",
        source: "GAUGE1_none",
        target: "GAUGE1_DATA",
        type: "smoothstep",

        style: {
            ...styleLine4,
        },
    },
    {
        id: "GAUGE2_none-GAUGE2_DATA",
        source: "GAUGE2_none",
        target: "GAUGE2_DATA",
        type: "smoothstep",

        style: {
            ...styleLine4,
        },
    },
    // {
    //     id: "line5-line5_1",
    //     source: "line5",
    //     target: "line5_1",
    //     type: "smoothstep",

    //     style: {
    //         ...styleLine1,
    //     },
    // },


 
]