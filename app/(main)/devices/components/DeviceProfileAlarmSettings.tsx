"use client";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import DeviceProfileAlarmSetting from "./DeviceProfileAlarmSetting";

interface Props {
    alarms: any[];
    onAlarmsUpdate: (updatedAlarms: any) => void;
    deviceProfileId: string;
}
const DeviceProfileAlarmSettings: React.FC<Props> = ({
    alarms,
    onAlarmsUpdate,
    deviceProfileId,
}) => {
    const [alarmList, setAlarmList] = useState<any>([]);
    useEffect(() => {
        setAlarmList(alarms);
    }, [alarms]);

    const handleAlarmUpdate = (index: any, updatedAlarm: any) => {
        const updatedAlarms = [...alarmList];
        updatedAlarms[index] = updatedAlarm;
        setAlarmList(updatedAlarms);
        onAlarmsUpdate(updatedAlarms);
    };

    const handleAlarmDelete = (index: number) => {
        const updatedAlarms = alarmList.filter(
            (_: any, idx: number) => idx !== index
        );
        setAlarmList(updatedAlarms);
        onAlarmsUpdate(updatedAlarms);
    };
    return (
        <>
            <div>
                {alarmList && alarmList.length > 0 ? (
                    <ol>
                        {alarmList.map((alarm: any, index: number) => (
                            <li key={index}>
                                <DeviceProfileAlarmSetting
                                    onAlarmUpdate={(updatedAlarm) =>
                                        handleAlarmUpdate(index, updatedAlarm)
                                    }
                                    deviceProfileId={deviceProfileId}
                                    alarm={alarm}
                                />
                                <Button
                                    label="Delete"
                                    icon="pi pi-trash"
                                    className="p-button-danger"
                                    onClick={() => handleAlarmDelete(index)}
                                />
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p>No alarms set.</p>
                )}
            </div>
        </>
    );
};

export default DeviceProfileAlarmSettings;
