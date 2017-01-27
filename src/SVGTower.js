let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given tower object.
 * @author Spedwards
 */
class SVGTower extends SVG {

	/**
	 * @author Spedwards
	 * @param {StructureTower | string} tower - StructureTower object or ID string corrosponding to a StructureTower object.
	 * @param {Number} [angle = 315] - The angle at which the tower will point.
	 * @param {Boolean} [animated = false] - Whether or not you want the tower to be animated.
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(tower, angle = 315, animated = false, size = 60) {
		super();
		let object = this.validateConstructor(tower, STRUCTURE_TOWER);
		if (object === false) throw new Error('Not a Tower object!');

		this.tower = object;
		this.radians = angle * (Math.PI / 180);
		this.animated = typeof animated === 'boolean' ? animated : false;
		this.size = typeof size === 'number' ? size : 60;
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;

			const RADIANS = this.radians;

			const BARREL_X = -20;
			const BARREL_Y = -80;

			const TANK_X = -39;
			const TANK_Y = -25;

			const ENERGY_HEIGHT = 58 * this.tower.energy / this.tower.energyCapacity;
			
			const BORDER_COLOUR = this.player === this.tower.owner.username ? `#8FBB93` : `#ED5557`;

			let outStr = `<svg class="tower owner" height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 200 200">` +
				`<g transform="translate(100,100)" opacity="1">` +
				`<ellipse cx="0" cy="0" fill="#222" rx="65" ry="65" stroke="${BORDER_COLOUR}" stroke-width="5" />` +
				`<g class="rotatable" transform="rotate(${RADIANS}rad)" style="transition: transform 2s;">` +
				`<rect fill="#aaa" height="50" stroke-width="7" stroke="#181818" width="40" x="${BARREL_X}" y="${BARREL_Y}" />` +
				`<rect fill="#555" height="58" rx="12" ry="10" width="78" x="${TANK_X}" y="${TANK_Y}" />`;
			
			if (this.animated) {
				outStr += `<animateTransform attributeName="transform" attributeType="XML" dur="5s" keyTimes="0;0.4;0.75;1" repeatCount="indefinite" type="rotate" values="315;90;200;315" calcMode="linear" />`;
			}

			if (this.tower.energy > 0) {
				// ENERGY
				outStr += `<rect fill="#ffe56d" height="${ENERGY_HEIGHT}" y="${33 - ENERGY_HEIGHT}" rx="12" ry="12" width="78" x="${TANK_X}" />`;
			}

			outStr += `</g></g></svg>`;

			return outStr;
		}
		return this.string;
	}

}

module.exports = SVGTower;
