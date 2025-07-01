import Layout from '@/components/common/WebsiteWrapper';
import SchoolInfoUpdate from '@/components/SchoolInfoUpdate/SchoolInfoUpdate';

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { school_id } = await params;

	//
	// B. Fetch data

	const schoolData = await fetch(`https://api.carrismetropolitana.pt/datasets/facilities/schools/${school_id}`).then(response => response.json());

	//
	// C. Render components

	return (
		<Layout>
			<SchoolInfoUpdate school_id={school_id} schoolData={schoolData} />
		</Layout>
	);

	//
}
