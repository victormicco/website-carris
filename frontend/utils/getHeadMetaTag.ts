export function getHeadMetaTag(name: string) {
	const metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
	return metaTag;
}
