let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given power bank object.
 * @author Spedwards
 */
class SVGPowerBank extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {StructurePowerBank | string} powerBank - StructurePowerBank object or ID string corrosponding to a StructurePowerBank object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(powerBank, size = 50) {
		super();
		let object = this.validateConstructor(powerBank, STRUCTURE_POWER_BANK);
		if (object === false) throw new Error('Not a PowerBank object!');
		
		this.powerBank = object;
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
			
			const RADIUS = 1.013e-10*Math.pow(this.powerBank.power, 3) - 1.336e-6*Math.pow(this.powerBank.power, 2) + 9.197e-3*this.powerBank.power + 5.695;
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 150 150">` +
					`<g transform="translate(75,75), scale(1.5 1.5)">` +
					`<path d="M0 -50 H30 L50 -30 V30 L30 50 H-30 L-50 30 V-30 L-30 -50 Z" fill="#311" stroke-width="10" stroke="#666" />` +
					`<ellipse rx="${RADIUS}" ry="${RADIUS}" cx="0" cy="0" fill="#F41F33" stroke="#8D000D" stroke-width="10">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="2s" keyTimes="0;0.66;1" repeatCount="indefinite" type="scale" values="1 1;0.6 0.6; 1 1" />` +
					`<animate attributeName="fill" dur="2s" repeatCount="indefinite" values="#F41F33; #D31022; #8D000D; #F41F33" calcMode="linear" />` +
					`</ellipse></g></svg>`;
		}
		return this.string;
	}
	
}

StructurePowerBank.prototype.getSVG = function(size = 50) {
	return new SVGPowerBank(this, size);
};

StructurePowerBank.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

module.exports = SVGPowerBank;
