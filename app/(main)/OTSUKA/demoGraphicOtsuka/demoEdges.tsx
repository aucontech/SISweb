import { MarkerType } from "reactflow";

const styleLine = {
    strokeWidth: 18,
    stroke: "#ffaa00",
};

const styleHide = {
    strokeWidth: 6,
    stroke: "#ffaa00",
}



export const DemoEdges = [
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
        animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "SDV_Ball-SDV_None",
        source: "SDV_Ball",
        target: "SDV_None",
        animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "Tank_None-Tank_Ball",
        source: "Tank_None",
        target: "Tank_Ball",
        animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "Tank_Ball-Tank_None",
        source: "Tank_Ball",
        target: "Tank_None",
        animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "line9-BallValueCenter_None",
        source: "line9",
        target: "BallValueCenter_None",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "line10-BallValueCenter_None2",
        source: "BallValueCenter_None2",
        target: "line10",
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
        id: "FIQ_1901-Pressure_Trans01",
        source: "FIQ_1901",
        target: "Pressure_Trans01",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "FIQ_1902-Pressure_Trans02",
        source: "FIQ_1902",
        target: "Pressure_Trans02",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "FIQ_1901-Temperature_Trans01",
        source: "FIQ_1901",
        target: "Temperature_Trans01",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "FIQ_1902-Temperature_Trans02",
        source: "FIQ_1902",
        target: "Temperature_Trans02",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
];
