"use client";
import { TabPanel, TabView } from "primereact/tabview";
import { useEffect, useCallback } from "react";
import {
    getDeviceProfileById,
    saveOrUpdateDeviceProfile,
} from "@/api/deviceProfile.api";
import DeviceProfileAlarmSettings from "./DeviceProfileAlarmSettings";
import { useState } from "react";
import { Button } from "primereact/button";

interface Props {
    device: any;
}
//nếu chưa có alarm nào thì set alarms =
const defaultAlarms = [
    {
        alarmType: "",
        createRules: {
            CRITICAL: {
                condition: {
                    condition: [
                        {
                            key: {
                                type: "TIME_SERIES",
                                key: "",
                            },
                            valueType: "",
                            value: null,
                            predicate: {
                                type: "",
                                operation: "",
                                value: {
                                    defaultValue: null,
                                    userValue: null,
                                    dynamicValue: null,
                                },
                            },
                        },
                    ],
                    spec: {
                        type: "SIMPLE",
                    },
                },
                schedule: null,
                alarmDetails: null,
                dashboardId: null,
            },
        },
        clearRule: {
            condition: {
                condition: [
                    {
                        key: {
                            type: "",
                            key: "",
                        },
                        valueType: "",
                        value: null,
                        predicate: {
                            type: "",
                            operation: "",
                            value: {
                                defaultValue: null,
                                userValue: null,
                                dynamicValue: null,
                            },
                        },
                    },
                ],
                spec: {
                    type: "SIMPLE",
                },
            },
            schedule: null,
            alarmDetails: null,
            dashboardId: null,
        },
        propagate: false,
        propagateToOwner: false,
        propagateToTenant: false,
        propagateRelationTypes: null,
    },
];
const defaultAlarm = {
    alarmType: "",
    createRules: {
        CRITICAL: {
            condition: {
                condition: [
                    {
                        key: {
                            type: "TIME_SERIES",
                            key: "",
                        },
                        valueType: "",
                        value: null,
                        predicate: {
                            type: "",
                            operation: "",
                            value: {
                                defaultValue: null,
                                userValue: null,
                                dynamicValue: null,
                            },
                        },
                    },
                ],
                spec: {
                    type: "SIMPLE",
                },
            },
            schedule: null,
            alarmDetails: null,
            dashboardId: null,
        },
    },
    clearRule: {
        condition: {
            condition: [
                {
                    key: {
                        type: "",
                        key: "",
                    },
                    valueType: "",
                    value: null,
                    predicate: {
                        type: "",
                        operation: "",
                        value: {
                            defaultValue: null,
                            userValue: null,
                            dynamicValue: null,
                        },
                    },
                },
            ],
            spec: {
                type: "SIMPLE",
            },
        },
        schedule: null,
        alarmDetails: null,
        dashboardId: null,
    },
    propagate: false,
    propagateToOwner: false,
    propagateToTenant: false,
    propagateRelationTypes: null,
};
const DeviceProfileForm: React.FC<Props> = ({ device }) => {
    const [deviceProfile, setDeviceProfile] = useState<any>({});
    const _fetchDataDeviceProfile = useCallback(({ id }: { id: string }) => {
        getDeviceProfileById(id)
            .then((resp) => resp.data)
            .then((res) => {
                console.log(res);
                setDeviceProfile(res);
            })
            .catch((err) => console.log(err));
    }, []);
    const handleAlarmsUpdate = (updatedAlarms: any) => {
        console.log(updatedAlarms);
        let newDeviceProfile: any = {};
        newDeviceProfile = {
            ...deviceProfile,
            profileData: {
                ...deviceProfile.profileData,
                alarms: [...updatedAlarms],
            },
        };
        console.log(newDeviceProfile);
        setDeviceProfile(newDeviceProfile);
    };

    useEffect(() => {
        console.log(device);
        if (device && device.deviceProfileId && device.deviceProfileId.id) {
            let profileId: string = device.deviceProfileId.id;
            _fetchDataDeviceProfile({ id: profileId });
        }
    }, [device, _fetchDataDeviceProfile]);
    console.log(deviceProfile);
    const _hanldeSubmit = () => {
        saveOrUpdateDeviceProfile(deviceProfile);
    };
    const _handleNewAlarm = () => {
        let newDeviceProfile: any = {};
        if (deviceProfile?.profileData?.alarms === null) {
            newDeviceProfile = {
                ...deviceProfile,
                profileData: {
                    ...deviceProfile.profileData,
                    alarms: [...defaultAlarms],
                },
            };
        } else {
            newDeviceProfile = {
                ...deviceProfile,
                profileData: {
                    ...deviceProfile.profileData,
                    alarms: [...deviceProfile.profileData.alarms, defaultAlarm],
                },
            };
        }
        console.log(newDeviceProfile);

        setDeviceProfile(newDeviceProfile);
    };
    return (
        <TabView>
            <TabPanel header="Alarms">
                <DeviceProfileAlarmSettings
                    onAlarmsUpdate={(updatedAlarms) =>
                        handleAlarmsUpdate(updatedAlarms)
                    }
                    alarms={deviceProfile?.profileData?.alarms}
                    deviceProfileId={deviceProfile?.id?.id}
                />
                <Button onClick={_hanldeSubmit}>Submit</Button>
                <Button onClick={_handleNewAlarm}>New Alarm</Button>
            </TabPanel>
            <TabPanel header="Attributes"></TabPanel>
        </TabView>
    );
};

export default DeviceProfileForm;
