import { Metadata } from "next";
import Layout from "../../layout/layout";
import AppWrapper from "./AppWrapper";
import { AuthProvider } from "@/context/AuthProvider";
interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "ISI Control Sdn. Bhd.",
    description: "Dashboard IOT Application",
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: "device-width" },
    openGraph: {
        type: "website",
        title: "Automation Control Sdn. Bhd.",
        url: "https://www.primefaces.org/apollo-react",
        description:
            "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
        images: ["https://www.primefaces.org/static/social/apollo-react.png"],
        ttl: 604800,
    },
    icons: {
        icon: "/favicon2.ico",
    },
};

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <AuthProvider>
            <AppWrapper>
                <Layout>{children}</Layout>
            </AppWrapper>
        </AuthProvider>
    );
}
