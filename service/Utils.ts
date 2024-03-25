import { format } from "date-fns";
const showError = ({
    error,
    summary,
    detail,
    toast,
    severity,
    sticky,
}: {
    error: any;
    summary?: string;
    detail?: string;
    toast: any;
    severity?: string;
    sticky?: boolean;
}) => {
    summary = summary || "Error";
    severity = severity || "error";
    let life = 7000;
    sticky = sticky === undefined ? false : sticky;
    if (error) {
        toast.show({ severity, summary, detail: error, sticky, life });
        return;
    }
    return;
};

const showInfo = ({
    summary,
    detail,
    toast,
    sticky,
}: {
    summary?: string;
    detail?: string;
    toast: any;
    sticky?: boolean;
}) => {
    let severity = "info";
    let life = 7000;
    sticky = sticky === undefined ? false : sticky;
    summary = summary || "Information";
    if (toast) {
        toast.show({
            severity,
            summary,
            detail,
            life,
            sticky,
        });
    }
};

const showWarning = ({
    summary,
    detail,
    toast,
    sticky,
}: {
    summary?: string;
    detail?: string;
    toast: any;
    sticky?: boolean;
}) => {
    let severity = "warn";
    let life = 7000;
    sticky = sticky === undefined ? false : sticky;
    summary = summary || "Warning";
    if (toast) {
        toast.show({
            severity,
            summary,
            detail,
            life,
            sticky,
        });
    }
};

const getUnixTimeMilliseconds = () => new Date().getTime();

const getUnixTimeMillisecondsGMT7 = () => {
    const currentTime = new Date().getTime();
    const offset = 7 * 3600000; // 7 hours * 3600 seconds/hour * 1000 milliseconds/second
    const timeInGMT7 = currentTime + offset;
    return timeInGMT7;
};

const formatUnixTimeToString = (unixTime: any, fmt?: any) => {
    const date = new Date(unixTime);
    if (fmt) {
        return format(date, fmt);
    }
    fmt = "dd-MM-yyyy HH:mm:ss";
    return format(date, fmt);
};

const formatDurationWithWords = (duration: any) => {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor(duration / (1000 * 60 * 60));

    const hoursText = hours > 0 ? `${hours} hours` : "";
    const minutesText = minutes > 0 ? `${minutes} minutes` : "";
    const secondsText = seconds > 0 ? `${seconds} seconds` : "";

    return [hoursText, minutesText, secondsText].filter(Boolean).join(", ");
};

const calculateDurationFromUnixWithWords = (startTime: any, endTime: any) => {
    const start: any = new Date(startTime);
    const end: any = new Date(endTime);
    const duration: any = end - start; // Khoảng thời gian tính bằng miligiây
    return formatDurationWithWords(duration);
};

const UIUtils = { showError, showInfo, showWarning };
const Utils = {
    formatUnixTimeToString,
    getUnixTimeMilliseconds,
    getUnixTimeMillisecondsGMT7,
    calculateDurationFromUnixWithWords,
};
export { UIUtils, Utils };
