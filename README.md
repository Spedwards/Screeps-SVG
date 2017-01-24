# Screeps SVG
Creates SVG Elements for game objects that can be logged to console.

## Use

The use is identical for each of the classes. For game objects (all but room), the constructor will accept either the object, or the ID corrosponding to the object. Rooms and Creeps will accept the name in addition to the object.

	let link = Game.getObjectById(LINK_ID);
	let linkSVG = new global.svg.link(link);
	// or
	let linkSVG = new global.svg.link(LINK_ID);

	console.log(linkSVG);

## Todo

 - Add Controller
 - Add Spawn
 - Add Extension
 - Add Container
 - Add Full Mineral
 - Move Storage/Terminal specific code from Room to respective class
