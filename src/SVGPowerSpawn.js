let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given spawn object.
 * @author Spedwards
 */
class SVGPowerSpawn extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {StructurePowerSpawn | string} powerSpawn - StructurePowerSpawn object or ID string corrosponding to a StructurePowerSpawn object.
	 */
	constructor(powerSpawn) {
		super();
		let object = this.validateConstructor(powerSpawn, STRUCTURE_POWER_SPAWN);
		if (object === false) throw new Error('Not a Power Spawn object!');
		
		this.powerSpawn = object;
		this.string = this.toString();
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = 50;
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 160 160">` +
					`<g transform="translate(80,80)">` +
					`<ellipse rx="75" ry="75" cx="0" cy="0" fill="#222222" stroke="#CCCCCC" stroke-width="7" />` +
					`<ellipse rx="68" ry="68" cx="0" cy="0" fill="#222222" stroke="#F41F33" stroke-width="10" />` +
					`<ellipse rx="59" ry="59" cx="0" cy="0" fill="#181818" />` +
					`<ellipse rx="37" ry="37" cx="0" cy="0" fill="#555555" />`;
			
			if (this.powerSpawn.power) {
				const LARGE_ARC_FLAG = (this.powerSpawn.power < this.powerSpawn.powerCapacity / 2) ? 0 : 1;
				const END_X = 50 * Math.cos(Math.PI * 2 * (this.powerSpawn.power / this.powerSpawn.powerCapacity));
				const END_Y = 50 * Math.sin(Math.PI * 2 * (this.powerSpawn.power / this.powerSpawn.powerCapacity));
				
				outStr += `<path fill="transparent" d="M 50 0 A 50 50 0 ${LARGE_ARC_FLAG} 1 ${END_X} ${END_Y}" stroke-width="15" stroke="#F41F33" transform="rotate(-90)" />`;
			}
			
			if (this.powerSpawn.energy > 0) {
				const RADIUS = 38 * Math.min(this.powerSpawn.energy / this.powerSpawn.energyCapacity, 1);
				
				outStr += `<ellipse rx="${RADIUS}" ry="${RADIUS}" cx="0" cy="0" fill="#FFE56D" />`;
			}
			
			outStr += `</g></svg>`;
			
			return outStr;
		}
		return this.string;
	}
	
}

module.exports = SVGPowerSpawn;
