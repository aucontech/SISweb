"use client";
import type { Demo } from "@/types";
import { ChartData, ChartOptions } from "chart.js";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import axios from "axios";
import { getReadAllAlarms, http } from "@/api/api";
import { TabPanel, TabView } from "primereact/tabview";
import { InputText } from "primereact/inputtext";

const ReadAllAlarms = () => {
    const [data, setData] = useState<string[]>([]);
    console.log("data: ", data);
    const [currentPage, setCurrentPage] = useState(0);

    const [searchText, setSearchText] = useState("");

    const token = localStorage.getItem("accessToken");

    const headerToken = {
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `Bearer ${token}`,
        },
    };

    const fetchData = async () => {
        try {
            const res = await http.get(getReadAllAlarms, headerToken);

            setData(res.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const nameBodyTemplate = (rowData: Demo.Payment) => {
        return (
            <>
                <span className="p-column-title">CreatedTime</span>
                {rowData.createdTime}
            </>
        );
    };

    const amountBodyTemplate = (rowData: Demo.Payment) => {
        return (
            <>
                <span className="p-column-title">Subject </span>

                {rowData.subject}
            </>
        );
    };

    const dateBodyTemplate = (rowData: Demo.Payment) => {
        return <>{rowData.text}</>;
    };
    const idBodyTemplate = (rowData: Demo.Payment) => {
        return <>{rowData.id}</>;
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText
                        placeholder="Global Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full"
                    />
                </span>
            </div>
        );
    };
    const filteredData = data.filter((item) => {
        const searchWords = searchText.toLowerCase().split(" ");

        return searchWords.every(
            (word) =>
                item.subject.toLowerCase().includes(word) ||
                item.text.toLowerCase().includes(word)
        );
    });

    const handleDelete = async (id: string) => {
        try {
            const confirmed = window.confirm("Bạn có chắn chắn muốn xóa? ");
            if (confirmed) {
                await http.delete(`/notification/${id}`, headerToken);
                const updateTable = data.filter((item) => item.id !== id);
                console.log("updateTable: ", updateTable);

                setData(updateTable);

                fetchData();
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const deleteButtonTemplate = (rowData: string) => {
        return (
            <Button
                onClick={() => handleDelete(rowData.id)}
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
            />
        );
    };

    return (
        <div className="grid">
            <div style={{ width: "100%" }}>
                <DataTable
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    header={renderHeader()}
                    value={filteredData.map((item, index) => ({
                        createdTime: item.createdTime,
                        subject: item.subject,
                        text: item.text,
                        id: item.id.id,
                    }))}
                    className="datatable-responsive"
                    emptyMessage="No products found."
                >
                    <Column
                        sortable
                        field="createdTime"
                        header="Created Time"
                        body={nameBodyTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                    <Column
                        field="subject"
                        header=" Subject"
                        body={amountBodyTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                    <Column
                        field="text"
                        header="Message"
                        body={dateBodyTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                    {/* <Column
                         field="id"
                         header="Id"
                         body={idBodyTemplate}
                         headerClassName="white-space-nowrap w-4"
                     ></Column> */}
                    <Column
                        header="Edit"
                        body={deleteButtonTemplate}
                        headerClassName="white-space-nowrap w-4"
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default ReadAllAlarms;
