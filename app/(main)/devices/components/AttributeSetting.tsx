"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import {
    getSeverAttributesByDevice,
    saveOrUpdateSeverAttributesByDevice,
} from "@/api/telemetry.api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Utils, UIUtils } from "@/service/Utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import debounce from "lodash/debounce";
import { Toast } from "primereact/toast";

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
    const [isReload, seIsReload] = useState<boolean>(true);
    const toast = useRef<Toast>(null);
    const _fecthDataAttribute = useCallback((deviceId: string) => {
        getSeverAttributesByDevice(deviceId)
            .then((resp) => resp.data)
            .then((res) => {
                setAttributes([...res]);
            })
            .catch((err) => {
                UIUtils.showError({
                    error: err?.message,
                    toast: toast.current,
                });
            });
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
    );
    useEffect(() => {
        let newAttribute = {
            ...defaultAttribute,
        };
        setAttribute(newAttribute);
    }, []);
    useEffect(() => {
        _fecthDataAttribute(deviceId);
    }, [deviceId, isReload, _fecthDataAttribute]);

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
                if (
                    newAttribute.value.value === null ||
                    newAttribute.value.value === ""
                ) {
                    newAttribute.value.value = "{}";
                }
                setAttribute(newAttribute);
                break;
            case "intValue":
                if (value !== "") {
                    newAttribute.value.value = Number(value);
                }

                console.log(newAttribute);
                setAttribute(newAttribute);
                break;
            case "doubleValue":
                if (value !== "") {
                    console.log(typeof value);
                    newAttribute.value.value = Number(value);
                }

                setAttribute(newAttribute);
                break;
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
    // const debouncedHandleJsonChange = useCallback(
    //     debounce((e) => handleJsonChange(e), 250),
    //     [] // Dependencies array, it's empty because we only want to create the debounced function once
    // );

    const handleJsonChange = useCallback(
        (e: any) => {
            const newValue = e.target.value;
            // Initialize isValid flag as false
            let isValid = false;

            try {
                // Attempt to parse the JSON
                const parsedValue = JSON.parse(newValue);

                // Check if the parsed JSON is an object and not an array
                isValid =
                    parsedValue &&
                    typeof parsedValue === "object" &&
                    !Array.isArray(parsedValue);
            } catch (err) {
                // Parsing failed, log the error and leave isValid as false
                console.log("Error parsing JSON:", err);
            }

            // Update the form with the new value
            _onChangeInputForm("jsonValue", newValue);

            // Update JSON validation state
            setIsJsonValid(isValid);
        },
        [_onChangeInputForm]
    );

    const _renderValueInput = () => {
        const inputType = attribute.value?.type;
        switch (inputType) {
            case "Integer":
                if (Number.isInteger(attribute?.value?.value) === false) {
                    attribute.value.value = 0;
                }
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
                if (
                    typeof attribute?.value?.value !== "number" &&
                    !isNaN(attribute?.value?.value)
                ) {
                    attribute.value.value = 0;
                }
                return (
                    <InputNumber
                        value={attribute?.value.value}
                        onChange={(e) => {
                            _onChangeInputForm("doubleValue", e.value);
                        }}
                        mode="decimal"
                        minFractionDigits={2}
                        maxFractionDigits={5}
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
                            onChange={(e) => handleJsonChange(e)} // Adjust debounce delay as needed
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
    const _onOkAttributeForm = () => {
        let reqParams: any = {};

        if (
            attribute.value.type === "JSON" &&
            typeof attribute.value.value === "string"
        ) {
            try {
                reqParams[attribute.key] = JSON.parse(attribute.value.value);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            reqParams[attribute.key] = attribute.value.value;
        }
        saveOrUpdateSeverAttributesByDevice(deviceId, reqParams)
            .then((resp) => {
                if (resp.status === 200) {
                    UIUtils.showInfo({
                        toast: toast.current,
                        summary: "Success",
                    });
                    setIsFormVisible(false);
                    seIsReload((prevalue) => !prevalue);
                }
            })
            .catch((err) => {
                UIUtils.showError({
                    error: err?.response?.data?.message,
                    toast: toast.current,
                });
            });
        console.log(reqParams);
    };

    const footerAttributeForm = (
        <div>
            <Button
                label="Ok"
                disabled={validateAttribute()}
                icon="pi pi-check"
                onClick={_onOkAttributeForm}
                autoFocus
            />
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setIsFormVisible(false)}
            />
        </div>
    );
    const handleEditAttribute = (rowData: any) => {
        let newAttribute: any = {
            ...defaultAttribute,
        };
        newAttribute.key = rowData.key;
        newAttribute.value.type = Utils.getType(rowData.value);

        if (Utils.getType(rowData.value) === "JSON") {
            newAttribute.value.value = JSON.stringify(rowData.value);
        } else {
            newAttribute.value.value = rowData.value;
        }

        console.log(newAttribute);
        // setIsNew(false);
        setAttribute({ ...newAttribute });
        setIsFormVisible(true);
    };
    const editButtonTemplate = (rowData: any) => {
        return (
            <Button
                onClick={() => handleEditAttribute(rowData)}
                icon="pi pi-user-edit"
                className="p-button-rounded p-button-danger"
            />
        );
    };

    return (
        <>
            <div>
                <Toast ref={toast} />
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
                    <Column header="Edit" body={editButtonTemplate}></Column>
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
