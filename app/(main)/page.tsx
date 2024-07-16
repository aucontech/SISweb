"use client";

import { useRouter } from "next/navigation";

function RedirectPage() {
    const router = useRouter();

    // Make sure we're in the browser
    // if (typeof window !== "undefined") {
    //     router.push("/Graphic", { scroll: false });
    // }
}

export default RedirectPage;
