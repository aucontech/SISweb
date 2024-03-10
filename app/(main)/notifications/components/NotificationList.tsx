"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { getNotifications, deleteNotifications } from "@/api/notification.api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { UIUtils, Utils } from "@/service/Utils";

interface Props {
    unreadOnly: boolean;
}
const NotificationList: React.FC<Props> = ({ unreadOnly }) => {
    const [notifications, setNotifications] = useState<any>();
    const toast = useRef<Toast>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [textSearch, setTextSearch] = useState<string>("");
    const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
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
            sortOrder,
            textSearch,
        }: {
            pageSize: number;
            page: number;
            unreadOnly: boolean;
            sortOrder?: string;
            textSearch: string;
        }) => {
            getNotifications({
                pageSize,
                page,
                sortProperty: "createdTime",
                sortOrder: "DESC",
                unreadOnly,
                textSearch,
            })
                .then((resp) => resp.data)
                .then((res) => {
                    console.log(res);
                    setNotifications([...res.data]);
                    setTotalElements(res.totalElements);
                })
                .catch((err: any) => {
                    UIUtils.showError({
                        error: err?.message,
                        toast: toast.current,
                    });
                });
        },
        []
    );
    const deleteAlarm = (id: string) => {
        deleteNotifications(id)
            .then((resp) => resp.data)
            .then((res) => {
                const updateTable = notifications.filter(
                    (item: any) => item.id !== id
                );
                setNotifications(updateTable);
                _fetchDataNotification({
                    pageSize: lazyState.rows,
                    page: lazyState.page,
                    unreadOnly,
                    textSearch,
                });

                toast.current?.show({
                    severity: "warn",
                    summary: "Rejected",
                    detail: "Deleted successfully",
                    life: 3000,
                });
            })
            .catch((err: any) => {
                toast.current?.show({
                    severity: "warn",
                    summary: "Rejected",
                    detail: "Error deleting alarm",
                    life: 3000,
                });
            });
    };

    const confirm2 = (id: any) => {
        confirmDialog({
            message: "Do you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => deleteAlarm(id.id),
        });
    };

    const _renderCreatedTime = (row: any) => {
        let createdTime = row.createdTime;
        return createdTime ? Utils.formatUnixTimeToString(createdTime) : "";
    };

    useEffect(() => {
        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        const timer = setTimeout(() => {
            _fetchDataNotification({
                pageSize: lazyState.rows,
                page: lazyState.page,
                unreadOnly,
                textSearch,
            });
        }, 300);

        setTypingTimer(timer);

        return () => {
            if (typingTimer) {
                clearTimeout(typingTimer);
            }
        };
    }, [lazyState, textSearch]);
    const _onInvsPaging = (event: any) => {
        setlazyState(event);
    };
    const deleteButtonTemplate = (rowData: any) => {
        return (
            <Button
                onClick={() => confirm2(rowData.id)}
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
            />
        );
    };
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTextSearch(e.target.value);
    };
    const renderSearch = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText
                        placeholder="Global Search"
                        value={textSearch}
                        onChange={handleSearchInputChange}
                        className="w-full"
                    />
                </span>
            </div>
        );
    };
    return (
        <div className="card" style={{ width: "100%" }}>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div>
                <DataTable
                    rows={lazyState.rows}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    header={renderSearch}
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
                    onPage={_onInvsPaging}
                >
                    <Column
                        sortable
                        header="Created Time"
                        body={_renderCreatedTime}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                    <Column
                        field="type"
                        header="Type"
                        // headerClassName="white-space-nowrap w-4"
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
