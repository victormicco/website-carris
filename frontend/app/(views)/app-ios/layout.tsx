/* * */

import { AppViewport } from '@/components/viewport/AppViewport';
import { ConfigProviders } from '@/providers/config-providers';
import { ThemeProviders } from '@/providers/theme-providers';
import { appIosTheme } from '@/themes/app-ios/app-ios.theme';

/* * */

export default function Layout({ children }) {
	return (
		<ConfigProviders>
			<ThemeProviders themeData={appIosTheme} themeId="app-ios">
				<AppViewport>
					{children}
				</AppViewport>
			</ThemeProviders>
		</ConfigProviders>
	);
}
