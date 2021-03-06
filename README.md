# Screeps SVG
Creates SVG Elements for game objects that can be logged to console.

## Install
Copy and paste [`dist/screeps-svg.js`](dist/screeps-svg.js) to your project.

## Usage

The use is identical for each of the classes. For game objects (all but room), the constructor will accept either the object, or the ID corrosponding to the object. Rooms and Creeps will accept the name in addition to the object.

```
// Import screeps-svg
let svg = require('./screeps-svg');

// Usage
let link = Game.getObjectById(LINK_ID);
let linkSVG = link.getSVG();
// or
let linkSVG = new svg.Link(LINK_ID);

console.log(linkSVG);
```

If you want to use the module globally you can assign it to `global.svg`.

```
_.assign(global, {
	svg: require('./screeps-svg'),
});

// Usage
let link = Game.getObjectById(LINK_ID);
let linkSVG = link.getSVG();
// or
let linkSVG = new global.svg.Link(LINK_ID);

console.log(linkSVG);
```

For basic displays, the following works as well.

```
let link = Game.getObjectById(LINK_ID);
link.display();
```

![Demo Outputs](demo.png)

## Contribute

Clone the project and execute `npm install`.

For testing purposes you can bundle the project by executing `npm run build`.
