/* * */

/* * */

export default function OpenGraphViagem2024Default() {
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<OpenGraphViagem2024Image />
		</div>
	);
}

function OpenGraphViagem2024Image() {
	return (
		<img
			alt="Viagem 2024"
			src={`${process.env.NEXT_PUBLIC_URL}/assets/review-2024/images/viagem2024logo.png`}
			style={{ height: '100%', objectFit: 'contain', width: '100%' }}
		/>
	);
}
