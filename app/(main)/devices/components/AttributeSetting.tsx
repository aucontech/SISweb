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
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import debounce from "lodash/debounce";

interface Props {
    deviceId: string;
}
const defaultAttribute = {
    key: "",
    value: {
        type: "String",
        value: null,
    },
};
const AttributeSetting: React.FC<Props> = ({ deviceId }) => {
    const [attributes, setAttributes] = useState<any>([]);
    const [attributeValue, setAttributeValue] = useState<any>();
    const [isJsonValid, setIsJsonValid] = useState(true); // Assuming JSON is valid initially

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [suggValueTypes, setSuggValueTypes] = useState<any[]>([]);
    const [attribute, setAttribute] = useState<any>({});
    const [valueType, setValueType] = useState<any>();
    const _fecthDataAttribute = useCallback((deviceId: string) => {
        getSeverAttributesByDevice(deviceId)
            .then((resp) => resp.data)
            .then((res) => {
                setAttributes([...res]);
            })
            .catch((err) => {});
    }, []);
    const validateJson = useCallback(
        debounce((value: string) => {
            try {
                JSON.parse(value); // Attempt to parse the JSON
                _onChangeInputForm("value", value);
                setIsJsonValid(true); // JSON is valid
            } catch (err) {
                setIsJsonValid(false); // JSON is invalid
            }
        }, 2000),
        []
    ); // Adjust debounce delay as needed (500ms in this example)
    useEffect(() => {
        let newAttribute = {
            ...defaultAttribute,
        };
        setAttribute(newAttribute);
    }, []);
    useEffect(() => {
        _fecthDataAttribute(deviceId);
    }, [deviceId]);

    const _renderLastUpdateTime = (row: any) => {
        let { lastUpdateTs } = row;
        return lastUpdateTs ? Utils.formatUnixTimeToString(lastUpdateTs) : "";
    };
    const _onSuggValueType = () => {
        let valueTypes = ["String", "Boolean", "Integer", "Double", "JSON"];
        setSuggValueTypes(valueTypes);
    };
    const _renderValueColumn = (row: any) => {
        if (typeof row.value === "object" && row.value !== null) {
            return <span>{JSON.stringify(row.value)}</span>;
        }
        return <span>{row.value.toString()}</span>;
    };

    const _onChangeInputForm = (field: string, value: any) => {
        let newAttribute = { ...attribute };
        switch (field) {
            case "key":
                newAttribute[field] = value;
                setAttribute(newAttribute);
                break;
            case "valueType":
                newAttribute.value.type = value;
                setAttribute(newAttribute);
                break;
            case "intValue":
                if (value !== "") {
                    newAttribute.value.value = Number(value);
                }
                setAttribute(newAttribute);
                break;
            case "doubleValue":
                if (value !== "") {
                    newAttribute.value.value = Number(value);
                }
                setAttribute(newAttribute);
            case "jsonValue":
                newAttribute.value.value = value;
                console.log(newAttribute);
                setAttribute(newAttribute);
                break;
            case "stringValue":
                newAttribute.value.value = value;
                console.log(newAttribute);
                setAttribute(newAttribute);
                break;
            case "booleanValue":
                newAttribute.value.value = value;
                console.log(newAttribute);
                setAttribute(newAttribute);
                break;

            default:
                break;
        }
    };

    const handleJsonChange = useCallback(
        (e: any) => {
            const newValue = e.target.value;
            try {
                JSON.parse(newValue); // Attempt to parse the JSON
                _onChangeInputForm("jsonValue", newValue);
                setIsJsonValid(true); // Set JSON as valid
            } catch (err) {
                setIsJsonValid(false); // Set JSON as invalid
            }
        },
        [_onChangeInputForm]
    );

    const _renderValueInput = () => {
        const inputType = attribute.value?.type;
        switch (inputType) {
            case "Integer":
                return (
                    <InputText
                        value={attribute?.value?.value}
                        onChange={(e) => {
                            _onChangeInputForm("intValue", e.target.value);
                        }}
                        keyfilter="int"
                        type="text"
                    />
                );
            case "Double":
                return (
                    <InputText
                        value={attribute?.value.value}
                        onChange={(e) => {
                            _onChangeInputForm("doubleValue", e.target.value);
                        }}
                        keyfilter="pint"
                        type="text"
                    />
                );
            case "Boolean":
                return (
                    <div className="flex align-items-center">
                        <Checkbox
                            name="pizza"
                            value="Cheese"
                            checked={attribute?.value?.value || false}
                            onChange={(e) => {
                                _onChangeInputForm("booleanValue", e.checked);
                            }}
                        />
                        <label htmlFor="ingredient1" className="ml-2">
                            {attribute?.value?.value === true
                                ? "true"
                                : "false"}
                        </label>
                    </div>
                );
            case "JSON":
                return (
                    <>
                        <InputTextarea
                            value={attribute?.value?.value}
                            onChange={debounce(handleJsonChange, 500)} // Adjust debounce delay as needed
                            rows={2}
                            autoResize={true}
                            className={!isJsonValid ? "p-invalid" : ""} // Add 'p-invalid' class if JSON is invalid
                        />
                        {!isJsonValid && (
                            <small className="p-error">
                                Invalid JSON format.
                            </small>
                        )}
                    </>
                );
            case "String":
            default:
                return (
                    <InputText
                        value={attributeValue}
                        onChange={(e) => {
                            setAttributeValue(e.target.value); // Update state for all characters
                            _onChangeInputForm("stringValue", e.target.value);
                        }}
                        type="text"
                    />
                );
        }
    };
    const validateAttribute = () => {
        if (
            attribute?.key === "" ||
            attribute?.value?.type === "" ||
            attribute?.value?.value === null
        )
            return true;
        return false;
    };

    const footerAttributeForm = (
        <div>
            <Button
                label="Ok"
                disabled={validateAttribute()}
                icon="pi pi-check"
                //  onClick={_onOkCondtionForm}
                autoFocus
            />
            <Button label="Cancel" icon="pi pi-check" />
        </div>
    );

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
                footer={footerAttributeForm}
            >
                <div className="card p-fluid">
                    <div className="formgrid grid">
                        <div className="field col-12">
                            <label>Key</label>
                            <InputText
                                value={attribute.key}
                                onChange={(e) =>
                                    _onChangeInputForm("key", e.target.value)
                                }
                                type="text"
                            />
                        </div>
                        <div className="field col-6">
                            <label>Value type</label>
                            <AutoComplete
                                value={attribute.value?.type}
                                dropdown
                                suggestions={suggValueTypes}
                                completeMethod={_onSuggValueType}
                                onChange={(e) =>
                                    _onChangeInputForm(
                                        "valueType",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="field col-6">
                            <label>Value</label>
                            {_renderValueInput()}
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AttributeSetting;
