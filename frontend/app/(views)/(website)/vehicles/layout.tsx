/* * */

import { VehiclesListContextProvider } from '@/contexts/VehiclesList.context';

/* * */

export default function Layout({ children }) {
	return (
		<VehiclesListContextProvider>
			{children}
		</VehiclesListContextProvider>
	);
}
