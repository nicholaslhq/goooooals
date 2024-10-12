export interface StandardGoal {
	id: string | null;
	goal: string | null;
	category: string | null;
	difficulty: number | null;
	duration: number | null;
	frequency: number | null;
	motivation: string | null;
	tags: string[] | null;
	subgoals: Array<{
		description: string | null;
		quantify: {
			min: number | null;
			max: number | null;
			step: number | null;
			unit: string | null;
		} | null;
	}> | null;
	criteria: Array<{
		description: string | null;
		quantify: {
			min: number | null;
			max: number | null;
			step: number | null;
			unit: string | null;
		} | null;
	}> | null;
}

export interface ExternalGoal {
	activity: string | null;
	availability: number | null;
	type: string | null;
	participants: number | null;
	price: number | null;
	accessibility: string | null;
	duration: string | null;
	kidFriendly: boolean | null;
	link: string | null;
	key: string | null;
}
