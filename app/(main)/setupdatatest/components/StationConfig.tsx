"use client";
import { useToken } from "@/hook/useToken";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { saveOrUpdateSeverAttributesByDevice } from "@/api/telemetry.api";
import { OTSUKA_DEVICE_ID } from "@/constants/constans";
import { Utils } from "@/service/Utils";
type DataItem = {
    [key: string]: any;
};
type DataArray = DataItem[];

export interface UnitObject {
    0: string;
    1: string;
    3: string;
    4: string;
}

export interface HeaderItem {
    headername: string;
    key: string;
}
export interface TagItem {
    tagname: string;
    key: string;
    unit: string | UnitObject;
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
const StationConfig: React.FC<Props> = ({
    title,
    stationName,
    headers,
    tags,
}) => {
    const [loading, setLoading] = useState(true);
    const ws = useRef<WebSocket | null>(null);
    const token = useToken();
    const [data, setData] = useState<HeaderKeys<typeof headers>[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const formattedData = tags.map((tag) => ({
            key: tag.key,
            name: tag.tagname,
            unit: tag.unit,
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
                                              type: "ATTRIBUTE",
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
                let data = JSON.parse(evt.data);
                if (data.cmdId === 1 && data.data) {
                    console.log("Data received: ", data);

                    const attributes = data.data.data[0].latest.ATTRIBUTE;
                    console.log("Data received: ", data);
                    setData((prevData) =>
                        prevData.map((item) => {
                            const seriesData = attributes[item.key];

                            if (seriesData) {
                                return {
                                    ...item,
                                    updatedTime: seriesData.ts,
                                    value: seriesData.value,
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
                                                  type: "ATTRIBUTE",
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
                            },
                        ],
                    };
                    setLoading(false);

                    sendData(JSON.stringify(data2));
                } else if (data.cmdId === 1 && data.update) {
                    const attributes = data.update[0].latest.ATTRIBUTE;
                    console.log("Data received updated: ", data);
                    setData((prevData) =>
                        prevData.map((item) => {
                            const seriesData =
                                attributes && attributes[item.key];

                            return {
                                ...item,
                                updatedTime: seriesData?.ts || item.updatedTime,
                                value: seriesData?.value ?? item.value,
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
        if (field === "isMaintain") {
            let attribute = {
                [`${rowKey}_Maintain`]: newValue,
            };
            saveOrUpdateSeverAttributesByDevice(OTSUKA_DEVICE_ID, attribute)
                .then((response) => {
                    console.log("Update successful:", response);
                    // Thêm xử lý sau khi cập nhật thành công (ví dụ: hiển thị thông báo)
                })
                .catch((error) => {
                    console.error("Update failed:", error);
                    // Thêm xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
                });
            return;
        }
        setData((prevData) =>
            prevData.map((item) =>
                item.key === rowKey
                    ? { ...item, [field]: Number(newValue) }
                    : item
            )
        );
    }, 100); // 300ms debounce
    // const rowClass = (data: any) => {
    //     console.log("data", data);
    //     if (data.isMaintain) {
    //         return "text-yellow-500"; // Ưu tiên isMaintain
    //     }
    //     if (
    //         Number(data.value) >= Number(data.high) ||
    //         Number(data.value) <= Number(data.low)
    //     ) {
    //         console.log("data red", data);
    //         return "text-red-500"; // Text màu đỏ
    //     }
    //     return "";
    // };
    // const getTextColorClass = (rowData: any) => {
    //     if (rowData.isMaintain) {
    //         return "text-yellow-500"; // Ưu tiên isMaintain
    //     }
    //     if (
    //         Number(rowData.value) >= Number(rowData.high) ||
    //         Number(rowData.value) <= Number(rowData.low)
    //     ) {
    //         return "text-red-500"; // Text màu đỏ
    //     }
    //     return "";
    // };
    const handleUpdate = (rowData: any) => {
        console.log("Update clicked for row:", rowData);

        let attributes: { [key: string]: any } = {};
        attributes = {
            key: rowData.key,
            value: rowData.value,
        };

        //attributes = {[`${rowData.key}_Modbus`]: rowData.modBus,
        console.log("Attributes to update:", attributes);

        //Nếu có bất kỳ thuộc tính nào để cập nhật, gọi API
        if (Object.keys(attributes).length > 0) {
            saveOrUpdateSeverAttributesByDevice(OTSUKA_DEVICE_ID, attributes)
                .then((response) => {
                    console.log("Update successful:", response);
                    // Thêm xử lý sau khi cập nhật thành công (ví dụ: hiển thị thông báo)
                })
                .catch((error) => {
                    console.error("Update failed:", error);
                    // Thêm xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
                });
        } else {
            console.log("No attributes to update");
            // Có thể thêm thông báo cho người dùng biết không có gì để cập nhật
        }
    };
    console.log("data", data);

    return (
        <>
            <h2>{title}</h2>

            <DataTable value={data} loading={loading}>
                {headers?.map((header) => (
                    <Column
                        key={header.key}
                        field={header.key}
                        //header={header.headername}
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
                                            handleValueChange(
                                                rowData.key,
                                                header.key,
                                                newValue
                                            );
                                        }}
                                        // className={getTextColorClass(rowData)}
                                    />
                                );
                            } else if (header.key === "value") {
                                let content;
                                if (typeof rowData.unit === "string") {
                                    content = `${rowData.value}`;
                                }
                                return <span>{content}</span>;
                            } else if (header.key === "update") {
                                return (
                                    <button
                                        onClick={() => handleUpdate(rowData)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Update
                                    </button>
                                );
                            } else if (header.key === "updatedTime") {
                                return (
                                    <span>
                                        {Utils.formatUnixTimeToString(
                                            rowData.updatedTime
                                        )}
                                    </span>
                                );
                            }
                            return <span>{rowData[header.key]}</span>;
                        }}
                        header={header.headername}
                    />
                ))}
            </DataTable>
        </>
    );
};
export default StationConfig;
