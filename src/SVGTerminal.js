let SVGStorageObject = require('./SVGStorageObject');

/**
 * Returns a html/svg string representation of the given terminal object.
 * @author Spedwards
 */
class SVGTerminal extends SVGStorageObject {

	/**
	 * @author Spedwards
	 * @param {StructureTerminal} terminal - StructureTerminal object or ID string corrosponding to a StructureTerminal object.
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(terminal, size = 60) {
		super(terminal, STRUCTURE_TERMINAL);
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
			
			const COLOUR = this.player === this.object.owner.username ? `#8FBB93` : `#ED5557`;
			
			const TERMINAL = this.object;
			const CAPACITY = TERMINAL.storeCapacity;
			const ENERGY = TERMINAL.store[RESOURCE_ENERGY];
			const POWER = TERMINAL.store[RESOURCE_POWER] || 0;
			const TOTAL = _.sum(TERMINAL.store);
			
			const OTHER_SCALE = Math.min(1, TOTAL / CAPACITY);
			const POWER_SCALE = Math.min(1, (POWER + ENERGY) / CAPACITY);
			const ENERGY_SCALE = Math.min(1, ENERGY / CAPACITY);
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 175 175">` +
					`<g transform="translate(87.5,87.5)">` +
					`<path d="M 85 0 L 55 -55 L 0 -85 L -55 -55 L -85 0 L -55 55 L 0 85 L 55 55 Z" fill="#181818" stroke="${COLOUR}" stroke-width="5" />` +
					`<path d="M 67 0 L 48 -35 V 35 L 67 0 Z M 0 -67 L -35 -48 H 35 Z M -67 0 L -48 -35 V 35 Z M 0 67 L -35 48 H 35 Z" fill="#AAA" />` +
					`<rect fill="#181818" height="90" width="90" x="-45" y="-45" />` +
					`<rect fill="#555555" height="76" width="76" x="-38" y="-38" />` +
					`<!-- minerals -->` +
					`<rect fill="#FFF" height="76" width="76" x="-38" y="-38" transform="scale(${OTHER_SCALE} ${OTHER_SCALE})" />` +
					`<!-- power -->` +
					`<rect fill="#F41F33" height="76" width="76" x="-38" y="-38" transform="scale(${POWER_SCALE} ${POWER_SCALE})" />` +
					`<!-- energy -->` +
					`<rect fill="#FFE56D" height="76" width="76" x="-38" y="-38" transform="scale(${ENERGY_SCALE} ${ENERGY_SCALE})" />` +
					`</g></svg>`;
		}
		return this.string;
	}

}

module.exports = SVGTerminal;
