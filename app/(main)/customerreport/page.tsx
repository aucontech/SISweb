// components/CustomerReport.js
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styles from "./CustomerReport.module.css";

const CustomerReport = () => {
    return (
        <div className={styles.grid}>
            <div className={styles.col}>
                <p className={styles.label}>Daily Report</p>
                <p className={styles.label}>Gross Volume Vm (m3)</p>
                <p className={styles.label}>Standard Volume Vb (Sm3)</p>
                <p className={styles.label}>Gross Heating Value (Mj/Sm3)</p>
            </div>
            <div className={styles.col}>
                <p className="w-full text-center">EVC 1901</p>
                <InputText className="w-full" />
                <InputText className="w-full" />
                <InputText className="w-full" />
            </div>
            <div className={styles.col}>
                <p className="w-full">Duty</p>
                <Button className="w-full">Action</Button>
                <Button className="w-full">Action</Button>
                <Button className="w-full">Action</Button>
            </div>
            <div className={styles.col}>
                <p className="w-full">EVC 1901</p>
                <InputText className="w-full" />
                <InputText className="w-full" />
            </div>
            <div className={styles.col}>
                <p className="w-full">EVC 1901</p>
                <InputText className="w-full" />
                <InputText className="w-full" />
            </div>
        </div>
    );
};

export default CustomerReport;
