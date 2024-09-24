import { MarkerType } from "reactflow";

const styleLine = {
    strokeWidth: 14,
    stroke: "orange",
};


const styleLinePSV_Small = {
    strokeWidth: 9,
    stroke: "orange",
};

const styleHide = {
    strokeWidth: 9,
    stroke: "orange",
}
const styleBallSmall = {
    strokeWidth: 2,
    stroke: "#000",
}


export const edgeZOVC = [
    {
        id: "line1-line3",
        source: "line1",
        target: "line3",
        // animated: true,
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
        // animated: true,
        

        style: {
            ...styleLine,
        },
    },

    {
        id: "line4-line5",
        source: "line4",
        target: "line5",
        type: "smoothstep",
        // animated: true,
        

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
        id: "line5-line6",
        source: "line5",
        target: "line6",
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
        id: "line10-line11",
        source: "line10",
        target: "line11",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line11-line12",
        source: "line11",
        target: "line12",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
   
    // {
    //     id: "line13-line14",
    //     source: "line13",
    //     target: "line14",
    //     // animated: true,
    //     type: "smoothstep",

    //     style: {
    //         ...styleLine,
    //     },
    // },
    {
        id: "line9-line14",
        source: "line9",
        target: "line14",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line15-line14",
        source: "line15",
        target: "line14",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line14-line13",
        source: "line14",
        target: "line13",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line15-line16",
        source: "line15",
        target: "line16",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line17-line15",
        source: "line17",
        target: "line15",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line16-line18",
        source: "line16",
        target: "line18",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line18-line17",
        source: "line18",
        target: "line17",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },


    {
        id: "line19-line20",
        source: "line19",
        target: "line20",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line21-line22",
        source: "line21",
        target: "line22",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },


    {
        id: "line22-line23",
        source: "line22",
        target: "line23",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line23-line24",
        source: "line23",
        target: "line24",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "line24-line21",
        source: "line24",
        target: "line21",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },


    {
        id: "line25-line26",
        source: "line25",
        target: "line26",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "line26-line27",
        source: "line26",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },


    {
        id: "SDV_NON1-SDV_NON2",
        source: "SDV_NON1",
        target: "SDV_NON2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },

    {
        id: "SDV_NON2-SDV_NON1",
        source: "SDV_NON2",
        target: "SDV_NON1",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "SDV_NON4-SDV_NON3",
        source: "SDV_NON4",
        target: "SDV_NON3",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },

    {
        id: "SDV_NON3-SDV_NON4",
        source: "SDV_NON3",
        target: "SDV_NON4",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },

    {
        id: "line_center1-line_center2",
        source: "line_center1",
        target: "line_center2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },
    {
        id: "line_center3-line_center4",
        source: "line_center3",
        target: "line_center4",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleHide,
        },
    },



    {
        id: "FIQ_2_NON-data1",
        source: "FIQ_2_NON",
        target: "data1",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },


    {
        id: "FIQ_1_NON-data5",
        source: "FIQ_1_NON",
        target: "data5",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },

    {
        id: "PT_COL_1-Pressure_Trans01",
        source: "PT_COL_1",
        target: "Pressure_Trans01",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },

    {
        id: "PT_COL_2-Pressure_Trans02",
        source: "PT_COL_2",
        target: "Pressure_Trans02",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },



    {
        id: "PCV1_none1-PCV2_none1",
        source: "PCV1_none1",
        target: "PCV2_none1",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },

    {
        id: "PCV1_none2-PCV2_none2",
        source: "PCV1_none2",
        target: "PCV2_none2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },

    {
        id: "PCV1_none1-PCV_NUM01",
        source: "PCV1_none1",
        target: "PCV_NUM01",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },
    {
        id: " PCV_NUM02-PCV1_none2",
        source: "PCV_NUM02",
        target: "PCV1_none2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleBallSmall,
        },
    },


    {
        id: "line27-Station2",
        source: "line27",
        target: "Station2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "Station3-line27",
        source: "Station3",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "Station4-line27",
        source: "Station4",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "Station5-line27",
        source: "Station5",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "Station6-line27",
        source: "Station6",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "Station7-line27",
        source: "Station7",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },

    {
        id: "Station8-line27",
        source: "Station8",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "Station9-line27",
        source: "Station9",
        target: "line27",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },


    {
        id: "line28-line29",
        source: "line28",
        target: "line29",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
];
