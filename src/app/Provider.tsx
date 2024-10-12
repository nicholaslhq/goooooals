import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ProviderProps = React.PropsWithChildren<{}>;

export default function Provider({ children }: ProviderProps) {
	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				{children}
			</NextThemesProvider>
		</NextUIProvider>
	);
}
