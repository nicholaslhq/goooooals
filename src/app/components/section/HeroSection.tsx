import React from "react";
import { Image, Button } from "@nextui-org/react";
import NavbarSection from "../navbar/NavbarSection";
import RandomWordTypewriter from "../typewriter/RandomWordTypewriter";

const HeroSection: React.FC = () => {
	const wordList = [
		"success",
		"growth",
		"achievement",
		"greatness",
		"excellence",
		"fulfillment",
		"innovation",
		"mastery",
		"breakthrough",
		"discovery",
		"transformation",
		"empowerment",
	];

	const handleGetStartedClick = () => {
		const target = document.getElementById("get-started");
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="h-screen flex flex-col bg-gradient-to-br from-cyan-400 to-blue-600">
			<NavbarSection />
			<div className="flex flex-1 flex-col lg:flex-row items-center justify-center">
				<div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:space-x-24 space-y-4 lg:space-y-0 w-full max-w-10xl mx-auto">
					<div className="flex flex-col items-center lg:items-start text-center lg:text-left p-8 lg:p-12 space-y-4 lg:space-y-6">
						<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap text-slate-900">
							Uncover inspiring goals
						</h1>
						<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap text-slate-900">
							to spark your journey of
						</h1>
						<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap text-slate-900">
							<RandomWordTypewriter wordList={wordList} />
						</h1>
						<p className="text-md md:text-xl whitespace-nowrap text-slate-700">
							Craft your future, one goal at a time
						</p>
						<Button
							aria-label="Get Started"
							className="bg-gradient-to-br from-amber-400 to-amber-600 font-semibold shadow-md text-slate-600"
							onClick={handleGetStartedClick}
						>
							Get Started
						</Button>
					</div>
					<div className="flex-shrink-0 w-[50%] sm:w-[30%] md:w-[40%] lg:w-[30%] mt-8 md:mt-0 md:ml-12">
						<Image
							isBlurred
							alt="Goal"
							src="/hero-target.png"
							className="floating-animation w-full h-auto"
						/>
					</div>
				</div>
			</div>

			<style jsx global>{`
				@keyframes floating {
					0% {
						transform: translateY(0) translateX(0);
					}
					50% {
						transform: translateY(-10px) translateX(10px);
					}
					100% {
						transform: translateY(0) translateX(0);
					}
				}

				.floating-animation {
					animation: floating 5s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
};

export default HeroSection;
