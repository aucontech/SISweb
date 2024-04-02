import { MarkerType } from "reactflow";

const styleLine = {
    strokeWidth: 2,
    stroke: "#FFF",
};

const markerType = {
    type: MarkerType.ArrowClosed,
    width: 7,
    height: 7,
    color: "#036E9B",
};

export const initialEdges = [
    {
        id: "station-pipeSVD",
        source: "station",
        target: "pipeSVD",
        // animated: true,

        style: {
            ...styleLine,
        },
    },
    {
        id: "station-pipeSmall",
        source: "station",
        target: "pipeSmall",
        type: "smoothstep",
        // animated: true,

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeSmall-pipeSVD",
        source: "pipeSmall",
        target: "pipeSVD",
        type: "smoothstep",
        // animated: true,
        markerEnd: {
            ...markerType,
        },

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeSmall2-pipeSVD",
        source: "pipeSmall2",
        target: "pipeMark",
        type: "smoothstep",
        // animated: true,

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeSVD-pipeSmall2",
        source: "pipeSVD",
        target: "pipeSmall2",
        // animated: true,

        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "Tank-pipeSVD",
        source: "pipeSVD",
        target: "TankSVG",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "HalfCricle-Tank",
        source: "halfCricle",
        target: "TankSVG",
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "Tank-epipeSVD",
        source: "TankSVG",
        target: "pipeMark",
        // animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },

    {
        id: "pipeMark-gauges",
        source: "pipeMark",
        target: "gauges",
        // animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },

    {
        id: "pipeMark-gauges",
        source: "pipeMark",
        target: "gauges",
        // animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },

    {
        id: "pipeMark-gauges2",
        source: "pipeMark",
        target: "gauges2",
        // animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },

    {
        id: "gauges-FIQ",
        source: "gauges",
        target: "FIQ",
        animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "gauges-bara1",
        source: "gauges",
        target: "bara1",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "gauges2-bara2",
        source: "gauges2",
        target: "bara2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "FIQ-1",
        source: "FIQ",
        target: "1",
        animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },
    {
        id: "FIQ2-2",
        source: "FIQ2",
        target: "2",
        animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },
    {
        id: "FIQ-coupling2",
        source: "FIQ",
        target: "coupling2",
        animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "gauges2-FIQ2",
        source: "gauges2",
        target: "FIQ2",
        animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "gauges2-coupling",
        source: "gauges2",
        target: "coupling",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "gauges3-bara3",
        source: "gauges3",
        target: "bara3",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "coupling-coupling2",
        source: "coupling",
        target: "coupling2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "FIQ2-pipeMark2",
        source: "FIQ2",
        target: "pipeMark2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "coupling2-pipeMark2",
        source: "coupling2",
        target: "pipeMark2",
        // animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeMark2-pipeEnd",
        source: "pipeMark2",
        target: "pipeEnd",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeMark2-pipeEnd2",
        source: "pipeMark2",
        target: "pipeEnd2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeEnd-pipeMark3",
        source: "pipeEnd",
        target: "pipeMark3",
        // animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeEnd2-pipeMark3",
        source: "pipeEnd2",
        target: "pipeMark3",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeMark3-gauges3",
        source: "pipeMark3",
        target: "gauges3",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeMark3-halfCricle2",
        source: "pipeMark3",
        target: "halfCricle2",
        // animated: true,
        type: "smoothstep",

        style: {
            ...styleLine,
        },
    },
    {
        id: "pipeMark3-gasout",
        source: "pipeMark3",
        target: "gasout",
        // animated: true,
        type: "smoothstep",
        markerEnd: {
            ...markerType,
        },
        style: {
            ...styleLine,
        },
    },
];
