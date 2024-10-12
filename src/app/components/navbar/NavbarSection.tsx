import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
} from "@nextui-org/react";
import ThemeSwitcher from "../theme/ThemeSwitcher";

const NavbarSection: React.FC = () => {
	return (
		<Navbar position="static" isBlurred={false}>
			<NavbarBrand>
				<Link
					href="/"
					className="text-slate-900 font-bold text-2xl transition-transform duration-300 hover:scale-105"
					aria-label="Go to home page"
				>
					🎯Goooooals
				</Link>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default NavbarSection;
