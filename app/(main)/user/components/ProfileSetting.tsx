"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState, useEffect, useRef } from "react";
import { updateProfile } from "@/api/auth.api";
import { Toast } from "primereact/toast";
import { UIUtils } from "@/service/Utils";
import { persistUser } from "@/service/localStorage";
interface Props {
    user: any;
}
const ProfileSetting: React.FC<Props> = ({ user }) => {
    const [userProfile, setUserProfile] = useState<any>(null);
    const toast = useRef<Toast>(null);
    useEffect(() => {
        if (user) setUserProfile(user);
    }, [user]);

    const handleClickUpdateProfile = () => {
        updateProfile(userProfile)
            .then((res) => {
                if (res.status === 200) {
                    UIUtils.showInfo({
                        summary: "Update profile success",
                        toast: toast.current,
                    });
                    persistUser(res.data);
                }
            })
            .catch((err) => {
                UIUtils.showError({
                    error: "Update profile error",
                    detail: err?.response?.data?.message,
                    toast: toast.current,
                });
            });
    };
    return (
        <>
            <Toast ref={toast} />
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Profile</h5>
                    <div className="field">
                        <label htmlFor="name1">Email</label>
                        <InputText
                            value={userProfile?.email}
                            onChange={(e) =>
                                setUserProfile({
                                    ...userProfile,
                                    email: e.target.value,
                                })
                            }
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email1">First name </label>
                        <InputText
                            value={userProfile?.firstName}
                            onChange={(e) =>
                                setUserProfile({
                                    ...userProfile,
                                    firstName: e.target.value,
                                })
                            }
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="age1">Last name</label>
                        <InputText
                            value={userProfile?.lastName}
                            onChange={(e) =>
                                setUserProfile({
                                    ...userProfile,
                                    lastName: e.target.value,
                                })
                            }
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="age1">Phone</label>
                        <InputText
                            value={userProfile?.phone}
                            onChange={(e) =>
                                setUserProfile({
                                    ...userProfile,
                                    phone: e.target.value,
                                })
                            }
                            type="text"
                        />
                    </div>
                </div>
                <Button onClick={handleClickUpdateProfile}>Save</Button>
            </div>
        </>
    );
};

export default ProfileSetting;
