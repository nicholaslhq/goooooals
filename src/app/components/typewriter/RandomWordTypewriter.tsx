import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

// Define the props interface for the component
interface RandomWordTypewriterProps {
	wordList: string[];
	deleteSpeed?: number | "natural"; // Allow 'natural' as an option
}

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
	const shuffled = array.slice(); // Copy the array
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
	}
	return shuffled;
};

const RandomWordTypewriter: React.FC<RandomWordTypewriterProps> = ({
	wordList,
	deleteSpeed = "natural",
}) => {
	const [words, setWords] = useState<string[]>([]);

	useEffect(() => {
		// Shuffle the wordList and set it in the state
		setWords(shuffleArray(wordList));
	}, [wordList]); // Empty dependency array to ensure this runs only once on mount

	return (
		<Typewriter
			options={{
				strings: words,
				autoStart: true,
				loop: true,
				deleteSpeed:
					deleteSpeed === "natural" ? undefined : deleteSpeed, // Handle 'natural' case
			}}
		/>
	);
};

export default RandomWordTypewriter;
