let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given source object.
 * @author Spedwards
 */
class SVGSource extends SVG {

	/**
	 * @author Spedwards
	 * @param {Source | string} source - Source object or ID string corrosponding to a Source object.
	 */
	constructor(source) {
		super();
		let object = this.validateConstructor(source, SVG.SOURCE);
		if (object === false) throw new Error('No a Source object!');

		this.source = object;
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_HEIGHT = 40;
			const SVG_WIDTH = 40;

			const SOURCE_HEIGHT = this.source.energy / this.source.energyCapacity * 60;
			const SOURCE_POS = (SVG_HEIGHT / 2) - (SOURCE_HEIGHT / 2);

			return `<svg  class="source" height="${SVG_HEIGHT}" width="${SVG_WIDTH}" viewBox="0 0 100 100">` +
				`<g transform="translate(25, 25)">` +
				`<rect fill="#111111" height="40" rx="15" ry="15" stroke-width="15" stroke="#595026" width="40">` +
				`<animate app-attr="calcMode#Source.displayOptions.animations ? 'linear' : 'discrete'" attributeName="stroke" dur="4s" repeatCount="indefinite" values="#595026; #0e0c04; #595026" calcMode="linear"></animate>` +
				`</rect>` +
				`<rect fill="#FFE56D" height="${SOURCE_HEIGHT}" width="${SOURCE_HEIGHT}" rx="15" ry="15" x="${SOURCE_POS}" y="${SOURCE_POS}">` +
				`<animate app-attr="calcMode#Source.displayOptions.animations ? 'linear' : 'discrete'" attributeName="fill" dur="2s" repeatCount="indefinite" values="#ffe56d; #fff; #ffcd6d; #ffde84; #ffe56d" calcMode="linear"></animate>` +
				`</rect>` +
				`</g>` +
				`</svg>`;
		}
		return this.string;
	}

}

module.exports = SVGSource;
