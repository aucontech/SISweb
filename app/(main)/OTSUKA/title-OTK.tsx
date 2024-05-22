// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
// import { useEffect, useRef, useState } from "react";
// import { httpApi } from "@/api/http.api";
// import { id_OTSUKA } from "../data-table-device/ID-DEVICE/IdDevice";
// import { readToken } from "@/service/localStorage";
// import { OverlayPanel } from "primereact/overlaypanel";
// import { DataTable } from "primereact/datatable";

// export default function SetAttribute1() {
//     const [timeEVC_01, setTimeEVC_01] = useState<any>();
//     const [timeEVC_02, setTimeEVC_02] = useState<any>();

//     const token = readToken();
//     const op = useRef<OverlayPanel>(null);
//     const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;
//     const ws = useRef<WebSocket | null>(null);

//     useEffect(() => {
//         ws.current = new WebSocket(url);

//         const obj2 = {
//             entityDataCmds: [
//                 {
//                     cmdId: 1,
//                     latestCmd: {
//                         keys: [
//                             {
//                                 type: "ATTRIBUTE",
//                                 key: "EVC_01_Battery_Expiration_Date",
//                             },
//                             {
//                                 type: "ATTRIBUTE",
//                                 key: "EVC_01_Battery_Installation_Date",
//                             },
//                         ],
//                     },
//                     query: {
//                         entityFilter: {
//                             type: "singleEntity",
//                             singleEntity: {
//                                 entityType: "DEVICE",
//                                 id: id_OTSUKA,
//                             },
//                         },
//                         pageLink: {
//                             pageSize: 1,
//                             page: 0,
//                             sortOrder: {
//                                 key: {
//                                     type: "ENTITY_FIELD",
//                                     key: "createdTime",
//                                 },
//                                 direction: "DESC",
//                             },
//                         },
//                         entityFields: [
//                             {
//                                 type: "ENTITY_FIELD",
//                                 key: "name",
//                             },
//                             {
//                                 type: "ENTITY_FIELD",
//                                 key: "label",
//                             },
//                             {
//                                 type: "ENTITY_FIELD",
//                                 key: "additionalInfo",
//                             },
//                         ],
//                         latestValues: [
//                             {
//                                 type: "ATTRIBUTE",
//                                 key: "EVC_01_Battery_Expiration_Date",
//                             },
//                             {
//                                 type: "ATTRIBUTE",
//                                 key: "EVC_01_Battery_Installation_Date",
//                             },
//                         ],
//                     },
//                 },
//             ],
//         };

//         if (ws.current) {
//             ws.current.onopen = () => {
//                 console.log("WebSocket connected");
//                 setTimeout(() => {
//                     ws.current?.send(JSON.stringify(obj2));
//                 });
//             };

//             ws.current.onclose = () => {
//                 console.log("WebSocket connection closed.");
//             };

//             return () => {
//                 console.log("Cleaning up WebSocket connection.");
//                 ws.current?.close();
//             };
//         }
//     }, []);

//     useEffect(() => {
//         if (ws.current) {
//             ws.current.onmessage = (event: any) => {
//                 let dataReceived = JSON.parse(event.data);
//                 if (dataReceived.data && dataReceived.data.data.length > 0) {
//                     const ValueTIME1 = dataReceived.data.data[0].latest.ATTRIBUTE.EVC_01_Battery_Expiration_Date.value;
//                     setTimeEVC_01(ValueTIME1);

//                     const ValueTIME2 = dataReceived.data.data[0].latest.ATTRIBUTE.EVC_01_Battery_Installation_Date.value;
//                     setTimeEVC_02(ValueTIME2);
//                 } else if (dataReceived.update && dataReceived.update.length > 0) {
//                     const ValueTIME1 = dataReceived.update[0].latest.ATTRIBUTE.EVC_01_Battery_Expiration_Date.value;
//                     setTimeEVC_01(ValueTIME1);

//                     const ValueTIME2 = dataReceived.update[0].latest.ATTRIBUTE.EVC_01_Battery_Installation_Date.value;
//                     setTimeEVC_02(ValueTIME2);
//                 }
//             };
//         }
//     }, []);

//     const handleButtonClick = async () => {
//         try {
//             await httpApi.post(`/plugins/telemetry/DEVICE/${id_OTSUKA}/SERVER_SCOPE`, {
//                 EVC_01_Battery_Expiration_Date: timeEVC_01,
//                 EVC_01_Battery_Installation_Date: timeEVC_02
//             });
//         } catch (error) {
//             console.log("error: ", error);
//         }
//     };

//     const handleDateChange = (e: any) => {
//         const selectedDate = e.value;
//         setTimeEVC_02(selectedDate.getTime());

//         const expirationDate = new Date(selectedDate);
//         expirationDate.setMonth(expirationDate.getMonth() + 18);
//         setTimeEVC_01(expirationDate.getTime());
//     };

//     const combineCss = {
//         PCV: {
//             height: 25,
//             fontWeight: 400,
//             padding: 10,
//         },
//     };

//     const configurationName = {
//         EVC_01_Battery_Installation_Date: "EVC 01 Battery Installation Date",
//         EVC_02_Battery_Installation_Date: "EVC 02 Battery Installation Date",
//     };

//     const timeEVC_01Number = parseFloat(timeEVC_01);
//     const date = !isNaN(timeEVC_01Number) ? new Date(timeEVC_01Number) : null;

//     const timeEVC_02Number = parseFloat(timeEVC_02);
//     const date2 = !isNaN(timeEVC_02Number) ? new Date(timeEVC_02Number) : null;

//     const configuration = [
//         {
//             Name: (
//                 <span style={combineCss.PCV}>
//                     {configurationName.EVC_01_Battery_Installation_Date}{" "}
//                 </span>
//             ),
          
//             Value2: (
//                 <Calendar
//                     style={combineCss.PCV}
//                     value={date2}
//                     onChange={handleDateChange}

//                     showTime={false}
//                     inputId="timeEVC_02"
//                     dateFormat="dd-mm-yy"
//                 />
//             ),
//             Value: (
//                 <Calendar
//                     style={combineCss.PCV}
//                     value={date}
//                     disabled

//                     showTime={false}
//                     inputId="timeEVC_01"
//                     dateFormat="dd-mm-yy"
//                 />
//             ),
//             Update: (
//                 <Button
//                     className="buttonUpdateSetData"
//                     style={{ marginTop: 5 }}
//                     label="Update"
//                     onClick={handleButtonClick}
//                 />
//             ),
//         },
//     ];

//     return (
//         <div>
//             <div style={{ width: "100%", padding: 5, borderRadius: 5 }}>
//                 <h4>Station - configuration </h4>
//                 <DataTable value={configuration} size={"small"} selectionMode="single">
//                     <Column field="Name" header="Name" />
//                     <Column field="Value2" header="Value2" />
//                     <Column field="Value" header="Value" />

//                     <Column field="Update" header="Update" />
//                 </DataTable>
//             </div>
//         </div>
//     );
// }
import { MegaMenu } from 'primereact/megamenu';
import React, { useState } from 'react'
import LowHighData from '../SetupData/LowHighData/LowHighData';
import DemoFlowOTS from './demoGraphicOtsuka/demoFlowOTS';

export default function SetAttribute1() {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleItemClick = (component:any) => {
        setActiveComponent(component);
    };

    const items = [
        {
            label: 'Furniture',
            icon: 'pi pi-box',
            items: [
                [
                    {
                        label: 'Living Room',
                        items: [
                            { label: 'Accessories', command: () => handleItemClick(<DemoFlowOTS />) },
                            { label: 'Armchair', command: () => handleItemClick('') },
                            { label: 'Coffee Table', command: () => handleItemClick('') },
                            { label: 'Couch', command: () => handleItemClick('') },
                            { label: 'TV Stand', command: () => handleItemClick('') }
                        ]
                    }
                ],
                [
                    {
                        label: 'Kitchen',
                        items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
                    },
                    {
                        label: 'Bathroom',
                        items: [{ label: 'Accessories' }]
                    }
                ],
                [
                    {
                        label: 'Bedroom',
                        items: [{ label: 'Bed' }, { label: 'Chaise lounge' }, { label: 'Cupboard' }, { label: 'Dresser' }, { label: 'Wardrobe' }]
                    }
                ],
                [
                    {
                        label: 'Office',
                        items: [{ label: 'Bookcase' }, { label: 'Cabinet' }, { label: 'Chair' }, { label: 'Desk' }, { label: 'Executive Chair' }]
                    }
                ]
            ]
        },
        {
            label: 'Electronics',
            icon: 'pi pi-mobile',
            items: [
                [
                    {
                        label: 'Computer',
                        items: [{ label: 'Monitor' }, { label: 'Mouse' }, { label: 'Notebook' }, { label: 'Keyboard' }, { label: 'Printer' }, { label: 'Storage' }]
                    }
                ],
                [
                    {
                        label: 'Home Theater',
                        items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
                    }
                ],
                [
                    {
                        label: 'Gaming',
                        items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
                    }
                ],
                [
                    {
                        label: 'Appliances',
                        items: [{ label: 'Coffee Machine' }, { label: 'Fridge' }, { label: 'Oven' }, { label: 'Vacuum Cleaner' }, { label: 'Washing Machine' }]
                    }
                ]
            ]
        },
        {
            label: 'Sports',
            icon: 'pi pi-clock',
            items: [
                [
                    {
                        label: 'Football',
                        items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
                    }
                ],
                [
                    {
                        label: 'Running',
                        items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
                    }
                ],
                [
                    {
                        label: 'Swimming',
                        items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
                    }
                ],
                [
                    {
                        label: 'Tennis',
                        items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
                    }
                ]
            ]
        }
    ];

    return (
        <div>
            <MegaMenu model={items} />
            <div style={{ marginTop: '20px' }}>
                {activeComponent}
            </div>
        </div>
    );
}