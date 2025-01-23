export default function OpenGraphAlertsDynamic({ alertData }) {
	//
	// A. Render components
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<OpenGraphAlertTitle />
		</div>
	);
}

function OpenGraphAlertTitle() {
	return (
		<p>Eu sou um alerta </p>
	);
}
