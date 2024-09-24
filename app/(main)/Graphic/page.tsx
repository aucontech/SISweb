"use client";
import React, { useEffect, useState } from "react";
import DemoFlowOTS from "../OTSUKA/demoGraphicOtsuka/demoFlowOTS";
import { MegaMenu } from "primereact/megamenu";
import GraphicPRU from "../PRU/GraphicPRU/GraphicPRU";
import GraphicZOCV from "../ZOVC/GraphicZOVC/graphicZOVC";
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
import BallVavle_Line2_Bottom from "../CNG_HUNGYEN/BallVavlePRU/BallVavle_Line2_Bottom";
import VrecTest from "../VREC/GraphicVREC/VrecTest";
import GraphicStaion1 from "../LGDS/GraphicStation1/graphicStaion1";

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
        <GraphicStaion1 />
    );
    const [NG, setNG] = useState<string>("Sarawak");
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
                            { label: 'Sarawak', command: () => NG_Click(<GraphicStaion1 />, 'Sarawak') },
                        
                            {
                                label: "Pasir Gudang CG",
                                command: () =>
                                    NG_Click(<GraphicLGDS />, "Pasir Gudang CG"),
                            },
                            {
                                label: "Melaka",
                                command: () =>
                                    NG_Click(<GraphicZOCV />, "Melaka "),
                            },
                            {
                                label: "Pengerang",
                                command: () => NG_Click(<GraphicKOA />, "Pengerang"),
                            },
                            {
                                label: "Kota Kinabalu",
                                command: () =>
                                    NG_Click(<GraphicNITORI />, "	Kota Kinabalu"),
                            },
                            {
                                label: "Selangor",
                                command: () =>
                                    NG_Click(<GraphicYOSHINO />, "Selangor"),
                            },
                            {
                                label: "Sabah",
                                command: () =>
                                    NG_Click(<GraphicIGUACU />, "Sabah"),
                            },
                            {
                                label: "Penang",
                                command: () =>
                                    NG_Click(<GraphicARAKAWA />, "Penang"),
                            },
                            {
                                label: "Johor",
                                command: () =>
                                    NG_Click(<GraphicSPMCV />, "Johor"),
                            },
                            {
                                label: "Perlis",
                                command: () =>
                                    NG_Click(<GraphicVREC />, "Perlis"),
                            },
                            // {
                            //     label: "Melaka",
                            //     command: () =>
                            //         NG_Click(<DemoFlowOTS />, "Melaka"),
                            // },
                            // {
                            //     label: "TestMEIKO",
                            //     command: () =>
                            //         NG_Click(<BallVavle_Line2_Bottom />, "TestMEIKO"),
                            // },
                            
                        ],
                    },
                ],
            ],
        },
        // {
        //     label: SNG,
        //     icon: "pi pi-box",
        //     items: [
        //         [
        //             {
        //                 label: stationList.stationList,
        //                 items: [
        //                     {
        //                         label: " SNG BINH DUONG",
        //                         command: () =>
        //                             SNG_Click(
        //                                 <Graphic_SNG_BINHDUONG />,
        //                                 " SNG BINH DUONG"
        //                             ),
        //                     },
        //                     {
        //                         label: " SNG HUNG YEN",
        //                         command: () =>
        //                             SNG_Click(
        //                                 <Graphic_SNG_HUNGYEN />,
        //                                 " SNG HUNG YEN"
        //                             ),
        //                     },
        //                 ],
        //             },
        //         ],
        //     ],
        // },

        // {
        //     label: CNG,
        //     icon: "pi pi-box",
        //     items: [
        //         [
        //             {
        //                 label: stationList.stationList,
        //                 items: [
        //                     {
        //                         label: "CNG PHU MY 3",
        //                         command: () =>
        //                             CNG_CLICK(<GraphicPRU />, "CNG PHU MY 3 "),
        //                     },

        //                     {
        //                         label: "CNG BINH DUONG",
        //                         command: () =>
        //                             CNG_CLICK(
        //                                 <Graphic_CNG_BINHDUONG />,
        //                                 "CNG BINH DUONG "
        //                             ),
        //                     },
        //                     {
        //                         label: "CNG HUNG YEN",
        //                         command: () =>
        //                             CNG_CLICK(
        //                                 <Graphic_CNG_HUNGYEN />,
        //                                 "CNG HUNG YEN "
        //                             ),
        //                     },
        //                 ],
        //             },
        //         ],
        //     ],
        // },

        // {
        //     label: LPG,
        //     icon: "pi pi-box",
        //     items: [
        //         [
        //             {
        //                 label: stationList.stationList,
        //                 items: [
        //                     {
        //                         label: "MEIKO",
        //                         command: () =>
        //                             LPG_Click(<Graphic_MEIKO />, "MEIKO "),
        //                     },

        //                     // { label: 'Test', command: () => LPG_Click(<AlarmOTSUKA/>, 'Test ') },

        //                     // { label: 'Test', command: () => LPG_Click(<TestGraphicSogec/>, 'Test ') },
        //                 ],
        //             },
        //         ],
        //     ],
        // },
    ];

    return (
        <>
            <MegaMenu model={items} style={{ borderRadius: 5 }} />

            {!isFullscreen && (
                <div
                    className=""
                    style={{
                        position: "absolute",
                        top: "70px",
                        right: "30px",
                        cursor: "pointer",
                        width: 25,
                        height: 25,
                        textAlign: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                    }}
                >
                    <MdOutlineZoomOutMap
                        style={{ marginTop: 3 }}
                        size={30}
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
