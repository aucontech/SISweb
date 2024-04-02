"use client";
import { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { getTimeSeriesKeyByProfileId } from "@/api/deviceProfile.api";

interface Props {
    alarm: any;
    onAlarmUpdate: (updatedAlarm: any) => void;
    deviceProfileId: string;
}
const DeviceProfileAlarmSetting: React.FC<Props> = ({
    alarm,
    onAlarmUpdate,
    deviceProfileId,
}) => {
    const [editAlarm, setEditAlarm] = useState<any>({});
    const [condition, setCondition] = useState<any>({});
    const [clearCondition, setClearCondition] = useState<any>({});
    const [isConditionFormVisible, setIsConditionFormVisible] =
        useState<boolean>(false);
    const [suggKey, setSuggKey] = useState<any[]>([]);
    const [valueTypes, setValueTypes] = useState<any[]>([]);
    const [operations, setOperations] = useState<any>([]);
    const [suggBoolValues, setSuggBoolValues] = useState<any[]>([]);

    useEffect(() => {
        console.log(alarm);
        let newEditAlarm = {
            ...editAlarm,
            ...alarm,
        };
        if (alarm.createRules.CRITICAL.condition.condition[0] !== undefined) {
            setCondition(alarm.createRules.CRITICAL.condition.condition[0]);
        }
        setEditAlarm(newEditAlarm);
    }, [alarm]);

    const _renderAlarmRule = (editAlarm: any) => {
        const condition =
            editAlarm?.createRules?.CRITICAL?.condition?.condition[0];
        let conditionString = "";
        if (condition) {
            const key = condition.key.key;
            const operation = condition.predicate.operation.toLowerCase();
            const value = condition.predicate.value.defaultValue;
            if (value !== null) {
                conditionString = `Condition: ${key} ${operation} ${value}`;
            } else {
                conditionString = `Condition: `;
            }
        }

        return (
            <>
                {conditionString}{" "}
                <Button onClick={() => setIsConditionFormVisible(true)}>
                    edit
                </Button>{" "}
            </>
        );
    };
    const _renderClearAlarmRule = (editAlarm: any) => {
        const condition = editAlarm?.clearRule?.condition?.condition[0];
        let conditionString = "";
        if (condition) {
            const key = condition.key.key; // "E_Stop_DI"
            const operation = condition.predicate.operation.toLowerCase(); // "equal"
            const value = condition.predicate.value.defaultValue; // true
            conditionString = `Condition: ${key} ${operation} ${value}`;
        } else {
            conditionString = "Condition: ";
        }

        return (
            <>
                {conditionString} <Button>edit</Button>{" "}
            </>
        );
    };

    const _onChangeValueInput = (field: string, value: any) => {
        console.log(value);
        let newEditAlarm = {
            ...editAlarm,
        };
        newEditAlarm[field] = value;
        setEditAlarm(newEditAlarm);
        onAlarmUpdate(newEditAlarm);
    };

    const _renderAlarmRuleForm = (editAlarm: any) => {
        if (editAlarm.createRules) {
            return (
                <>
                    <h6>Alarm rule</h6>
                    <div className="col-12 lg:col-12 ">
                        <span className="p-float-label">
                            <InputText
                                className="w-full"
                                value={editAlarm.alarmType}
                                onChange={(e: any) =>
                                    _onChangeValueInput(
                                        "alarmType",
                                        e.target.value
                                    )
                                }
                            />
                            <label>Alarm Type</label>
                        </span>
                    </div>
                    <div className="col-12 lg:col-12 ">
                        <span className="p-float-label">
                            <p>{_renderAlarmRule(editAlarm)}</p>
                        </span>
                    </div>
                </>
            );
        }
    };

    const _renderClearAlarmRuleForm = (editAlarm: any) => {
        if (editAlarm.clearRule) {
            return (
                <>
                    <h6>Clear alarm rule</h6>
                    <div className="col-12 lg:col-12 ">
                        <span className="p-float-label">
                            <p>{_renderClearAlarmRule(editAlarm)}</p>
                        </span>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <h6>Clear alarm rule</h6>
                    <div className="col-12 lg:col-12 ">
                        <span className="p-float-label">
                            <p>{_renderClearAlarmRule(editAlarm)}</p>
                        </span>
                    </div>
                </>
            );
        }
    };
    const _onSuggKey = () => {
        getTimeSeriesKeyByProfileId(deviceProfileId)
            .then((resp) => resp.data)
            .then((res) => {
                setSuggKey([...res]);
            })
            .catch((err) => {
                setSuggKey([]);
            });
    };

    const _onSuggValueTypes = () => {
        setValueTypes([
            { label: "NUMERIC", value: "NUMERIC" },
            { label: "BOOLEAN", value: "BOOLEAN" },
        ]);
    };

    const _onChangConditionForm = (field: any, value: any) => {
        let newCondition = { ...condition };
        switch (field) {
            case "key":
                newCondition.key.key = value;
                setCondition(newCondition);
                break;
            case "valueType":
                console.log(value);
                newCondition.valueType = value.value;
                setCondition(newCondition);
                break;
            case "operation":
                console.log(value);
                newCondition.predicate.operation = value.value;
                newCondition.predicate.type = newCondition.valueType;
                setCondition(newCondition);
                break;
            case "numericValue":
                console.log(value);
                newCondition.predicate.value.defaultValue = Number(value);
                setCondition(newCondition);
                break;
            case "boolValue":
                console.log(typeof value);
                newCondition.predicate.value.defaultValue =
                    value === "true" ? true : false;
                console.log(newCondition);
                setCondition(newCondition);
                break;

            default:
                break;
        }
    };
    const _onSuggOperations = () => {
        if (condition.valueType === "NUMERIC") {
            setOperations([
                { label: "EQUAL", value: "EQUAL" },
                { label: "NOT_EQUAL", value: "NOT_EQUAL" },
                { label: "GREATER", value: "GREATER" },
                { label: "LESS", value: "LESS" },
                { label: "GREATER_OR_EQUAL", value: "GREATER_OR_EQUAL" },
                { label: "LESS_OR_EQUAL", value: "LESS_OR_EQUAL" },
            ]);
        } else if (condition.valueType === "BOOLEAN") {
            setOperations([
                { label: "EQUAL", value: "EQUAL" },
                { label: "NOT_EQUAL", value: "NOT_EQUAL" },
            ]);
        }
        //setOperations([{ label: "GREATER", value: "GREATER" }]);
    };
    const _renderValueInput = (condition: any) => {
        if (condition.valueType === "NUMERIC") {
            return (
                <>
                    <label>Value</label>
                    <InputText
                        keyfilter="pint"
                        value={condition?.predicate?.value?.defaultValue}
                        onChange={(e: any) => {
                            console.log(e);
                            _onChangConditionForm(
                                "numericValue",
                                e.target.value
                            );
                        }}
                        // type="text"
                    />
                </>
            );
        } else if (condition.valueType === "BOOLEAN") {
            return (
                <>
                    <label>Value</label>
                    <AutoComplete
                        dropdown
                        value={condition?.predicate?.value?.defaultValue}
                        suggestions={suggBoolValues}
                        onChange={(e) => {
                            _onChangConditionForm("boolValue", e.value);
                        }}
                        completeMethod={_onSuggBoolValues}
                    ></AutoComplete>
                </>
            );
        }
    };
    const _onSuggBoolValues = () => {
        setSuggBoolValues(["true", "false"]);
    };
    const _onOkCondtionForm = () => {
        console.log(condition);
        console.log(editAlarm);
        editAlarm.createRules.CRITICAL.condition.condition = [{ ...condition }];
        setEditAlarm(editAlarm);
        onAlarmUpdate(editAlarm);
    };
    const footerConditionForm = (
        <div>
            <Button
                label="Ok"
                icon="pi pi-check"
                onClick={_onOkCondtionForm}
                autoFocus
            />
            <Button label="Cancel" icon="pi pi-check" />
        </div>
    );
    console.log(condition);
    return (
        <>
            <div>
                <Panel header={editAlarm?.alarmType} toggleable>
                    {_renderAlarmRuleForm(editAlarm)}
                    {_renderClearAlarmRuleForm(editAlarm)}
                </Panel>
                <Dialog
                    header="Condition Form"
                    visible={isConditionFormVisible}
                    onHide={() => setIsConditionFormVisible(false)}
                    footer={footerConditionForm}
                >
                    <div className="card p-fluid">
                        <div className="formgrid grid">
                            <div className="field col">
                                <label>Key</label>
                                <AutoComplete
                                    dropdown
                                    value={condition?.key?.key}
                                    suggestions={suggKey}
                                    completeMethod={_onSuggKey}
                                    onChange={(e) => {
                                        _onChangConditionForm("key", e.value);
                                    }}
                                />
                            </div>
                            <div className="field col">
                                <label>Value Types</label>
                                <AutoComplete
                                    dropdown
                                    field="label"
                                    suggestions={valueTypes}
                                    value={condition?.valueType}
                                    onChange={(e) => {
                                        _onChangConditionForm(
                                            "valueType",
                                            e.value
                                        );
                                    }}
                                    completeMethod={_onSuggValueTypes}
                                />
                            </div>
                            <div className="field col">
                                <label>Operation</label>
                                <AutoComplete
                                    dropdown
                                    field="label"
                                    suggestions={operations}
                                    value={condition?.predicate?.operation}
                                    onChange={(e) => {
                                        _onChangConditionForm(
                                            "operation",
                                            e.value
                                        );
                                    }}
                                    completeMethod={_onSuggOperations}
                                />
                            </div>
                            <div className="field col">
                                {_renderValueInput(condition)}
                            </div>
                        </div>
                    </div>
                </Dialog>
                {/* <Dialog
                    header="Condition Form"
                    visible={isConditionFormVisible}
                    onHide={() => setIsConditionFormVisible(false)}
                    footer={footerConditionForm}
                >
                    <div className="card p-fluid">
                        <div className="formgrid grid">
                            <div className="field col">
                                <label>Key</label>
                                <AutoComplete
                                    dropdown
                                    value={condition?.key?.key}
                                    suggestions={suggKey}
                                    completeMethod={_onSuggKey}
                                    onChange={(e) => {
                                        _onChangConditionForm("key", e.value);
                                    }}
                                />
                            </div>
                            <div className="field col">
                                <label>Value Types</label>
                                <AutoComplete
                                    dropdown
                                    field="label"
                                    suggestions={valueTypes}
                                    value={condition?.valueType}
                                    onChange={(e) => {
                                        _onChangConditionForm(
                                            "valueType",
                                            e.value
                                        );
                                    }}
                                    completeMethod={_onSuggValueTypes}
                                />
                            </div>
                            <div className="field col">
                                <label>Operation</label>
                                <AutoComplete
                                    dropdown
                                    field="label"
                                    suggestions={operations}
                                    value={condition?.predicate?.operation}
                                    onChange={(e) => {
                                        _onChangConditionForm(
                                            "operation",
                                            e.value
                                        );
                                    }}
                                    completeMethod={_onSuggOperations}
                                />
                            </div>
                            <div className="field col">
                                {_renderValueInput(condition)}
                            </div>
                        </div>
                    </div>
                </Dialog> */}
            </div>
        </>
    );
};

export default DeviceProfileAlarmSetting;
