import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { StandardGoal } from "@/app/interfaces/goalInterfaces";

// Function to get the path to the JSON file
const getGoalsFilePath = () =>
	path.join(process.cwd(), "src", "data", "standardGoals.json");

// Function to pick a random goal from the array
const getRandomGoal = (goals: StandardGoal[]): StandardGoal => {
	const randomIndex = Math.floor(Math.random() * goals.length);
	return goals[randomIndex];
};

// Handler function for the API route
export async function GET() {
	try {
		// Read and parse the JSON file
		const filePath = getGoalsFilePath();
		const data = fs.readFileSync(filePath, "utf-8");
		const goals: StandardGoal[] = JSON.parse(data);

		// Check if there are goals available
		if (goals.length === 0) {
			return NextResponse.json(
				{ message: "No goals available" },
				{ status: 404 }
			);
		}

		// Pick a random goal
		const randomGoal = getRandomGoal(goals);

		// Create a response and set headers
		const response = NextResponse.json(randomGoal);
		response.headers.set('X-Content-Type-Options', 'nosniff');

		// Return the random goal with the added header
		return response;
	} catch (error) {
		console.error("Error fetching goals:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
