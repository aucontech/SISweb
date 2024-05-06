"use client";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useCallback, useState, useRef, useEffect } from "react";
import { UIUtils } from "@/service/Utils";
import { Toast } from "primereact/toast";
import { changePassword } from "@/api/auth.api";
import { persistRefreshToken, persistToken } from "@/service/localStorage";

const PasswordSetting = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const toast = useRef<Toast>(null);
    //const [user, setUser] = useState<any>(null);

    const _handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            console.log("New password and confirm new password do not match");
            UIUtils.showError({
                error: "New password and confirm new password do not match",
                toast: toast.current,
            });
            return;
        }
        if (
            newPassword === "" ||
            confirmNewPassword === "" ||
            currentPassword === ""
        ) {
            UIUtils.showError({
                error: "Please fill in all fields",
                toast: toast.current,
            });
            return;
        }
        //  if (!user) return;
        let reqData = {
            currentPassword: currentPassword,
            newPassword: newPassword,
        };
        changePassword(reqData)
            .then((resp) => resp.data)
            .then((res: any) => {
                UIUtils.showInfo({
                    detail: "Password changed successfully",
                    toast: toast.current,
                });
                console.log(res);
                persistToken(res.token);
                persistRefreshToken(res.refreshToken);
            })
            .catch((err) => {
                console.log(err);
                UIUtils.showError({
                    error: err?.response?.data?.message,
                    toast: toast.current,
                });
            });
    };
    return (
        <>
            <Toast ref={toast} />
            <h5>Change Password</h5>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="field grid">
                        <label
                            htmlFor="name3"
                            className="col-12 mb-4 md:col-4 md:mb-0"
                        >
                            Current password
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                }}
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="field grid">
                        <label
                            htmlFor="email3"
                            className="col-12 mb-4 md:col4 md:mb-0"
                        >
                            New password
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                id="email3"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="field grid">
                        <label
                            htmlFor="email3"
                            className="col-12 mb-4 md:col-4 md:mb-0"
                        >
                            Confirm new password
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText
                                value={confirmNewPassword}
                                onChange={(e) => {
                                    setConfirmNewPassword(e.target.value);
                                }}
                                id="email3"
                                type="password"
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={_handleChangePassword}>Change password</Button>
            </div>
        </>
    );
};

export default PasswordSetting;
