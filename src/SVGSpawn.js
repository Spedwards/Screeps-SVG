let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given spawn object.
 * @author Spedwards
 */
class SVGSpawn extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {StructureSpawn | string} spawn - StructureSpawn object or ID string corrosponding to a StructureSpawn object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(spawn, size = 50) {
		super();
		let object = this.validateConstructor(spawn, STRUCTURE_SPAWN);
		if (object === false) throw new Error('Not a Spawn object!');
		
		this.spawn = object;
		this.size = typeof size === 'number' ? size : 50;
		this.string = this.toString();
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 180 180">` +
					`<g transform="translate(90,90)">` +
					`<g>` +
					`<ellipse rx="70" ry="70" cx="0" cy="0" fill="#CCCCCC" />` +
					`<ellipse rx="59" ry="59" cx="0" cy="0" fill="#181818" />` +
					// Temp Fill - Until Badges
					// Replace this line with badges
					`<ellipse rx="37" ry="37" cx="0" cy="0" fill="#555555" />`;
			
			if (this.spawn.spawning) {
				const LARGE_ARC_FLAG = this.spawn.spawning.remainingTime + 0.01 > this.spawn.spawning.needTime / 2 ? 0 : 1;
				const END_X = 50 * Math.cos(-Math.PI * 2 * (this.spawn.spawning.remainingTime + 0.01) / this.spawn.spawning.needTime);
				const END_Y = 50 * Math.sin(-Math.PI * 2 * (this.spawn.spawning.remainingTime + 0.01) / this.spawn.spawning.needTime);
				
				outStr += `<path fill="transparent" d="M 50 0 A 50 50 0 ${LARGE_ARC_FLAG} 1 ${END_X} ${END_Y}" stroke-width="15" stroke="#AAAAAA" transform="rotate(-90)" />`;
			}
			
			if (this.spawn.energy > 0) {
				const RADIUS = 38 * Math.min(this.spawn.energy / this.spawn.energyCapacity);
				
				outStr += `<ellipse rx="${RADIUS}" ry="${RADIUS}" cx="0" cy="0" fill="#FFE56D" />`;
			}
			
			if (this.spawn.spawning) {
				outStr += `<animateTransform attributeName="transform" attributeType="XML" dur="2s" keyTimes="0;0.25;1" repeatCount="indefinite" type="scale" values="1 1;1.24 1.24;1 1" calcMode="linear" />`;
			}
			
			outStr += `</g></g></svg>`;
			
			return outStr;
		}
		return this.string;
	}
	
}

module.exports = SVGSpawn;
