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

const formatUnixTimeToString = (unixTime: any, fmt?: any) => {
    const date = new Date(unixTime);
    if (fmt) {
        return format(date, fmt);
    }
    fmt = "dd-MM-yyyy HH:mm:ss";
    return format(date, fmt);
};

const UIUtils = { showError, showInfo, showWarning };
const Utils = { formatUnixTimeToString, getUnixTimeMilliseconds };
export { UIUtils, Utils };
