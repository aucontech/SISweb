import { readToken } from '@/service/localStorage';
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { id_OTSUKA } from '../../data-table-device/ID-DEVICE/IdDevice';

interface StateMap {
    [key: string]: React.Dispatch<React.SetStateAction<string | null>> | undefined;
}

export default function TestData() {
    const [checkConnectData, setCheckConnectData] = useState(false);
    const token = readToken();
    const [timeUpdate, setTimeUpdate] = useState<any | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [GVF1, setGVF1] = useState<string | null>(null);
    const [SVF1, setSVF1] = useState<string | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        const obj1 = {
            attrSubCmds: [],
            tsSubCmds: [
                {
                    entityType: "DEVICE",
                    entityId: id_OTSUKA,
                    scope: "LATEST_TELEMETRY",
                    cmdId: 1,
                },
            ],
        };

        if (ws.current) {
            ws.current.onopen = () => {
                console.log("WebSocket connected");
                setCheckConnectData(true);
                setTimeout(() => {
                    ws.current?.send(JSON.stringify(obj1));
                });
            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed.");
                setCheckConnectData(false);
            };

            return () => {
                console.log("Cleaning up WebSocket connection.");
                ws.current?.close();
            };
        }
    }, []);

    useEffect(() => {
        if (ws.current) {
            ws.current.onmessage = (evt) => {
                let dataReceived = JSON.parse(evt.data);
                if (dataReceived.update !== null) {
                    setData([...data, dataReceived]);

                    const keys = Object.keys(dataReceived.data);
                    const stateMap: StateMap = {
                        EVC_01_Flow_at_Base_Condition: setSVF1,
                        EVC_01_Flow_at_Measurement_Condition: setGVF1,
                    };

                    keys.forEach((key) => {
                        if (stateMap[key]) {
                            const value = dataReceived.data[key][0][1];
                            const slicedValue = value;
                            stateMap[key]?.(slicedValue);
                        }
                    });
                }
            };
        }
    }, [data]);

    const ws = useRef<WebSocket | null>(null);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET_TELEMETRY}${token}`;

    const dataEVC01 = [
        {
            mainCategory: 'EVC01',
            category: 'Flow at Base Condition',
            value: <span>{SVF1} sm³/h</span>,
        },
        {
            mainCategory: 'EVC01',
            category: 'Flow at Measurement Condition',
            value: <span>{GVF1} m³/h</span>,
        },
    ];

    const dataEVC02 = [
        {
            mainCategory: 'EVC02',

            category: 'Flow at Base Condition',
            value: <span>{SVF1} sm³/h</span>,
        },
        {
            mainCategory: 'EVC02',
            category: 'Flow at Measurement Condition',
            value: <span>{GVF1} m³/h</span>,
        },
    ];

    const combinedData = [...dataEVC01, ...dataEVC02];

    const mainCategoryTemplate = (data: any) => {
        return (
            <div style={{fontWeight:500, fontSize:23, }}>
                <span >{data.mainCategory}</span>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={combinedData} rowGroupMode="subheader" groupRowsBy="mainCategory" sortMode="single" sortField="mainCategory" size={'small'} selectionMode="single" 
                    sortOrder={1} scrollable scrollHeight="400px" rowGroupHeaderTemplate={mainCategoryTemplate} tableStyle={{ minWidth: '50rem' }}>
                <Column field="category" header="Category" />
                <Column field="value" header="Value" style={{ minWidth: '200px' }}></Column>
            </DataTable>
        </div>
    );
}
