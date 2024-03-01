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
    const _onInvsPaging = (event: any) => {
        console.log(event);
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
                        //header={renderSearch}
                        value={devices}
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
                            // style={{ width: "200px" }}
                        ></Column>

                        <Column
                            field="name"
                            header=" Name"
                            //style={{ width: "200px" }}
                        ></Column>
                        <Column
                            field="deviceProfileName"
                            header="Device profile"
                            // style={{ width: "250px" }}
                        ></Column>
                        <Column
                            field="label"
                            header="Label"
                            //style={{ width: "250px" }}
                        ></Column>
                        <Column header="State" body={_renderState}></Column>
                        <Column
                            header="Edit"
                            //body={deleteButtonTemplate}
                            //  headerClassName="white-space-nowrap w-4"
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default DeviceList;
