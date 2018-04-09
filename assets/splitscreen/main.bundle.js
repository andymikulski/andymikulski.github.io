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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = __webpack_require__(1);
class GameObject {
    constructor(aabb) {
        this.aabb = aabb;
        this.velX = 0;
        this.velY = 0;
        this.enabled = true;
        this.id = Math.random().toString(36).slice(2);
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
    }
    destroy() {
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).removeBinding(this);
    }
}
exports.default = GameObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ServiceProvider {
    static register(service, instance) {
        if (ServiceProvider.directory.hasOwnProperty(service)) {
            throw new Error(`Provider already has a service '${service}' registered.`);
        }
        ServiceProvider.directory[service] = instance;
    }
    static unregister(service) {
        delete ServiceProvider.directory[service];
    }
    static lookup(service) {
        return ServiceProvider.directory[service];
    }
}
ServiceProvider.directory = {};
exports.ServiceProvider = ServiceProvider;
var Service;
(function (Service) {
    Service[Service["RNG"] = 0] = "RNG";
    Service[Service["SOUND"] = 1] = "SOUND";
    Service[Service["PIPELINE"] = 2] = "PIPELINE";
    Service[Service["UI"] = 3] = "UI";
    Service[Service["GAME"] = 4] = "GAME";
    Service[Service["CLOCK"] = 5] = "CLOCK";
})(Service = exports.Service || (exports.Service = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class VCR {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.instances = {};
        if (height <= 0 || width <= 0) {
            throw new Error('VCR: Height and width must be greater than zero!');
        }
    }
    getContext(name = VCR.DefaultName, options = { alpha: true }) {
        if (!this.instances.hasOwnProperty(name)) {
            this.init(name, options);
        }
        return this.instances[name].buffers[0].context;
    }
    getBufferedContext(name = VCR.DefaultName, options = { alpha: true }) {
        if (!this.instances.hasOwnProperty(name)) {
            this.init(name, options);
        }
        return this.instances[name].buffers[1].context;
    }
    getCanvas(name = VCR.DefaultName, options = { alpha: true }) {
        if (!this.instances.hasOwnProperty(name)) {
            this.init(name, options);
        }
        return this.instances[name].buffers[0].canvas;
    }
    clear(name = VCR.DefaultName) {
        const canvas = this.getCanvas(name);
        const ctx = this.getContext(name);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    free(name = VCR.DefaultName) {
        if (this.instances.hasOwnProperty(name)) {
            const canvas = this.instances[name].buffers[0].canvas;
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            this.instances[name].buffers[0].context = null;
            this.instances[name].buffers[0].canvas = null;
            delete this.instances[name];
        }
    }
    flipBuffers(name = VCR.DefaultName) {
        this.instances[name].buffers = [
            this.instances[name].buffers[1],
            this.instances[name].buffers[0],
        ];
    }
    init(name, options = { alpha: false }) {
        let buffers = [];
        for (let i = 0; i < 2; i += 1) {
            const canvas = document.createElement('canvas');
            canvas.setAttribute('height', `${this.height}px`);
            canvas.setAttribute('width', `${this.width}px`);
            const context = canvas.getContext('2d', options);
            buffers.push({
                canvas,
                context
            });
        }
        this.instances[name] = {
            name,
            buffers,
        };
    }
}
VCR.DefaultName = VCR.DefaultName;
exports.default = VCR;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Rect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    get xMax() {
        return this.x + this.width;
    }
    get yMax() {
        return this.y + this.height;
    }
    get center() {
        return [
            this.x + (this.width / 2),
            this.y + (this.height / 2),
        ];
    }
    containsPoint(point) {
        return (this.x <= point[0] && point[0] <= this.xMax) && (this.y <= point[1] && point[1] <= this.yMax);
    }
    intersects(other) {
        return (this.x < other.xMax && this.xMax > other.x && this.y < other.yMax && this.yMax > other.y);
    }
}
exports.default = Rect;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SoundManager_1 = __webpack_require__(9);
const Provider_1 = __webpack_require__(1);
var GameSounds;
(function (GameSounds) {
})(GameSounds = exports.GameSounds || (exports.GameSounds = {}));
exports.SoundInfo = {};
class AssetManager {
    constructor() {
        this.soundMan = new SoundManager_1.default();
        Provider_1.ServiceProvider.register(Provider_1.Service.SOUND, this.soundMan);
    }
    loadSounds() {
        this.soundMan.load(exports.SoundInfo);
    }
    loadAssets() {
        this.loadSounds();
    }
}
exports.default = AssetManager;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameObject_1 = __webpack_require__(0);
const VCR_1 = __webpack_require__(2);
const main_1 = __webpack_require__(7);
class Camera extends GameObject_1.default {
    constructor(aabb, displayAABB, game) {
        super(aabb);
        this.aabb = aabb;
        this.displayAABB = displayAABB;
        this.game = game;
        this.dir = 200;
        this.background = "#ececec";
        this.offset = [0, 0];
        this.clipPath = [];
        this.centroidPlacement = [0, 0];
        this.centroidOffset = [0, 0];
        this.velX = 0;
        this.velY = 0;
        this.canSeeCameras = false;
        this.enabled = true;
        this.vcr = new VCR_1.default(aabb.width, aabb.height);
        this.stencilVCR = new VCR_1.default(displayAABB.width, displayAABB.height);
        this.canvas = this.vcr.getCanvas();
        this.target = aabb.center;
        this.targetSize = [aabb.width, aabb.height];
    }
    setClipping(points) {
        this.clipPath = [].concat(points);
        const centroid = this.centroid(points);
        this.centroidPlacement = [centroid[0], centroid[1]];
        this.centroidOffset = [
            main_1.DISPLAY_WIDTH / 2 - centroid[0],
            main_1.DISPLAY_HEIGHT / 2 - centroid[1]
        ];
    }
    setOffset(offset) {
        this.offset = [].concat(offset);
    }
    update(delta, elapsed) {
        const center = this.aabb.center;
        this.aabb.x += this.target[0] - center[0];
        this.aabb.y += this.target[1] - center[1];
    }
    centroid(points) {
        const vertexCount = points.length;
        let centroid;
        let signedArea = 0.0;
        let x0 = 0.0;
        let y0 = 0.0;
        let x1 = 0.0;
        let y1 = 0.0;
        let a = 0.0;
        let i = 0;
        while (i < vertexCount) {
            x0 = points[i][0];
            y0 = points[i][1];
            x1 = points[(i + 1) % vertexCount][0];
            y1 = points[(i + 1) % vertexCount][1];
            a = x0 * y1 - x1 * y0;
            signedArea += a;
            if (centroid) {
                centroid[0] += (x0 + x1) * a;
                centroid[1] += (y0 + y1) * a;
            }
            else {
                centroid = [(x0 + x1) * a, (y0 + y1) * a];
            }
            i += 1;
        }
        signedArea *= 0.5;
        centroid[0] /= 6 * signedArea;
        centroid[1] /= 6 * signedArea;
        return centroid;
    }
    getScreenPosition(obj) {
        return [
            obj.aabb.x - this.aabb.x - this.centroidOffset[0],
            obj.aabb.y - this.aabb.y - this.centroidOffset[1]
        ];
    }
    print(toContext) {
        let objs = this.game.getGameObjects();
        let j = 0;
        let visible = [];
        while (j < objs.length) {
            if (objs[j].enabled && this.aabb.intersects(objs[j].aabb)) {
                visible.push(objs[j]);
            }
            j += 1;
        }
        const ctx = this.vcr.getContext();
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, this.aabb.width, this.aabb.height);
        const offset = [
            -this.aabb.x - this.centroidOffset[0] + this.offset[0],
            -this.aabb.y - this.centroidOffset[1] + this.offset[1]
        ];
        let i = visible.length - 1;
        while (i >= 0) {
            visible[i].print(ctx, offset);
            i -= 1;
        }
        if (this.clipPath.length) {
            const stencilContext = this.stencilVCR.getContext();
            stencilContext.drawImage(ctx.canvas, 0, 0, this.aabb.width, this.aabb.height, 0, 0, this.displayAABB.width, this.displayAABB.height);
            stencilContext.globalCompositeOperation = "destination-in";
            stencilContext.beginPath();
            stencilContext.strokeStyle = "rgba(0,0,0,0.5)";
            stencilContext.lineWidth = 8;
            stencilContext.fillStyle = "green";
            stencilContext.moveTo(this.clipPath[0][0], this.clipPath[0][1]);
            for (let i = 1; i < this.clipPath.length; i += 1) {
                stencilContext.lineTo(this.clipPath[i][0], this.clipPath[i][1]);
            }
            stencilContext.fill();
            stencilContext.closePath();
            stencilContext.globalCompositeOperation = "source-over";
            toContext.drawImage(stencilContext.canvas, 0, 0, this.displayAABB.width, this.displayAABB.height, this.displayAABB.x, this.displayAABB.y, this.displayAABB.width, this.displayAABB.height);
        }
        else {
            toContext.drawImage(ctx.canvas, 0, 0, this.aabb.width, this.aabb.height, this.displayAABB.x, this.displayAABB.y, this.displayAABB.width, this.displayAABB.height);
        }
    }
}
exports.default = Camera;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class GameClock {
    constructor() {
        this.bindings = {};
        this.callbacks = [];
        this.isRunning = false;
        this.frameRate = 144;
        document.addEventListener("visibilitychange", this.toggleRunState.bind(this), false);
    }
    toggleRunState() {
        if (document.hidden) {
            this.isRunning = false;
        }
        else {
            this.isRunning = true;
        }
    }
    start() {
        this.startTime = Date.now();
        this.lastTime = Date.now();
        this.isRunning = true;
        this.tick();
    }
    addCallback(cb) {
        this.callbacks.push(cb);
    }
    addBinding(entity) {
        this.bindings[entity.id] = entity;
    }
    removeBinding(entity) {
        delete this.bindings[entity.id];
    }
    tick() {
        const now = Date.now();
        const delta = (now - this.lastTime) / 100;
        const elapsed = (now - this.startTime) / 100;
        if (!this.isRunning || (now - this.lastTime) < 1000 / this.frameRate) {
            if (!this.isRunning) {
                this.lastTime = now;
            }
            requestAnimationFrame(this.tick.bind(this));
            return;
        }
        let toRun = Object.values(this.bindings);
        let i = 0;
        while (i < toRun.length) {
            if (toRun[i].enabled) {
                toRun[i].update.call(toRun[i], delta, elapsed);
            }
            i += 1;
        }
        i = 0;
        while (i < this.callbacks.length) {
            this.callbacks[i](delta, elapsed);
            i += 1;
        }
        this.lastTime = now;
        requestAnimationFrame(this.tick.bind(this));
    }
}
exports.GameClock = GameClock;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AssetManager_1 = __webpack_require__(4);
const Provider_1 = __webpack_require__(1);
const RenderingPipeline_1 = __webpack_require__(8);
const GameClock_1 = __webpack_require__(6);
const GameObject_1 = __webpack_require__(0);
const Camera_1 = __webpack_require__(5);
const Rect_1 = __webpack_require__(3);
const VCR_1 = __webpack_require__(2);
exports.DISPLAY_WIDTH = Math.min(800, window.innerWidth);
exports.DISPLAY_HEIGHT = Math.min(600, window.innerHeight);
exports.WORLD_WIDTH = 1500;
exports.WORLD_HEIGHT = 1500;
class Game {
    constructor() {
        this.objects = {};
        this.cameras = {};
        this.hasDirtyObjects = false;
        this.objectList = [];
        this.perpCache = {};
        document.body.innerHTML = "";
        Provider_1.ServiceProvider.register(Provider_1.Service.GAME, this);
        const assetMan = new AssetManager_1.default();
        assetMan.loadAssets();
        this.clock = new GameClock_1.GameClock();
        Provider_1.ServiceProvider.register(Provider_1.Service.CLOCK, this.clock);
        this.pipeline = new RenderingPipeline_1.default(exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT);
        this.pipeline.setBackground("#333");
        Provider_1.ServiceProvider.register(Provider_1.Service.PIPELINE, this.pipeline);
        document.body.appendChild(this.pipeline.getCanvas());
        const ratio = exports.DISPLAY_HEIGHT / exports.DISPLAY_WIDTH;
        const camSize = exports.DISPLAY_WIDTH < exports.DISPLAY_HEIGHT ? Math.min(exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT) : Math.max(exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT);
        const midCam = new Camera_1.default(new Rect_1.default(0, 0, camSize, ratio * camSize), new Rect_1.default(0, 0, exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT), this);
        midCam.setClipping([
            [0, 0],
            [0, exports.DISPLAY_HEIGHT],
            [exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT],
            [exports.DISPLAY_WIDTH, 0],
            [0, 0]
        ]);
        const firstCam = new Camera_1.default(new Rect_1.default(0, 0, camSize, ratio * camSize), new Rect_1.default(0, 0, exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT), this);
        const secondCam = new Camera_1.default(new Rect_1.default(0, 0, camSize, ratio * camSize), new Rect_1.default(0, 0, exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT), this);
        const PALETTE_GAMEBOY = [
            [155, 188, 15],
            [139, 172, 15],
            [48, 98, 48],
            [15, 56, 15],
        ];
        const eightByEightMatrix = [
            [0, 48, 12, 60, 3, 51, 15, 63],
            [32, 16, 44, 28, 35, 19, 47, 31],
            [8, 56, 4, 52, 11, 59, 7, 55],
            [40, 24, 36, 20, 43, 27, 39, 23],
            [2, 50, 14, 62, 1, 49, 13, 61],
            [34, 18, 46, 30, 33, 17, 45, 29],
            [10, 58, 6, 54, 9, 57, 5, 53],
            [42, 26, 38, 22, 41, 25, 37, 21],
        ].map(x => x.map(y => (y / 64) - 0.5));
        function idxToCoords(idx, width) {
            return [
                (idx / 4) % width,
                Math.floor((idx / 4) / width),
            ];
        }
        let index = 0;
        const moveSpeed = 10;
        let absolute;
        let alpha;
        let beta;
        let gamma;
        let offsets = [0, 0, 0];
        let hasTapped = false;
        let offsetNext = false;
        window.addEventListener("touchend", (evt) => {
            offsetNext = true;
            hasTapped = true;
        });
        window.addEventListener("deviceorientation", (evt) => {
            if (!hasTapped) {
                return;
            }
            if (offsetNext) {
                offsets = [0, 0, 0];
            }
            absolute = evt.absolute;
            alpha = -offsets[0] + evt.alpha;
            beta = -offsets[1] + evt.beta;
            gamma = -offsets[2] + evt.gamma;
            if (offsetNext) {
                offsetNext = false;
                offsets = [alpha, beta, gamma];
            }
            p1.velX += Math.round((gamma) / 30);
            p1.velY += Math.round((beta) / 30);
        });
        let transform = [0, 0];
        window.addEventListener("keydown", (evt) => {
            switch (evt.which) {
                case 68:
                    transform[0] = moveSpeed;
                    break;
                case 65:
                    transform[0] = -moveSpeed;
                    break;
                case 83:
                    transform[1] = moveSpeed;
                    break;
                case 87:
                    transform[1] = -moveSpeed;
                    break;
                default:
                    break;
            }
        }, false);
        window.addEventListener("keyup", (evt) => {
            switch (evt.which) {
                case 68:
                    transform[0] = 0;
                    break;
                case 65:
                    transform[0] = -0;
                    break;
                case 83:
                    transform[1] = 0;
                    break;
                case 87:
                    transform[1] = -0;
                    break;
                default:
                    break;
            }
        }, false);
        const p1 = new Player(new Rect_1.default(exports.WORLD_WIDTH / 2, exports.WORLD_HEIGHT / 2, 10, 10));
        this.addGameObject(p1);
        p1.color = "white";
        p1.enabled = false;
        p1.velX = 0;
        p1.velY = 0;
        const p2 = new Player(new Rect_1.default(exports.WORLD_WIDTH / 2 + 100, exports.WORLD_HEIGHT / 2, 10, 10));
        p2.color = "#222";
        this.addGameObject(p2);
        p2.enabled = false;
        p2.decay = 0;
        p2.velX = Math.random() * 25 * (Math.random() > 0.5 ? 1 : -1);
        p2.velY = Math.random() * 25 * (Math.random() > 0.5 ? 1 : -1);
        p1.enabled = true;
        p2.enabled = true;
        const connector = new ConnectingLine(p1, p2);
        this.addGameObject(new Background(new Rect_1.default(0, 0, exports.WORLD_WIDTH, exports.WORLD_HEIGHT)));
        let isSplit = false;
        this.addCamera(midCam);
        midCam.target = [p1.aabb.x, p1.aabb.y];
        firstCam.target = [p1.aabb.x, p1.aabb.y];
        secondCam.target = [p2.aabb.x, p2.aabb.y];
        const arbitraryDistanceThresh = Math.min(exports.DISPLAY_HEIGHT, exports.DISPLAY_WIDTH) * 0.7;
        let closenessOffset;
        let dist;
        this.clock.addCallback((delta) => {
            p1.velX += transform[0];
            p1.velY += transform[1];
            let objs = this.getGameObjects();
            let i = 0;
            let go;
            while (i < objs.length) {
                go = objs[i];
                go.velX = Math.max(-20, Math.min(20, go.velX));
                go.velY = Math.max(-20, Math.min(20, go.velY));
                if (go.aabb.x >= exports.WORLD_WIDTH - go.aabb.width || go.aabb.x <= 0) {
                    go.velX *= -1;
                    go.aabb.x = Math.max(0, Math.min(go.aabb.x, exports.WORLD_WIDTH - go.aabb.width));
                }
                if (go.aabb.y >= exports.WORLD_HEIGHT - go.aabb.height || go.aabb.y <= 0) {
                    go.velY *= -1;
                    go.aabb.y = Math.max(0, Math.min(go.aabb.y, exports.WORLD_HEIGHT - go.aabb.height));
                }
                i += 1;
            }
            if (isSplit) {
                return;
            }
            const futureP1Aabb = new Rect_1.default(p1.aabb.x + (p1.velX * delta), p1.aabb.y + (p1.velY * delta), p1.aabb.width, p1.aabb.height);
            const futureP2Aabb = new Rect_1.default(p2.aabb.x + (p2.velX * delta), p2.aabb.y + (p2.velY * delta), p2.aabb.width, p2.aabb.height);
            if (futureP1Aabb.intersects(futureP2Aabb)) {
                const temp = [p1.velX, p1.velY];
                p1.velX += (p2.velX - p1.velX);
                p1.velY += (p2.velY - p1.velY);
                p2.velX += temp[0];
                p2.velY += temp[1];
            }
        });
        this.clock.addCallback(() => {
            const deltaX = p2.aabb.x - p1.aabb.x || 0.0001;
            const deltaY = p2.aabb.y - p1.aabb.y || 0.0001;
            dist = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
            if (dist >= arbitraryDistanceThresh) {
                if (!isSplit) {
                    this.removeCamera(midCam);
                    this.addCamera(firstCam);
                    this.addCamera(secondCam);
                }
                isSplit = true;
            }
            else {
                if (isSplit) {
                    this.addCamera(midCam);
                    this.removeCamera(firstCam);
                    this.removeCamera(secondCam);
                }
                isSplit = false;
            }
            const midPoint = [p1.aabb.x + deltaX / 2, p1.aabb.y + deltaY / 2];
            midCam.target = midPoint;
            firstCam.target = [p1.aabb.x, p1.aabb.y];
            secondCam.target = [p2.aabb.x, p2.aabb.y];
            const perpPoints = this.getPerpendicularScreenSplit(p1, p2);
            const splits = this.getSplitPolygons(perpPoints, -deltaX / deltaY);
            if (p1.aabb.x < p2.aabb.x) {
                firstCam.setClipping(splits[0]);
                secondCam.setClipping(splits[1]);
            }
            else {
                firstCam.setClipping(splits[1]);
                secondCam.setClipping(splits[0]);
            }
            closenessOffset = 1 - Math.max(0, Math.min(1, ((dist - (arbitraryDistanceThresh)) / (arbitraryDistanceThresh))));
            connector.opacity = 1 - closenessOffset;
            const p1offset = midCam.getScreenPosition(p1);
            const p2offset = midCam.getScreenPosition(p2);
            firstCam.setOffset([
                (p1offset[0] - firstCam.centroidPlacement[0]) * closenessOffset,
                (p1offset[1] - firstCam.centroidPlacement[1]) * closenessOffset
            ]);
            secondCam.setOffset([
                (p2offset[0] - secondCam.centroidPlacement[0]) * closenessOffset,
                (p2offset[1] - secondCam.centroidPlacement[1]) * closenessOffset
            ]);
        });
        this.pipeline.addCallback((ctx) => {
            if (!isSplit) {
                return;
            }
            const perpPoints = this.getPerpendicularScreenSplit(p1, p2);
            ctx.beginPath();
            ctx.moveTo(perpPoints[0][0], perpPoints[0][1]);
            ctx.lineTo(perpPoints[1][0], perpPoints[1][1]);
            ctx.lineWidth = Math.min(10, 10 * (1 - closenessOffset));
            ctx.lineCap = "round";
            ctx.strokeStyle = `rgba(0,0,0,${(1 - closenessOffset) + 0.05})`;
            ctx.stroke();
            ctx.closePath();
        });
        this.clock.addBinding(this.pipeline);
        this.clock.start();
    }
    orient2d(linePt1, linePt2, testPoint) {
        return ((linePt1[0] - testPoint[0]) * (linePt1[1] - testPoint[1]) -
            (linePt2[0] - testPoint[0]) * (linePt2[1] - testPoint[1]));
    }
    inLine(linePt1, linePt2, testPoint) {
        if (linePt1[0] === testPoint[0])
            return linePt2[0] === testPoint[0];
        if (linePt1[1] === testPoint[1])
            return linePt2[1] === testPoint[1];
        return ((linePt1[0] - testPoint[0]) * (linePt1[1] - testPoint[1]) ===
            (testPoint[0] - linePt2[0]) * (testPoint[1] - linePt2[1]));
    }
    getSplitPolygons(perpPoints, slope) {
        let leftSplit = [];
        let rightSplit = [];
        let screenCords = [
            [0, 0],
            [0, exports.DISPLAY_HEIGHT],
            [exports.DISPLAY_WIDTH, exports.DISPLAY_HEIGHT],
            [exports.DISPLAY_WIDTH, 0],
            [0, 0]
        ];
        let i = 0;
        let current;
        let next;
        while (i <= screenCords.length - 1) {
            current = screenCords[i];
            next = screenCords[(i + 1) % screenCords.length];
            const orientation = this.orient2d(perpPoints[0], perpPoints[1], current);
            if (orientation < 0) {
                leftSplit.push(current);
            }
            else if (orientation > 0) {
                rightSplit.push(current);
            }
            else {
                leftSplit.push(current);
                rightSplit.push(current);
            }
            let foundPoint;
            let j = 0;
            while (!foundPoint && j < perpPoints.length) {
                foundPoint = this.inLine(current, next, perpPoints[j]) ? perpPoints[j] : null;
                j += 1;
            }
            if (foundPoint) {
                leftSplit.push(foundPoint);
                rightSplit.push(foundPoint);
            }
            i += 1;
        }
        if (leftSplit[1][1] <= exports.DISPLAY_HEIGHT / 2) {
            return [rightSplit, leftSplit];
        }
        else {
            return [leftSplit, rightSplit];
        }
    }
    getPerpendicularScreenSplit(from, to, useWorld = false) {
        const dX = Math.round(from.aabb.x - to.aabb.x) || 0.0001;
        const dY = Math.round(from.aabb.y - to.aabb.y) || 0.0001;
        const slope = -dX / dY;
        const key = `${dX},${dY}`;
        if (this.perpCache[key]) {
            return this.perpCache[key];
        }
        const midPoint = [exports.DISPLAY_WIDTH / 2, exports.DISPLAY_HEIGHT / 2];
        const b = midPoint[1] - slope * midPoint[0];
        const findX = (y) => (y - b) / slope;
        const findY = (x) => slope * x + b;
        let found = [];
        const points = [
            [findX(0), 0],
            [findX(exports.DISPLAY_HEIGHT), exports.DISPLAY_HEIGHT],
            [0, findY(0)],
            [exports.DISPLAY_WIDTH, findY(exports.DISPLAY_WIDTH)]
        ];
        let i = 0;
        while (i < points.length) {
            if (points[i][0] >= 0 &&
                points[i][0] <= exports.DISPLAY_WIDTH &&
                (points[i][1] >= 0 && points[i][1] <= exports.DISPLAY_HEIGHT)) {
                found.push(points[i]);
            }
            i += 1;
        }
        this.perpCache[key] = found;
        return this.perpCache[key];
    }
    getPerpendicularLine(from, to) {
        const dX = from.aabb.x - to.aabb.x || 0.0001;
        const dY = from.aabb.y - to.aabb.y || 0.0001;
        let slope = -dX / dY;
        const midPoint = [from.aabb.x + dX / 2, from.aabb.y + dY / 2];
        const b = midPoint[1] - slope * midPoint[0];
        const findY = (x) => slope * x + b;
        return [[from.aabb.x, findY(from.aabb.x)], [to.aabb.x, findY(to.aabb.x)]];
    }
    removeCamera(cam) {
        this.pipeline.removeRenderer(cam);
        delete this.cameras[cam.id];
    }
    addCamera(cam) {
        this.pipeline.addRenderer(cam);
        this.cameras[cam.id] = cam;
    }
    addGameObject(go) {
        this.objects[go.id] = go;
        this.hasDirtyObjects = true;
    }
    getGameCameras() {
        return Object.values(this.cameras);
    }
    getGameObjects() {
        if (this.hasDirtyObjects) {
            this.hasDirtyObjects = false;
            this.objectList = Object.values(this.objects);
        }
        return this.objectList;
    }
    removeGameObject(go) {
        this.pipeline.removeRenderer(go);
        delete this.objects[go.id];
        go.destroy();
        this.hasDirtyObjects = true;
    }
}
exports.default = Game;
class ConnectingLine extends GameObject_1.default {
    constructor(from, to) {
        super(new Rect_1.default(0, 0, exports.WORLD_WIDTH, exports.WORLD_HEIGHT));
        this.from = from;
        this.to = to;
        this.opacity = 1;
        this.vcr = new VCR_1.default(exports.WORLD_WIDTH, exports.WORLD_HEIGHT);
        this.game = Provider_1.ServiceProvider.lookup(Provider_1.Service.GAME);
    }
    update(delta, elapsed) { }
    print(toContext, offset) {
        const ctx = this.vcr.getContext();
        const midPoint = [
            this.from.aabb.x + (this.to.aabb.x - this.from.aabb.x) / 2,
            this.from.aabb.y + (this.to.aabb.y - this.from.aabb.y) / 2
        ];
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 15]);
        ctx.strokeStyle = `rgba(255,0,0, ${this.opacity})`;
        ctx.moveTo(this.from.aabb.x, this.from.aabb.y);
        ctx.lineTo(midPoint[0], midPoint[1]);
        ctx.stroke();
        ctx.moveTo(this.to.aabb.x, this.to.aabb.y);
        ctx.lineTo(midPoint[0], midPoint[1]);
        ctx.stroke();
        ctx.closePath();
        toContext.drawImage(ctx.canvas, 0, 0, this.aabb.width, this.aabb.height, offset[0], offset[1], this.aabb.width, this.aabb.height);
    }
}
class Ball extends GameObject_1.default {
    constructor() {
        super(...arguments);
        this.velX = 0;
        this.velY = 0;
    }
    update(delta) {
        this.velX *= 1 - 0.1 * delta;
        this.velY *= 1 - 0.1 * delta;
        this.aabb.x += this.velX * delta;
        this.aabb.y += this.velY * delta;
    }
    print(toContext, offset) {
        toContext.fillStyle = 'blue';
        toContext.strokeStyle = "#fff";
        toContext.beginPath();
        toContext.rect(offset[0] + this.aabb.x, offset[1] + this.aabb.y, this.aabb.width, this.aabb.height);
        toContext.fill();
        toContext.stroke();
        toContext.closePath();
    }
}
class Player extends GameObject_1.default {
    constructor(aabb) {
        super(aabb);
        this.velX = 0;
        this.velY = 0;
        this.decay = 0.5;
        this.color = "blue";
        this.velX = Math.random() * 5;
        this.velY = Math.random() * 5;
    }
    update(delta, elapsed) {
        this.aabb.x += this.velX * delta;
        this.aabb.y += this.velY * delta;
        this.velX *= 1 - this.decay * delta;
        this.velY *= 1 - this.decay * delta;
    }
    print(toContext, offset) {
        toContext.fillStyle = this.color;
        toContext.strokeStyle = "#fff";
        toContext.beginPath();
        toContext.rect(offset[0] + this.aabb.x, offset[1] + this.aabb.y, this.aabb.width, this.aabb.height);
        toContext.fill();
        toContext.stroke();
        toContext.closePath();
    }
}
class Background extends GameObject_1.default {
    constructor(aabb) {
        super(aabb);
        this.vcr = new VCR_1.default(this.aabb.width, this.aabb.height);
        this.img = new Image();
        this.img.src = "img/tile.png";
    }
    update() { }
    print(toContext, offset) {
        if (!this.pattern && this.img.complete) {
            const ctx = this.vcr.getContext();
            this.pattern = ctx.createPattern(this.img, "repeat");
            ctx.save();
            ctx.fillStyle = this.pattern || "green";
            ctx.translate(offset[0] + this.aabb.x, offset[1] + this.aabb.y);
            ctx.fillRect(-offset[0] + this.aabb.x, -offset[1] + this.aabb.y, this.aabb.width, this.aabb.height);
            ctx.restore();
        }
        toContext.drawImage(this.vcr.getCanvas(), 0, 0, this.aabb.width, this.aabb.height, offset[0], offset[1], this.aabb.width, this.aabb.height);
    }
}
new Game();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VCR_1 = __webpack_require__(2);
const Rect_1 = __webpack_require__(3);
const GameObject_1 = __webpack_require__(0);
class RenderingPipeline extends GameObject_1.default {
    constructor(width, height) {
        super(new Rect_1.default(0, 0, 0, 0));
        this.renderers = [];
        this.callbacks = [];
        this.background = 'white';
        const output = new VCR_1.default(width, height);
        this.outputContext = output.getContext(VCR_1.default.DefaultName, { alpha: false });
        this.outputCanvas = output.getCanvas();
    }
    update(delta, elapsed) {
        this.renderAll();
    }
    renderAll() {
        const all = this.renderers;
        this.outputContext.fillStyle = this.background;
        this.outputContext.fillRect(0, 0, this.outputContext.canvas.width, this.outputContext.canvas.height);
        let i = all.length - 1;
        while (i >= 0) {
            if (!all[i].enabled) {
                i -= 1;
                continue;
            }
            this.outputContext.save();
            all[i].print(this.outputContext, [0, 0]);
            this.outputContext.restore();
            i -= 1;
        }
        let j = 0;
        while (j < this.callbacks.length) {
            this.callbacks[j](this.outputContext, [0, 0]);
            j += 1;
        }
    }
    setBackground(color) {
        this.background = color;
    }
    getCanvas() {
        return this.outputCanvas;
    }
    addRenderer(renderer, layer) {
        if (typeof layer === 'undefined') {
            this.renderers.push(renderer);
        }
        else {
            this.renderers.splice(layer, 0, renderer);
        }
    }
    addCallback(cb) {
        this.callbacks.push(cb);
    }
    removeRenderer(renderer) {
        this.renderers = this.renderers.filter(x => x !== renderer);
    }
    getLayerForRenderer(renderer) {
        let i = 0;
        while (i < this.renderers.length) {
            if (this.renderers[i] === renderer) {
                return i;
            }
            i += 1;
        }
        return -1;
    }
    clear() {
        this.renderers = [];
    }
    print() { }
}
exports.default = RenderingPipeline;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SoundManager {
    constructor() {
        this.loadedSounds = {};
    }
    load(files) {
        for (const soundName in files) {
            const path = files[soundName];
            const sound = document.createElement('audio');
            sound.setAttribute('preload', 'auto');
            sound.innerHTML = `<source src="${path}" type="audio/wav" />`;
            this.loadedSounds[soundName] = sound;
        }
    }
    setSoundVolume(soundName, volume) {
        if (this.loadedSounds[soundName]) {
            this.loadedSounds[soundName].volume = volume;
        }
    }
    play(soundName, loop = false) {
        const soundInfo = this.loadedSounds[soundName];
        if (soundInfo) {
            soundInfo.play();
            if (loop) {
                soundInfo.onended = soundInfo.play.bind(soundInfo);
            }
        }
    }
}
exports.default = SoundManager;


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map