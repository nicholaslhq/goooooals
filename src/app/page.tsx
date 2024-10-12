"use client";
import React from "react";
import ModeSwitcher from "./components/mode/ModeSwitcher";
import HeroSection from "./components/section/HeroSection";
import FooterSection from "./components/section/FooterSection";

export default function App() {
	return (
		<div className="flex w-full flex-col">
			<HeroSection />
			<ModeSwitcher />
			<FooterSection />
		</div>
	);
}
