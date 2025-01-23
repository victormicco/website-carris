export default function OpenGraphNewsDynamic({ newsData }) {
	//
	// A. Render components
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<OpenGraphNewsItemImage image={newsData.cover_image_src} title={newsData.title} />
		</div>
	);
}

function OpenGraphNewsItemImage({ image, title }) {
	return (
		<img alt={title} src={image} />
	);
}
