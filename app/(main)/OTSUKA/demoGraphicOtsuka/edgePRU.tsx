import { MarkerType } from "reactflow";

const styleLine = {
    strokeWidth: 20,
    stroke: "#ffff00",
};

const styleHide = {
    strokeWidth: 6,
    stroke: "#ffff00",
}
const styleBallSmall = {
    strokeWidth: 3,
    stroke: "#000",
}


export const DemoPRU = [
    {
        id: "line1-line2",
        source: "line1",
        target: "line2",
        // animated: true,
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
        // animated: true,
        

        style: {
            ...styleLine,
        },
    },

   
    {
        id: "line2-line4",
        source: "line2",
        target: "line4",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line3-line5",
        source: "line3",
        target: "line5",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line4-line6",
        source: "line4",
        target: "line6",
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },

    {
        id: "line5-line7",
        source: "line5",
        target: "line7",
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },

    {
        id: "line6-line6",
        source: "line6",
        target: "line7",
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },

    {
        id: "line7-line8",
        source: "line7",
        target: "line8",
        type: "smoothstep",
        // animated: true,
        
        style: {
            ...styleLine,
        },
    },

    {
        id: "line7-line9",
        source: "line7",
        target: "line9",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line8-line10",
        source: "line8",
        target: "line10",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line9-line11",
        source: "line9",
        target: "line11",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
   
    {
        id: "line10-line12",
        source: "line10",
        target: "line12",
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "line11-line12",
        source: "line11",
        target: "line12",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line12-line13",
        source: "line12",
        target: "line13",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "SDV_None-SDV_Ball",
        source: "SDV_None",
        target: "SDV_Ball",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "SDV_Ball-SDV_None",
        source: "SDV_Ball",
        target: "SDV_None",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "Tank_None-Tank_Ball",
        source: "Tank_None",
        target: "Tank_Ball",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "Tank_Ball-Tank_None",
        source: "Tank_Ball",
        target: "Tank_None",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "line4-BallValueCenter_None",
        source: "line4",
        target: "BallValueCenter_None",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "line5-BallValueCenter_None2",
        source: "BallValueCenter_None2",
        target: "line5",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "PSV_None01-PSV_None02",
        source: "PSV_None01",
        target: "PSV_None02",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "PSV_None03-PSV_None04",
        source: "PSV_None03",
        target: "PSV_None04",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    }, 
    {
        id: "PSV_None04-PSV01",
        source: "PSV_None04",
        target: "PSV01",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    }, 
     {
        id: "FIQ_none11-data1",
        source: "FIQ_none11",
        target: "data1",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },

   
    {
        id: "PCV_none1-PCV_NUM01",
        source: "PCV_none1",
        target: "PCV_NUM01",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },
    {
        id: "PCV_none2-PCV_NUM02",
        source: "PCV_none2",
        target: "PCV_NUM02",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },

    {
        id: "FIQ_none22-FIQ_1902",
        source: "FIQ_none22",
        target: "FIQ_1902",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },
   
    {
        id: "PCV_none1-PCV_NUM01",
        source: "PCV_none1",
        target: "PCV_NUM01",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },
    {
        id: "PCV_none2-PCV_NUM02",
        source: "PCV_none2",
        target: "PCV_NUM02",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },

    {
        id: "GD_none1-GD1_Value1901",
        source: "GD_none1",
        target: "GD1_Value1901",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },
   
    {
        id: "GD_none2-GD2_Value1902",
        source: "GD_none2",
        target: "GD2_Value1902",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },
    {
        id: "GD_none3-GD3_Value1903",
        source: "GD_none3",
        target: "GD3_Value1903",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },

    {
        id: "PT_none1-Pressure_Trans01",
        source: "PT_none1",
        target: "Pressure_Trans01",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },
   
    {
        id: "PT_none2-Pressure_Trans02",
        source: "PT_none2",
        target: "Pressure_Trans02",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },
    {
        id: "PT_none3-Pressure_Trans03",
        source: "PT_none3",
        target: "Pressure_Trans03",
        // animated: true,
        type: "smoothstep",

        strokeWidth: 1,
        stroke: "gray",
    },

    {
        id: "PCV_ballVavle_Small1_none1-PCV_ballVavle_Small2_none1",
        source: "PCV_ballVavle_Small1_none1",
        target: "PCV_ballVavle_Small2_none1",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall
        }
    },

    {
        id: "PCV_ballVavle_Small1_none2-PCV_ballVavle_Small2_none2",
        source: "PCV_ballVavle_Small1_none2",
        target: "PCV_ballVavle_Small2_none2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall
        }
    },
];
