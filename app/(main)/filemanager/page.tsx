"use client"; // This file is client-side code
import React, { useEffect, useRef } from "react";

const FileManager = () => {
    return (
        <div>
            <iframe
                src="https://filemanager.sogecgas.com/"
                width="100%"
                height="800px"
                style={{ border: "none" }}
                title="Embedded Page"
            />
        </div>
    );
};

export default FileManager;
