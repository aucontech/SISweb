import type { AppTopbarRef } from "@/types";
import { Button } from "primereact/button";
import { logout } from "@/api/auth.api";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import AppBreadcrumb from "./AppBreadCrumb";
import { LayoutContext } from "./context/layoutcontext";
import Alarmbell from "./AlarmBell/Alarmbell";
import { useRouter } from "next/navigation";
const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const router = useRouter();
    const { onMenuToggle, showProfileSidebar, showConfigSidebar } =
        useContext(LayoutContext);
    const menubuttonRef = useRef(null);

    const onConfigButtonClick = () => {
        showConfigSidebar();
    };

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
    }));
    const handleLogOut = () => {
        logout().then(() => {
            router.push("/login");
        });
    };

    return (
        <div className="layout-topbar">
            <div className="topbar-start">
                <button
                    ref={menubuttonRef}
                    type="button"
                    className="topbar-menubutton p-link p-trigger"
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars"></i>
                </button>

                <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb>
            </div>

            <div className="topbar-end">
                <ul className="topbar-menu">
                    <li className="topbar-search">
                        <span>
                            <Alarmbell />
                        </span>
                    </li>
                    <li className="ml-3">
                        <Button
                            type="button"
                            icon="pi pi-cog"
                            text
                            rounded
                            severity="secondary"
                            className="flex-shrink-0"
                            onClick={onConfigButtonClick}
                        ></Button>
                    </li>
                    <li className="ml-3">
                        {/* <a
                            className="cursor-pointer flex mt-2 surface-border align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
                            onClick={handleLogOut}
                        > */}
                        {/* <span>
                                <i className="pi pi-power-off text-xl text-primary"></i>
                            </span> */}
                        <Button
                            type="button"
                            icon="pi pi-power-off"
                            text
                            rounded
                            severity="secondary"
                            className="flex-shrink-0 cursor-pointer flex mt-2 surface-border align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
                            onClick={handleLogOut}
                        ></Button>
                        {/* </a> */}
                    </li>
                </ul>
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
