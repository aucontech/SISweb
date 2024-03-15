"use client";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Column } from "primereact/column";
import { useRef, useState, useCallback, useEffect } from "react";
import { getAlarms } from "@/api/alarm.api";
import { UIUtils } from "@/service/Utils";
const AlarmList = () => {
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
        ({
            pageSize,
            page,
            sortOrder,
        }: // textSearch,
        {
            pageSize: number;
            page: number;
            sortOrder?: string;
            //  textSearch: string;
        }) => {
            getAlarms({
                pageSize,
                page,
                sortProperty: "createdTime",
                sortOrder: "DESC",
              //  textSearch,
            })
                .then((resp) => resp.data)
                .then((res) => {
                    console.log(res);
                    setAlarms([...res.data]);
                    setTotalElements(res.totalElements);
                })
                .catch((err) => {
                    console.log(err);
                    // UIUtils.showError({
                    //     error: err?.message,
                    //     toast: toast.current,
                    // });
                });
        },
        []
    );
    useEffect(() => {
        _fetchDataAlarms({
            pageSize: lazyState.rows,
            page: lazyState.page,
            // textSearch,
        });
    }, [lazyState, _fetchDataAlarms]);

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
                            // body={_renderCreatedTime}
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

export default AlarmList;
