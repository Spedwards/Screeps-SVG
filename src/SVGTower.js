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
	 */
	constructor(tower, angle = 315) {
		super();
		let object = this.validateConstructor(tower, STRUCTURE_TOWER);
		if (object === false) throw new Error('Not a Tower object!');

		this.tower = object;
		this.radians = angle * (Math.PI / 180);
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_HEIGHT = 60;
			const SVG_WIDTH = 60;

			const RADIANS = this.radians;

			const BARREL_X = -20;
			const BARREL_Y = -80;

			const TANK_X = -39;
			const TANK_Y = -25;

			const ENERGY_HEIGHT = 58 * this.tower.energy / this.tower.energyCapacity;

			let outStr = `<svg class="tower owner" height="${SVG_HEIGHT}" width="${SVG_WIDTH}" viewBox="0 0 300 300">` +
				`<g transform="translate(75,75)" opacity="1">` +
				`<ellipse class="border" cx="0" cy="0" fill="#222" rx="65" ry="65" stroke-width="5"></ellipse>` +
				`<g class="rotatable" style="transform: rotate(${RADIANS}rad); transition: transform 2s;">` +
				`<rect fill="#aaa" height="50" stroke-width="7" stroke="#181818" width="40" x="${BARREL_X}" y="${BARREL_Y}"></rect>` +
				`<rect fill="#555" height="58" rx="12" ry="10" width="78" x="${TANK_X}" y="${TANK_Y}"></rect>`;

			if (this.tower.energy > 0) {
				// ENERGY
				outStr += `<rect fill="#ffe56d" height="${ENERGY_HEIGHT}" y="${33 - ENERGY_HEIGHT}" rx="12" ry="12" width="78" x="${TANK_X}"></rect>`;
			}

			outStr += `</g></g></svg>`;

			return outStr;
		}
		return this.string;
	}

}

module.exports = SVGTower;
