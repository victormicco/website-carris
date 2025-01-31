/* * */

import { StopsContextProvider } from '@/contexts/Stops.context';
import { VehiclesContextProvider } from '@/contexts/Vehicles.context';
import { VehiclesListContextProvider } from '@/contexts/VehiclesList.context';

/* * */

export default function Layout({ children }) {
	return (
		<StopsContextProvider>
			<VehiclesContextProvider>
				<VehiclesListContextProvider>
					{children}
				</VehiclesListContextProvider>
			</VehiclesContextProvider>
		</StopsContextProvider>
	);
}
