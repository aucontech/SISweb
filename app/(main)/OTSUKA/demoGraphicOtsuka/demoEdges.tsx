import { MarkerType } from "reactflow";

const styleLine = {
    strokeWidth: 10,
    stroke: "#999999",
};

const styleHide = {
    strokeWidth: 3,
    stroke: "#999999",
}

const markerType = {
    type: MarkerType.ArrowClosed,
    width: 7,
    height: 7,
    color: "#036E9B",
};

export const DemoEdges = [
    {
        id: "a1-a2",
        source: "a1",
        target: "a2",
        // animated: true,

        style: {
            ...styleLine,
        },
    },
  
    {
        id: "a2-a3",
        source: "a2",
        target: "a3",
        type: "smoothstep",
        // animated: true,
        

        style: {
            ...styleLine,
        },
    },
   
   
    {
        id: "a3-a6",
        source: "a3",
        target: "a6",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a3-a9",
        source: "a3",
        target: "a9",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a5a3-a5",
        source: "a5a3",
        target: "a5",
        animated: true,
        type: "smoothstep",
        
        style: {
            ...styleHide,
        },
    },

    {
        id: "a2a4-a4",
        source: "a2a4",
        target: "a4",
        animated: true,
        type: "smoothstep",
        
        style: {
            ...styleHide,
        },
    },

    {
        id: "a4-a2a4",
        source: "a4",
        target: "a2a4",
        animated: true,
        type: "smoothstep",
        
        style: {
            ...styleHide,
        },
    },

    {
        id: "a5a3-a5",
        source: "a5a3",
        target: "a5",
        animated: true,
        type: "smoothstep",
        
        style: {
            ...styleHide,
        },
    },

    {
        id: "a5-a5a3",
        source: "a5",
        target: "a5a3",
        animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "a6-a8",
        source: "a6",
        target: "a8",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a9-a11",
        source: "a9",
        target: "a11",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a8a11-a11a8",
        source: "a8a11",
        target: "a11a8",
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "a8-a12",
        source: "a8",
        target: "a12",
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "a11-a14",
        source: "a11",
        target: "a14",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a12-a13",
        source: "a12",
        target: "a13",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a14-a15",
        source: "a14",
        target: "a15",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a13-a1313",
        source: "a13",
        target: "a1313",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a13-a16",
        source: "a13",
        target: "a16",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a16-a17",
        source: "a16",
        target: "a17",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "a16-a16",
        source: "a16",
        target: "a16",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "TM1-data1",
        source: "TM1",
        target: "data1",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "TM1-data2",
        source: "TM1",
        target: "data2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "TM1-data3",
        source: "TM1",
        target: "data3",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "TM1-data4",
        source: "TM1",
        target: "data4",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "TM2-data5",
        source: "TM2",
        target: "data5",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "TM2-data5",
        source: "TM2",
        target: "data6",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "TM2-data5",
        source: "TM2",
        target: "data7",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "TM2-data5",
        source: "TM2",
        target: "data8",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "a13_BallCenter-BallCenter",
        source: "a13_BallCenter",
        target: "BallCenter",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
    {
        id: "BallCenter-a14_BallCenter",
        source: "BallCenter",
        target: "a14_BallCenter",
        // animated: true,
        type: "smoothstep",
        
        style: {
            ...styleLine,
        },
    },
];
