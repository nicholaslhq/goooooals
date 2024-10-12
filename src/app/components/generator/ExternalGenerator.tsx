import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Progress,
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getRandomExternalGoal } from "../../utils/externalGoal";
import { TextEffectOne } from "react-text-animate";
import confetti from "canvas-confetti";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { ExternalGoal } from "@/app/interfaces/goalInterfaces";
import axios from "axios";

const displayValue = (value: string | number | boolean | undefined | null) => {
	if (value === null || value === undefined || value === "") {
		return "Not specified";
	}
	if (typeof value === "boolean") {
		return value ? "Yes" : "No";
	}
	return value.toString();
};

function ExternalGenerator() {
	const [goal, setGoal] = useState<ExternalGoal | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);
	const [email, setEmail] = useState("");
	const [emailSending, setEmailSending] = useState<boolean>(false);

	const modalEmail = useDisclosure();
	const modalClearGoal = useDisclosure();

	useEffect(() => {
		// Retrieve the goal from sessionStorage when the component mounts
		const storedGoal = sessionStorage.getItem("externalGoal");
		if (storedGoal) {
			try {
				setGoal(JSON.parse(storedGoal));
			} catch (error) {
				console.error("Error parsing stored goal:", error);
			}
		}
	}, []);

	const handleFetchGoal = async () => {
		setLoading(true);
		setError(null);

		try {
			const newGoal = await getRandomExternalGoal();
			setGoal(newGoal);
			// Save the new goal to sessionStorage
			sessionStorage.setItem("externalGoal", JSON.stringify(newGoal));
			setShowDetailedInfo(false);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
				toast.error("Something went wrong", {
					id: "fetchExternalGoalError",
				});
			} else {
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleToggleDetailedInfo = () => {
		setShowDetailedInfo(!showDetailedInfo);
	};

	// Clear function to reset state
	const handleClear = () => {
		setGoal(null);
		setShowDetailedInfo(false);
		sessionStorage.removeItem("externalGoal"); // Optionally clear session storage
	};

	const handleEmailSend = async () => {
		setEmailSending(true);

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			toast.error("Please enter a valid email address", {
				id: "emailExternalGoalError",
			});
			setEmailSending(false);
			return;
		}

		try {
			const response = await axios.post(
				"/api/sendEmail",
				{
					email,
					goal,
					type: "External",
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// If the response is successful
			toast.success("Email sent successfully", {
				id: "emailExternalGoalSuccess",
			});
			setEmail("");
			modalEmail.onClose();
		} catch (error) {
			toast.error("Failed to send email", {
				id: "emailExternalGoalError",
			});
		} finally {
			setEmailSending(false);
		}
	};

	return (
		<div>
			<div>
				<Toaster />

				<Card className="p-2 md:p-4 min-w-full">
					<CardHeader className="flex justify-center text-center">
						<div className="flex flex-col gap-1">
							<p className="text-xl">External Gooooals</p>
							<p className="text-sm text-default-500">
								Perfect for discovering fresh and unexpected
								goals outside your usual interests
							</p>
						</div>
					</CardHeader>
					<Divider className="my-4 md:my-6" />
					{goal ? (
						<CardBody>
							<div className="flex flex-col gap-16 md:gap-18">
								<div className="flex flex-col gap-1 items-center justify-center text-center min-h-64">
									<p className="text-5xl leading-normal">
										🎯
									</p>
									<TextEffectOne
										className="text-2xl md:text-4xl font-semibold min-h-22"
										animateOnce={true}
										wordByWord={true}
										lineHeight={1.5}
										staggerDuration={0.3}
										key={displayValue(goal.activity)}
										text={displayValue(goal.activity)}
									/>
								</div>
								{showDetailedInfo && (
									<>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												🕙&nbsp;Availability
											</p>
											<Popover
												placement="bottom"
												showArrow={true}
											>
												<PopoverTrigger>
													<div>
														<Progress
															aria-label="Loading..."
															value={
																goal.availability ??
																0
															}
															maxValue={1}
															className="cursor-pointer hover:opacity-80 py-2"
														/>
													</div>
												</PopoverTrigger>
												<PopoverContent>
													<div className="px-1 py-2">
														<p className="text-tiny text-default-500">
															Availability Rate
														</p>
														<p className="text-sm font-bold text-center">
															{goal.availability}
														</p>
													</div>
												</PopoverContent>
											</Popover>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												👪&nbsp;Participants
											</p>
											<Popover
												placement="bottom"
												showArrow={true}
											>
												<PopoverTrigger>
													<div>
														<Progress
															aria-label="Loading..."
															value={
																goal.participants ??
																0
															}
															maxValue={10}
															className="cursor-pointer hover:opacity-80 py-2"
														/>
													</div>
												</PopoverTrigger>
												<PopoverContent>
													<div className="px-1 py-2">
														<p className="text-tiny text-default-500">
															Participant Count
														</p>
														<p className="text-sm font-bold text-center">
															{goal.participants}
														</p>
													</div>
												</PopoverContent>
											</Popover>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												💰&nbsp;Price
											</p>
											<Popover
												placement="bottom"
												showArrow={true}
											>
												<PopoverTrigger>
													<div>
														<Progress
															aria-label="Loading..."
															value={
																goal.price ?? 0
															}
															maxValue={1}
															className="cursor-pointer hover:opacity-80 py-2"
														/>
													</div>
												</PopoverTrigger>
												<PopoverContent>
													<div className="px-1 py-2">
														<p className="text-tiny text-default-500">
															Price Rate
														</p>
														<p className="text-sm font-bold text-center">
															{goal.price}
														</p>
													</div>
												</PopoverContent>
											</Popover>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												🔡&nbsp;Type
											</p>
											<p className="text-md">
												{displayValue(goal.type)}
											</p>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												♿&nbsp;Accessibility
											</p>
											<p className="text-md">
												{displayValue(
													goal.accessibility
												)}
											</p>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												⏳&nbsp;Duration
											</p>
											<p className="text-md">
												{displayValue(goal.duration)}
											</p>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												👶&nbsp;Kid Friendly
											</p>
											<p className="text-md">
												{displayValue(goal.kidFriendly)}
											</p>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												🔗&nbsp;Link
											</p>
											<p className="text-md">
												{goal.link ? (
													<Link
														href={goal.link}
														target="_blank"
														rel="noopener noreferrer"
													>
														{goal.link}
													</Link>
												) : (
													"No link available"
												)}
											</p>
										</div>
									</>
								)}
							</div>
						</CardBody>
					) : (
						<CardBody className="flex items-center justify-center text-center gap-6 min-h-64">
							<div className="text-5xl">❓</div>
							<div className="flex flex-col gap-2">
								<div className="text-xl">
									No goooooals available
								</div>
								<div className="text-sm text-default-500">
									Please click the button below to get a new
									goooooals
								</div>
							</div>
						</CardBody>
					)}
					<Divider className="my-4 md:my-6" />
					<CardFooter className="flex flex-col md:flex-row justify-center gap-4 p-4">
						<div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
							{!goal && (
								<Button
									color="primary"
									onClick={handleFetchGoal}
									isLoading={loading}
									className="flex items-center gap-2 w-full md:w-auto"
								>
									{loading ? "Generating..." : "🎲 Generate"}
								</Button>
							)}

							{goal && (
								<>
									{!showDetailedInfo && (
										<div className="flex flex-row items-center gap-4 md:gap-10">
											<Button
												color="danger"
												onClick={handleFetchGoal}
												isLoading={loading}
												className="w-full md:w-auto md:min-w-36"
											>
												{loading
													? "Generating..."
													: "👎 Try Again"}
											</Button>
											<Button
												color="primary"
												isDisabled={loading}
												onClick={() => {
													handleToggleDetailedInfo();
													confetti();
												}}
												className="w-full md:w-auto md:min-w-36"
											>
												👍 Awesome
											</Button>
										</div>
									)}
									{showDetailedInfo && (
										<>
											<Button
												color="primary"
												onClick={async () => {
													await handleFetchGoal();

													setTimeout(() => {
														const target =
															document.getElementById(
																"get-started"
															);
														if (target) {
															target.scrollIntoView(
																{
																	behavior:
																		"smooth",
																}
															);
														}
													}, 100);
												}}
												isLoading={loading}
												className="flex items-center gap-2 w-full md:w-auto"
											>
												{loading
													? "Generating..."
													: goal
													? "🎲 New Goal"
													: "🎲 Generate"}
											</Button>
											<Button
												onPress={modalEmail.onOpen}
												color="success"
												className="text-white"
											>
												📧 Email Me
											</Button>
											<Modal
												size={"xl"}
												isOpen={modalEmail.isOpen}
												onOpenChange={
													modalEmail.onOpenChange
												}
												scrollBehavior={"inside"}
												placement="center"
											>
												<ModalContent>
													{(onClose) => (
														<>
															<ModalHeader className="flex flex-col gap-1">
																Email Me
															</ModalHeader>
															<ModalBody className="text-justify">
																<div>
																	<Input
																		type="email"
																		placeholder="Enter your email"
																		value={
																			email
																		}
																		onChange={(
																			e
																		) =>
																			setEmail(
																				e
																					.target
																					.value
																			)
																		}
																	/>
																</div>
															</ModalBody>
															<ModalFooter>
																<Button
																	color="danger"
																	variant="light"
																	onPress={
																		onClose
																	}
																>
																	Cancel
																</Button>
																<Button
																	isLoading={
																		emailSending
																	}
																	onClick={
																		handleEmailSend
																	}
																	color="success"
																	className="text-white"
																>
																	{emailSending
																		? "Sending"
																		: "📧 Email Me"}
																</Button>
															</ModalFooter>
														</>
													)}
												</ModalContent>
											</Modal>
											<Button
												onPress={modalClearGoal.onOpen}
												color="danger"
											>
												🗑️ Clear Goal
											</Button>
											<Modal
												size={"xl"}
												isOpen={modalClearGoal.isOpen}
												onOpenChange={
													modalClearGoal.onOpenChange
												}
												scrollBehavior={"inside"}
												placement="center"
											>
												<ModalContent>
													{(onClose) => (
														<>
															<ModalHeader className="flex flex-col gap-1">
																Clear Goal?
															</ModalHeader>
															<ModalBody className="text-justify">
																<div>
																	Are u sure?
																</div>
															</ModalBody>
															<ModalFooter>
																<Button
																	color="danger"
																	variant="light"
																	onPress={
																		onClose
																	}
																>
																	Cancel
																</Button>
																<Button
																	aria-label="Clear goals"
																	color="danger"
																	onClick={async () => {
																		await handleClear();

																		modalClearGoal.onClose();

																		const target =
																			document.getElementById(
																				"get-started"
																			);
																		if (
																			target
																		) {
																			target.scrollIntoView(
																				{
																					behavior:
																						"smooth",
																				}
																			);
																		}
																	}}
																>
																	🗑️ Clear
																	Goal
																</Button>
															</ModalFooter>
														</>
													)}
												</ModalContent>
											</Modal>
										</>
									)}
								</>
							)}
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

export default ExternalGenerator;
