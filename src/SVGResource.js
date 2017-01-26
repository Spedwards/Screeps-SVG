let SVG = require('./SVG');

/**
 * Takes a resource type constant as input and
 * returns the html/svg string for the icon of
 * that resource upon calling `.toString()`
 * @author Helam
 * @author Spedwards
 */
class SVGResource extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {string} resourceType
	 * @param {Number | Boolean} [amount = 0] - 0 by default, pass false to hide it
	 */
	constructor(resourceType, amount = 0) {
		super();
		if (typeof resourceType !== 'string') throw new Error('Resource is not a String!');
		if (!Number.isInteger(amount)) throw new Error('Amount is not an Integer!');
		
		this.resourceType = resourceType;
		this.amount = amount;
		this.string = this.toString();
	}
	
	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			let length = Math.max(1, Math.ceil(Math.log10(this.amount + 1)));
			let amountWidth = length * 10 + 5;
			
			if (this.amount === false) {
				amountWidth = 0;
			}
			
			let textDisplacement = 14;
			let finalWidth = 14 + amountWidth;
			
			let outStr = `<svg width="!!" height="14">`;
			
			if (this.resourceType === RESOURCE_ENERGY) {
				outStr += `<circle cx="7" cy="7" r="5" style="fill:#FEE476"/>`;
			} else if (this.resourceType === RESOURCE_POWER) {
				outStr += `<circle cx="7" cy="7" r="5" style="fill:#F1243A"/>`;
			} else {
				const BASE_MINERALS = {
					[undefined]: {back: `#fff`, front: `#000`},
					[RESOURCE_HYDROGEN]: {back: `#4B4B4B`, front: `#989898`},
					[RESOURCE_OXYGEN]: {back: `#4B4B4B`, front: `#989898`},
					[RESOURCE_UTRIUM]: {back: `#0A5D7C`, front: `#48C5E5`},
					[RESOURCE_LEMERGIUM]: {back: `#265C42`, front: `#24D490`},
					[RESOURCE_KEANIUM]: {back: `#371A80`, front: `#9269EC`},
					[RESOURCE_ZYNTHIUM]: {back: `#58482D`, front: `#D9B478`},
					[RESOURCE_CATALYST]: {back: `#572122`, front: `#F26D6F`},
				};
				
				const COMPOUNDS = {
					U: {back: `#58D7F7`, front: `#157694`},
					L: {back: `#29F4A5`, front: `#22815A`},
					K: {back: `#9F76FC`, front: `#482794`},
					Z: {back: `#FCD28D`, front: `#7F6944`},
					G: {back: `#FFFFFF`, front: `#767676`},
					O: {back: `#99ccff`, front: `#000066`},
					H: {back: `#99ccff`, front: `#000066`},
				};
				
				let colours = BASE_MINERALS[this.resourceType];
				
				if (colours) {
					outStr += `<circle cx="7" cy="7" r="5" style="stroke-width:1;stroke:${colours.front};fill:${colours.back}"/>` +
						`<text x="7" y="8" font-family="Verdana" font-size="8" alignment-baseline="middle" text-anchor="middle" style="fill:${colours.front};font-weight:bold;">${this.resourceType === undefined ? '?' : this.resourceType}</text>`;
				} else {
					let compoundType = ['U', 'L', 'K', 'Z', 'G', 'H', 'O'].find(type => resourceType.indexOf(type) !== -1);
					colours = COMPOUNDS[compoundType];
					if (colours) {
						let width = this.resourceType.length * 9;
						finalWidth += width;
						textDisplacement += width;
						outStr += `<rect x="0" y="0" width="${width}" height="14" style="fill:${colours.back}"/>` +
							`<text x="${width / 2.0}" y="8" font-family="Verdana" font-size="8" alignment-baseline="middle" text-anchor="middle" style="fill:${colours.front};font-weight:bold;">${this.resourceType}</text>`;
					} else {
						throw new Error(`Invalid resource type ${this.resourceType} in SVGResource!`);
					}
				}
			}
			
			if (this.amount !== false) {
				outStr += `<text font-family="Verdana" font-size="10" x="${textDisplacement + amountWidth/2}" y="8" alignment-baseline="middle" text-anchor="middle" style="fill:white"> x ${this.amount.toLocaleString()}</text>`;
			}
			outStr += `</svg>`;
			
			outStr = outStr.split('!!').join(finalWidth);
			
			return outStr;
		}
		return this.string;
	}
	
}

module.exports = SVGResource;
