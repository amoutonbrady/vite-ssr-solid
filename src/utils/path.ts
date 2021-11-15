export const mapSegment = (seg: string): string => {
	if (!seg.startsWith('[') && !seg.endsWith(']')) {
		return seg;
	}
	seg = seg.slice(seg.indexOf('[') + 1, seg.lastIndexOf(']'));
	//console.log(seg);
	// TODO: Handle Escapes
	if (seg.includes(',')) {
		return seg
			.split(',')
			.map((seg) => mapSegment(`[${seg}]`))
			.join('/');
	} else if (seg.startsWith('...')) {
		return `*${seg.slice(3)}`;
	} else {
		return `:${seg}`;
	}
};

export function mapPath(path: string): string {
	if (!path.match(/\/\[[^/].*?\](?:\/|$)/im)) {
		return path;
	}
	return path.split('/').map(mapSegment).flat().join('/');
}
