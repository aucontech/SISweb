import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./AlarmBell.module.css";

export default function Alarmbell() {
    const op = useRef(null);
    const router = useRouter();

    const subjects = [
        {
            subject: "Subject 1",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            subject: "Subject 2",
            text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            subject: "Subject 3",
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            subject: "Subject 4",
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            subject: "Subject 5",
            text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            subject: "Subject 6",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            subject: "Subject 7",
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            subject: "Subject 8",
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
    ];

    const dataAlarm = subjects.slice(0, 6).map((item, index) => (
        <div key={index} style={{ padding: "0px 10px" }}>
            <div>
                <p className={styles.subject}>{item.subject}</p>
                <p>{item.text}</p>
                <hr />
            </div>
        </div>
    ));
    const subjectCount = subjects.length;
    let totalSubjectDisplay = subjectCount;
    if (subjectCount > 99) {
        totalSubjectDisplay = "999+";
    }

    const totalCount =
        subjectCount > 0 ? { totalSubjects: totalSubjectDisplay } : null;

    return (
        <div>
            <div className="flex">
                {totalCount && (
                    <div className={styles.totalCount}>
                        <p className={styles.totalCount_p}>
                            {totalCount.totalSubjects}
                        </p>
                    </div>
                )}
                <i
                    className="pi pi-bell"
                    style={{ fontSize: "1.5rem" }}
                    onClick={(e) => op.current.toggle(e)}
                />
            </div>
            <OverlayPanel style={{ marginLeft: 10 }} ref={op}>
                <div className={styles.overlayPanel}>
                    <div style={{ padding: "10px 20px " }}>
                        <p style={{ fontSize: 20, fontWeight: 600 }}>Alarms</p>
                        <hr />
                    </div>
                    {dataAlarm.length > 0 ? (
                        <div style={{ overflowY: "auto", maxHeight: 300 }}>
                            {dataAlarm}
                        </div>
                    ) : (
                        <div className={styles.alarmEmpty}>
                            <Image
                                src="/demo/images/logoBell/bel.svg"
                                width={200}
                                height={200}
                                alt="Picture of the author"
                            />
                        </div>
                    )}
                    <div style={{ padding: 20 }}>
                        <Button
                            onClick={() => router.push("/notifications/center")}
                            className={styles.buttonViewAll}
                        >
                            View All
                        </Button>
                    </div>
                    <div></div>
                </div>
            </OverlayPanel>
        </div>
    );
}
