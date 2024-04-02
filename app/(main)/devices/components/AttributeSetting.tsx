"use client";
import { useCallback, useEffect, useState } from "react";
import { getSeverAttributesByDevice } from "@/api/telemetry.api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Utils } from "@/service/Utils";
interface Props {
    deviceId: string;
}
const AttributeSetting: React.FC<Props> = ({ deviceId }) => {
    console.log(deviceId);
    const [attributes, setAttributes] = useState<any>([]);
    const _fecthDataAttribute = useCallback((deviceId: string) => {
        getSeverAttributesByDevice(deviceId)
            .then((resp) => resp.data)
            .then((res) => {
                setAttributes([...res]);
            })
            .catch((err) => {});
    }, []);

    useEffect(() => {
        _fecthDataAttribute(deviceId);
    }, [deviceId]);

    const _renderLastUpdateTime = (row: any) => {
        let { lastUpdateTs } = row;
        return lastUpdateTs ? Utils.formatUnixTimeToString(lastUpdateTs) : "";
    };
    return (
        <>
            <div>
                <DataTable
                    // rows={lazyState.rows}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    //header={renderHeader}
                    value={attributes}
                    //  paginator
                    selectionMode="single"
                    // lazy={true}
                    // selection={selectedDevice}
                    className="datatable-responsive"
                    emptyMessage="No records found."
                    paginatorTemplate="CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    // totalRecords={totalElements}
                    //first={lazyState.first}
                    // dataKey="id"
                    // onPage={_onInvsPaging}
                    // onSelectionChange={(e) => _onClickSelection(e)}
                >
                    <Column
                        header="Last Update Time"
                        body={_renderLastUpdateTime}
                    ></Column>

                    <Column field="key" header="key"></Column>
                    <Column field="value" header="Value"></Column>
                </DataTable>
            </div>
        </>
    );
};

export default AttributeSetting;
