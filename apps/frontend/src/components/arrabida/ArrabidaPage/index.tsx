'use client';

/* * */

import { Arrabida365 } from '../Arrabida365';
import { ArrabidaWay } from '../ArrabidaWay';
import { ArrabidaAbout } from '../ArrabidaAbout';
import { ArrabidaList } from '../ArrabidaList';

/* * */

export function ArrabidaPage() {
	//

	//
	// A. Setup variables

	//
	// B. Render components

	return (
		<>
			<Arrabida365 />
      		<ArrabidaWay />
			<ArrabidaList />
			<ArrabidaAbout />
		</>
	);
}
