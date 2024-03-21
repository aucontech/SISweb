"use client";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Column } from "primereact/column";
import { useRef, useState, useCallback, useEffect } from "react";
import { getAlarms } from "@/api/alarm.api";
import { UIUtils, Utils } from "@/service/Utils";
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

    const _onInvsPaging = (event: any) => {
        setlazyState(event);
    };
    const _fetchDataAlarms = useCallback(
        (
            {
                pageSize,
                page,
                sortOrder,
            }: {
                pageSize: number;
                page: number;
                sortOrder?: string;
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
                // textSearch,
            },
            filters
        );
    }, [lazyState, _fetchDataAlarms, filters]);

    const _renderCreatedTime = (row: any) => {
        let createdTime = row.createdTime;
        return createdTime ? Utils.formatUnixTimeToString(createdTime) : "";
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
                        // header={renderHeader}
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
                        <Column
                            sortable
                            header="Created Time"
                            body={_renderCreatedTime}
                        ></Column>

                        <Column
                            field="originatorName"
                            header=" Originator"
                        ></Column>
                        <Column field="type" header="Type"></Column>
                        <Column field="severity" header="Severity"></Column>
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

export default AlarmList;
