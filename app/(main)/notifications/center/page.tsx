"use client";
import type { Demo } from "@/types";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import axios from "axios";
import { TabPanel, TabView } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { getUnReadAlarms,http } from "@/api/api";
import ReadAllAlarms from "../alarm-all/ReadAllAlarms";
import UnReadAlarms from "../alarm-unread/UnReadAlarms";

const Banking = () => {
   
return (
        <div className="grid">
          
          <div style={{width:'100%'}}>
          <TabView>
                <TabPanel header="Unread">

                    <UnReadAlarms/>
        
                </TabPanel>

                <TabPanel header="All">

                 <ReadAllAlarms/>
        
                </TabPanel>
   
        </TabView>
        

                 </div>
        </div>
    );
};

export default Banking;