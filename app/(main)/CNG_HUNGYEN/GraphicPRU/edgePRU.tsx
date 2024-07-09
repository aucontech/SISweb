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
        id: "line9-line10",
        source: "line9",
        target: "line10",
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
        id: "PIT_3001A_DATA-PIT_3001A_NONE",
        source: "PIT_3001A_DATA",
        target: "PIT_3001A_NONE",
        type: "smoothstep",

     
        
    },
    {
        id: "PIT_3001B_DATA-PIT_3001B_NONE",
        source: "PIT_3001B_DATA",
        target: "PIT_3001B_NONE",
        type: "smoothstep",

     
        
    },
     {
        id: "PT_3001_DATA-PT_3001_NONE",
        source: "PT_3001_DATA",
        target: "PT_3001_NONE",
        type: "smoothstep",

     
        
    },
    {
        id: "PT_3002_DATA-PT_3002_NONE",
        source: "PT_3002_DATA",
        target: "PT_3002_NONE",
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
        id: "PCV_3001B_none-PCV_3001B_none2",
        source: "PCV_3001B_none",
        target: "PCV_3001B_none2",
        type: "smoothstep",

     
        
    },

    {
        id: "PCV_3001A_none-PCV_3001A_none2",
        source: "PCV_3001A_none",
        target: "PCV_3001A_none2",
        type: "smoothstep",

     
        
    },
    {
        id: "PCV_6002B_DATA-PCV_line1_Bottom_none2",
        source: "PCV_line1_Bottom_none",
        target: "PCV_line1_Bottom_none2",
        type: "smoothstep",

     
        
    },
    {
        id: "PCV_6001A_none2-PCV_6001A_none",
        source: "PCV_6001A_none2",
        target: "PCV_6001A_none",
        type: "smoothstep",
    },

    {
        id: "PCV_6001B_none-PCV_6001B_none2",
        source: "PCV_6001B_none",
        target: "PCV_6001B_none2",
        type: "smoothstep",
    },

    {
        id: "EVC_01_Pressure_DATA-EVC_01_Pressure_NONE",
        source: "EVC_01_Pressure_DATA",
        target: "EVC_01_Pressure_NONE",
        type: "smoothstep",
    },

    {
        id: "EVC_02_Pressure_DATA-EVC_02_Pressure_NONE",
        source: "EVC_02_Pressure_NONE" ,
        target: "EVC_02_Pressure_DATA",
        type: "smoothstep",
    },


    {
        id: "EVC_01_Temperature_NONE-EVC_01_Temperature_DATA",
        source: "EVC_01_Temperature_DATA" ,
        target: "EVC_01_Temperature_NONE",
        type: "smoothstep",
    },

    {
        id: "EVC_02_Temperature_NONE-EVC_02_Temperature_DATA",
        source: "EVC_02_Temperature_DATA",
        target: "EVC_02_Temperature_NONE",
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

    {
        id: "TT_3001_NONE-TT_3001_DATA",
        source: "TT_3001_NONE",
        target: "TT_3001_DATA",
        type: "smoothstep",
    },

    {
        id: "PT_3003_NONE-PT_3003_DATA",
        source: "PT_3003_NONE",
        target: "PT_3003_DATA",
        type: "smoothstep",
    },

    {
        id: "FIQ_3001A-EVC_01_Flow_at_Base_Condition",
        source: "FIQ_3001A",
        target: "EVC_01_Flow_at_Base_Condition",
        type: "smoothstep",
    },


    {
        id: "FIQ_3001B-EVC_02_Flow_at_Base_Condition",
        source: "FIQ_3001B",
        target: "EVC_02_Flow_at_Base_Condition",
        type: "smoothstep",
    },

    {
        id: "line9none-line10none",
        source: "line9none",
        target: "line10none",
        type: "smoothstep",
        style: {
            ...styleLine3,
        },
    },
]