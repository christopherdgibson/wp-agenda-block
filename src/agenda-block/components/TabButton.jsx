import { Button } from "@wordpress/components";

export default function TabButton({ tabName, tabText, activeTab, setActiveTab }) {
    return (
        <Button
            variant={activeTab === tabName ? "primary" : "secondary"}
            onClick={() => setActiveTab(tabName)}
            >
            {tabText}
        </Button>
    );
}