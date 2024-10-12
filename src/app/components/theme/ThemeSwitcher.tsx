import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<div>
			<Button
				isIconOnly
				onClick={toggleTheme}
				className="text-2xl"
				variant="light"
				aria-label="Toggle Theme"
			>
				{theme === "dark" ? "🌝" : "🌚"}
			</Button>
		</div>
	);
};

export default ThemeSwitcher;
