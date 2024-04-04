"use client";
import { useCallback, useEffect, useState } from "react";
import { getSeverAttributesByDevice } from "@/api/telemetry.api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Utils } from "@/service/Utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
interface Props {
    deviceId: string;
}
const AttributeSetting: React.FC<Props> = ({ deviceId }) => {
    const [attributes, setAttributes] = useState<any>([]);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [suggValueTypes, setSuggValueTypes] = useState<any[]>([]);
    const _fecthDataAttribute = useCallback((deviceId: string) => {
        getSeverAttributesByDevice(deviceId)
            .then((resp) => resp.data)
            .then((res) => {
                console.log(res);
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
    const _onSuggValueType = () => {
        let valueTypes = [
            {
                label: "String",
                value: "String",
            },
        ];

        setSuggValueTypes(valueTypes);
    };
    const _renderValueColumn = (row: any) => {
        if (typeof row.value === "object" && row.value !== null) {
            return <span>{JSON.stringify(row.value)}</span>;
        }
        return <span>{row.value.toString()}</span>;
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
                    //first={5}
                    // dataKey="id"
                    // onPage={_onInvsPaging}
                    // onSelectionChange={(e) => _onClickSelection(e)}
                >
                    <Column
                        header="Last Update Time"
                        body={_renderLastUpdateTime}
                    ></Column>

                    <Column field="key" header="key"></Column>
                    <Column header="value" body={_renderValueColumn}></Column>
                </DataTable>
                <Button onClick={() => setIsFormVisible(true)}>Add</Button>
            </div>

            <Dialog
                header="Add Attribute"
                visible={isFormVisible}
                onHide={() => setIsFormVisible(false)}
                //   footer={footerClearConditionForm}
            >
                <div className="card p-fluid">
                    <div className="formgrid grid">
                        <div className="field col-12">
                            <label>Key</label>
                            <InputText id="name2" type="text" />
                        </div>
                        <div className="field col-6">
                            <label>Value type</label>
                            <AutoComplete
                                dropdown
                                field="label"
                                suggestions={suggValueTypes}
                                completeMethod={_onSuggValueType}
                            />
                        </div>
                        <div className="field col-6">
                            <label>Value</label>
                            <InputText id="email2" type="text" />
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AttributeSetting;
