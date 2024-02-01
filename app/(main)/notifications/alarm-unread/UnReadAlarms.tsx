"use client";
import type { Demo } from "@/types";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { getUnReadAlarms,http } from "@/api/api";

const UnReadAlarms = () => {
    const [data, setData] = useState<string[]>([]);
    console.log('data: ', data);

    const [searchText, setSearchText] = useState('');

    const token = localStorage.getItem('accessToken')
  
    const headerToken = {
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `Bearer ${token}`
         },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await http.get(getUnReadAlarms,
                    headerToken
                );
                setData(res.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
    },[])

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
        return (
            <>
                {rowData.text}
            </>
        );
    };
    const idBodyTemplate = (rowData: Demo.Payment) => {
        return (
            <>
                {rowData.id}
            </>
        );
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
    const filteredData = data.filter(item => {
        const searchWords = searchText.toLowerCase().split(" ");
        
        return searchWords.every(word => (
            item.subject.toLowerCase().includes(word) ||
            item.text.toLowerCase().includes(word)
        ));
    });

    const handleDelete = async (id) => {
        try {

            const res = await http.delete(`/notification/${id}`)
            
        } catch (error) {
            console.log('error: ', error);
            
        }
    }
    
    
    return (
        <div className="grid">
          
          <div style={{width:'100%'}}>
       
        <DataTable
                 header={renderHeader()}
                 value={filteredData.map((item, index) => ({ 
                    createdTime: item.createdTime,
                    subject: item.subject, 
                    text: item.text, 
                    id:item.id.id
                     
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
                      <Column
                         field="id"
                         header="Id"
                         body={idBodyTemplate}
                         headerClassName="white-space-nowrap w-4"
                     ></Column>
                 
                 </DataTable>
   
        

                 </div>
        </div>
    );
};

export default UnReadAlarms;