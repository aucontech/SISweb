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


    {
        id: "PSV_LINE3_TOP_NONE1-PSV_LINE3_TOP_NONE2",
        source: "PSV_LINE3_TOP_NONE1",
        target: "PSV_LINE3_TOP_NONE2",
        type: "smoothstep",

        style: {
            ...styleLine3,
        },
        
    },
    {
        id: "PSV_LINE3_BOTTOM_NONE1-PSV_LINE3_BOTTOM_NONE2",
        source: "PSV_LINE3_BOTTOM_NONE1",
        target: "PSV_LINE3_BOTTOM_NONE2",
        type: "smoothstep",

        style: {
            ...styleLine3,
        },
        
    },


    {
        id: "PSV_LINE2_TOP_NONE1-PSV_LINE2_TOP_NONE2",
        source: "PSV_LINE2_TOP_NONE1",
        target: "PSV_LINE2_TOP_NONE2",
        type: "smoothstep",

        style: {
            ...styleLine2,
        },
        
    },

    {
        id: "PSV_LINE2_BOTTOM_NONE1-PSV_LINE2_BOTTOM_NONE2",
        source: "PSV_LINE2_BOTTOM_NONE1",
        target: "PSV_LINE2_BOTTOM_NONE2",
        type: "smoothstep",

        style: {
            ...styleLine2,
        },
        
    },

    {
        id: "PIT_6001A_DATA-PIT_6001A_NONE",
        source: "PIT_6001A_DATA",
        target: "PIT_6001A_NONE",
        type: "smoothstep",

     
        
    },
    {
        id: "PIT_6001B_DATA-PIT_6001B_NONE",
        source: "PIT_6001B_DATA",
        target: "PIT_6001B_NONE",
        type: "smoothstep",

     
        
    },
     {
        id: "PIT_6002A_DATA-PIT_6002A_NONE",
        source: "PIT_6002A_DATA",
        target: "PIT_6002A_NONE",
        type: "smoothstep",

     
        
    },
    {
        id: "PIT_6002B_DATA-PIT_6002B_NONE",
        source: "PIT_6002B_DATA",
        target: "PIT_6002B_NONE",
        type: "smoothstep",

     
        
    },

    {
        id: "PCV_line1_Top_none-PCV_line1_Top_none2",
        source: "PCV_line1_Top_none",
        target: "PCV_line1_Top_none2",
        type: "smoothstep",

     
        
    },


    {
        id: "PCV_line2_Top_none-PCV_line2_Top_none2",
        source: "PCV_line2_Top_none",
        target: "PCV_line2_Top_none2",
        type: "smoothstep",

     
        
    },
    {
        id: "PCV_line1_Bottom_none-PCV_line1_Bottom_none2",
        source: "PCV_line1_Bottom_none",
        target: "PCV_line1_Bottom_none2",
        type: "smoothstep",

     
        
    },
    {
        id: "PCV_line2_Bottom_none-PCV_line2_Bottom_none2",
        source: "PCV_line2_Bottom_none",
        target: "PCV_line2_Bottom_none2",
        type: "smoothstep",
    },

    {
        id: "PIT_6003B_DATA-PIT_6003B_NONE",
        source: "PIT_6003B_DATA",
        target: "PIT_6003B_NONE",
        type: "smoothstep",
    },

    {
        id: "PIT_6003A_DATA-PIT_6003A_NONE",
        source: "PIT_6003A_DATA",
        target: "PIT_6003A_NONE",
        type: "smoothstep",
    },


    {
        id: "TT_LINE3_TOP_DATA-TT_LINE3_TOP_NONE",
        source: "TT_LINE3_TOP_DATA",
        target: "TT_LINE3_TOP_NONE",
        type: "smoothstep",
    },

    {
        id: "TT_LINE3_BOTTOM_DATA-TT_LINE3_BOTTOM_NONE",
        source: "TT_LINE3_BOTTOM_DATA",
        target: "TT_LINE3_BOTTOM_NONE",
        type: "smoothstep",
    },
    {
        id: "PCV_line1_Top_none-PCV_line2_Top_DATA",
        source: "PCV_line1_Top_none",
        target: "PCV_line2_Top_DATA",
        type: "smoothstep",
    },
    {
        id: "PCV_line1_Bottom_none-PCV_line2_Bottom_DATA",
        source: "PCV_line1_Bottom_none",
        target: "PCV_line2_Bottom_DATA",
        type: "smoothstep",
    },

    {
        id: "PCV_line2_Top_none2-PCV_line3_Bottom_DATA",
        source: "PCV_line2_Top_none2",
        target: "PCV_line3_Bottom_DATA",
        type: "smoothstep",
    },

    {
        id: "PCV_line2_Bottom_none-PCV_line3_Top_DATA",
        source: "PCV_line2_Bottom_none",
        target: "PCV_line3_Top_DATA",
        type: "smoothstep",
    },
]