import React from "react";

import styles from "../components/GraphicCss.module.css";

export default function TextGraphicOTK() {


  const NameParameter = {
    SDV1501:  "SDV-1501",
    PCV1501:  "PCV-1501",
    PCV1502:  "PCV-1502",
    FIQ1502:  "FIQ-1502>",
    

  }

    return (
        <>
            <text
                x="150"
                y="430"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameMeasuring}
                id="UID_1701153734203"
            >
                {NameParameter.SDV1501}
            </text>
            <text
                x="943"
                y="350"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameMeasuring}
                id="UID_1701153734203"
            >
                {NameParameter.PCV1501}

            </text>
            <text
                x="943"
                y="535"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameMeasuring}
                id="UID_1701153734203"
            >
                {NameParameter.PCV1502}

            </text>

            <text
                x="660"
                y="525"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                {NameParameter.FIQ1502}

            </text>

            <text
                x="660"
                y="278"
                transform="matrix(1 0 0 1 -19.130434036254883 -4.202898333038109)"
                className={styles.NameQ}
                id="UID_1701153734203"
            >
                {NameParameter.FIQ1502}

            </text>
        </>
    );
}
