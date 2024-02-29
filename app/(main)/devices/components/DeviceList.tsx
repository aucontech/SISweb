"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { getDevices } from "@/api/device.api";
import { UIUtils } from "@/service/Utils";
import { Toast } from "primereact/toast";

interface Props {}

const DeviceList: React.FC<Props> = () => {
    const [devices, setDevices] = useState<any>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [textSearch, setTextSearch] = useState<string>("");
    const toast = useRef<Toast>(null);
    const _fetchDataDevices = useCallback(
        ({
            pageSize,
            page,
            sortOrder,
            textSearch,
        }: {
            pageSize: number;
            page: number;
            sortOrder?: string;
            textSearch: string;
        }) => {
            getDevices({
                pageSize,
                page,
                sortProperty: "createdTime",
                sortOrder: "DESC",
                textSearch,
            })
                .then((resp) => resp.data)
                .then((res) => {
                    console.log(res);
                    setDevices([...res.data]);
                    setTotalElements(res.totalElements);
                })
                .catch((err) => {
                    console.log(err);
                    UIUtils.showError({
                        error: err?.message,
                        toast: toast.current,
                    });
                });
        },
        []
    );
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {},
    });

    useEffect(() => {
        _fetchDataDevices({
            pageSize: lazyState.rows,
            page: lazyState.page,
            textSearch,
        });
    }, [lazyState]);
    return (
        <>
            <Toast ref={toast} />
            <h1>ddddddddddddddddddddddddd</h1>
        </>
    );
};

export default DeviceList;
