let SVG = require('SVG');

/**
 * Takes a room and outputs the html/svg string for the storage and terminal of that room.
 * @author Helam
 * @author Dragnar
 * @author Spedwards
 */
class SVGRoom extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {Room | string} roomArg - Room object or valid room name.
	 */
	constructor(roomArg) {
		super();
		let object = this.validateConstructor(roomArg, SVG.ROOM);
		if (object === false) throw new Error('Not a Room object!');
		
		this.room = object;
		this.string = this.toString();
	}
	
	/**
	 * @author Helam
	 * @author Dragnar
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			let storage = this.room.storage;
			let terminal = this.room.terminal;
			
			let outStr = ``;
			
			outStr += `<style id="dropdownStyle">` +
				`.dropbtn {` +
				`background-color: #4CAF50;` +
				`color: white;` +
				`padding: 16px;` +
				`font-size: 16px;` +
				`border: none;` +
				`cursor: pointer;` +
				`}` +
				
				`.dropdown {` +
				`position: relative;` +
				`display: inline-block;` +
				`}` +
				
				`.dropdown-content {` +
				`display: none;` +
				`z-index: 1;` +
				`padding: 5px;` +
				`border-radius: 6px;` +
				`text-align: center;` +
				`position: absolute;` +
				`background-color: #f9f9f9;` +
				`min-width: 200px;` +
				`box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);` +
				`}` +
				
				`.dropdown-content a {` +
				`color: black;` +
				//`padding: 12px 16px;` +
				`text-decoration: none;` +
				`display: block;` +
				`}` +
				
				`.dropdown-content a:hover {background-color: #f1f1f1}` +
				
				`.dropdown:hover .dropdown-content {` +
				`display: block;` +
				`}` +
				
				`.dropdown:hover .dropbtn {` +
				`background-color: #3e8e41;` +
				`}` +
				`</style>` +
				
				
				`<style id="tooltipStyle">` +
				`.tool {` +
				`position: relative;` +
				`display: inline-block;` +
				`}` +
				`.tool .tip {` +
				`visibility: hidden;` +
				`width: 300px;` +
				`background-color: #111111` +//2c2c2c;`;
				`color: #000;` + //fff`;
				`text-align: center;` +
				`border-radius: 6px;` +
				`padding: 5px 0;` +
				`position: absolute;` +
				`z-index: 1;` +
				`opacity: 0;` +
				`transition: opacity 1s;` +
				`}` +
				`.tool .tipRight {` +
				`top: -5px;` +
				`left: 101%;` +
				`}` +
				`.tool:hover .tip {` +
				`visibility: visible;` +
				`opacity: 0.9;` +
				`}` +
				`.tool table {` +
				`text-align: left;` +
				`margin-left: 5px;` +
				`}` +
				`</style>` +
				
				`<span class="tool">` +
				`<span style="background-color:#000" class="tip">`;
			
			if (storage) {
				let svgStorage = new SVGStorage(storage);
				outStr += svgStorage.toString();
			} else {
				outStr += `No Storage Built`;
			}
			outStr += `</span>` +
				`<svg width="50" height="60">` +
				`<path style="stroke-width: 1;stroke:#90BA94" d='M16 48 C18 52 38 52 40 48 C42 46 42 18 40 16 C38 12 18 12 16 16 C14 18 14 46 16 48' />` +
				`<path style="fill:#555555" d='M18 46 L38 46 L38 18 L18 18' />` +
				`<!-- coords of storage inner box -->` +
				`<!--<rect x="18" y="18" width="20" height="28" style="fill:#F1243A" />-->`;
			if (storage) {
				let capacity = storage.storeCapacity;
				let energy = storage.store[RESOURCE_ENERGY];
				let power = storage.store[RESOURCE_POWER] || 0;
				let other = _.sum(storage.store) - energy - power;
				
				const HEIGHT = 28;
				const START_Y = 18;
				
				let energyHeight = HEIGHT * (energy / capacity);
				let otherHeight = HEIGHT * (other / capacity) + energyHeight;
				let powerHeight = HEIGHT * (power / capacity) + otherHeight;
				
				outStr += `<!-- power -->` +
					`<rect x="18" y="${START_Y + (HEIGHT - powerHeight)}" width="20" height="${powerHeight}" style="fill:#F1243A" />` +
					`<!-- minerals -->` +
					`<rect x="18" y="${START_Y + (HEIGHT - otherHeight)}" width="20" height="${otherHeight}" style="fill:#FFFFFF" />` +
					`<!-- energy -->` +
					`<rect x="18" y="${START_Y + (HEIGHT - energyHeight)}" width="20" height="${energyHeight}" style="fill:#FEE476" />`;
			} else {
				outStr += `<path style="fill:red" d='M44 18 L42 16 L28 30 L14 16 L12 18 L26 32 L12 46 L14 48 L28 34 L42 48 L44 46 L30 32 Z' />`;
			}
			
			outStr += `</svg>` +
				`</span>` +
				
				`<span class="tool">` +
				`<span style="background-color:#000" class="tip">`;
			
			if (terminal) {
				let svgTerminal = new SVGTerminal(terminal);
				outStr += svgTerminal.toString();
			} else {
				outStr += `No Terminal Built`;
			}
			
			outStr += `</span>` +
				`<svg width="50" height="60" style="transform:scale(1.2,1.2)">` +
				`<path vector-effect="non-scaling-stroke" style="stroke:#90BA94" d='M36 40 L42 32 L36 24 L28 18 L20 24 L14 32 L20 40 L28 46 Z' />` +
				`<path vector-effect="non-scaling-stroke" style="fill:#AAAAAA" d='M34 38 L38 32 L34 26 L28 22 L22 26 L18 32 L22 38 L28 42 Z' />` +
				`<path vector-effect="non-scaling-stroke" style="stroke-width:2;stroke:black;fill:#555555" d='M34 38 L34 32 L34 26 L28 26 L22 26 L22 32 L22 38 L28 38 Z' />`;
			
			if (terminal) {
				let capacity = terminal.storeCapacity;
				let energy = terminal.store[RESOURCE_ENERGY];
				let power = terminal.store[RESOURCE_POWER] || 0;
				let other = _.sum(terminal.store) - energy - power;
				
				const RADIUS = 6;
				
				const START_X = 22;
				const START_Y = 26;
				
				let energyRadius = RADIUS * (energy / capacity);
				let otherRadius = RADIUS * (other / capacity) + energyRadius;
				let powerRadius = RADIUS * (power / capacity) + otherRadius;
				
				let powerX = START_X + (RADIUS - powerRadius);
				let otherX = START_X + (RADIUS - otherRadius);
				let energyX = START_X + (RADIUS - energyRadius);
				
				let powerY = START_Y + (RADIUS - powerRadius);
				let otherY = START_Y + (RADIUS - otherRadius);
				let energyY = START_Y + (RADIUS - energyRadius);
				
				outStr += `<!-- power -->` +
					`<rect x="${powerX}" y="${powerY}" width="${powerRadius * 2}" height="${powerRadius * 2}" style="fill:#F1243A" />` +
					`<!-- minerals -->` +
					`<rect x="${otherX}" y="${otherY}" width="${otherRadius * 2}" height="${otherRadius * 2}" style="fill:#FFFFFF" />` +
					`<!-- energy -->` +
					`<rect x="${energyX}" y="${energyY}" width="${energyRadius * 2}" height="${energyRadius * 2}" style="fill:#FEE476" />`;
			} else {
				outStr += `<path style="fill:red" d='M44 18 L42 16 L28 30 L14 16 L12 18 L26 32 L12 46 L14 48 L28 34 L42 48 L44 46 L30 32 Z' />`;
			}
			outStr += `</svg>` +
				`</span>`;
			
			return outStr;
		}
		return this.string;
	}
	
}

module.exports = SVGRoom;