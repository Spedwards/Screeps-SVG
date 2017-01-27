let SVG = require('./SVG');
let SVGStorage = require('./SVGStorage');
let SVGTerminal = require('./SVGTerminal');

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
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(roomArg, size = 60) {
		super();
		let object = this.validateConstructor(roomArg, SVG.ROOM);
		if (object === false) throw new Error('Not a Room object!');

		this.room = object;
		this.size = typeof size === 'number' ? size : 60;
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
			let storageSVG;
			let terminal = this.room.terminal;
			let terminalSVG;

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
				storageSVG = new SVGStorage(storage, this.size);
				outStr += storageSVG.getContents();
			} else {
				outStr += `No Storage Built`;
			}
			outStr += `</span>`;
			if (storage) {
				outStr += storageSVG.toString();
			} else {
				outStr += `<svg width="50" height="60">` +
						`<path style="stroke-width: 1;stroke:#90BA94" d='M16 48 C18 52 38 52 40 48 C42 46 42 18 40 16 C38 12 18 12 16 16 C14 18 14 46 16 48' />` +
						`<path style="fill:#555555" d='M18 46 L38 46 L38 18 L18 18' />` +
						`<path style="fill:red" d='M44 18 L42 16 L28 30 L14 16 L12 18 L26 32 L12 46 L14 48 L28 34 L42 48 L44 46 L30 32 Z' />` +
						`</svg>`;
			}
			outStr += `</span>` +

				`<span class="tool">` +
				`<span style="background-color:#000" class="tip">`;

			if (terminal) {
				terminalSVG = new SVGTerminal(terminal, this.size);
				outStr += terminalSVG.getContents();
			} else {
				outStr += `No Terminal Built`;
			}
			outStr += `</span>`;

			if (terminal) {
				outStr += terminalSVG.toString();
			} else {
				outStr += `<svg width="50" height="60" style="transform:scale(1.2,1.2)">` +
						`<path vector-effect="non-scaling-stroke" style="stroke:#90BA94" d='M36 40 L42 32 L36 24 L28 18 L20 24 L14 32 L20 40 L28 46 Z' />` +
						`<path vector-effect="non-scaling-stroke" style="fill:#AAAAAA" d='M34 38 L38 32 L34 26 L28 22 L22 26 L18 32 L22 38 L28 42 Z' />` +
						`<path vector-effect="non-scaling-stroke" style="stroke-width:2;stroke:black;fill:#555555" d='M34 38 L34 32 L34 26 L28 26 L22 26 L22 32 L22 38 L28 38 Z' />` +
						`<path style="fill:red" d='M44 18 L42 16 L28 30 L14 16 L12 18 L26 32 L12 46 L14 48 L28 34 L42 48 L44 46 L30 32 Z' />` +
						`</svg>`;
			}
			
			outStr += `</span>`;

			return outStr;
		}
		return this.string;
	}

}

Room.prototype.getSVG = function(size = 60) {
	return new SVGRoom(this, size);
};

Room.prototype.display = function(size = 60) {
	console.log(this.getSVG(size));
};

module.exports = SVGRoom;
