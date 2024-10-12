import {
	difficultyMap,
	durationMap,
	frequencyMap,
} from "@/data/standardGoalsMaps";
import { ExternalGoal, StandardGoal } from "../interfaces/goalInterfaces";

const highlightNumbers = (text: string | null): React.ReactNode => {
	if (text === null) {
		return ""; // or you can return a default message like "No content available"
	}

	const regex = /(\d+)/g;
	return text
		.split(regex)
		.map((part) => (regex.test(part) ? `<strong>${part}</strong>` : part))
		.join(""); // Join back into a single string
};

export const formatStandardGoalEmail = (goal: StandardGoal) => {
	return `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <p style="font-size: 40px;">🎯</p>
                <h2 style="font-size: 24px; font-weight: bold;">${
					goal.goal
				}</h2>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">⌛ Duration</p>
                <p>${
					goal.duration
						? durationMap[goal.duration]?.label ||
						  "Duration not available"
						: "Not specified"
				}</p>
                <p>${
					goal.duration
						? durationMap[goal.duration]?.description ||
						  "Description not available"
						: "Not specified"
				}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">📅 Frequency</p>
                <p>${
					goal.frequency
						? frequencyMap[goal.frequency]?.label ||
						  "Frequency not available"
						: "Not specified"
				}</p>
                <p>${
					goal.frequency
						? frequencyMap[goal.frequency]?.description ||
						  "Description not available"
						: "Not specified"
				}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">🎚️ Difficulty</p>
                <p>${
					goal.difficulty
						? difficultyMap[goal.difficulty]?.label ||
						  "Difficulty not available"
						: "Not specified"
				}</p>
                <p>${
					goal.difficulty
						? difficultyMap[goal.difficulty]?.description ||
						  "Description not available"
						: "Not specified"
				}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">🔡 Category</p>
                <p>${goal.category || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">🏷️ Tags</p>
                <p>${
					goal.tags && goal.tags.length > 0
						? goal.tags.join(", ")
						: "Not specified"
				}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">💪 Motivation</p>
                <p>${goal.motivation || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">🚩 Subgoals</p>
                <ul>
                    ${
						goal.subgoals && goal.subgoals.length > 0
							? goal.subgoals
									.map(
										(subgoal) =>
											`<li>${highlightNumbers(
												subgoal.description
											)}</li>`
									)
									.join("")
							: "<li>No subgoals available</li>"
					}
                </ul>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">✅ Criteria</p>
                <ul>
                    ${
						goal.criteria && goal.criteria.length > 0
							? goal.criteria
									.map(
										(criterion) =>
											`<li>${highlightNumbers(
												criterion.description
											)}</li>`
									)
									.join("")
							: "<li>No criteria available</li>"
					}
                </ul>
            </div>
        </div>
    `;
};

export const formatExternalGoalEmail = (goal: ExternalGoal) => {
	return `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <p style="font-size: 40px;">🎯</p>
                <h2 style="font-size: 24px; font-weight: bold;">${
					goal.activity
				}</h2>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">🕙 Availability</p>
                <p>${goal.availability || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">👪 Participants</p>
                <p>${goal.participants || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">💰 Price</p>
                <p>${goal.price || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">🔡 Type</p>
                <p>${goal.type || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">♿ Accessibility</p>
                <p>${goal.accessibility || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">⏳ Duration</p>
                <p>${goal.duration || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">👶 Kid Friendly</p>
                <p>${goal.kidFriendly || "Not specified"}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="font-size: 18px; font-weight: bold;">🔗 Link</p>
                <p>${goal.link || "Not specified"}</p>
            </div>
        </div>
    `;
};
