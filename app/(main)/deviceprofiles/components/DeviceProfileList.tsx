"use client";
import { DataTable } from "primereact/datatable";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { useRef, useState, useCallback, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { getDeviceProfiles } from "@/api/deviceProfile.api";
import { UIUtils, Utils } from "@/service/Utils";
const DeviceProfileList = () => {
    const [deviceProfiles, setDeviceProfiles] = useState<any>([]);
    const toast = useRef<Toast>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {},
    });
    const [textSearch, setTextSearch] = useState<string>("");
    const _fetchDataDeviceProfiles = useCallback(
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
            getDeviceProfiles({
                pageSize,
                page,
                sortProperty: "createdTime",
                sortOrder: "DESC",
                textSearch,
            })
                .then((resp) => resp.data)
                .then((res) => {
                    console.log(res);
                    setDeviceProfiles([...res.data]);
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
    const _renderCreatedTime = (row: any) => {
        let createdTime = row.createdTime;
        return createdTime ? Utils.formatUnixTimeToString(createdTime) : "";
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextSearch(value);
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
    useEffect(() => {
        _fetchDataDeviceProfiles({
            pageSize: lazyState.rows,
            page: lazyState.page,
            textSearch,
        });
    }, [lazyState, _fetchDataDeviceProfiles, textSearch]);

    const _onInvsPaging = (event: any) => {
        setlazyState(event);
    };

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
                        value={deviceProfiles}
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
                        <Column field="type" header="Profile type"></Column>
                        <Column
                            field="transportType"
                            header="Transport type"
                        ></Column>
                        <Column
                            field="description"
                            header="Description"
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default DeviceProfileList;
