"use client";
import { useToken } from "@/hook/useToken";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
type DataItem = {
    [key: string]: any;
};
type DataArray = DataItem[];

export interface HeaderItem {
    headername: string;
    key: string;
}
export interface TagItem {
    tagname: string;
    key: string;
}

interface Props {
    stationName?: string;
    headers?: HeaderItem[];
    tags?: TagItem[];
    title?: string;
}
type HeaderKeys<T extends HeaderItem[]> = {
    [K in T[number]["key"]]: any;
} & { key: string };
const SetupDataTable: React.FC<Props> = ({
    title,
    stationName,
    headers,
    tags,
}) => {
    const [loading, setLoading] = useState(true);
    const ws = useRef<WebSocket | null>(null);
    const token = useToken();
    const [data, setData] = useState<HeaderKeys<typeof headers>[]>([]);

    useEffect(() => {
        const formattedData = tags.map((tag) => ({
            key: tag.key,
            name: tag.tagname,
        }));

        setData(formattedData);
    }, [tags]);

    const sendData = useCallback((data: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(data);
        }
    }, []);
    const connectWebSocket = useCallback(
        (token: string) => {
            ws.current = new WebSocket(
                `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET}/telemetry?token=${token}`
            );
            ws.current.onopen = () => {
                let data = {
                    entityDataCmds: [
                        {
                            query: {
                                entityFilter: {
                                    type: "singleEntity",
                                    singleEntity: {
                                        entityType: "DEVICE",
                                        id: "28f7e830-a3ce-11ee-9ca1-8f006c3fce43",
                                    },
                                },
                                pageLink: {
                                    pageSize: 1,
                                    page: 0,
                                    sortOrder: {
                                        key: {
                                            type: "ENTITY_FIELD",
                                            key: "createdTime",
                                        },
                                        direction: "DESC",
                                    },
                                },
                                entityFields: [
                                    {
                                        type: "ENTITY_FIELD",
                                        key: "name",
                                    },
                                    {
                                        type: "ENTITY_FIELD",
                                        key: "label",
                                    },
                                    {
                                        type: "ENTITY_FIELD",
                                        key: "additionalInfo",
                                    },
                                ],
                                latestValues: tags
                                    ? [
                                          ...tags.map((tag) => ({
                                              type: "TIME_SERIES",
                                              key: tag.key,
                                          })),
                                          ...tags.map((tag) => ({
                                              type: "ATTRIBUTE",
                                              key: `${tag.key}_Modbus`,
                                          })),
                                          ...tags.map((tag) => ({
                                              type: "ATTRIBUTE",
                                              key: `${tag.key}_Low`,
                                          })),
                                          ...tags.map((tag) => ({
                                              type: "ATTRIBUTE",
                                              key: `${tag.key}_High`,
                                          })),
                                          ...tags.map((tag) => ({
                                              type: "ATTRIBUTE",
                                              key: `${tag.key}_Maintain`,
                                          })),
                                          ...tags.map((tag) => ({
                                              type: "ATTRIBUTE",
                                              key: `${tag.key}_ModBus`,
                                          })),
                                      ]
                                    : [],
                            },
                            cmdId: 1,
                        },
                    ],
                };
                console.log("WebSocket connection opened.");

                sendData(JSON.stringify(data));
            };

            ws.current.onmessage = (evt: any) => {
                console.log(JSON.parse(evt.data));
                let data = JSON.parse(evt.data);
                if (data.cmdId === 1 && data.data) {
                    console.log("Data received: ", data);
                    const timeSeries = data.data.data[0].latest.TIME_SERIES;
                    const attributes = data.data.data[0].latest.ATTRIBUTE;
                    setData((prevData) =>
                        prevData.map((item) => {
                            const seriesData = timeSeries[item.key];
                            const lowData = attributes[`${item.key}_Low`];
                            const highData = attributes[`${item.key}_High`];
                            const modBusData = attributes[`${item.key}_Modbus`];
                            const isMaintainData =
                                attributes[`${item.key}_Maintain`];
                            if (seriesData) {
                                return {
                                    ...item,
                                    updateTime: seriesData.ts,
                                    value: seriesData.value,
                                    low: lowData.value,
                                    high: highData.value,
                                    modBus: modBusData.value,
                                    isMaintain:
                                        isMaintainData.value.toLowerCase() ===
                                        "true",
                                };
                            }
                            return item;
                        })
                    );

                    let data2 = {
                        entityDataCmds: [
                            {
                                cmdId: 1,
                                latestCmd: {
                                    keys: tags
                                        ? [
                                              ...tags.map((tag) => ({
                                                  type: "TIME_SERIES",
                                                  key: tag.key,
                                              })),
                                              ...tags.map((tag) => ({
                                                  type: "ATTRIBUTE",
                                                  key: `${tag.key}_Modbus`,
                                              })),
                                              ...tags.map((tag) => ({
                                                  type: "ATTRIBUTE",
                                                  key: `${tag.key}_Low`,
                                              })),
                                          ]
                                        : [],
                                },
                            },
                        ],
                    };
                    setLoading(false);

                    sendData(JSON.stringify(data2));
                } else if (data.cmdId === 1 && data.update) {
                    const timeSeries = data.update[0].latest.TIME_SERIES;
                    const attributes = data.update[0].latest.ATTRIBUTE;
                    setData((prevData) =>
                        prevData.map((item) => {
                            const seriesData =
                                timeSeries && timeSeries[item.key];
                            const lowData =
                                attributes && attributes[`${item.key}_Low`];
                            const highData =
                                attributes && attributes[`${item.key}_High`];
                            const modbusData =
                                attributes && attributes[`${item.key}_Modbus`];
                            const isMaintainData =
                                attributes &&
                                attributes[`${item.key}_Maintain`];
                            return {
                                ...item,
                                updateTime: seriesData?.ts || item.updateTime,
                                value: seriesData?.value ?? item.value,
                                low: lowData?.value ?? item.low,
                                high: highData?.value ?? item.high,
                                modbus: modbusData?.value ?? item.modBus,
                                isMaintain:
                                    isMaintainData?.value.toLowerCase() ===
                                        "true" || item.isMaintain,
                            };
                        })
                    );
                }
            };
            ws.current.onclose = () => {
                setTimeout(() => connectWebSocket, 10000); // Thử kết nối lại sau 5 giây
            };
            ws.current.onerror = (error) => {
                console.error("WebSocket error:", error);
                setLoading(true);
                setTimeout(() => connectWebSocket, 10000); // Thử kết nối lại sau 5 giây
            };
        },
        [sendData]
    );

    useEffect(() => {
        if (token) {
            connectWebSocket(token);
        }
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connectWebSocket, token]);
    console.log(data);
    const handleValueChange = debounce((rowKey, field, newValue) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.key === rowKey
                    ? { ...item, [field]: Number(newValue) }
                    : item
            )
        );
    }, 100); // 300ms debounce
    return (
        <>
            <h2>{title}</h2>

            <DataTable value={data} loading={loading}>
                {headers?.map((header) => (
                    <Column
                        key={header.key}
                        field={header.key}
                        header={header.headername}
                        body={(rowData) => {
                            if (
                                ["low", "high", "modBus"].includes(header.key)
                            ) {
                                return (
                                    <input
                                        type="number"
                                        value={rowData[header.key] || ""}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            if (
                                                !isNaN(newValue) &&
                                                newValue !== ""
                                            ) {
                                                handleValueChange(
                                                    rowData.key,
                                                    header.key,
                                                    newValue
                                                );
                                            }
                                        }}
                                    />
                                );
                            } else if (header.key === "isMaintain") {
                                return (
                                    <input
                                        type="checkbox"
                                        checked={rowData.isMaintain || false}
                                        onChange={(e) => {
                                            // Handle checkbox change here if needed
                                            console.log(
                                                "Checkbox changed:",
                                                e.target.checked
                                            );
                                        }}
                                    />
                                );
                            }
                            return rowData[header.key];
                        }}
                    />
                ))}
            </DataTable>
        </>
    );
};
export default SetupDataTable;
