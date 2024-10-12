export async function getRandomStandardGoal() {
	try {
		const response = await fetch("/api/getRandomStandardGoal");
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const goal = await response.json();
		return goal;
	} catch (error) {
		console.error("Failed to fetch random goal:", error);
		return null;
	}
}
