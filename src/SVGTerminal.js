let SVGStorageObject = require('./SVGStorageObject');

/**
 * Returns a html/svg string representation of the given terminal object.
 * @author Spedwards
 */
class SVGTerminal extends SVGStorageObject {

	/**
	 * @author Spedwards
	 * @param {StructureTerminal} terminal - StructureTerminal object or ID string corrosponding to a StructureTerminal object.
	 */
	constructor(terminal) {
		super(terminal, STRUCTURE_TERMINAL);
		this.string = this.toString();
	}
	
	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const TERMINAL = this.object;
			const CAPACITY = TERMINAL.storeCapacity;
			const ENERGY = TERMINAL.store[RESOURCE_ENERGY];
			const POWER = TERMINAL.store[RESOURCE_POWER] || 0;
			const OTHER = _.sum(TERMINAL.store) - ENERGY - POWER;
			
			const RADIUS = 6;
			
			const START_X = 22;
			const START_Y = 26;
			
			const ENERGY_RADIUS = RADIUS * (ENERGY / CAPACITY);
			const OTHER_RADIUS = RADIUS * (OTHER / CAPACITY) + ENERGY_RADIUS;
			const POWER_RADIUS = RADIUS * (POWER / CAPACITY) + OTHER_RADIUS;
			
			const POWER_X = START_X + (RADIUS - POWER_RADIUS);
			const OTHER_X = START_X + (RADIUS - OTHER_RADIUS);
			const ENERGY_X = START_X + (RADIUS - ENERGY_RADIUS);
			
			const POWER_Y = START_Y + (RADIUS - POWER_RADIUS);
			const OTHER_Y = START_Y + (RADIUS - OTHER_RADIUS);
			const ENERGY_Y = START_Y + (RADIUS - ENERGY_RADIUS);
			
			return `<svg width="50" height="60" style="transform:scale(1.2,1.2)">` +
					`<path vector-effect="non-scaling-stroke" style="stroke:#90BA94" d='M36 40 L42 32 L36 24 L28 18 L20 24 L14 32 L20 40 L28 46 Z' />` +
					`<path vector-effect="non-scaling-stroke" style="fill:#AAAAAA" d='M34 38 L38 32 L34 26 L28 22 L22 26 L18 32 L22 38 L28 42 Z' />` +
					`<path vector-effect="non-scaling-stroke" style="stroke-width:2;stroke:black;fill:#555555" d='M34 38 L34 32 L34 26 L28 26 L22 26 L22 32 L22 38 L28 38 Z' />` +
					`<!-- power -->` +
					`<rect x="${POWER_X}" y="${POWER_Y}" width="${POWER_RADIUS * 2}" height="${POWER_RADIUS * 2}" style="fill:#F1243A" />` +
					`<!-- mineral -->` +
					`<rect x="${OTHER_X}" y="${OTHER_Y}" width="${OTHER_RADIUS * 2}" height="${OTHER_RADIUS * 2}" style="fill:#FFFFFF" />` +
					`<!-- energy -->` +
					`<rect x="${ENERGY_X}" y="${ENERGY_Y}" width="${ENERGY_RADIUS * 2}" height="${ENERGY_RADIUS * 2}" style="fill:#FEE476" />` +
					`</svg>`;
		}
		return this.string;
	}

}

module.exports = SVGTerminal;
