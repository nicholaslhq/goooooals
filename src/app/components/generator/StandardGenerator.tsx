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
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getRandomStandardGoal } from "../../utils/standardGoal";
import { TextEffectOne } from "react-text-animate";
import confetti from "canvas-confetti";
import toast, { Toaster } from "react-hot-toast";
import {
	difficultyMap,
	durationMap,
	frequencyMap,
} from "../../../data/standardGoalsMaps";
import axios from "axios";
import { StandardGoal } from "@/app/interfaces/goalInterfaces";

const getLabel = (
	value: number | null,
	map: Record<number, { label: string }>
): string => {
	return value && map[value] ? map[value].label : "Not specified";
};

const displayValue = (value: string | number | null | undefined) => {
	if (value === null || value === undefined || value === "") {
		return "Not specified";
	}
	if (typeof value === "boolean") {
		return value ? "Yes" : "No";
	}
	return value.toString();
};

const highlightNumbers = (text: string | null): React.ReactNode => {
	if (text === null) {
		return "";
	}

	const regex = /(\d+)/g;
	return text
		.split(regex)
		.map((part, index) =>
			regex.test(part) ? <strong key={index}>{part}</strong> : part
		);
};

// Helper function to generate a random number within a range
const getRandomValue = (
	min: number | null,
	max: number | null,
	step: number | null
) => {
	if (min === null || max === null || min > max || step === null || step <= 0)
		return null;

	// Calculate the number of steps
	const range = Math.floor((max - min) / step) + 1;

	// Generate a random step index
	const randomStepIndex = Math.floor(Math.random() * range);

	// Calculate and return the random value
	return min + randomStepIndex * step;
};

// Function to replace placeholders in the description
const replacePlaceholders = (
	description: string | null,
	quantify: {
		min: number | null;
		max: number | null;
		step: number | null;
		unit: string | null;
	} | null
) => {
	if (description === null) return "Not specified";

	// Check if both description and quantify are present
	if (quantify && quantify.min !== null && quantify.max !== null) {
		const value = getRandomValue(quantify.min, quantify.max, quantify.step);
		return description
			.replace(
				"{value}",
				value !== null ? value.toString() : "Not specified"
			)
			.replace("{unit}", quantify.unit ?? "units");
	}

	// Check if only description is present
	if (description) {
		return description; // Return description as is
	}

	return "Not specified"; // If no valid data is present
};

function StandardGenerator() {
	const [goal, setGoal] = useState<StandardGoal | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);
	const [subgoals, setSubgoals] = useState<
		Array<{
			description: string | null;
			quantify: {
				min: number | null;
				max: number | null;
				step: number | null;
				unit: string | null;
			} | null;
		}>
	>([]);

	const [criteria, setCriteria] = useState<
		Array<{
			description: string | null;
			quantify: {
				min: number | null;
				max: number | null;
				step: number | null;
				unit: string | null;
			} | null;
		}>
	>([]);
	const [inputValue, setInputValue] = useState(""); // For the input textbox
	const [isEditingSubgoal, setIsEditingSubgoal] = useState(false); // For subgoal input mode
	const [isEditingCriteria, setIsEditingCriteria] = useState(false); // For criteria input mode
	const [email, setEmail] = useState("");
	const [emailSending, setEmailSending] = useState<boolean>(false);

	const modalEmail = useDisclosure();
	const modalClearGoal = useDisclosure();

	useEffect(() => {
		const storedGoal = sessionStorage.getItem("standardGoal");

		if (storedGoal) {
			try {
				const goalData = JSON.parse(storedGoal);
				setGoal(goalData);

				// Process subgoals
				const updatedSubgoals = goalData.subgoals.map(
					(subgoal: {
						description: string | null;
						quantify: any;
					}) => ({
						description: replacePlaceholders(
							subgoal.description,
							subgoal.quantify
						),
					})
				);
				setSubgoals(updatedSubgoals);

				// Process criteria
				const updatedCriteria = goalData.criteria.map(
					(criterion: {
						description: string | null;
						quantify: any;
					}) => ({
						description: replacePlaceholders(
							criterion.description,
							criterion.quantify
						),
					})
				);
				setCriteria(updatedCriteria);
			} catch (error) {
				console.error("Failed to parse stored goal:", error);
			}
		} else {
			setGoal(null);
			setSubgoals([]);
			setCriteria([]);
		}
	}, []);

	const handleFetchGoal = async () => {
		setLoading(true);
		setError(null);

		try {
			const newGoal = await getRandomStandardGoal();

			// Update state with the new goal
			setGoal(newGoal);

			// Process subgoals
			const updatedSubgoals = newGoal.subgoals.map(
				(subgoal: { description: string | null; quantify: any }) => ({
					description: replacePlaceholders(
						subgoal.description,
						subgoal.quantify
					),
				})
			);
			setSubgoals(updatedSubgoals);

			// Process criteria
			const updatedCriteria = newGoal.criteria.map(
				(criterion: { description: string | null; quantify: any }) => ({
					description: replacePlaceholders(
						criterion.description,
						criterion.quantify
					),
				})
			);
			setCriteria(updatedCriteria);

			// Store the goal in sessionStorage
			sessionStorage.setItem("standardGoal", JSON.stringify(newGoal));
			setShowDetailedInfo(false);
		} catch (error: unknown) {
			// Improved error handling
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unexpected error occurred";
			setError(errorMessage);
			toast.error(errorMessage, {
				id: "fetchStandardGoalError",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleToggleDetailedInfo = () => {
		if (!showDetailedInfo) {
			// Show the first subgoal
			setCriteria(criteria); // Show the criteria
		}
		setShowDetailedInfo(!showDetailedInfo);
	};

	const handleAddSubgoal = () => {
		if (inputValue.trim()) {
			const newSubgoal = { description: inputValue, quantify: null };
			const updatedSubgoals = [...subgoals, newSubgoal];

			setSubgoals(updatedSubgoals);
			setInputValue(""); // Clear input
			setIsEditingSubgoal(false); // Exit editing mode

			// Save updated goal to sessionStorage
			if (goal) {
				const updatedGoal = { ...goal, subgoals: updatedSubgoals };
				sessionStorage.setItem(
					"standardGoal",
					JSON.stringify(updatedGoal)
				);

				setGoal(updatedGoal);
			}

			toast.success("Subgoal added successfully", {
				id: "addStandardGoalSubgoalSuccess",
			});
		} else {
			toast.error("Subgoal cannot be empty", {
				id: "addStandardGoalSubgoalError",
			});
		}
	};

	const handleAddCriteria = () => {
		if (inputValue.trim()) {
			const newCriterion = { description: inputValue, quantify: null };
			const updatedCriteria = [...criteria, newCriterion];

			setCriteria(updatedCriteria);
			setInputValue(""); // Clear input
			setIsEditingCriteria(false); // Exit editing mode

			// Save updated goal to sessionStorage
			if (goal) {
				const updatedGoal = { ...goal, criteria: updatedCriteria };
				sessionStorage.setItem(
					"standardGoal",
					JSON.stringify(updatedGoal)
				);

				setGoal(updatedGoal);
			}

			toast.success("Criteria added successfully", {
				id: "addStandardGoalCriteriaSuccess",
			});
		} else {
			toast.error("Criteria cannot be empty", {
				id: "addStandardGoalCriteriaError",
			});
		}
	};

	const handleDeleteSubgoal = (index: number) => {
		const updatedSubgoals = subgoals.filter((_, i) => i !== index);
		setSubgoals(updatedSubgoals);

		// Update the goal in sessionStorage
		if (goal) {
			const updatedGoal = { ...goal, subgoals: updatedSubgoals };
			sessionStorage.setItem("standardGoal", JSON.stringify(updatedGoal));
			setGoal(updatedGoal); // Update the goal state
		}

		toast.success("Subgoal deleted successfully", {
			id: "deleteSubgoalSuccess",
		});
	};

	const handleDeleteCriteria = (index: number) => {
		const updatedCriteria = criteria.filter((_, i) => i !== index);
		setCriteria(updatedCriteria);

		// Update the goal in sessionStorage
		if (goal) {
			const updatedGoal = { ...goal, criteria: updatedCriteria };
			sessionStorage.setItem("standardGoal", JSON.stringify(updatedGoal));
			setGoal(updatedGoal); // Update the goal state
		}

		toast.success("Criteria deleted successfully", {
			id: "deleteCriteriaSuccess",
		});
	};

	const handleRandomizeSubgoal = (index: number) => {
		if (!goal || !goal.subgoals) return;

		setSubgoals((prev) => {
			const newSubgoals = [...prev];
			const subgoal = newSubgoals[index];

			// Ensure description is valid before proceeding
			if (subgoal.description) {
				// Regular expression to find all numbers in the subgoal
				const regex = /\d+/g;
				const matches = subgoal.description.match(regex);

				if (matches) {
					let newDescription = subgoal.description;

					matches.forEach((match) => {
						const previousNumber = parseInt(match, 10); // Get the previous number
						const randomFactor = 0.2; // 20% variation

						// Generate a new number with a minimum increment of 1
						let newNumber = Math.round(
							previousNumber *
								(1 +
									(Math.random() * randomFactor * 2 -
										randomFactor))
						);

						// Ensure the new number is greater than zero
						if (newNumber <= 0) {
							newNumber = previousNumber + 1; // Increment to ensure it's greater than zero
						}

						// Check if the new number is the same as the previous one
						if (newNumber === previousNumber) {
							// Adjust by adding a minimum of 1
							newNumber = previousNumber + 1;
						}

						// Replace the occurrence of the number in the description
						newDescription = newDescription.replace(
							match,
							newNumber.toString()
						);
					});

					// Update the subgoal with the new description
					newSubgoals[index].description = newDescription;

					// New code to update session storage and state
					const updatedGoal = { ...goal, subgoals: newSubgoals };
					sessionStorage.setItem(
						"standardGoal",
						JSON.stringify(updatedGoal)
					);
					setGoal(updatedGoal); // Update the goal state

					toast.success("Subgoal randomized successfully", {
						id: "randomizeStandardGoalSubgoalSuccess",
					});
				} else {
					toast.error("No number found to randomize in subgoal", {
						id: "randomizeStandardGoalSubgoalError",
					});
				}
			} else {
				toast.error("Subgoal description is not available", {
					id: "randomizeStandardGoalSubgoalError",
				});
			}

			return newSubgoals; // Return the updated subgoals
		});
	};

	const handleRandomizeCriteria = (index: number) => {
		if (!goal || !goal.criteria) return;

		setCriteria((prev) => {
			const newCriteria = [...prev];
			const criterion = newCriteria[index];

			// Ensure description is valid before proceeding
			if (criterion.description) {
				// Regular expression to find all numbers in the criterion
				const regex = /\d+/g;
				const matches = criterion.description.match(regex);

				if (matches) {
					let newDescription = criterion.description;

					matches.forEach((match) => {
						const previousNumber = parseInt(match, 10); // Get the previous number
						const randomFactor = 0.2; // 20% variation

						// Generate a new number with a minimum increment of 1
						let newNumber = Math.round(
							previousNumber *
								(1 +
									(Math.random() * randomFactor * 2 -
										randomFactor))
						);

						// Ensure the new number is greater than zero
						if (newNumber <= 0) {
							newNumber = previousNumber + 1; // Increment to ensure it's greater than zero
						}

						// Check if the new number is the same as the previous one
						if (newNumber === previousNumber) {
							// Adjust by adding a minimum of 1
							newNumber = previousNumber + 1;
						}

						// Replace the occurrence of the number in the description
						newDescription = newDescription.replace(
							match,
							newNumber.toString()
						);
					});

					// Update the criterion with the new description
					newCriteria[index].description = newDescription;

					// New code to update session storage and state
					const updatedGoal = { ...goal, criteria: newCriteria };
					sessionStorage.setItem(
						"standardGoal",
						JSON.stringify(updatedGoal)
					);
					setGoal(updatedGoal); // Update the goal state

					toast.success("Criteria randomized successfully", {
						id: "randomizeStandardGoalCriteriaSuccess",
					});
				} else {
					toast.error("No number found to randomize", {
						id: "randomizeStandardGoalCriteriaError",
					});
				}
			} else {
				toast.error("Criterion description is not available", {
					id: "randomizeStandardGoalCriteriaError",
				});
			}

			return newCriteria;
		});
	};

	const handleRandomizeAll = () => {
		if (!goal) {
			toast.error("No goal available to randomize.", {
				id: "randomizeStandardGoalAllError",
			});
			return;
		}

		setIsEditingCriteria(false);
		setIsEditingSubgoal(false);

		let randomizedSubgoals = false; // Track if any subgoal was randomized
		let randomizedCriteria = false; // Track if any criterion was randomized

		// Randomize all subgoals if available
		const updatedSubgoals = subgoals.map((subgoal) => {
			const description = subgoal.description ?? "Not specified";
			const regex = /\d+/g; // Change to find all numbers
			const matches = description.match(regex);

			if (matches) {
				let newDescription = description;

				matches.forEach((match) => {
					const previousNumber = parseInt(match, 10);
					const randomFactor = 0.25; // 25% variation

					let newNumber = Math.round(
						previousNumber *
							(1 +
								(Math.random() * randomFactor * 2 -
									randomFactor))
					);

					// Ensure the new number is greater than zero
					if (newNumber <= 0) {
						newNumber = previousNumber + 1;
					}

					// Ensure the new number is not the same
					if (newNumber === previousNumber) {
						newNumber = previousNumber + 1;
					}

					randomizedSubgoals = true; // Mark that a subgoal was randomized

					// Replace the occurrence of the number in the description
					newDescription = newDescription.replace(
						match,
						newNumber.toString()
					);
				});

				return {
					...subgoal,
					description: newDescription,
				};
			}
			return subgoal; // Return as is if no match
		});

		// Randomize all criteria if available
		const updatedCriteria = criteria.map((criterion) => {
			const description = criterion.description;

			if (description) {
				const regex = /\d+/g; // Change to find all numbers
				const matches = description.match(regex);

				if (matches) {
					let newDescription = description;

					matches.forEach((match) => {
						const previousNumber = parseInt(match, 10);
						const randomFactor = 0.25; // 25% variation

						let newNumber = Math.round(
							previousNumber *
								(1 +
									(Math.random() * randomFactor * 2 -
										randomFactor))
						);

						// Ensure the new number is greater than zero
						if (newNumber <= 0) {
							newNumber = previousNumber + 1;
						}

						// Ensure the new number is not the same
						if (newNumber === previousNumber) {
							newNumber = previousNumber + 1;
						}

						randomizedCriteria = true; // Mark that a criterion was randomized

						// Replace the occurrence of the number in the description
						newDescription = newDescription.replace(
							match,
							newNumber.toString()
						);
					});

					return {
						...criterion,
						description: newDescription,
					};
				}
			}
			return criterion; // Return as is if no match
		});

		// Update state with randomized values
		setSubgoals(updatedSubgoals);
		setCriteria(updatedCriteria);

		// New code to update session storage
		const updatedGoal = {
			...goal,
			subgoals: updatedSubgoals,
			criteria: updatedCriteria,
		};
		sessionStorage.setItem("standardGoal", JSON.stringify(updatedGoal));
		setGoal(updatedGoal); // Update the goal state

		// Show a success message if any randomization occurred
		if (randomizedSubgoals || randomizedCriteria) {
			toast.success(
				"All applicable subgoals and criteria randomized successfully",
				{
					id: "randomizeStandardGoalAllSuccess",
				}
			);
		} else {
			toast.error(
				"No numbers found to randomize in subgoals or criteria.",
				{
					id: "randomizeStandardGoalAllNoChange",
				}
			);
		}
	};

	// Clear function to reset state
	const handleClear = () => {
		setGoal(null);
		setSubgoals([]);
		setCriteria([]);
		setShowDetailedInfo(false);
		setInputValue("");
		setIsEditingCriteria(false);
		setIsEditingSubgoal(false);
		sessionStorage.removeItem("standardGoal"); // Optionally clear session storage

		toast.success("Goal cleared successfully", {
			id: "clearStandardGoalSuccess",
		});
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
					type: "Standard",
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// If the response is successful
			toast.success("Email sent successfully", {
				id: "emailStandardGoalSuccess",
			});
			setEmail("");
			modalEmail.onClose();
		} catch (error) {
			toast.error("Failed to send email", {
				id: "emailStandardGoalError",
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
							<p className="text-xl">Standard Gooooals</p>
							<p className="text-sm text-default-500">
								Ideal for a straightforward approach to finding
								impactful goals
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
										key={displayValue(goal.goal)}
										text={displayValue(goal.goal)}
									/>
								</div>
								{showDetailedInfo && (
									<>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												⌛&nbsp;Duration
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
																goal.duration ??
																0
															}
															maxValue={3}
															className="cursor-pointer hover:opacity-80 py-2"
														/>
													</div>
												</PopoverTrigger>
												<PopoverContent>
													<div className="px-1 py-2">
														<p className="text-sm font-bold">
															{getLabel(
																goal.duration,
																durationMap
															)}
														</p>
														<p className="text-tiny text-default-500">
															{goal.duration
																? durationMap[
																		goal
																			.duration
																  ]
																		?.description ||
																  "Description not available"
																: "Not specified"}
														</p>
													</div>
												</PopoverContent>
											</Popover>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												📅&nbsp;Frequency
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
																goal.frequency ??
																0
															}
															maxValue={3}
															className="cursor-pointer hover:opacity-80 py-2"
														/>
													</div>
												</PopoverTrigger>
												<PopoverContent>
													<div className="px-1 py-2">
														<p className="text-sm font-bold">
															{getLabel(
																goal.frequency,
																frequencyMap
															)}
														</p>
														<p className="text-tiny text-default-500">
															{goal.frequency
																? frequencyMap[
																		goal
																			.frequency
																  ]
																		?.description ||
																  "Description not available"
																: "Not specified"}
														</p>
													</div>
												</PopoverContent>
											</Popover>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												🎚️&nbsp;Difficulty
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
																goal.difficulty ??
																0
															}
															maxValue={3}
															className="cursor-pointer hover:opacity-80 py-2"
														/>
													</div>
												</PopoverTrigger>
												<PopoverContent>
													<div className="px-1 py-2">
														<p className="text-sm font-bold">
															{getLabel(
																goal.difficulty,
																difficultyMap
															)}
														</p>
														<p className="text-tiny text-default-500">
															{goal.difficulty
																? difficultyMap[
																		goal
																			.difficulty
																  ]
																		?.description ||
																  "Description not available"
																: "Not specified"}
														</p>
													</div>
												</PopoverContent>
											</Popover>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												🔡&nbsp;Category
											</p>
											<p className="text-md">
												{displayValue(goal.category)}
											</p>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												🏷️&nbsp;Tags
											</p>
											<div className="flex flex-wrap gap-1">
												{goal.tags &&
												goal.tags.length > 0 ? (
													goal.tags.map(
														(tag, index) => (
															<Chip key={index}>
																{tag}
															</Chip>
														)
													)
												) : (
													<p className="text-md">
														Not specified
													</p>
												)}
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												💪&nbsp;Motivation
											</p>
											<p className="text-md">
												{displayValue(goal.motivation)}
											</p>
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												🚩&nbsp;Subgoals
											</p>
											{subgoals.length > 0 ? (
												<ul className="flex flex-col gap-2">
													{subgoals.map(
														(subgoal, index) => (
															<li
																key={index}
																className="flex items-center justify-between rounded-lg"
															>
																<p className="text-md break-words">
																	•&nbsp;
																	{highlightNumbers(
																		subgoal.description
																	)}
																</p>
																<div className="flex items-center gap-1 md:gap-2 ml-2">
																	{/\d+/.test(
																		subgoal.description ||
																			""
																	) && (
																		<Tooltip
																			content="Randomize Amount"
																			placement="left"
																		>
																			<Button
																				isIconOnly
																				variant="light"
																				className="text-lg"
																				onClick={() =>
																					handleRandomizeSubgoal(
																						index
																					)
																				}
																			>
																				🔄️
																			</Button>
																		</Tooltip>
																	)}
																	<Tooltip
																		content="Delete Subgoal"
																		placement="right"
																	>
																		<Button
																			isIconOnly
																			variant="light"
																			className="text-md"
																			onClick={() =>
																				handleDeleteSubgoal(
																					index
																				)
																			}
																		>
																			❌
																		</Button>
																	</Tooltip>
																</div>
															</li>
														)
													)}
												</ul>
											) : (
												<p className="text-md text-default-500">
													No subgoals available
												</p>
											)}

											{isEditingSubgoal ? (
												<div className="flex items-center">
													<Input
														type="text"
														value={inputValue}
														onChange={(e) =>
															setInputValue(
																e.target.value
															)
														}
														placeholder="Enter subgoal"
														className="mr-2"
														fullWidth
														variant="bordered"
														isClearable
														onClear={() =>
															setInputValue("")
														}
													/>
													<Button
														variant="ghost"
														className="text-lg border-1"
														onClick={
															handleAddSubgoal
														}
													>
														💾
													</Button>
												</div>
											) : (
												<Tooltip
													content="Create your own subgoal"
													placement="bottom"
												>
													<Button
														isIconOnly
														variant="ghost"
														className="text-lg w-full border-1"
														onClick={() => {
															setIsEditingSubgoal(
																true
															);
															setInputValue(""); // Clear input when opening
															setIsEditingCriteria(
																false
															); // Hide criteria input
														}}
													>
														✍️
													</Button>
												</Tooltip>
											)}
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-md font-semibold">
												✅&nbsp;Criteria
											</p>
											{criteria.length > 0 ? (
												<ul className="flex flex-col gap-2">
													{criteria.map(
														(criterion, index) => (
															<li
																key={index}
																className="flex items-center justify-between"
															>
																<p className="text-md break-words">
																	•&nbsp;
																	{highlightNumbers(
																		criterion.description
																	)}
																</p>
																<div className="flex items-center gap-1 md:gap-2 ml-2">
																	{/\d+/.test(
																		criterion.description ||
																			""
																	) && (
																		<Tooltip
																			content="Randomize Amount"
																			placement="left"
																		>
																			<Button
																				isIconOnly
																				variant="light"
																				className="text-lg"
																				onClick={() =>
																					handleRandomizeCriteria(
																						index
																					)
																				}
																			>
																				🔄️
																			</Button>
																		</Tooltip>
																	)}

																	<Tooltip
																		content="Delete Criteria"
																		placement="right"
																	>
																		<Button
																			isIconOnly
																			variant="light"
																			className="text-md"
																			onClick={() =>
																				handleDeleteCriteria(
																					index
																				)
																			}
																		>
																			❌
																		</Button>
																	</Tooltip>
																</div>
															</li>
														)
													)}
												</ul>
											) : (
												<p className="text-md text-default-500">
													No criteria available
												</p>
											)}

											{isEditingCriteria ? (
												<div className="flex items-center">
													<Input
														type="text"
														value={inputValue}
														onChange={(e) =>
															setInputValue(
																e.target.value
															)
														}
														placeholder="Enter criteria"
														className="mr-2"
														fullWidth
														variant="bordered"
														isClearable
														onClear={() =>
															setInputValue("")
														}
													/>
													<Button
														variant="ghost"
														className="text-lg border-1"
														onClick={
															handleAddCriteria
														}
													>
														💾
													</Button>
												</div>
											) : (
												<Tooltip
													content="Create your own criteria"
													placement="bottom"
												>
													<Button
														isIconOnly
														variant="ghost"
														className="text-lg w-full border-1"
														onClick={() => {
															setIsEditingCriteria(
																true
															);
															setInputValue(""); // Clear input when opening
															setIsEditingSubgoal(
																false
															); // Hide subgoal input
														}}
													>
														✍️
													</Button>
												</Tooltip>
											)}
										</div>
									</>
								)}
							</div>
						</CardBody>
					) : (
						<CardBody className="flex items-center justify-center text-center gap-6 min-h-64">
							<div className="text-5xl">🫥</div>
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
												color="secondary"
												onClick={handleRandomizeAll}
												className="flex items-center gap-2 w-full md:w-auto"
											>
												🔄 Randomize All
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

export default StandardGenerator;
