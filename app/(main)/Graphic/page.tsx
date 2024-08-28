"use client";
import React, { useEffect, useState } from "react";
import DemoFlowOTS from "../OTSUKA/demoGraphicOtsuka/demoFlowOTS";
import { MegaMenu } from "primereact/megamenu";
import GraphicPRU from "../PRU/GraphicPRU/GraphicPRU";
import GraphicZOCV from "../ZOVC/GraphicZOVC/graphicZOVC";
import AlarmOTSUKA from "@/layout/AlarmBell/AlarmOTSUKA";
import GraphicARAKAWA from "../ARAKAWA/GraphicArakawa/graphicARAKAWA";
import GraphicSPMCV from "../SPMCV/GraphicSPMCV/graphicSPMCV";
import SetUpdata_Meiko from "../SetupData/Meiko/SetUpdata_Meiko";
import Graphic_MEIKO from "./MEIKO/GraphicMeiko/Graphic_MEIKO";
import GraphicOTSUKA from "@/app/listGraphic/OTSUKA/Graphic-OTSUKA";
import Graphic_OTSUKA from "./OTSUKA/demoGraphicOtsuka/Graphic_OTSUKA";
import TestFullScreen from "../TestFullScreen/page";
import "./GraphicSogec.css";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Graphic_CNG_HUNGYEN from "../CNG_HUNGYEN/GraphicPRU/Graphic_CNG_HUNGYEN";
import Graphic_CNG_BINHDUONG from "../CNG_BINHDUONG/GraphicPRU/Graphic_CNG_BINHDUONG";
import GraphicVREC from "../VREC/GraphicVREC/graphicVREC";
import GraphicYOSHINO from "../YOSHINO/GraphicVREC/graphicYOSHINO";
import GraphicKOA from "../KOA/GraphicKOA/graphicKOA";
import GraphicLGDS from "../LGDS/GraphicLGDS/graphicLGDS";
import GraphicNITORI from "../NITORI/GraphicNITORI/graphicNITORI";
import GraphicIGUACU from "../IGUACU/GraphicIGUACU/graphicIGUACU";
import Graphic_SNG_BINHDUONG from "../SNG/SNG_BINHDUONG/Graphic_SNG_BINHDUONG/Graphic_SNG_BINHDUONG";
import Graphic_SNG_HUNGYEN from "../SNG/SNG_HUNGYEN/Graphic_SNG_HUNGYEN/Graphic_SNG_HUNGYEN";
import TestGraphicSogec from "./TestGraphicSogec";
import Graphic_SNG_BD from "../SNG/SNG_BD/Graphic_SNG_HUNGYEN/Graphic_SNG_BD";

export default function GraphicSogec() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreenToggle = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Escape") {
            setIsFullscreen(false);
        }
    };
    useEffect(() => {
        if (isFullscreen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isFullscreen]);

    const [activeComponent, setActiveComponent] = useState<React.ReactNode>(
        <GraphicLGDS />
    );
    const [NG, setNG] = useState<string>("LGDS");
    const [SNG, setSNG] = useState<string>("SNG");

    const [CNG, setCNG] = useState<string>("CNG");
    const [LPG, setLPG] = useState<string>("LPG");
    const NG_Click = (component: React.ReactNode, newLabel?: string) => {
        if (component === null && newLabel) {
            setActiveComponent(
                <h2 style={{ textAlign: "center" }}> {newLabel} Updating...</h2>
            );
        } else {
            setActiveComponent(component);
        }
        if (newLabel) {
            setNG(newLabel);
        }
        setCNG("CNG");
        setSNG("SNG");
        setLPG("LPG");
    };

    const CNG_CLICK = (component: React.ReactNode, newLabel?: string) => {
        if (component === null && newLabel) {
            setActiveComponent(
                <h2 style={{ textAlign: "center" }}> {newLabel} Updating...</h2>
            );
        } else {
            setActiveComponent(component);
        }
        if (newLabel) {
            setCNG(newLabel);
        }
        setNG("NG");
        setSNG("SNG");
        setLPG("LPG");
    };

    const SNG_Click = (component: React.ReactNode, newLabel?: string) => {
        if (component === null && newLabel) {
            setActiveComponent(
                <h2 style={{ textAlign: "center" }}> {newLabel} Updating...</h2>
            );
        } else {
            setActiveComponent(component);
        }
        if (newLabel) {
            setSNG(newLabel);
        }
        setNG("NG");
        setCNG("CNG");
        setLPG("LPG");
    };

    const LPG_Click = (component: React.ReactNode, newLabel?: string) => {
        if (component === null && newLabel) {
            setActiveComponent(
                <h2 style={{ textAlign: "center" }}> {newLabel} Updating...</h2>
            );
        } else {
            setActiveComponent(component);
        }
        if (newLabel) {
            setLPG(newLabel);
        }
        setNG("NG");
        setCNG("CNG");
        setSNG("SNG");
    };

    const stationList = {
        stationList: "Station list",
    };

    const items = [
        {
            label: NG,
            icon: "pi pi-box",
            items: [
                [
                    {
                        label: stationList.stationList,
                        items: [
                            // { label: 'Test', command: () => handleItemClick(<AlarmOTSUKA />, 'Test') },

                            {
                                label: "LGDS",
                                command: () =>
                                    NG_Click(<GraphicLGDS />, "LGDS"),
                            },
                            {
                                label: "ZOCV",
                                command: () =>
                                    NG_Click(<GraphicZOCV />, "ZOCV "),
                            },
                            {
                                label: "KOA",
                                command: () => NG_Click(<GraphicKOA />, "KOA"),
                            },
                            {
                                label: "NITORI",
                                command: () =>
                                    NG_Click(<GraphicNITORI />, "NITORI"),
                            },
                            {
                                label: "YOSHINO",
                                command: () =>
                                    NG_Click(<GraphicYOSHINO />, "YOSHINO"),
                            },
                            {
                                label: "IGUACU",
                                command: () =>
                                    NG_Click(<GraphicIGUACU />, "IGUACU"),
                            },
                            {
                                label: "ARAKAWA",
                                command: () =>
                                    NG_Click(<GraphicARAKAWA />, "ARAKAWA"),
                            },
                            {
                                label: "SPMCV",
                                command: () =>
                                    NG_Click(<GraphicSPMCV />, "SPMCV"),
                            },
                            {
                                label: "VREC",
                                command: () =>
                                    NG_Click(<GraphicVREC />, "VREC"),
                            },
                            {
                                label: "OTSUKA",
                                command: () =>
                                    NG_Click(<DemoFlowOTS />, "OTSUKA"),
                            },
                        ],
                    },
                ],
            ],
        },
        {
            label: SNG,
            icon: "pi pi-box",
            items: [
                [
                    {
                        label: stationList.stationList,
                        items: [
                            {
                                label: " SNG BINH DUONG",
                                command: () =>
                                    SNG_Click(
                                        <Graphic_SNG_BD />,
                                        " SNG BINH DUONG"
                                    ),
                            },
                            {
                                label: " SNG HUNG YEN",
                                command: () =>
                                    SNG_Click(
                                        <Graphic_SNG_HUNGYEN />,
                                        " SNG HUNG YEN"
                                    ),
                            },
                        ],
                    },
                ],
            ],
        },

        {
            label: CNG,
            icon: "pi pi-box",
            items: [
                [
                    {
                        label: stationList.stationList,
                        items: [
                            {
                                label: "CNG PHU MY 3",
                                command: () =>
                                    CNG_CLICK(<GraphicPRU />, "CNG PHU MY 3 "),
                            },

                            {
                                label: "CNG BINH DUONG",
                                command: () =>
                                    CNG_CLICK(
                                        <Graphic_CNG_BINHDUONG />,
                                        "CNG BINH DUONG "
                                    ),
                            },
                            {
                                label: "CNG HUNG YEN",
                                command: () =>
                                    CNG_CLICK(
                                        <Graphic_CNG_HUNGYEN />,
                                        "CNG HUNG YEN "
                                    ),
                            },
                        ],
                    },
                ],
            ],
        },

        {
            label: LPG,
            icon: "pi pi-box",
            items: [
                [
                    {
                        label: stationList.stationList,
                        items: [
                            {
                                label: "MEIKO",
                                command: () =>
                                    LPG_Click(<Graphic_MEIKO />, "MEIKO "),
                            },

                            // { label: 'Test', command: () => LPG_Click(<AlarmOTSUKA/>, 'Test ') },

                            // { label: 'Test', command: () => LPG_Click(<TestGraphicSogec/>, 'Test ') },
                        ],
                    },
                ],
            ],
        },
    ];

    return (
        <>
            <MegaMenu model={items} style={{ borderRadius: 5 }} />

            {!isFullscreen && (
                <div
                    className=""
                    style={{
                        position: "absolute",
                        top: "100px",
                        right: "40px",
                        cursor: "pointer",
                        width: 40,
                        height: 40,
                        textAlign: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                    }}
                >
                    <MdOutlineZoomOutMap
                        style={{ marginTop: 3 }}
                        size={35}
                        className="GraphicSogec"
                        onClick={handleFullscreenToggle}
                    />
                </div>
            )}
            <div
                style={{ height: "100%" }}
                id="component"
                className={isFullscreen ? "fullscreen" : ""}
            >
                {activeComponent}
                {isFullscreen && (
                    <button
                        onClick={handleFullscreenToggle}
                        className="exit-button"
                    ></button>
                )}
            </div>

        </>
    );
}
