"use client";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Column } from "primereact/column";
import { useRef, useState, useCallback, useEffect } from "react";
import { getAlarms } from "@/api/alarm.api";
import { UIUtils, Utils } from "@/service/Utils";
import { InputText } from "primereact/inputtext";
interface Props {
    filters: any;
}
const AlarmList: React.FC<Props> = ({ filters }) => {
    const toast = useRef<Toast>(null);
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {},
    });
    const [totalElements, setTotalElements] = useState<number>(0);
    const [alarms, setAlarms] = useState<any>([]);
    const [textSearch, setTextSearch] = useState<string>("");
    const _onInvsPaging = (event: any) => {
        setlazyState(event);
    };
    const _fetchDataAlarms = useCallback(
        (
            {
                pageSize,
                page,
                sortOrder,
                textSearch,
            }: {
                pageSize: number;
                page: number;
                sortOrder?: string;
                textSearch: string;
            },
            filters?: any
        ) => {
            if (filters && filters.device && filters.device.id) {
                let device = filters.device;
                let reqParams = {};
                reqParams = {
                    ...reqParams,
                    pageSize,
                    page,
                    sortOrder: "DESC",
                    statusList: "ACTIVE,UNACK",
                    //  severityList:"CRITICAL,MAJOR,MINOR,WARNING,INDETERMINATE,INFORMATIONAL,NOT_SPECIFIED"
                    sortProperty: "createdTime",
                };
                let dates = filters.dates ? [...filters.dates] : [];
                if (dates && dates[0] && dates[1]) {
                    reqParams = {
                        ...reqParams,
                        startTime: dates[0].getTime(),
                        endTime: dates[1].getTime(),
                    };
                }
                if (textSearch !== "") {
                    reqParams = {
                        ...reqParams,
                        textSearch: encodeURIComponent(textSearch),
                    };
                }
                let alarmType = filters?.alarmType;
                if (alarmType && alarmType.type) {
                    reqParams = {
                        ...reqParams,
                        typeList: alarmType.type,
                    };
                }
                console.log(filters);

                getAlarms(device.id.entityType, device.id.id, reqParams)
                    .then((resp) => resp.data)
                    .then((res) => {
                        console.log(res);
                        setAlarms([...res.data]);
                        setTotalElements(res.totalElements);
                    })
                    .catch((err) => {
                        UIUtils.showError({
                            error: err?.message,
                            toast: toast.current,
                        });
                    });
            } else {
            }
        },
        []
    );
    useEffect(() => {
        _fetchDataAlarms(
            {
                pageSize: lazyState.rows,
                page: lazyState.page,
                textSearch,
            },
            filters
        );
    }, [lazyState, _fetchDataAlarms, filters, textSearch]);

    // const _renderCreatedTime = (row: any) => {
    //     let createdTime = row.createdTime;
    //     return createdTime ? Utils.formatUnixTimeToString(createdTime) : "";
    // };
    const _renderStartTime = (row: any) => {
        let startTs = row.startTs;
        return startTs ? Utils.formatUnixTimeToString(startTs) : "";
    };

    // const _renderValue = (row: any) => {
    //     let { details } = row;
    //     let value = details?.data?.split(",")[1];

    //     return value ? value : "";
    // };

    const _renderDurationTime = (row: any) => {
        let clearTs = row.clearTs;
        console.log(clearTs);
        return clearTs ? Utils.formatUnixTimeToString(clearTs) : "";
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
                        placeholder="Search Alarms"
                        value={textSearch}
                        onChange={handleInputChange}
                        className="w-full"
                    />
                </span>
            </div>
        );
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
                        value={alarms}
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
                        {/* <Column
                            sortable
                            header="Created Time"
                            body={_renderCreatedTime}
                        ></Column> */}

                        <Column
                            field="originatorName"
                            header="Station Name"
                        ></Column>
                        <Column field="type" header="Type"></Column>
                        <Column
                            header="Start Time"
                            body={_renderStartTime}
                        ></Column>

                        <Column
                            header="End Time"
                            body={_renderDurationTime}
                        ></Column>
                        {/* <Column header="Value" body={_renderValue}></Column> */}
                        {/* <Column
                            sortable
                            header="Duration"
                            body={_renderDuration}
                        ></Column> */}
                        {/* <Column
                            field="description"
                            header="Description"
                        ></Column> */}
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default AlarmList;
