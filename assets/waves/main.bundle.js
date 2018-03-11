/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class VirtualCanvasRenderer {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.instances = {};
        if (height <= 0 || width <= 0) {
            throw new Error('VCR: Height and width must be greater than zero!');
        }
    }
    getContext(name = 'main') {
        if (!this.instances.hasOwnProperty(name)) {
            this.init(name);
        }
        return this.instances[name].context;
    }
    getCanvas(name = 'main') {
        if (!this.instances.hasOwnProperty(name)) {
            this.init(name);
        }
        return this.instances[name].canvas;
    }
    clear(name = 'main') {
        const canvas = this.getCanvas(name);
        const ctx = this.getContext(name);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    free(name = 'main') {
        if (this.instances.hasOwnProperty(name)) {
            // Remove the element from the DOM in case it was appended.
            const canvas = this.instances[name].canvas;
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            this.instances[name].context = null;
            this.instances[name].canvas = null;
            delete this.instances[name];
        }
    }
    createNew() {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('height', `${this.height}px`);
        canvas.setAttribute('width', `${this.width}px`);
        const context = canvas.getContext('2d');
        return {
            canvas,
            context,
        };
    }
    init(name) {
        const { canvas, context } = this.createNew();
        this.instances[name] = {
            name,
            canvas,
            context,
        };
    }
}
exports.default = VirtualCanvasRenderer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ENV_MATERIAL;
(function (ENV_MATERIAL) {
    ENV_MATERIAL[ENV_MATERIAL["GRASS"] = 0] = "GRASS";
    ENV_MATERIAL[ENV_MATERIAL["STONE"] = 2] = "STONE";
    ENV_MATERIAL[ENV_MATERIAL["BRICK"] = 1] = "BRICK";
    ENV_MATERIAL[ENV_MATERIAL["WINDOW"] = 3] = "WINDOW";
    ENV_MATERIAL[ENV_MATERIAL["CARPET"] = 4] = "CARPET";
    ENV_MATERIAL[ENV_MATERIAL["METAL"] = 5] = "METAL";
})(ENV_MATERIAL = exports.ENV_MATERIAL || (exports.ENV_MATERIAL = {}));
const loadImage = (src) => {
    const img = new Image();
    img.src = src;
    return img;
};
exports.TILES = {
    [ENV_MATERIAL.GRASS]: {
        color: '#97cc74',
        // pattern: loadImage('/img/grass.png'),
        hardness: 0,
    },
    [ENV_MATERIAL.METAL]: {
        color: '#273745',
        // pattern: loadImage('/img/grass.png'),
        hardness: 4,
    },
    [ENV_MATERIAL.BRICK]: {
        color: '#805959',
        // pattern: loadImage('/img/brick.png'),
        // thickness: 5,
        impassible: true,
    },
    [ENV_MATERIAL.STONE]: {
        color: 'rgba(190, 190, 190, 1)',
        // pattern: loadImage('/img/stone.png'),
        hardness: 0,
    },
    [ENV_MATERIAL.WINDOW]: {
        color: 'rgba(137, 207, 240, 0.3)',
        thickness: 6,
        impassible: true,
    },
    [ENV_MATERIAL.CARPET]: {
        color: '#cc7474',
        // pattern: loadImage('/img/grass.png'),
        hardness: 0,
    },
};
exports.getMaterialForType = (mapIdx) => {
    return this.TILES[this.TILE_MAP[mapIdx]];
};
exports.TILE_MAP = {
    0x0: ENV_MATERIAL.GRASS,
    0x1: ENV_MATERIAL.BRICK,
    0x2: ENV_MATERIAL.STONE,
    0x3: ENV_MATERIAL.WINDOW,
    0x4: ENV_MATERIAL.CARPET,
    0x5: ENV_MATERIAL.METAL,
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const VCR_1 = __webpack_require__(0);
const FSM_1 = __webpack_require__(11);
const AStar_1 = __webpack_require__(10);
var AGENT_STATE;
(function (AGENT_STATE) {
    AGENT_STATE[AGENT_STATE["IDLE"] = 1] = "IDLE";
    AGENT_STATE[AGENT_STATE["PATROLLING"] = 2] = "PATROLLING";
    AGENT_STATE[AGENT_STATE["ALERT"] = 3] = "ALERT";
    AGENT_STATE[AGENT_STATE["ENGAGED"] = 4] = "ENGAGED";
    AGENT_STATE[AGENT_STATE["DEAD"] = 5] = "DEAD";
})(AGENT_STATE || (AGENT_STATE = {}));
class Agent extends FSM_1.default {
    constructor(size = 10, position, levelMan, entityMan) {
        super();
        this.size = size;
        this.position = position;
        this.levelMan = levelMan;
        this.entityMan = entityMan;
        this.rotation = 0;
        this.waypoints = [];
        this.path = [];
        this.lastTime = 1000;
        this.isDirty = true;
        this.vcr = new VCR_1.default(size, size);
        this.waypoints = [[].concat(position)];
        this.setState(AGENT_STATE.IDLE, { coords: [].concat(position) });
        requestAnimationFrame(this.process.bind(this));
    }
    hearSomething(origin, distance) {
        this.setState(AGENT_STATE.ALERT, { coords: [].concat(origin) });
    }
    onStateChange(prev, next, data) {
        clearTimeout(this.actionTimer);
        switch (next) {
            case AGENT_STATE.ALERT: {
                // console.time('astar');
                const path = AStar_1.default(this.position, data.coords, this.levelMan, this.entityMan);
                // console.timeEnd('astar');
                if (path) {
                    this.path = path;
                }
                else {
                    this.actionTimer = setTimeout(() => {
                        console.log('I must be hearing things!');
                        const prev = this.getPreviousState();
                        this.setState(prev.type, prev.data);
                    }, 1000);
                }
                break;
            }
            case AGENT_STATE.ENGAGED:
                break;
            case AGENT_STATE.IDLE: {
                if (data.coords) {
                    // console.time('astar');
                    const path = AStar_1.default(this.position, data.coords, this.levelMan, this.entityMan);
                    // console.timeEnd('astar');
                    if (path) {
                        this.path = path;
                    }
                }
                break;
            }
            case AGENT_STATE.PATROLLING:
                break;
            case AGENT_STATE.DEAD:
                break;
            default:
                break;
        }
    }
    moveAlongPath() {
        const next = this.path.shift();
        this.position[0] = next[0];
        this.position[1] = next[1];
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            const delta = Date.now() - (this.lastTime || -1000);
            switch (this.getState()) {
                case AGENT_STATE.ALERT:
                    if (this.path.length && delta > 200) {
                        this.moveAlongPath();
                        this.lastTime = Date.now();
                    }
                    if (!this.path.length && delta > 2000) {
                        this.setState(AGENT_STATE.IDLE, { coords: this.waypoints[0] });
                    }
                    break;
                case AGENT_STATE.ENGAGED:
                    break;
                case AGENT_STATE.IDLE:
                    if (this.path.length && delta > 200) {
                        this.moveAlongPath();
                        this.lastTime = Date.now();
                    }
                    break;
                case AGENT_STATE.PATROLLING:
                    break;
                case AGENT_STATE.DEAD:
                    break;
                default:
                    break;
            }
            requestAnimationFrame(this.process.bind(this));
        });
    }
    update() {
        if (!this.isDirty) {
            return;
        }
        this.isDirty = false;
        this.vcr.clear();
        const ctx = this.vcr.getContext();
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.size / 2, this.size / 2, this.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    print(toContext, viewport) {
        this.update();
        const newX = this.position[0] * this.size;
        const newY = this.position[1] * this.size;
        toContext.drawImage(this.vcr.getCanvas(), 0, 0, this.size, this.size, -viewport.xMin + newX, -viewport.yMin + newY, this.size, this.size);
    }
}
exports.default = Agent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class EntityManager {
    constructor() {
        this.active = [];
    }
    add(ent) {
        this.active.push(ent);
    }
    getEntitiesAtCoord(x, y) {
        return this.active.filter(ent => ent.position[0] === x && ent.position[1] === y);
    }
}
exports.default = EntityManager;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VCR_1 = __webpack_require__(0);
const floors_1 = __webpack_require__(1);
class LevelManager {
    constructor(options = { cellSize: 1 }) {
        this.levels = [];
        this.currentLevel = -1;
        this.isDirty = false;
        this.patternCache = {};
        this.vcr = new VCR_1.default(500, 500);
        this.cellSize = options.cellSize;
        this.primeTextures();
    }
    primeTextures() {
        const ctx = this.vcr.getContext();
        for (const type in floors_1.TILES) {
            const pattern = floors_1.TILES[type].pattern;
            if (pattern) {
                if (!pattern.complete) {
                    pattern.onload = () => {
                        this.patternCache[type] = ctx.createPattern(pattern, 'repeat');
                        this.isDirty = true;
                    };
                }
                else {
                    this.patternCache[type] = ctx.createPattern(pattern, 'repeat');
                }
            }
        }
    }
    addLevel(lev) {
        this.levels.push(lev);
        if (this.currentLevel < 0) {
            this.currentLevel += 1;
            this.isDirty = true;
        }
    }
    getLevelCoords(x, y, levelIndex = this.currentLevel) {
        const level = this.levels[levelIndex];
        const ySize = level.map.length;
        const xSize = level.map[0].length;
        if (y >= ySize || x >= xSize || y < 0 || x < 0) {
            return {};
        }
        return floors_1.getMaterialForType(level.map[y][x]);
    }
    update() {
        if (!this.isDirty) {
            return;
        }
        this.isDirty = false;
        const level = this.levels[this.currentLevel];
        if (!level) {
            return;
        }
        const canvas = this.vcr.getCanvas();
        // assuming rectangular levels
        const ySize = level.map.length;
        const xSize = level.map[0].length;
        canvas.setAttribute('height', `${ySize * this.cellSize}px`);
        canvas.setAttribute('width', `${xSize * this.cellSize}px`);
        this.vcr.clear();
        const ctx = this.vcr.getContext();
        const cellSize = this.cellSize; // Math.floor(500 / Math.max(xSize, ySize));
        for (let x = 0; x < xSize; x += 1) {
            for (let y = 0; y < ySize; y += 1) {
                const cell = level.map[y][x];
                const mat = floors_1.getMaterialForType(cell);
                ctx.fillStyle = mat.color;
                if (mat.pattern) {
                    const patternType = floors_1.TILE_MAP[cell];
                    const cached = this.patternCache[patternType];
                    if (cached) {
                        ctx.fillStyle = cached;
                    }
                }
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    print(toContext, viewport) {
        this.update();
        toContext.drawImage(this.vcr.getCanvas(), -viewport.xMin, -viewport.yMin);
        const width = (viewport.xMax - viewport.xMin) * this.cellSize;
        const height = (viewport.yMax - viewport.yMin) * this.cellSize;
        toContext.drawImage(this.vcr.getCanvas(), 0, 0, width, height, -viewport.xMin, -viewport.yMin, width, height);
    }
}
exports.default = LevelManager;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VCR_1 = __webpack_require__(0);
class Player {
    constructor(size = 10) {
        this.size = size;
        this.position = [1, 1];
        this.rotation = 0;
        this.counter = 0;
        this.isDirty = true;
        this.vcr = new VCR_1.default(size, size);
    }
    move(xAmt = 0, yAmt = 0) {
        this.position[0] += xAmt;
        this.position[1] += yAmt;
        // no need to set isDirty since the appearance of the player
        // has not changed, just its position
    }
    getX() {
        return this.position[0];
    }
    getY() {
        return this.position[1];
    }
    update() {
        if (!this.isDirty) {
            return;
        }
        this.isDirty = false;
        this.vcr.clear();
        const ctx = this.vcr.getContext();
        ctx.fillStyle = '#dee436';
        ctx.beginPath();
        ctx.arc(this.size / 2, this.size / 2, this.size / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    print(toContext, viewport) {
        this.update();
        const newX = this.position[0] * this.size;
        const newY = this.position[1] * this.size;
        toContext.drawImage(this.vcr.getCanvas(), 0, 0, this.size, this.size, -viewport.xMin + newX, -viewport.yMin + newY, this.size, this.size);
    }
}
exports.default = Player;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VCR_1 = __webpack_require__(0);
class SoundWave {
    constructor(levelMan, entMan, options) {
        this.levelMan = levelMan;
        this.entMan = entMan;
        this.position = [].concat(options.origin);
        this.source = [].concat(options.origin);
        this.distance = options.distance;
        this.cellSize = options.cellSize;
        this.size = this.cellSize * (this.distance * 2);
        this.vcr = new VCR_1.default(this.size, this.size);
        this.seen = new Set();
        this.bits = [];
        this.propagate([0, 0, 0]);
        requestAnimationFrame(this.update.bind(this));
    }
    propagate(origin) {
        let currX;
        let currY;
        let key;
        let dist;
        let mapX;
        let mapY;
        let moveCost = 0;
        for (let x = -1; x <= 1; x += 1) {
            for (let y = -1; y <= 1; y += 1) {
                currX = origin[0] + x;
                currY = origin[1] + y;
                mapX = currX + this.position[0];
                mapY = currY + this.position[1];
                key = `${mapX},${mapY}`;
                if (!this.seen.has(key)) {
                    this.seen.add(key);
                    const nextCell = this.levelMan.getLevelCoords(mapX, mapY);
                    if (!nextCell || (nextCell.impassible && !nextCell.thickness)) {
                        continue;
                    }
                    if (origin[2] > this.distance) {
                        continue;
                    }
                    moveCost = nextCell.thickness || 1;
                    // if (nextCell.retargetSource) {
                    //   // this.source = [mapX, mapY];
                    // }
                    this.bits.push([currX, currY, origin[2] + moveCost + 1]);
                }
            }
        }
    }
    step() {
        if (!this.bits.length || this.distance <= 0) {
            return;
        }
        // Push forward the 'shore line'
        let i = this.bits.length - 1;
        while (i >= 0) {
            const next = this.bits.shift();
            this.propagate(next);
            i -= 1;
        }
    }
    update() {
        if (!this.bits.length || this.distance <= 0) {
            this.vcr.clear();
            return;
        }
        const delta = Date.now() - (this.lastTime || -1000);
        if (delta >= SoundWave.SPEED) {
            this.vcr.clear();
            if (this.bits.length) {
                const ctx = this.vcr.getContext();
                let i = this.bits.length - 1;
                let pt;
                let dist;
                while (i >= 0) {
                    pt = this.bits[i];
                    ctx.fillStyle = `rgba(255, 255, 255, ${1.1 - (pt[2] / this.distance)})`;
                    ctx.fillRect((pt[0] * this.cellSize) + (this.size / 2), (pt[1] * this.cellSize) + (this.size / 2), this.cellSize, this.cellSize);
                    this.entMan.getEntitiesAtCoord(this.position[0] + pt[0], this.position[1] + pt[1]).forEach((ent) => {
                        ent.hearSomething(this.source, pt[2] || 0);
                    });
                    i -= 1;
                }
            }
            this.lastTime = Date.now();
            this.step();
        }
        requestAnimationFrame(this.update.bind(this));
    }
    print(toContext, viewport) {
        // src, x, y, w, h, destX, destY, w, h
        const width = (viewport.xMax - viewport.xMin) * this.cellSize;
        const height = (viewport.yMax - viewport.yMin) * this.cellSize;
        toContext.globalCompositeOperation = 'overlay';
        toContext.drawImage(this.vcr.getCanvas(), 0, 0, this.size, this.size, -viewport.xMin + (this.position[0] * this.cellSize) - (this.size / 2), -viewport.yMin + (this.position[1] * this.cellSize) - (this.size / 2), this.size, this.size);
        toContext.globalCompositeOperation = 'source-over';
    }
}
SoundWave.SPEED = 1000 / 24;
exports.default = SoundWave;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const floors_1 = __webpack_require__(1);
const { GRASS, BRICK, STONE, METAL, WINDOW, CARPET } = floors_1.ENV_MATERIAL;
const makeMap = (xSize, ySize) => {
    let map = [];
    for (let y = 0; y < ySize; y += 1) {
        map[y] = [];
        for (let x = 0; x < xSize; x += 1) {
            map[y][x] = GRASS; // Math.random() > 0.95 ? STONE : GRASS;
        }
    }
    for (let i = 5; i < 20; i += 1) {
        map[i][5] = i >= 8 && i <= 16 ? WINDOW : BRICK;
    }
    for (let i = 0; i <= 20; i += 1) {
        map[11][i] = STONE;
        map[12][i] = STONE;
        map[13][i] = STONE;
        // map[14][i] = i < 5 ? STONE : METAL;
        if (i === 5) {
            map[20][i] = BRICK;
        }
        if (i > 5) {
            map[4][i] = BRICK;
            map[5][i] = STONE;
            map[6][i] = STONE;
            map[7][i] = STONE;
            map[8][i] = STONE;
            map[9][i] = STONE;
            map[14][i] = BRICK;
            map[15][i] = STONE;
            map[16][i] = STONE;
            map[17][i] = STONE;
            map[18][i] = STONE;
            map[19][i] = STONE;
            map[20][i] = i >= 8 && i <= 10 ? WINDOW : BRICK;
        }
        if (i > 10) {
            map[10][i] = STONE;
        }
        if (i === 20) {
            map[4][i] = BRICK;
            map[5][i] = BRICK;
            map[6][i] = BRICK;
            map[7][i] = BRICK;
            map[8][i] = BRICK;
            map[9][i] = BRICK;
            map[10][i] = BRICK;
            map[11][i] = BRICK;
            map[12][i] = BRICK;
            map[13][i] = BRICK;
            map[14][i] = BRICK;
            map[15][i] = BRICK;
            map[16][i] = BRICK;
            map[17][i] = BRICK;
            map[18][i] = BRICK;
            map[19][i] = BRICK;
            map[19][i] = BRICK;
        }
    }
    map[4][5] = BRICK;
    for (let i = 0; i <= 12; i += 1) {
        map[4][5 + i] = BRICK;
        map[10][5 + i] = i > 4 && i < 9 ? WINDOW : BRICK;
        // if (i > 2 && i <= 5) {
        if (i >= 5 && i <= 6) {
            map[14][5 + i] = STONE;
        }
        else {
            map[14][5 + i] = BRICK;
        }
        // } else {
        //   map[14][5 + i] = i === 3 ? GRASS : BRICK;
        // }
    }
    return map;
};
exports.testMap = {
    name: 'Smile',
    map: makeMap(100, 100),
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MOUSE_EVENT;
(function (MOUSE_EVENT) {
    MOUSE_EVENT["CLICK"] = "click";
    MOUSE_EVENT["R_CLICK"] = "contextmenu";
    MOUSE_EVENT["MOVE"] = "mousemove";
    MOUSE_EVENT["DOWN"] = "mousedown";
    MOUSE_EVENT["UP"] = "mouseup";
})(MOUSE_EVENT = exports.MOUSE_EVENT || (exports.MOUSE_EVENT = {}));
var KEY_EVENT;
(function (KEY_EVENT) {
    KEY_EVENT["DOWN"] = "keydown";
    KEY_EVENT["UP"] = "keyup";
})(KEY_EVENT = exports.KEY_EVENT || (exports.KEY_EVENT = {}));
class InputManager {
    constructor() {
        this.hasFlags = false;
        this.flaggedEvents = {};
        this.internalEvents = {};
        this.bindings = {};
        this.tick();
    }
    tick() {
        if (!this.hasFlags) {
            requestAnimationFrame(this.tick.bind(this));
            return;
        }
        this.hasFlags = false;
        let evtData;
        let group;
        let i;
        for (const event in this.flaggedEvents) {
            group = (this.bindings[event] || []);
            evtData = this.flaggedEvents[event];
            i = group.length - 1;
            while (i >= 0) {
                group[i](evtData);
                i -= 1;
            }
            delete this.flaggedEvents[event];
        }
        requestAnimationFrame(this.tick.bind(this));
    }
    on(event, cb) {
        this.bindings[event] = this.bindings[event] || [];
        this.bindings[event].push(cb);
        this.registerEvent(event);
    }
    registerEvent(type) {
        if (this.internalEvents[type]) {
            return;
        }
        const newHandler = this.createEventHandler(type);
        window.addEventListener(type, newHandler, false);
        this.internalEvents[type] = newHandler;
    }
    createEventHandler(type) {
        return (evt) => {
            this.flaggedEvents[type] = evt;
            this.hasFlags = true;
        };
    }
}
exports.default = InputManager;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CanvasRenderer_1 = __webpack_require__(13);
const QuadTree_1 = __webpack_require__(14);
class RenderingCamera {
    constructor(dispHeight, dispWidth, startCords = [0, 0]) {
        this.viewportCords = startCords;
        this.viewport = new QuadTree_1.Rect(this.viewportCords[0], this.viewportCords[1], dispWidth, dispHeight);
    }
    getViewport() {
        return this.viewport;
    }
    quake(amt = 10, durationMs = 500) {
        const vp = this.viewport;
        let delta;
        let start = Date.now();
        const ogX = vp.xMin;
        const ogY = vp.yMin;
        const tick = () => {
            delta = Date.now() - start;
            vp.xMin = ogX + (Math.cos(delta) * (amt * (1 - (delta / durationMs))));
            vp.yMin = ogY + (Math.sin(delta) * (Math.random() * (1 - (delta / durationMs))));
            if (delta < durationMs) {
                requestAnimationFrame(tick.bind(this));
            }
            else {
                vp.xMin = ogX;
                vp.yMin = ogY;
            }
        };
        tick();
    }
}
class RenderingPipeline {
    constructor(width, height) {
        this.renderers = [];
        this.isFlagged = false;
        const output = new CanvasRenderer_1.default(height, width);
        this.camera = new RenderingCamera(height, width, [0, 0]);
        this.outputCanvas = output.getCanvas();
        this.outputContext = output.getContext();
        this.tick();
    }
    tick() {
        this.update();
        requestAnimationFrame(this.tick.bind(this));
    }
    getCanvas() {
        return this.outputCanvas;
    }
    addRenderer(renderer) {
        this.renderers.unshift(renderer);
    }
    getCamera() {
        return this.camera;
    }
    update() {
        const all = this.renderers;
        let renderer;
        this.outputContext.clearRect(0, 0, this.outputContext.canvas.width, this.outputContext.canvas.height);
        let i = all.length - 1;
        const vp = this.camera.getViewport();
        while (i >= 0) {
            all[i].print(this.outputContext, vp);
            i -= 1;
        }
    }
    clear() {
        this.renderers = [];
    }
}
exports.default = RenderingPipeline;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dist = (pt1, pt2) => {
    return Math.sqrt(Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2));
};
function AStar(start, destination, levelMan, entityMan) {
    const target = destination.join(',');
    if (start.join(',') === target) {
        return null;
    }
    let closedKeys = {};
    let openKeys = {};
    let open = [];
    let closed = [];
    open.push({
        coords: [].concat(start),
        g: 0,
        h: 0,
        f: 0,
        parent: null,
    });
    let q;
    let neighbors = [[0, -1], [0, 1], [1, 0], [-1, 0]];
    let newX;
    let newY;
    let key;
    let g;
    let h;
    let f;
    let found;
    let newNode;
    while (!found && open.length) {
        // console.log(open.length);
        q = open.shift();
        neighbors.forEach(pt => {
            if (found) {
                return;
            }
            newX = q.coords[0] + pt[0];
            newY = q.coords[1] + pt[1];
            key = `${newX},${newY}`;
            if (key === target) {
                found = newNode;
                return;
            }
            if (levelMan.getLevelCoords(newX, newY).impassible || entityMan.getEntitiesAtCoord(newX, newY).length) {
                return;
            }
            // computes the vector cross-product between the start to goal vector and the current point to goal vector
            const currentGoalVector = [newX - destination[0], newY - destination[1]];
            const startGoalVector = [start[0] - destination[0], start[1] - destination[1]];
            const crossProduct = Math.abs((startGoalVector[0] * currentGoalVector[0]) - (startGoalVector[1] * currentGoalVector[1]));
            // const d1 = (newX - destination[0]) * (start[1] - destination[1]);
            // const d2 = (newY - destination[1]) * (start[0] - destination[0]);
            // cross product * 0.001
            const d3 = crossProduct * 0.001;
            g = q.g + d3;
            h = d3;
            f = 0;
            newNode = {
                coords: [newX, newY],
                g,
                h,
                f: g + h,
                parent: q,
            };
            const existingOpen = openKeys[key];
            // const existingOpen = open.find(x => x.coords.join(',') === key);
            if (existingOpen && existingOpen.f < (g + h)) {
                return;
            }
            // const existingClosed = closed.find(x => x.coords.join(',') === key);
            const existingClosed = closedKeys[key];
            if (existingClosed && existingClosed.f < (g + h)) {
                return;
            }
            openKeys[key] = newNode;
            open.push(newNode);
        });
        closed.push(q);
        closedKeys[key] = q;
        delete openKeys[q.coords.join(',')];
    }
    if (found) {
        let path = [];
        while (found.parent) {
            path.push(found.parent);
            found = found.parent;
        }
        path = path.map(x => x.coords);
        path = path.reverse();
        return path;
    }
    return null;
}
exports.default = AStar;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class FSM {
    constructor() {
        this.history = [];
    }
    setState(nextState, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastState = this.state;
            this.state = nextState;
            this.stateData = data;
            this.history.push({
                type: nextState,
                data,
            });
            yield this.onStateChange(lastState, nextState, data);
        });
    }
    getState() {
        return this.state;
    }
    getPreviousState(count = 1) {
        return this.history[(this.history.length - 1) - count];
    }
    onStateChange(prevState, nextState, data) { }
}
exports.default = FSM;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Emitter {
    constructor() {
        this.bindings = {};
    }
    on(eventName, fn) {
        this.bindings[eventName] = [
            ...(this.bindings[eventName] || []),
            fn,
        ];
    }
    emit(eventName, ...data) {
        const acts = this.bindings[eventName] || [];
        for (let i = acts.length - 1; i >= 0; i -= 1) {
            acts[i](...data);
        }
    }
}
exports.default = Emitter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CanvasRenderer {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    getContext() {
        if (!this.context) {
            this.create();
        }
        return this.context;
    }
    getCanvas() {
        if (!this.canvas) {
            this.create();
        }
        return this.canvas;
    }
    free() {
        if (this.canvas) {
            // Remove the element from the DOM in case it was appended.
            const canvas = this.canvas;
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            this.context = null;
            this.canvas = null;
        }
    }
    create() {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('height', `${this.height}px`);
        canvas.setAttribute('width', `${this.width}px`);
        document.body.appendChild(canvas);
        const context = canvas.getContext('2d');
        this.canvas = canvas;
        this.context = context;
    }
}
exports.default = CanvasRenderer;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Emitter_1 = __webpack_require__(12);
const coord_utils_1 = __webpack_require__(15);
class Rect {
    constructor(xPoint, yPoint, width, height) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.width = width;
        this.height = height;
        this.yMin = yPoint;
        this.xMin = xPoint;
        this.xMax = xPoint + width;
        this.yMax = yPoint + height;
        // const width = this.xMax - this.xMin;
        // const height = this.yMax - this.yMin;
        // console.log('new rect', width, height, '-', this.xMin, this.xMax, this.yMin, this.yMax);
    }
    getCenter() {
        return [this.xMin + (this.width / 2), this.yPoint + (this.height / 2)];
    }
    contains(point) {
        const x = point[0];
        const y = point[1];
        return (x >= this.xMin && x <= this.xMax && y >= this.yPoint && y <= this.yMax);
    }
}
exports.Rect = Rect;
function debounce(func, wait, immediate = true) {
    var timeout;
    return function () {
        const later = function () {
            timeout = null;
            if (!immediate)
                func();
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func();
    };
}
class QuadTree extends Emitter_1.default {
    constructor(region, parent) {
        super();
        this.region = region;
        this.parent = parent;
        this.isDivided = false;
        this.data = {};
        this.dirty = {};
        this.unsplit = debounce(this.unsplit.bind(this), 25);
    }
    getRegion(x, y) {
        const northSouth = y < this.region.yMin + (this.region.height / 2) ? 'north' : 'south';
        const eastWest = x < this.region.xMin + (this.region.width / 2) ? 'West' : 'East';
        const dir = `${northSouth}${eastWest}`;
        // have to do this weird thing cause typescript index signature
        switch (dir) {
            case 'northWest':
                return this.northWest;
            case 'northEast':
                return this.northEast;
            case 'southEast':
                return this.southEast;
            case 'southWest':
                return this.southWest;
            default:
                return null;
        }
    }
    getNeighboringPoints(x, y) {
        if (x < this.region.xMin || x > this.region.xMax || y < this.region.yMin || y > this.region.yMax) {
            return [];
        }
        return coord_utils_1.getRadiusCoords(x, y, 3);
        // if (this.isDivided) {
        //     const dir = this.getRegion(x, y);
        //     return this[dir].getNeighboringPoints(x, y);
        // }
        // return Object.keys(this.data).map(x => x.split(',').map(parseFloat));
    }
    get(x, y) {
        if (x < this.region.xMin || x > this.region.xMax || y < this.region.yMin || y > this.region.yMax) {
            return 1;
        }
        if (this.isDivided) {
            return this.getRegion(x, y).get(x, y);
        }
        return this.data[`${x},${y}`] || 0;
    }
    getBinary(x, y) {
        return this.get(x, y) >= 1 ? 1 : 0;
    }
    set(x, y, data, sendUpdate = true) {
        if (this.isDivided) {
            return this.getRegion(x, y).set(x, y, data, sendUpdate);
        }
        const numPoints = Object.keys(this.data).length - 1;
        const nextWidth = this.region.width / 2;
        const nextHeight = this.region.height / 2;
        if (numPoints + 1 > 4 && (nextWidth >= 1 && nextHeight >= 1)) {
            this.split();
            // at this point we should now be 'divided' so calling 'set'
            // will simply pass it through to the proper region
            return this.set(x, y, data, sendUpdate);
        }
        else {
            this.dirty[`${x},${y}`] = data;
            if (data === 0) {
                delete this.data[`${x},${y}`];
                if (this.parent) {
                    this.parent.unsplit();
                }
            }
            else {
                this.data[`${x},${y}`] = data;
            }
            if (sendUpdate) {
                this.emit('update', [x, y]);
            }
        }
    }
    unsplit() {
        console.log('unsplit');
        if (this.isDivided) {
            const count = this.getCount();
            if (count <= 4) {
                const data = this.flush(true);
                this.isDivided = false;
                this.northEast = null;
                this.northWest = null;
                this.southEast = null;
                this.southWest = null;
                data.forEach(pt => {
                    this.set(pt[0], pt[1], 1, false);
                });
            }
        }
    }
    getCount() {
        let num = Object.keys(this.data).length;
        if (this.isDivided) {
            num += this.northEast.getCount();
            num += this.northWest.getCount();
            num += this.southEast.getCount();
            num += this.southWest.getCount();
        }
        return num;
    }
    split() {
        const halfWidth = this.region.width / 2;
        const halfHeight = this.region.height / 2;
        this.northWest = new QuadTree(new Rect(this.region.xPoint, this.region.yPoint, halfWidth, halfHeight), this);
        this.northEast = new QuadTree(new Rect(this.region.xPoint + halfWidth, this.region.yPoint, halfWidth, halfHeight), this);
        this.southEast = new QuadTree(new Rect(this.region.xPoint + halfWidth, this.region.yPoint + halfHeight, halfWidth, halfHeight), this);
        this.southWest = new QuadTree(new Rect(this.region.xPoint, this.region.yPoint + halfHeight, halfWidth, halfHeight), this);
        this.isDivided = true;
        for (const ptString in this.data) {
            const point = ptString.split(',').map(parseFloat);
            const x = point[0];
            const y = point[1];
            const dir = this.getRegion(x, y);
            // console.log('adsf', dir, this[dir]);
            dir.set(x, y, this.data[ptString], false);
        }
        this.data = {};
    }
    flush(getAll = false) {
        let flushed = [];
        if (this.isDivided) {
            flushed = flushed.concat(this.northWest.flush(), this.northEast.flush(), this.southEast.flush(), this.southWest.flush());
        }
        else {
            const data = getAll ? this.data : this.dirty;
            for (const ptString in data) {
                const point = ptString.split(',').map(parseFloat);
                flushed.push(point);
            }
            if (!getAll) {
                this.dirty = {};
            }
        }
        return flushed;
    }
    print(toContext) {
        // return;
        if (this.isDivided) {
            this.northWest.print(toContext);
            this.northEast.print(toContext);
            this.southEast.print(toContext);
            this.southWest.print(toContext);
        }
        else {
            toContext.beginPath();
            toContext.strokeStyle = 'purple';
            toContext.strokeRect(this.region.xMin * 15, this.region.yMin * 15, this.region.width * 15, this.region.height * 15);
            toContext.closePath();
        }
    }
}
exports.default = QuadTree;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const radiusCache = {};
function getRadiusCoords(xCenter, yCenter, radius) {
    const key = `${xCenter},${yCenter},${radius}`;
    const r2 = radius * radius;
    if (!radiusCache[key]) {
        let points = [];
        for (let x = xCenter - radius; x <= xCenter; x += 1) {
            for (let y = yCenter - radius; y <= yCenter; y += 1) {
                if ((x - xCenter) * (x - xCenter) + (y - yCenter) * (y - yCenter) <= r2) {
                    const xSym = xCenter - (x - xCenter);
                    const ySym = yCenter - (y - yCenter);
                    Array.prototype.push.apply(points, [
                        [x, y],
                        [x, ySym],
                        [xSym, y],
                        [xSym, ySym]
                    ]);
                }
            }
        }
        radiusCache[key] = points;
    }
    return radiusCache[key];
}
exports.getRadiusCoords = getRadiusCoords;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RenderingPipeline_1 = __webpack_require__(9);
const Player_1 = __webpack_require__(5);
const InputManager_1 = __webpack_require__(8);
const LevelManager_1 = __webpack_require__(4);
const data_1 = __webpack_require__(7);
const SoundWave_1 = __webpack_require__(6);
const Agent_1 = __webpack_require__(2);
const EntityManager_1 = __webpack_require__(3);
class App {
    constructor() {
        this.inMan = new InputManager_1.default();
        this.pipeline = new RenderingPipeline_1.default(800, 600);
        document.body.innerHTML = '';
        document.body.appendChild(this.pipeline.getCanvas());
        this.cellSize = 48;
        this.entityMan = new EntityManager_1.default();
        this.levelMan = new LevelManager_1.default({
            cellSize: this.cellSize,
        });
        this.levelMan.addLevel(data_1.testMap);
        this.pipeline.addRenderer(this.levelMan);
        this.player = new Player_1.default(this.cellSize);
        this.player.position = [1, 1];
        this.pipeline.addRenderer(this.player);
        [
            new Agent_1.default(this.cellSize, [9, 16], this.levelMan, this.entityMan),
            new Agent_1.default(this.cellSize, [12, 8], this.levelMan, this.entityMan)
        ].map(agent => {
            this.entityMan.add(agent);
            this.pipeline.addRenderer(agent);
        });
        this.inMan.on(InputManager_1.KEY_EVENT.DOWN, this.handleKeyDown.bind(this));
    }
    handleKeyDown(evt) {
        const xMidPoint = Math.ceil(800 / this.cellSize) / 2;
        const yMidPoint = Math.ceil(600 / this.cellSize) / 2;
        const camera = this.pipeline.getCamera();
        let nextX = this.player.position[0];
        let nextY = this.player.position[1];
        let nextCell = this.levelMan.getLevelCoords(nextX, nextY);
        switch (evt.which) {
            case 32: {
                const wave = new SoundWave_1.default(this.levelMan, this.entityMan, {
                    origin: [].concat(this.player.position),
                    source: [].concat(this.player.position),
                    cellSize: this.cellSize,
                    distance: 14,
                });
                this.pipeline.addRenderer(wave);
                return;
            }
            case 68: {
                nextX += 1;
                nextCell = this.levelMan.getLevelCoords(nextX, nextY);
                if (nextCell.impassible) {
                    return;
                }
                this.player.move(1, 0);
                if (this.player.getX() > xMidPoint) {
                    camera.getViewport().xMin += 1 * this.cellSize;
                }
                break;
            }
            case 65: {
                nextX -= 1;
                nextCell = this.levelMan.getLevelCoords(nextX, nextY);
                if (nextCell.impassible) {
                    return;
                }
                this.player.move(-1, 0);
                if (this.player.getX() > xMidPoint) {
                    camera.getViewport().xMin -= 1 * this.cellSize;
                }
                break;
            }
            case 83: {
                nextY += 1;
                nextCell = this.levelMan.getLevelCoords(nextX, nextY);
                if (nextCell.impassible) {
                    return;
                }
                this.player.move(0, 1);
                if (this.player.getY() > yMidPoint) {
                    camera.getViewport().yMin += 1 * this.cellSize;
                }
                break;
            }
            case 87: {
                nextY -= 1;
                nextCell = this.levelMan.getLevelCoords(nextX, nextY);
                if (nextCell.impassible) {
                    return;
                }
                this.player.move(0, -1);
                if (this.player.getY() > yMidPoint) {
                    camera.getViewport().yMin -= 1 * this.cellSize;
                }
                break;
            }
            default:
                return;
        }
        const tile = this.levelMan.getLevelCoords(this.player.position[0], this.player.position[1]);
        if (tile.hardness && tile.hardness > 0) {
            const wave = new SoundWave_1.default(this.levelMan, this.entityMan, {
                origin: [].concat(this.player.position),
                source: [].concat(this.player.position),
                cellSize: this.cellSize,
                distance: tile.hardness,
            });
            if (tile.hardness + 1 >= 3) {
                this.pipeline.addRenderer(wave);
            }
        }
    }
}
new App();


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map