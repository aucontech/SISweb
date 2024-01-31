import Link from "next/link";
import { useContext } from "react";
import AppMenu from "./AppMenu";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { LayoutState } from "../types/layout";




const AppSidebar = () => {
    const { setLayoutState } = useContext(LayoutContext);
    const anchor = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            anchored: !prevLayoutState.anchored,
        }));
    };


    return (
        <>
            <div className="sidebar-header">
                <Link href="/" className="app-logo">

                <img style={{width:60}}
                
                src="/layout/imgGas/1sojitz.png"
                alt="Profile"
            />
                <img style={{width:80}}
                
                                src="/layout/imgGas/daigaslogo.png"
                                alt="Profile"
                            />


                </Link>
                <button
                    className="layout-sidebar-anchor p-link z-2 mb-2"
                    type="button"
                    onClick={anchor}
                ></button>
            </div>

            <div className="layout-menu-container">
                <MenuProvider>
                    <AppMenu />
                </MenuProvider>
            </div>
        </>
    );
};

export default AppSidebar;
