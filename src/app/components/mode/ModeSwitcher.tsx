import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import StandardGenerator from "../generator/StandardGenerator";
import ExternalGenerator from "../generator/ExternalGenerator";
import IntelligentGenerator from "../generator/IntelligentGenerator";

interface TabItem {
	id: string;
	label: string;
	content: JSX.Element;
}

const ModeSelector: React.FC = () => {
	// Initialize state with a default value
	const [selectedTab, setSelectedTab] = useState<string>("standard");
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		// Set isMounted to true after the first render
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			const savedTab = sessionStorage.getItem("selectedTab");
			if (savedTab) {
				setSelectedTab(savedTab);
			}
		}
	}, [isMounted]);

	useEffect(() => {
		if (isMounted) {
			sessionStorage.setItem("selectedTab", selectedTab);
		}
	}, [selectedTab, isMounted]);

	const tabs: TabItem[] = [
		{
			id: "standard",
			label: "Standard",
			content: <StandardGenerator />,
		},
		{
			id: "external",
			label: "External",
			content: <ExternalGenerator />,
		},
		{
			id: "intelligent",
			label: "Intelligent",
			content: <IntelligentGenerator />,
		},
	];

	return (
		<div
			id="get-started"
			className="flex flex-col items-center p-1 py-8 md:p-8 min-h-screen"
		>
			<div className="flex flex-col items-center w-full max-w-5xl">
				<Tabs
					selectedKey={selectedTab}
					items={tabs}
					onSelectionChange={(key) => {
						if (key) setSelectedTab(key.toString());
					}}
					className="mb-4"
				>
					{(item) => (
						<Tab
							key={item.id}
							title={item.label}
							className="w-full"
						>
							<div className="max-w-5xl">{item.content}</div>
						</Tab>
					)}
				</Tabs>
			</div>
		</div>
	);
};

export default ModeSelector;
