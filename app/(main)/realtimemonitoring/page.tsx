"use client";
import { Page } from "@/types";
import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { readToken } from "@/service/localStorage";
import { Utils } from "@/service/Utils";
import { Chart } from "primereact/chart";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { ChartData, ChartOptions } from "chart.js";
import "chartjs-adapter-luxon";
import { StreamingPlugin } from "chartjs-plugin-streaming";
import ChartRealtime from "@/components/ChartRealtime";

const plugins = [StreamingPlugin];
const RealtimeMonitoring: Page = () => {
    return (
        <>
            <div>
                <ChartRealtime
                    tag="Flow_Rate_AI"
                    deviceId="28e76d70-a3ce-11ee-9ca1-8f006c3fce43"
                />
            </div>
        </>
    );
};
export default RealtimeMonitoring;
