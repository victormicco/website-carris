import { getHeadMetaTag } from '@/utils/getHeadMetaTag';

export function writeHeadMetaTag(content?: string, name?: string): void {
	if (!name || !content) {
		console.error('Please provide all the required parameters');
		return;
	}

	const hasMetaTagValue = getHeadMetaTag(name);

	if (hasMetaTagValue) {
		hasMetaTagValue.content = content || 'unknown';
		console.log('Meta tag atualizada com sucesso', hasMetaTagValue.content);
	}
	else {
		const meta = document.createElement('meta');
		meta.content = content || 'unknown';
		meta.name = name || 'unknown';
		document.getElementsByTagName('head')[0].appendChild(meta);
		console.log('Meta tag criada com sucesso');
	}
}
