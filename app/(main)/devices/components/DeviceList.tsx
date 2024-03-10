"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { getDevices } from "@/api/device.api";
import { UIUtils } from "@/service/Utils";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Utils } from "@/service/Utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface Props {}

const DeviceList: React.FC<Props> = () => {
    const [devices, setDevices] = useState<any>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [textSearch, setTextSearch] = useState<string>("");
    const toast = useRef<Toast>(null);
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);

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
    const _renderCreatedTime = (row: any) => {
        let createdTime = row.createdTime;
        return createdTime ? Utils.formatUnixTimeToString(createdTime) : "";
    };

    const _renderState = (row: any) => {
        let { active } = row;

        return active ? (
            <Button disabled={true} label="Active" rounded severity="success" />
        ) : (
            <Button
                disabled={true}
                label="Inactive"
                rounded
                severity="danger"
            />
        );
    };
    useEffect(() => {
        _fetchDataDevices({
            pageSize: lazyState.rows,
            page: lazyState.page,
            textSearch,
        });
    }, [lazyState]);
    useEffect(() => {
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }
        typingTimeout.current = setTimeout(() => {
            _fetchDataDevices({
                pageSize: lazyState.rows,
                page: lazyState.page,
                textSearch,
            });
        }, 300);

        return () => {
            if (typingTimeout.current) {
                clearTimeout(typingTimeout.current);
            }
        };
    }, [textSearch, lazyState]);

    const _onInvsPaging = (event: any) => {
        console.log(event);
        setlazyState(event);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText
                        placeholder="Global Search"
                        value={textSearch}
                        onChange={handleInputChange}
                        className="w-full"
                    />
                </span>
            </div>
        );
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextSearch(value);
    };
    const filteredDataFormatted = devices.map((item: any, index: any) => ({
        createdTime: item.createdTime,
        deviceProfileName: item.deviceProfileName,
        name: item.name,
        label: item.label,
        active: item.active,
    }));
    return (
        <>
            <div>
                <Toast ref={toast} />
                <ConfirmDialog />
                <div>
                    <DataTable
                        rows={lazyState.rows}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        header={renderHeader}
                        value={filteredDataFormatted}
                        paginator
                        lazy={true}
                        className="datatable-responsive"
                        emptyMessage="No products found."
                        paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        totalRecords={totalElements}
                        first={lazyState.first}
                        dataKey="id"
                        onPage={_onInvsPaging}
                    >
                        <Column
                            sortable
                            header="Created Time"
                            body={_renderCreatedTime}
                        ></Column>

                        <Column field="name" header=" Name"></Column>
                        <Column
                            field="deviceProfileName"
                            header="Device profile"
                        ></Column>
                        <Column field="label" header="Label"></Column>
                        <Column
                            field="active"
                            header="State"
                            body={_renderState}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default DeviceList;
