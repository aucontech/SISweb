import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function SetUpdata_LGDSTest() {

    const mainCategoryFC = {
        FC01: 'FC01 -  Parameter & Configuration',
        FC02: 'FC02 -  Parameter & Configuration',
        PLC: 'PLC -  Parameter & Configuration',
        FC03: 'FC03 -  Parameter & Configuration',
    };

    const dataFC01 = [
        {
            mainCategory: mainCategoryFC.FC01,
            name: <span>Gross Volume Accumulated</span>,
        },
    ];

    const dataFC02 = [
        {
            mainCategory: mainCategoryFC.FC02,
            name: <span>Gross Volume Accumulated</span>,
        },
    ];

    const PLC = [
        {
            mainCategory: mainCategoryFC.PLC,
            name: <span>Gas Detector GD-1601</span>,
        },
    ];

    const dataFC03 = [
        {
            mainCategory: mainCategoryFC.FC03,
            name: <span>Lithium Battery Status</span>,
        },
    ];

    const combinedData = [ ...dataFC01, ...dataFC02, ...PLC, ...dataFC03];

 

    const mainCategoryTemplate = (data: any) => {
        return (
            <div style={{fontWeight: 600, fontSize: 23, background: '#f8fafc'}}>
                <span>{data.mainCategory}</span>
            </div>
        );
    };

    return (
        <div>
            <DataTable
                size={"small"}
                value={combinedData}
                rowGroupMode="subheader"
                groupRowsBy="mainCategory"
                sortMode="single"
                sortOrder={1}
                rowGroupHeaderTemplate={mainCategoryTemplate}
            >
                <Column field="name" header="Name" />
            </DataTable>
        </div>
    );
}
