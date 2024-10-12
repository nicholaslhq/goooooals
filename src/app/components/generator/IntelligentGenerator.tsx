import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Divider,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Progress,
	Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TextEffectOne } from "react-text-animate";
import confetti from "canvas-confetti";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function IntelligentGenerator() {
	return (
		<div>
			<div>
				<Toaster />

				<Card className="p-2 md:p-4 min-w-full">
					<CardHeader className="flex justify-center text-center">
						<div className="flex flex-col gap-1">
							<p className="text-xl">Intelligent Gooooals</p>
							<p className="text-sm text-default-500">
								Best for tailored and relevant goals
								recommendations based on your preferences
							</p>
						</div>
					</CardHeader>
					<Divider className="my-4 md:my-6" />
					<CardBody className="flex items-center justify-center text-center gap-6 min-h-64">
						<div className="text-5xl">🚧</div>
						<div className="flex flex-col gap-2">
							<div className="text-xl">
								Feature not available yet
							</div>
							<div className="text-sm text-default-500">
								Stay tuned! Your feedback is invaluable in
								shaping this experience.
							</div>
						</div>
					</CardBody>
					<Divider className="my-4 md:my-6" />
					<CardFooter className="flex flex-col md:flex-row justify-center gap-4 p-4">
						<Button
							color="danger"
							onClick={() => {
								toast.error("Thanks for your feedback", {
									id: "NotInterested",
								});
							}}
							className="w-full md:w-auto md:min-w-36"
						>
							👎 Not Interested
						</Button>
						<Button
							color="primary"
							onClick={() => {
								toast.success("Awesome 🎉", {
									id: "Interested",
								});
								confetti();
							}}
							className="w-full md:w-auto md:min-w-36"
						>
							👍 Interested
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

export default IntelligentGenerator;
