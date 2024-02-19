"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { getNotifications } from "@/api/notification.api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
interface Props {
    unreadOnly: boolean;
}
const NotificationList: React.FC<Props> = ({ unreadOnly }) => {
    // const unreadOnly = unreadOnly || false;
    const [notifications, setNotifications] = useState<any>();
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
    const _fetchDataNotification = useCallback(
        ({
            pageSize,
            page,
            unreadOnly,
        }: {
            pageSize: number;
            page: number;
            unreadOnly: boolean;
        }) => {
            getNotifications({
                pageSize,
                page,
                sortProperty: "createdTime",
                unreadOnly,
            })
                .then((resp) => resp.data)
                .then((res) => {
                    console.log(res);
                    setNotifications([...res.data]);
                    setTotalElements(res.totalElements);
                })
                .catch((err) => {});
        },
        []
    );

    const confirm2 = (id: string) => {
        confirmDialog({
            message: "Do you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => {},
            reject: () => {},
        });
    };

    useEffect(() => {
        _fetchDataNotification({
            pageSize: lazyState.rows,
            page: lazyState.page,
            unreadOnly,
        });
    }, [lazyState]);
    const _onInvsPaging = (event: any) => {
        setlazyState(event);
        // console.log(event);
    };
    const deleteButtonTemplate = (rowData: any) => {
        return (
            <Button
                onClick={() => confirm2("33")}
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
            />
        );
    };
    console.log(totalElements);
    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div>
                <DataTable
                    rows={lazyState.rows}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    // header={renderHeader()}
                    value={notifications}
                    paginator
                    lazy={true}
                    className="datatable-responsive"
                    emptyMessage="No products found."
                    paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    totalRecords={totalElements}
                    first={lazyState.first}
                    dataKey="id"
                    //onPageCh
                    onPage={_onInvsPaging}
                >
                    <Column
                        sortable
                        field="createdTime"
                        header="Created Time"
                        // body={nameBodyTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                    <Column
                        field="subject"
                        header=" Subject"
                        //body={amountBodyTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                    <Column
                        field="text"
                        header="Message"
                        // body={dateBodyTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                    {/* <Column
                 field="id"
                 header="Id"
                 body={idBodyTemplate}
                 headerClassName="white-space-nowrap w-4"
             ></Column> */}
                    <Column
                        header="Edit"
                        body={deleteButtonTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default NotificationList;
