import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
const page = () => {
    return (
        <>
            <h2>Change Password</h2>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="field grid">
                        <label
                            htmlFor="name3"
                            className="col-12 mb-4 md:col-4 md:mb-0"
                        >
                            Current password
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText id="name3" type="text" />
                        </div>
                    </div>
                    <div className="field grid">
                        <label
                            htmlFor="email3"
                            className="col-12 mb-4 md:col4 md:mb-0"
                        >
                            New password
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText id="email3" type="text" />
                        </div>
                    </div>
                    <div className="field grid">
                        <label
                            htmlFor="email3"
                            className="col-12 mb-4 md:col-4 md:mb-0"
                        >
                            Confirm new password
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText id="email3" type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
