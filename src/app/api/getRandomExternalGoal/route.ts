import { NextResponse } from "next/server";

const API_URL = "https://bored-api.appbrewery.com/random";

/**
 * Fetches a random external goal from the Bored API.
 * @returns {Promise<NextResponse>} - The response containing the random goal or an error.
 */
export async function GET() {
	try {
		// Adding a cache-busting parameter to the external API URL
		const url = `${API_URL}?timestamp=${Date.now()}`;
		const response = await fetch(url);

		// Check if the response is successful
		if (!response.ok) {
			throw new Error(
				`Network response was not ok: ${response.statusText}`
			);
		}

		// Parse the JSON data
		const data = await response.json();
		return NextResponse.json(data, {
			headers: {
				"Cache-Control": "no-cache, no-store, must-revalidate",
				Pragma: "no-cache",
				Expires: "0",
			},
		});
	} catch (error) {
		console.error("Error fetching data:", error);
		return NextResponse.error();
	}
}
