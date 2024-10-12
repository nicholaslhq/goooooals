// This file contains mapping definitions for standard goal attributes,
// including difficulty, duration, and frequency. Each map associates
// a numeric key with a label and a description, providing a structured
// way to display information about various goal characteristics.

interface GoalAttribute {
	label: string;
	description: string;
}

const defaultAttribute: GoalAttribute = {
	label: "Unknown",
	description: "This attribute is not defined for the provided key.",
};

export const difficultyMap: Record<number, GoalAttribute> = {
	1: {
		label: "Easy",
		description: "Simple tasks that require minimal effort or skill",
	},
	2: {
		label: "Moderate",
		description:
			"Tasks that require some effort and skill, but are manageable",
	},
	3: {
		label: "Challenging",
		description:
			"Tasks that require significant effort, skill, and concentration",
	},
};

export const durationMap: Record<number, GoalAttribute> = {
	1: {
		label: "Short",
		description: "Takes a few minutes to an hour to complete",
	},
	2: {
		label: "Medium",
		description: "Takes about an hour or so to complete",
	},
	3: {
		label: "Long",
		description: "Takes several hours or more to complete",
	},
};

export const frequencyMap: Record<number, GoalAttribute> = {
	1: {
		label: "Rarely",
		description: "Occurs once in a while (e.g. monthly or less)",
	},
	2: {
		label: "Occasionally",
		description: "Happens from time to time (e.g. weekly)",
	},
	3: {
		label: "Regularly",
		description: "Happens frequently (e.g. daily)",
	},
};

// Function to get attribute by key with fallback for unknown keys
export const getDifficulty = (key: number): GoalAttribute => {
	return difficultyMap[key] || defaultAttribute;
};

export const getDuration = (key: number): GoalAttribute => {
	return durationMap[key] || defaultAttribute;
};

export const getFrequency = (key: number): GoalAttribute => {
	return frequencyMap[key] || defaultAttribute;
};
