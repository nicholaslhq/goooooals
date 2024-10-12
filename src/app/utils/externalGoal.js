export async function getRandomExternalGoal() {
	try {
		const response = await fetch("/api/getRandomExternalGoal");
		if (!response.ok) {
			throw new Error(
				`Network response was not ok: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw new Error(
			`Error: ${error instanceof Error ? error.message : "Unknown error"}`
		);
	}
}
