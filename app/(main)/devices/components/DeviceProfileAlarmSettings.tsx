"use client";
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

    console.log(alarmList);
    return (
        <>
            <div>
                {alarmList && alarmList.length > 0 ? (
                    <ol>
                        {alarmList.map((alarm: any, index: any) => (
                            <li key={index}>
                                <DeviceProfileAlarmSetting
                                    onAlarmUpdate={(updatedAlarm) =>
                                        handleAlarmUpdate(index, updatedAlarm)
                                    }
                                    deviceProfileId={deviceProfileId}
                                    alarm={alarm}
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
