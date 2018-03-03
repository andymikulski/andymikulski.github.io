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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Transform {
    constructor() {
        this.position = [0, 0];
        this.rotation = 0;
        this.scale = 1;
        this.width = 1;
        this.height = 1;
    }
}
exports.default = Transform;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VCR_1 = __webpack_require__(4);
const Transform_1 = __webpack_require__(1);
class Peg extends Transform_1.default {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.isEnabled = true;
        this.isSelected = false;
        this.isHovered = false;
        this.health = 1;
        if (!Peg.SelectPrerender) {
            const padding = this.width / 4;
            Peg.VCR = new VCR_1.default(this.width + (padding * 2), this.height + (padding * 2));
            this.prerenderSelected();
            this.prerenderInactive();
        }
    }
    static clearRenderCache() {
        Peg.VCR && Peg.VCR.clear();
        Peg.VCR && Peg.VCR.free();
        Peg.SelectPrerender = null;
        Peg.InactivePrerender = null;
    }
    prerenderSelected() {
        Peg.SelectPrerender = Peg.VCR.getContext('select');
        const ctx = Peg.SelectPrerender;
        ctx.shadowColor = 'hsla(75.9, 96.2%, 20.8%, 0.6)';
        ctx.shadowOffsetX = this.width / 20;
        ctx.shadowOffsetY = this.height / 20;
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#97cc04';
        ctx.arc(this.width / 2, this.width / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
    }
    prerenderInactive() {
        Peg.InactivePrerender = Peg.VCR.getContext('inactive');
        const ctx = Peg.InactivePrerender;
        ctx.shadowColor = 'rgba(0, 107, 166, 0.8)';
        ctx.shadowOffsetX = this.width / 10;
        ctx.shadowOffsetY = this.height / 10;
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#0496ff';
        ctx.arc(this.width / 2, this.width / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
    }
    update(delta, elapsed) { }
    print(toContext, offset) {
        const preRender = this.isSelected ? Peg.SelectPrerender : Peg.InactivePrerender;
        if (this.isHovered) {
            toContext.globalAlpha = 0;
        }
        const padding = this.width / 4;
        toContext.drawImage(preRender.canvas, 0, 0, this.width + padding, this.height + padding, offset.position[0] + this.position[0], offset.position[1] + this.position[1], this.width + padding, this.height + padding);
        if (this.health <= 1) {
            return;
        }
        toContext.font = `${this.width / 2}px Dimbo`;
        toContext.fillStyle = 'white';
        toContext.strokeStyle = 'rgba(100,100,100,0.5)';
        toContext.fillText(this.health.toString(), (this.width * -0.1) + (this.width / 2) + offset.position[0] + this.position[0], (this.height * 0.225) + (this.height / 2) + offset.position[1] + this.position[1]);
    }
    onClick() { }
    onMouseEnter() {
        this.isHovered = true;
    }
    onMouseLeave() {
        this.isHovered = false;
    }
}
Peg.renderPadding = 10;
exports.default = Peg;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Emitter {
    constructor() {
        this.bindings = {};
        this.onceBindings = {};
    }
    on(eventName, fn) {
        this.bindings[eventName] = [
            ...(this.bindings[eventName] || []),
            fn,
        ];
    }
    once(eventName, fn) {
        this.onceBindings[eventName] = [
            ...(this.onceBindings[eventName] || []),
            fn,
        ];
    }
    emit(eventName, ...data) {
        let acts = this.bindings[eventName] || [];
        for (let i = acts.length - 1; i >= 0; i -= 1) {
            acts[i](...data);
        }
        acts = this.onceBindings[eventName] || [];
        for (let i = acts.length - 1; i >= 0; i -= 1) {
            acts[i](...data);
        }
        delete this.onceBindings[eventName];
    }
}
exports.default = Emitter;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class VirtualCanvasRenderer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
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
            const canvas = this.instances[name].canvas;
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            this.instances[name].context = null;
            this.instances[name].canvas = null;
            delete this.instances[name];
        }
    }
    init(name) {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('height', `${this.height}px`);
        canvas.setAttribute('width', `${this.width}px`);
        const context = canvas.getContext('2d');
        this.instances[name] = {
            name,
            canvas,
            context,
        };
    }
}
exports.default = VirtualCanvasRenderer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Transform_1 = __webpack_require__(1);
const Provider_1 = __webpack_require__(0);
const AssetManager_1 = __webpack_require__(7);
class Button extends Transform_1.default {
    constructor(label, onClickHandler) {
        super();
        this.label = label;
        this.onClickHandler = onClickHandler;
        this.paddingFactor = 0.3;
        this.isLowProfile = false;
        this.uiLayer = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        this.soundMan = Provider_1.ServiceProvider.lookup(Provider_1.Service.SOUND);
    }
    enable() {
        this.uiLayer.register(this);
    }
    disable() {
        this.uiLayer.unregister(this);
    }
    onClick() {
        this.soundMan.play(AssetManager_1.GameSounds.CLICK);
        this.onClickHandler();
    }
    print(toContext) {
        toContext.strokeStyle = 'rgba(71, 70, 71, 0.1)';
        toContext.fillStyle = 'rgba(255, 206, 117, 0.2)';
        toContext.beginPath();
        toContext.rect(this.position[0], this.position[1], this.width, this.height);
        toContext.stroke();
        if (!this.isLowProfile) {
            toContext.fill();
        }
        toContext.closePath();
        const { paddingFactor } = this;
        toContext.font = `${this.height * (1 - paddingFactor)}px Dimbo`;
        toContext.lineWidth = 2;
        toContext.lineCap = 'round';
        toContext.textAlign = 'left';
        toContext.fillStyle = 'rgb(71, 70, 71)';
        toContext.fillText(this.label, this.position[0] + this.width - (this.width * (1 - (paddingFactor / 2))), this.position[1] + this.height - (this.height * (paddingFactor * 0.75)));
    }
}
exports.Button = Button;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Transform_1 = __webpack_require__(1);
const VCR_1 = __webpack_require__(4);
class Slot extends Transform_1.default {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.isFocused = false;
        if (!Slot.Prerender) {
            const vcr = new VCR_1.default(this.width + (this.width / 2), this.height + (this.height / 2));
            let ctx = vcr.getContext('prerender');
            ctx.beginPath();
            ctx.fillStyle = 'hsl(38.7, 0%, 80.9%)';
            ctx.arc(this.width / 2, (this.height / 2), this.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.width / 2, (this.height / 2), this.width * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fill();
            ctx.closePath();
            Slot.Prerender = ctx;
            ctx = vcr.getContext('focus');
            ctx.beginPath();
            ctx.fillStyle = 'hsl(38.7, 100%, 72.9%)';
            ctx.strokeStyle = 'hsla(38.7, 0%, 42.9%, 0.2)';
            ctx.arc(this.width / 2, (this.height / 2), this.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.width / 2, (this.height / 2), this.width * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,.75)';
            ctx.fill();
            ctx.closePath();
            Slot.FocusPrerender = ctx;
        }
    }
    static clearRenderCache() {
        Slot.Prerender = null;
        Slot.FocusPrerender = null;
    }
    update(delta, elapsed) { }
    print(toContext, offset) {
        toContext.drawImage(this.isFocused ? Slot.FocusPrerender.canvas : Slot.Prerender.canvas, 0, 0, this.width, this.height, offset.position[0] + this.position[0] + (this.width / 8), offset.position[1] + this.position[1] + (this.width / 8), this.width, this.height);
    }
    onClick() { }
}
exports.default = Slot;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SoundManager_1 = __webpack_require__(26);
const Provider_1 = __webpack_require__(0);
var GameSounds;
(function (GameSounds) {
    GameSounds[GameSounds["MUSIC"] = 0] = "MUSIC";
    GameSounds[GameSounds["HISS"] = 1] = "HISS";
    GameSounds[GameSounds["BOOM"] = 2] = "BOOM";
    GameSounds[GameSounds["DENY"] = 3] = "DENY";
    GameSounds[GameSounds["PEG_HIT"] = 4] = "PEG_HIT";
    GameSounds[GameSounds["PEG_REMOVE"] = 5] = "PEG_REMOVE";
    GameSounds[GameSounds["PEG_SELECT"] = 6] = "PEG_SELECT";
    GameSounds[GameSounds["ROUND_END"] = 7] = "ROUND_END";
    GameSounds[GameSounds["CLICK"] = 8] = "CLICK";
})(GameSounds = exports.GameSounds || (exports.GameSounds = {}));
const cachebust = 1;
exports.SoundInfo = {
    [GameSounds.MUSIC]: `sounds/xerxes.mp3?${cachebust}`,
    [GameSounds.HISS]: `sounds/sss2.wav?${cachebust}`,
    [GameSounds.BOOM]: `sounds/boom3.wav?${cachebust}`,
    [GameSounds.DENY]: `sounds/cant-move.wav?${cachebust}`,
    [GameSounds.PEG_HIT]: `sounds/peg-land-2.wav?${cachebust}`,
    [GameSounds.PEG_REMOVE]: `sounds/peg-removed.wav?${cachebust}`,
    [GameSounds.PEG_SELECT]: `sounds/peg-select.wav?${cachebust}`,
    [GameSounds.ROUND_END]: `sounds/round-end-2.wav?${cachebust}`,
    [GameSounds.CLICK]: `sounds/button-click.wav?${cachebust}`,
};
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AssetManager_1 = __webpack_require__(7);
const Emitter_1 = __webpack_require__(3);
const ExplodingPeg_1 = __webpack_require__(22);
const Peg_1 = __webpack_require__(2);
const Slot_1 = __webpack_require__(6);
const Provider_1 = __webpack_require__(0);
const Transform_1 = __webpack_require__(1);
const quake_1 = __webpack_require__(21);
const FloatingText_1 = __webpack_require__(20);
const ScoreManager_1 = __webpack_require__(10);
var GAME_EVENTS;
(function (GAME_EVENTS) {
    GAME_EVENTS["PEG_JUMPED"] = "peg-jumped";
    GAME_EVENTS["PEG_EXPLODED"] = "peg-exploded";
    GAME_EVENTS["GAME_OVER"] = "game-over";
})(GAME_EVENTS = exports.GAME_EVENTS || (exports.GAME_EVENTS = {}));
class GameBoard extends Emitter_1.default {
    constructor(settings) {
        super();
        this.settings = settings;
        this.slots = [];
        this.pegs = [];
        this.distance = 2;
        this.consecutiveJumps = -1;
        this.transform = new Transform_1.default();
        this.calculateBoardPosition(this.settings.count);
        this.size = this.calculatePegSize(this.settings.count);
        this.buildBoard();
    }
    createSlot(x, y) {
        const ui = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        const slot = new Slot_1.default(this.size, this.size);
        slot.position = this.calculatePegPlacement(x, y);
        slot.x = x;
        slot.y = y;
        slot.width = this.size;
        slot.height = this.size;
        slot.onClick = () => this.onSlotClick(x, y, slot);
        this.map[slot.y][slot.x] = slot;
        this.slots.push(slot);
        ui.register(slot, this.transform);
        return slot;
    }
    createPeg(x, y, isExplodingPeg = false) {
        const { settings } = this;
        const rng = Provider_1.ServiceProvider.lookup(Provider_1.Service.RNG);
        const ui = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        const peg = new (isExplodingPeg ? ExplodingPeg_1.default : Peg_1.default)(this.size, this.size);
        peg.position = this.calculatePegPlacement(x, y);
        if (isExplodingPeg) {
            peg.health = 0;
        }
        else {
            peg.health = rng.bool(settings.percentStrong) ? (rng.bool(settings.percentRealStrong) ? 3 : 2) : 1;
        }
        peg.x = x;
        peg.y = y;
        peg.width = this.size;
        peg.height = this.size;
        peg.onClick = () => this.onPegClick(x, y, peg);
        ui.register(peg, this.transform);
        this.map[peg.y][peg.x] = peg;
        this.pegs.push(peg);
        return peg;
    }
    createSlotFromPeg(peg) {
        const ui = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        const slot = this.createSlot(peg.x, peg.y);
        ui.unregister(peg);
        ui.register(slot, this.transform);
        return slot;
    }
    createPegFromSlot(slot) {
        const ui = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        const peg = this.createPeg(slot.x, slot.y);
        ui.unregister(slot);
        ui.register(peg, this.transform);
        return peg;
    }
    updateSelectedPeg(newPeg) {
        this.clearSelectedPeg();
        this.slots.forEach(x => x.isFocused = false);
        if (!newPeg) {
            this.consecutiveJumps = -1;
            return;
        }
        this.selectedPeg = [newPeg, newPeg.x, newPeg.y];
        newPeg.isSelected = true;
        const options = this.getPossibleMoves(newPeg);
        options.forEach((slot) => {
            slot.isFocused = true;
        });
    }
    removePeg(peg) {
        const ui = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        this.pegs = this.pegs.filter(x => x !== peg);
        ui.unregister(peg);
    }
    removeSlot(slot) {
        const ui = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        this.slots = this.slots.filter(x => x !== slot);
        ui.unregister(slot);
    }
    explodePeg(peg) {
        const sound = Provider_1.ServiceProvider.lookup(Provider_1.Service.SOUND);
        this.createSlotFromPeg(peg);
        sound.play(AssetManager_1.GameSounds.HISS);
        const pegQuake = new quake_1.default(peg, 5, 200, quake_1.QuakeOverTime.ASC);
        pegQuake.on(quake_1.QuakeEvents.DONE, () => {
            new quake_1.default(this.transform, 4, 300);
            this.removePeg(peg);
            const neighbors = this.getNeighboringPegs(peg);
            neighbors.forEach(neigh => {
                neigh.health -= 1;
                if (neigh.health <= 0) {
                    this.createSlotFromPeg(neigh);
                    this.removePeg(neigh);
                }
            });
            if (this.selectedPeg) {
                this.selectedPeg[0].health -= 1;
                if (this.selectedPeg[0].health <= 0) {
                    this.updateSelectedPeg();
                }
            }
            sound.play(AssetManager_1.GameSounds.BOOM);
            const coords = this.calculatePegPlacement(peg.x, peg.y);
            new FloatingText_1.default(`+${ScoreManager_1.default.EXPLODING_JUMP}`, 24, [
                coords[0] + this.transform.position[0] + (peg.width / 1.75),
                coords[1] + this.transform.position[1] + (peg.height / 4),
            ], 25, 1000);
            this.emit(GAME_EVENTS.PEG_EXPLODED, this.consecutiveJumps);
            this.checkWinLoseConditions();
        });
    }
    onSlotClick(x, y, slot) {
        const sound = Provider_1.ServiceProvider.lookup(Provider_1.Service.SOUND);
        if (this.selectedPeg) {
            const pegX = this.selectedPeg[1];
            const pegY = this.selectedPeg[2];
            const distX = pegX - x;
            const distY = pegY - y;
            if (!this.validateDistance(distX, distY)) {
                sound.play(AssetManager_1.GameSounds.DENY);
                return;
            }
            const delX = x + Math.round((pegX - x) / 2);
            const delY = y + Math.round((pegY - y) / 2);
            const delPeg = this.map[delY][delX];
            if (!delPeg || !(delPeg instanceof Peg_1.default)) {
                sound.play(AssetManager_1.GameSounds.DENY);
                return;
            }
            this.createSlotFromPeg(this.selectedPeg[0]);
            this.removePeg(this.selectedPeg[0]);
            this.consecutiveJumps += 1;
            const isJumpedPegExploding = delPeg instanceof ExplodingPeg_1.default;
            if (isJumpedPegExploding) {
                this.explodePeg(delPeg);
            }
            else {
                delPeg.health -= 1;
                this.emit(GAME_EVENTS.PEG_JUMPED, this.consecutiveJumps);
                if (this.consecutiveJumps > 0) {
                    const coords = this.calculatePegPlacement(delPeg.x, delPeg.y);
                    new FloatingText_1.default(`+${this.consecutiveJumps + 1}`, 24, [
                        coords[0] + this.transform.position[0] + (delPeg.width / 1.75),
                        coords[1] + this.transform.position[1] + (delPeg.height / 4),
                    ], 25, 1000);
                }
                if (delPeg.health <= 0) {
                    this.createSlotFromPeg(delPeg);
                    this.removePeg(delPeg);
                }
            }
            if (this.selectedPeg[0].health > 0) {
                const newPeg = this.createPegFromSlot(slot);
                newPeg.health = this.selectedPeg[0].health;
                this.removeSlot(slot);
                this.updateSelectedPeg(newPeg);
                if (!isJumpedPegExploding) {
                    sound.play(delPeg.health <= 0 ? AssetManager_1.GameSounds.PEG_REMOVE : AssetManager_1.GameSounds.PEG_HIT);
                }
            }
            else {
                this.updateSelectedPeg();
            }
            this.checkWinLoseConditions();
        }
    }
    onPegClick(x, y, peg) {
        const sound = Provider_1.ServiceProvider.lookup(Provider_1.Service.SOUND);
        if (!peg.isEnabled) {
            new quake_1.default(peg, 1, 300);
            sound.play(AssetManager_1.GameSounds.DENY);
            return;
        }
        sound.play(AssetManager_1.GameSounds.PEG_SELECT);
        if (this.selectedPeg) {
            this.selectedPeg[0].isSelected = false;
            if (this.selectedPeg[0] === peg) {
                this.selectedPeg = null;
                this.updateSelectedPeg();
                return;
            }
        }
        this.consecutiveJumps = -1;
        this.updateSelectedPeg(peg);
    }
    checkWinLoseConditions() {
        let isGameOver = this.pegs.length === 1;
        if (!isGameOver) {
            const playerHasMoves = !!this.pegs
                .filter((p) => p instanceof Peg_1.default)
                .find((p) => { return this.getPossibleMoves(p).length !== 0; });
            isGameOver = !playerHasMoves;
        }
        if (isGameOver) {
            this.handleGameOver({
                numPegsRemaining: this.getNumPegsRemaining(false),
                numSlots: this.slots.length,
            });
        }
    }
    getNumPegsRemaining(includingHealth = false) {
        if (!includingHealth) {
            return this.pegs.length;
        }
        return this.pegs.reduce((prev, next) => {
            return prev + next.health;
        }, 0);
    }
    clearSelectedPeg() {
        if (!this.selectedPeg) {
            return;
        }
        this.selectedPeg[0].isSelected = false;
        this.selectedPeg = null;
    }
    handleGameOver(info) {
        setTimeout(() => {
            const sound = Provider_1.ServiceProvider.lookup(Provider_1.Service.SOUND);
            sound.play(AssetManager_1.GameSounds.ROUND_END);
            this.pegs.forEach((peg, idx) => {
                new quake_1.default(peg, 1.5, 300);
            });
        }, 350);
        this.clearSelectedPeg();
        this.emit(GAME_EVENTS.GAME_OVER, info);
    }
    cleanupGame() {
        const ui = Provider_1.ServiceProvider.lookup(Provider_1.Service.UI);
        ui.unregisterAll();
        this.consecutiveJumps = -1;
        this.slots = [];
        this.pegs = [];
    }
    disableAllPegs() {
        this.pegs.forEach(x => x.isEnabled = false);
    }
    update(delta, elapsed) {
        this.slots.forEach(slot => {
            slot.update(delta, elapsed);
        });
        this.pegs.forEach(peg => {
            peg.update(delta, elapsed);
        });
    }
    print(toContext) {
        this.slots.forEach(slot => {
            slot.print(toContext, this.transform);
        });
        this.pegs.forEach(peg => {
            peg.print(toContext, this.transform);
        });
    }
}
exports.default = GameBoard;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Transform_1 = __webpack_require__(1);
const Provider_1 = __webpack_require__(0);
class GameTimer extends Transform_1.default {
    constructor() {
        super(...arguments);
        this.elapsed = 0;
        this.elapsedStart = null;
        this.isEnabled = false;
    }
    static formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    enable() {
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
        this.isEnabled = true;
        this.resetTime();
    }
    disable() {
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).removeBinding(this);
        this.isEnabled = false;
    }
    resetTime() {
        this.elapsed = 0;
        this.elapsedStart = null;
    }
    update(delta, elapsed) {
        if (!this.elapsedStart) {
            this.elapsedStart = elapsed;
        }
        else {
            this.elapsed = Math.floor(elapsed - this.elapsedStart);
        }
    }
    print(toContext) {
        toContext.font = '48px Riffic';
        toContext.lineWidth = 2;
        toContext.lineCap = 'round';
        toContext.fillStyle = '#474647';
        const timeString = GameTimer.formatTime(this.elapsed);
        toContext.fillText(timeString, this.position[0], this.position[1] - 4);
        toContext.fillText(timeString, this.position[0], this.position[1] + 4);
        toContext.fillText(timeString, this.position[0] + 1, this.position[1]);
        toContext.fillText(timeString, this.position[0] - 1, this.position[1]);
        toContext.fillStyle = 'white';
        toContext.fillText(timeString, this.position[0], this.position[1] - 2);
    }
}
exports.GameTimer = GameTimer;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const POINT_VALUES = {
    DEFAULT_JUMP: 1,
    CHECKERS_BONUS: 1,
    EXPLODING_JUMP: 3,
};
exports.default = POINT_VALUES;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Random = __webpack_require__(27);
const hashCode = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
    }
    return hash;
};
function provideRNG(seedStr) {
    const seedNum = hashCode(seedStr);
    return new Random(Random.engines.mt19937().seed(seedNum));
}
exports.default = provideRNG;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class GameClock {
    constructor() {
        this.bindings = [];
    }
    start() {
        this.startTime = Date.now();
        this.lastTime = Date.now();
        this.tick();
    }
    addBinding(entity) {
        if (!this.bindings.find(x => x === entity)) {
            this.bindings.push(entity);
        }
    }
    removeBinding(entity) {
        this.bindings = this.bindings.filter(x => x !== entity);
    }
    tick() {
        const delta = (Date.now() - this.lastTime) / 1000;
        const elapsed = (Date.now() - this.startTime) / 1000;
        this.bindings = this.bindings.filter(x => x);
        let i = this.bindings.length - 1;
        while (i >= 0) {
            this.bindings[i].update.call(this.bindings[i], delta, elapsed);
            i -= 1;
        }
        requestAnimationFrame(this.tick.bind(this));
    }
}
exports.GameClock = GameClock;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = __webpack_require__(0);
const Emitter_1 = __webpack_require__(3);
const Button_1 = __webpack_require__(5);
const VCR_1 = __webpack_require__(4);
const GameTimer_1 = __webpack_require__(9);
var GameOverEvents;
(function (GameOverEvents) {
    GameOverEvents["GO_HOME"] = "go-home";
})(GameOverEvents = exports.GameOverEvents || (exports.GameOverEvents = {}));
class GameOverScreen extends Emitter_1.default {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.buttons = [];
        this.opacity = 0;
        this.vcr = new VCR_1.default(width, height);
    }
    updateInfo(info) {
        const { totalTime, totalScore, totalPegsRemaining, totalSlots, } = info;
        const totalPossible = (totalSlots + totalPegsRemaining - 1);
        const percentCleared = 1 - ((totalPegsRemaining - 1) / totalPossible);
        const didUserWin = percentCleared >= 0.75;
        this.buttons = [];
        this.createButtons(didUserWin);
        const ctx = this.vcr.getContext();
        ctx.fillStyle = 'rgba(236, 236, 236, 0.95)';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.font = '92px Dimbo';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#474647';
        ctx.fillStyle = '#474647';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', (this.width / 2), 200);
        let txtPercent = (percentCleared * 100).toFixed(2);
        if (txtPercent.endsWith('.00')) {
            txtPercent = txtPercent.slice(0, -3);
        }
        const formattedTime = GameTimer_1.GameTimer.formatTime(totalTime);
        ctx.font = '48px Dimbo';
        const txtScoreInfo = `${txtPercent}% cleared • ${formattedTime} • ${totalScore} points`;
        ctx.fillText(txtScoreInfo, (this.width / 2), 325);
        ctx.font = '24px Dimbo';
        ctx.fillText(`Thank you for playing!`, (this.width / 2), 600 - 20);
        this.buttons.forEach(button => button.print(ctx));
    }
    createButtons(didUserWin) {
        [{
                condition: didUserWin,
                label: 'Go Home',
                callback: () => this.emit(GameOverEvents.GO_HOME),
                x: 340,
                y: this.height * 0.67,
                width: 125,
                height: 48,
            }].forEach(buttonConfig => {
            if (!buttonConfig.condition) {
                return;
            }
            let butt = new Button_1.Button(buttonConfig.label, buttonConfig.callback);
            butt.position[0] = buttonConfig.x;
            butt.position[1] = buttonConfig.y;
            butt.width = buttonConfig.width;
            butt.height = buttonConfig.height;
            this.buttons.push(butt);
        });
    }
    attach() {
        this.opacity = 0;
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
        this.buttons.forEach(x => x.enable());
    }
    detach() {
        this.vcr.clear();
        this.opacity = 0;
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).removeBinding(this);
        this.buttons.forEach(x => x.disable());
    }
    update(delta, elapsed) {
        this.opacity += (delta / 1000) * 2;
        this.opacity = Math.min(this.opacity, 1);
    }
    print(toContext) {
        toContext.globalAlpha = this.opacity;
        toContext.drawImage(this.vcr.getCanvas(), 0, 0, this.width, this.height, 0, 0, this.width, this.height);
        toContext.globalAlpha = 1;
    }
}
exports.default = GameOverScreen;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = __webpack_require__(0);
const Emitter_1 = __webpack_require__(3);
const Button_1 = __webpack_require__(5);
const VCR_1 = __webpack_require__(4);
const GameTimer_1 = __webpack_require__(9);
var InterstitialEvents;
(function (InterstitialEvents) {
    InterstitialEvents["NEXT_LEVEL"] = "next-level";
    InterstitialEvents["RESTART_CURRENT"] = "restart-current";
})(InterstitialEvents = exports.InterstitialEvents || (exports.InterstitialEvents = {}));
class InterstitialScreen extends Emitter_1.default {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.buttons = [];
        this.opacity = 0;
        this.vcr = new VCR_1.default(width, height);
    }
    setRoundInfo(info, levelNumber, levelScore, roundTime) {
        const { numPegsRemaining, numSlots } = info;
        const formattedTime = GameTimer_1.GameTimer.formatTime(roundTime);
        const totalPossible = (numSlots + numPegsRemaining - 1);
        const percentCleared = 1 - ((numPegsRemaining - 1) / totalPossible);
        const didUserWin = info.numPegsRemaining === 1 || percentCleared >= 0.75;
        this.buttons = [];
        this.createButtons(didUserWin);
        const ctx = this.vcr.getContext();
        ctx.fillStyle = 'rgba(236, 236, 236, 0.95)';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.font = '92px Dimbo';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#474647';
        ctx.fillStyle = '#474647';
        ctx.textAlign = 'center';
        const txtHeader = didUserWin ? `Level ${levelNumber} Passed` : `Level ${levelNumber} Failed`;
        ctx.fillText(txtHeader, (this.width / 2) + (didUserWin ? 0 : -5), 200);
        let txtPercent = (percentCleared * 100).toFixed(2);
        if (txtPercent.endsWith('.00')) {
            txtPercent = txtPercent.slice(0, -3);
        }
        ctx.font = '48px Dimbo';
        const txtScoreInfo = `${txtPercent}% cleared • ${formattedTime} • ${levelScore} points`;
        ctx.fillText(txtScoreInfo, (this.width / 2) + (didUserWin ? 0 : -5), 325);
        ctx.font = '24px Dimbo';
        if (!didUserWin) {
            ctx.fillText(`(You need 75% to advance to the next level)`, (this.width / 2) + (didUserWin ? 0 : -5), 375);
        }
        this.buttons.forEach(button => button.print(ctx));
    }
    createButtons(didUserWin) {
        [{
                condition: didUserWin,
                label: 'Next Level',
                callback: () => this.emit(InterstitialEvents.NEXT_LEVEL),
                x: this.width - (165 + 100),
                y: this.height * 0.75,
                width: 165,
                height: 48,
            }, {
                condition: true,
                isLowProfile: didUserWin,
                label: didUserWin ? 'Play Again' : 'Retry',
                callback: () => this.emit(InterstitialEvents.RESTART_CURRENT),
                x: didUserWin ? 125 : 345,
                y: didUserWin ? this.height * 0.775 : this.height * 0.75,
                width: didUserWin ? 110 : 90,
                height: didUserWin ? 32 : 48,
            }].forEach(buttonConfig => {
            if (!buttonConfig.condition) {
                return;
            }
            let butt = new Button_1.Button(buttonConfig.label, buttonConfig.callback);
            butt.position[0] = buttonConfig.x;
            butt.position[1] = buttonConfig.y;
            butt.isLowProfile = buttonConfig.isLowProfile || false;
            butt.width = buttonConfig.width;
            butt.height = buttonConfig.height;
            this.buttons.push(butt);
        });
    }
    attach() {
        this.opacity = 0;
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
        this.buttons.forEach(x => x.enable());
    }
    detach() {
        this.vcr.clear();
        this.opacity = 0;
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).removeBinding(this);
        this.buttons.forEach(x => x.disable());
    }
    update(delta, elapsed) {
        this.opacity += (delta / 1000) * 2;
        this.opacity = Math.min(this.opacity, 1);
    }
    print(toContext) {
        toContext.globalAlpha = this.opacity;
        toContext.drawImage(this.vcr.getCanvas(), 0, 0, this.width, this.height, 0, 0, this.width, this.height);
        toContext.globalAlpha = 1;
    }
}
exports.default = InterstitialScreen;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Transform_1 = __webpack_require__(1);
const Provider_1 = __webpack_require__(0);
class ScoreDisplay extends Transform_1.default {
    constructor() {
        super(...arguments);
        this.elapsed = 0;
        this.points = 0;
    }
    formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    enable() {
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
    }
    disable() {
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).removeBinding(this);
    }
    update(delta, elapsed) {
        this.elapsed = Math.floor(elapsed);
    }
    print(toContext) {
        toContext.font = '48px Riffic';
        toContext.lineWidth = 2;
        toContext.lineCap = 'round';
        const pointsLabel = this.points.toString();
        const labelWidth = toContext.measureText(pointsLabel);
        const offset = labelWidth.width + 25;
        toContext.fillStyle = '#474647';
        toContext.fillText(pointsLabel, (this.position[0] - offset), this.position[1] - 4);
        toContext.fillText(pointsLabel, (this.position[0] - offset), this.position[1] + 4);
        toContext.fillText(pointsLabel, (this.position[0] - offset) + 1, this.position[1]);
        toContext.fillText(pointsLabel, (this.position[0] - offset) - 1, this.position[1]);
        toContext.fillStyle = 'white';
        toContext.fillText(pointsLabel, (this.position[0] - offset), this.position[1] - 2);
    }
}
exports.default = ScoreDisplay;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __webpack_require__(5);
const Emitter_1 = __webpack_require__(3);
var SplashScreenEvents;
(function (SplashScreenEvents) {
    SplashScreenEvents["START"] = "start-game";
})(SplashScreenEvents = exports.SplashScreenEvents || (exports.SplashScreenEvents = {}));
class SplashScreen extends Emitter_1.default {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.buttons = [];
        this.createButtons();
    }
    createButtons() {
        [{
                label: 'Start Game',
                callback: () => this.emit(SplashScreenEvents.START),
                x: (this.width / 2) - (185 / 2),
                y: this.height * 0.585,
                width: 185,
                height: 48,
            }].forEach(buttonConfig => {
            let butt = new Button_1.Button(buttonConfig.label, buttonConfig.callback);
            butt.position[0] = buttonConfig.x;
            butt.position[1] = buttonConfig.y;
            butt.width = buttonConfig.width;
            butt.height = buttonConfig.height;
            this.buttons.push(butt);
        });
    }
    attach() {
        this.buttons.forEach(x => x.enable());
    }
    detach() {
        this.buttons.forEach(x => x.disable());
    }
    print(toContext) {
        toContext.lineWidth = 2;
        toContext.lineCap = 'round';
        toContext.strokeStyle = '#474647';
        toContext.fillStyle = '#97cc04';
        toContext.textAlign = 'center';
        toContext.font = '72px Riffic';
        toContext.fillText(`Peg Solitaire`, this.width / 2, 275);
        toContext.globalCompositeOperation = 'multiply';
        toContext.fillStyle = `rgba(4, 150, 255, 0.0575)`;
        toContext.fillRect(0, 175, 800, 150);
        toContext.fillStyle = '#474647';
        toContext.font = '28px Dimbo';
        toContext.textAlign = 'center';
        toContext.fillText(`Game by Andy Mikulski`, this.width / 2, 600 - 20);
        this.buttons.forEach(button => button.print(toContext));
    }
}
exports.default = SplashScreen;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ElementEventHandler_1 = __webpack_require__(25);
const Provider_1 = __webpack_require__(0);
const Transform_1 = __webpack_require__(1);
class InteractionLayer {
    constructor() {
        this.trackedInteractables = [];
        this.trackedOffsets = [];
        this.pipeline = Provider_1.ServiceProvider.lookup(Provider_1.Service.PIPELINE);
        this.renderingCanvas = this.pipeline.getCanvas();
        this.handler = new ElementEventHandler_1.default(this.renderingCanvas);
        this.handler.on(ElementEventHandler_1.MOUSE_EVENT.UP, this.onMouseUp.bind(this));
        this.handler.on(ElementEventHandler_1.MOUSE_EVENT.DOWN, this.onMouseDown.bind(this));
        this.handler.on(ElementEventHandler_1.MOUSE_EVENT.CLICK, this.onClick.bind(this));
        this.handler.on(ElementEventHandler_1.MOUSE_EVENT.R_CLICK, this.onRightClick.bind(this));
        this.handler.on(ElementEventHandler_1.MOUSE_EVENT.MOVE, this.onMouseMove.bind(this));
    }
    getMouseEventCoords(evt) {
        const widthRatio = this.renderingCanvas.width / this.renderingCanvas.offsetWidth;
        const heightRatio = this.renderingCanvas.height / this.renderingCanvas.offsetHeight;
        const mouseX = widthRatio * (evt.x - this.renderingCanvas.offsetLeft);
        const mouseY = heightRatio * (evt.y - this.renderingCanvas.offsetTop);
        return [mouseX, mouseY];
    }
    getEntitesAtEvent(evt) {
        return this.getEntityAtPos.apply(this, this.getMouseEventCoords(evt));
    }
    onMouseEnter(evt) {
        const ent = this.getEntitesAtEvent(evt);
        ent && ent.onMouseEnter && ent.onMouseEnter(evt);
    }
    onMouseLeave(evt) {
        const ent = this.getEntitesAtEvent(evt);
        ent && ent.onMouseLeave && ent.onMouseLeave(evt);
    }
    onMouseMove(evt) {
        const ent = this.getEntitesAtEvent(evt);
        ent && ent.onMouseMove && ent.onMouseMove(evt);
    }
    onRightClick(evt) {
        const ent = this.getEntitesAtEvent(evt);
        ent && ent.onRightClick && ent.onRightClick(evt);
    }
    onMouseDown(evt) {
        const ent = this.getEntitesAtEvent(evt);
        ent && ent.onMouseDown && ent.onMouseDown(evt);
    }
    onMouseUp(evt) {
        const ent = this.getEntitesAtEvent(evt);
        ent && ent.onMouseUp && ent.onMouseUp(evt);
    }
    onClick(evt) {
        const ent = this.getEntitesAtEvent(evt);
        ent && ent.onClick && ent.onClick(evt);
    }
    getEntityAtPos(mouseX, mouseY) {
        let offset;
        let found = this.trackedInteractables.filter((obj, idx) => {
            offset = this.trackedOffsets[idx];
            const xMin = obj.position[0] + offset.position[0];
            const xMax = obj.position[0] + obj.width + offset.position[0];
            const yMin = obj.position[1] + offset.position[1];
            const yMax = obj.position[1] + obj.height + offset.position[1];
            return (mouseX >= xMin && mouseX <= xMax && mouseY >= yMin && mouseY <= yMax);
        });
        return found[0];
    }
    register(thing, offset = new Transform_1.default()) {
        this.trackedInteractables.push(thing);
        this.trackedOffsets.push(offset);
    }
    unregister(thing) {
        const idx = this.trackedInteractables.findIndex(x => x === thing);
        if (idx !== -1) {
            this.trackedInteractables.splice(idx, 1);
            this.trackedOffsets.splice(idx, 1);
        }
    }
    unregisterAll() {
        this.trackedInteractables = [];
        this.trackedOffsets = [];
    }
}
exports.default = InteractionLayer;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TriangleBoard_1 = __webpack_require__(24);
const SquareBoard_1 = __webpack_require__(23);
const LevelData = [
    {
        seed: 'bunny hill',
        board: TriangleBoard_1.default,
        slots: [[4, 4]],
        count: 5,
        percentExplosive: 0,
        percentStrong: 0,
        percentRealStrong: 0,
    },
    {
        seed: 'switching up the board',
        board: SquareBoard_1.default,
        slots: [[0, 0]],
        count: 4,
        percentExplosive: 0,
        percentStrong: 0,
        percentRealStrong: 0,
    },
    {
        seed: 'getting bigger',
        board: TriangleBoard_1.default,
        slots: [[4, 0]],
        count: 5,
        percentExplosive: 0,
        percentStrong: 0,
        percentRealStrong: 0,
    },
    {
        seed: 'double peg',
        board: SquareBoard_1.default,
        slots: [[2, 2], [3, 3]],
        count: 6,
        percentExplosive: 0,
        percentStrong: 0.075,
        percentRealStrong: 0,
    },
    {
        seed: 'more double pegs',
        board: TriangleBoard_1.default,
        slots: [[2, 2], [3, 3]],
        count: 6,
        percentExplosive: 0,
        percentStrong: 0.095,
        percentRealStrong: 0.1,
    },
    {
        seed: 'introducing exploding pegs',
        board: SquareBoard_1.default,
        slots: [[4, 0]],
        count: 5,
        percentExplosive: 0.025,
        percentStrong: 0,
        percentRealStrong: 0,
    },
    {
        seed: 'mixing explosion w/ strong pegs',
        board: TriangleBoard_1.default,
        slots: [[0, 0]],
        count: 6,
        percentExplosive: 0.07,
        percentStrong: 0.1,
        percentRealStrong: 0,
    },
    {
        seed: 'gettin into the thick of it',
        board: TriangleBoard_1.default,
        slots: [[3, 3]],
        count: 6,
        percentExplosive: 0.05,
        percentStrong: 0.07,
        percentRealStrong: 0.25
    },
    {
        seed: 'yiha!!!',
        board: SquareBoard_1.default,
        slots: [[0, 0]],
        count: 6,
        percentExplosive: 0.1,
        percentStrong: 0.15,
        percentRealStrong: 0.25
    },
    {
        seed: 'Level Ten',
        board: SquareBoard_1.default,
        slots: [[2, 3]],
        count: 6,
        percentExplosive: 0.1,
        percentStrong: 0.15,
        percentRealStrong: 0.4
    },
    {
        seed: 'Level Eleven',
        board: TriangleBoard_1.default,
        slots: [[4, 2]],
        count: 7,
        percentExplosive: 0.11,
        percentStrong: 0.2,
        percentRealStrong: 0.25
    },
    {
        seed: 'Level Twelve',
        board: SquareBoard_1.default,
        slots: [[5, 0]],
        count: 6,
        percentExplosive: 0.1,
        percentStrong: 0.24,
        percentRealStrong: 0.7
    },
    {
        seed: 'Level Thirteen',
        board: SquareBoard_1.default,
        slots: [[0, 0], [0, 6], [6, 0], [6, 6]],
        count: 7,
        percentExplosive: 0.15,
        percentStrong: 0.23,
        percentRealStrong: 0.25
    },
    {
        seed: 'Level Fourteen',
        board: TriangleBoard_1.default,
        slots: [[7, 7]],
        count: 8,
        percentExplosive: 0.125,
        percentStrong: 0.35,
        percentRealStrong: 0.25
    },
    {
        seed: 'Level Fifteen',
        board: TriangleBoard_1.default,
        slots: [[0, 0], [9, 0], [9, 9], [6, 3]],
        count: 10,
        percentExplosive: 0.1,
        percentStrong: 0.2,
        percentRealStrong: 0.25
    },
];
exports.default = LevelData;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VCR_1 = __webpack_require__(4);
class RenderingPipeline {
    constructor(width, height) {
        this.renderers = [];
        const output = new VCR_1.default(width, height);
        this.outputCanvas = output.getCanvas();
        this.outputContext = output.getContext();
        this.tick();
    }
    tick() {
        this.renderAll();
        requestAnimationFrame(this.tick.bind(this));
    }
    renderAll() {
        const all = this.renderers;
        this.outputContext.clearRect(0, 0, this.outputContext.canvas.width, this.outputContext.canvas.height);
        let i = all.length - 1;
        while (i >= 0) {
            this.outputContext.save();
            all[i].print(this.outputContext);
            this.outputContext.rotate(-all[i].rotation);
            this.outputContext.restore();
            i -= 1;
        }
    }
    setBackground(color) {
        this.outputCanvas.style.background = color;
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
}
exports.default = RenderingPipeline;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = __webpack_require__(0);
const Transform_1 = __webpack_require__(1);
class FloatingText extends Transform_1.default {
    constructor(label, size, origin, amount, durationMs) {
        super();
        this.label = label;
        this.size = size;
        this.amount = amount;
        this.durationMs = durationMs;
        this.percentDone = 0;
        this.opacity = 0;
        this.position = [].concat(origin);
        this.originalOffset = [].concat(origin);
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
        Provider_1.ServiceProvider.lookup(Provider_1.Service.PIPELINE).addRenderer(this, 0);
    }
    update(delta, elapsed) {
        this.timeStart = this.timeStart || elapsed;
        const timeElapsed = (elapsed - this.timeStart) * 1000;
        this.percentDone = 1 - (timeElapsed / this.durationMs);
        this.position[1] = this.originalOffset[1] + (this.amount * this.percentDone);
        if (timeElapsed >= this.durationMs) {
            Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).removeBinding(this);
            Provider_1.ServiceProvider.lookup(Provider_1.Service.PIPELINE).removeRenderer(this);
        }
    }
    print(toContext) {
        toContext.globalCompositeOperation = 'difference';
        toContext.font = `${this.size}px Dimbo`;
        toContext.lineWidth = 1;
        toContext.lineCap = 'round';
        toContext.textAlign = 'center';
        toContext.fillStyle = `rgba(71, 70, 71, ${this.percentDone})`;
        toContext.fillText(this.label, this.position[0], this.position[1]);
        toContext.globalCompositeOperation = 'source-atop';
    }
}
exports.default = FloatingText;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Provider_1 = __webpack_require__(0);
const Transform_1 = __webpack_require__(1);
const Emitter_1 = __webpack_require__(3);
var QuakeOverTime;
(function (QuakeOverTime) {
    QuakeOverTime[QuakeOverTime["ASC"] = 0] = "ASC";
    QuakeOverTime[QuakeOverTime["DESC"] = -1] = "DESC";
})(QuakeOverTime = exports.QuakeOverTime || (exports.QuakeOverTime = {}));
var QuakeEvents;
(function (QuakeEvents) {
    QuakeEvents["DONE"] = "done";
})(QuakeEvents = exports.QuakeEvents || (exports.QuakeEvents = {}));
class QuakeEffect extends Emitter_1.default {
    constructor(target, amount, durationMs, dir = QuakeOverTime.DESC) {
        super();
        this.target = target;
        this.amount = amount;
        this.durationMs = durationMs;
        this.dir = dir;
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
        this.originalOffset = new Transform_1.default();
        this.quakeOffset = new Transform_1.default();
        this.originalOffset.position = [].concat(target.position);
    }
    update(delta, elapsed) {
        this.timeStart = this.timeStart || elapsed;
        const timeElapsed = (elapsed - this.timeStart) * 1000;
        this.quakeOffset.position[0] = Math.cos(timeElapsed) * (this.amount * (this.dir + (timeElapsed / this.durationMs)));
        this.quakeOffset.position[1] = Math.sin(timeElapsed) * (this.amount * (this.dir + (timeElapsed / this.durationMs)));
        this.target.position[0] = this.originalOffset.position[0] + this.quakeOffset.position[0];
        this.target.position[1] = this.originalOffset.position[1] + this.quakeOffset.position[1];
        if (timeElapsed >= this.durationMs) {
            Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).removeBinding(this);
            this.emit(QuakeEvents.DONE);
        }
    }
}
exports.default = QuakeEffect;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Peg_1 = __webpack_require__(2);
const Provider_1 = __webpack_require__(0);
class ExplodingPeg extends Peg_1.default {
    constructor(width, height) {
        super(width, height);
        this.opacity = 1;
        this.isEnabled = false;
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).addBinding(this);
    }
    print(toContext, offset) {
        super.print.apply(this, [toContext, offset]);
        toContext.globalCompositeOperation = 'source-atop';
        toContext.fillStyle = `hsla(1.1, 100%, 57.8%, ${this.opacity - 0.5})`;
        toContext.fillRect(offset.position[0] + this.position[0] - Peg_1.default.renderPadding, offset.position[1] + this.position[1] - Peg_1.default.renderPadding, this.width + (Peg_1.default.renderPadding * 2), this.height + (Peg_1.default.renderPadding * 2));
        toContext.globalCompositeOperation = 'source-over';
    }
    update(delta, elapsed) {
        if (!this.startTime) {
            this.startTime = elapsed;
        }
        let speed = 3;
        this.opacity = Math.sin(elapsed * speed) + 1;
    }
    onClick() { }
    onMouseEnter() { }
    onMouseLeave() { }
}
exports.default = ExplodingPeg;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameBoard_1 = __webpack_require__(8);
const Peg_1 = __webpack_require__(2);
const Provider_1 = __webpack_require__(0);
const Slot_1 = __webpack_require__(6);
class SquareGameBoard extends GameBoard_1.default {
    constructor() {
        super(...arguments);
        this.distance = 2;
    }
    calculateBoardPosition(count) {
        const boardX = 297.2097 * Math.pow(count, -0.2192493);
        const boardY = 202.4127 * Math.pow(count, -0.5205111);
        this.transform.position = [boardX, boardY];
    }
    calculatePegSize(count) {
        return 200 * Math.pow(count, -0.8302527);
    }
    buildBoard() {
        const { settings } = this;
        const rng = Provider_1.ServiceProvider.lookup(Provider_1.Service.RNG);
        this.map = [];
        const slots = settings.slots.map((pt) => pt.join(','));
        for (let y = 0; y < settings.count; y += 1) {
            this.map[y] = [];
            for (let x = 0; x < settings.count; x += 1) {
                const isPredeterminedSlot = !!slots.find((slot) => slot === `${x},${y}`);
                this.map[y][x] = isPredeterminedSlot ? this.createSlot(x, y) : this.createPeg(x, y, rng.bool(settings.percentExplosive));
            }
        }
    }
    calculatePegPlacement(x, y) {
        return [
            (x * (this.size * 1.5)),
            (y * (this.size * 1.5))
        ];
    }
    validateDistance(distX, distY) {
        return Math.abs(distX | distY) === this.distance && Math.abs(distX) !== Math.abs(distY);
    }
    getNeighboringPegs(peg) {
        let thing;
        let neighbors = [];
        for (let ix = -1; ix <= 1; ix += 1) {
            for (let iy = -1; iy <= 1; iy += 1) {
                if (ix === 0 && iy === 0) {
                    continue;
                }
                thing = this.map[iy + peg.y] && this.map[iy + peg.y][ix + peg.x];
                if (thing && thing instanceof Peg_1.default) {
                    neighbors.push(thing);
                }
            }
        }
        return neighbors;
    }
    getPossibleMoves(peg) {
        if (!peg.isEnabled) {
            return [];
        }
        const neighboringMoves = [
            [-2, 0],
            [2, 0],
            [0, 2],
            [0, -2],
        ];
        let currX;
        let currY;
        let thing;
        let diffX;
        let diffY;
        let possibleMoves = [];
        neighboringMoves.forEach(coords => {
            currX = peg.x + coords[0];
            currY = peg.y + coords[1];
            thing = this.map[currY] && this.map[currY][currX];
            if (thing && thing instanceof Slot_1.default) {
                diffX = peg.x + (coords[0] / 2);
                diffY = peg.y + (coords[1] / 2);
                if (this.map[diffY] && this.map[diffY][diffX] instanceof Peg_1.default) {
                    possibleMoves.push(thing);
                }
            }
        });
        return possibleMoves;
    }
}
exports.default = SquareGameBoard;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameBoard_1 = __webpack_require__(8);
const Provider_1 = __webpack_require__(0);
const Peg_1 = __webpack_require__(2);
const Slot_1 = __webpack_require__(6);
class TriangleGameBoard extends GameBoard_1.default {
    calculateBoardPosition(count) {
        const boardX = 194.4171 + (5.681169 * count) - (1.125676 * Math.pow(count, 2)) + (0.03652708 * Math.pow(count, 3));
        const boardY = 210.4402 * Math.pow(count, -0.3913894);
        this.transform.position = [boardX, boardY];
    }
    calculatePegSize(count) {
        return 200 * Math.pow(count, -0.8302527);
    }
    buildBoard() {
        const { settings } = this;
        const rng = Provider_1.ServiceProvider.lookup(Provider_1.Service.RNG);
        this.map = [];
        const slotCoords = settings.slots.map((pt) => pt.join(','));
        for (let y = 0; y < settings.count; y += 1) {
            this.map[y] = [];
            for (let x = y; x < settings.count; x += 1) {
                const isPredeterminedSlot = !!slotCoords.find((coords) => coords === `${x},${y}`);
                if (isPredeterminedSlot) {
                    this.map[y][x] = this.createSlot(x, y);
                }
                else {
                    const peg = this.createPeg(x, y, rng.bool(settings.percentExplosive));
                    this.map[y][x] = peg;
                }
            }
        }
    }
    calculatePegPlacement(x, y) {
        return [
            ((this.size / 2) + ((x - y / 2) * (this.size * 1.5))),
            (y * (this.size * 1.5))
        ];
    }
    validateDistance(distX, distY) {
        return Math.abs(distX | distY) === this.distance;
    }
    getNeighboringPegs(peg) {
        let thing;
        let neighbors = [
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 0],
            [-1, -1],
            [0, -1],
        ];
        let found = [];
        let currX;
        let currY;
        neighbors.map((coords) => {
            currX = peg.x + coords[0];
            currY = peg.y + coords[1];
            thing = this.map[currY] && this.map[currY][currX];
            if (thing && thing instanceof Peg_1.default) {
                found.push(thing);
            }
        });
        return found;
    }
    getPossibleMoves(peg) {
        const neighboringMoves = [
            [2, 0],
            [2, 2],
            [0, 2],
            [-2, 0],
            [-2, -2],
            [0, -2],
        ];
        let currX;
        let currY;
        let thing;
        let diffX;
        let diffY;
        let possibleMoves = [];
        neighboringMoves.forEach(coords => {
            currX = peg.x + coords[0];
            currY = peg.y + coords[1];
            thing = this.map[currY] && this.map[currY][currX];
            if (thing && thing instanceof Slot_1.default) {
                diffX = peg.x + (coords[0] / 2);
                diffY = peg.y + (coords[1] / 2);
                if (this.map[diffY] && this.map[diffY][diffX] instanceof Peg_1.default) {
                    possibleMoves.push(thing);
                }
            }
        });
        return possibleMoves;
    }
}
exports.default = TriangleGameBoard;


/***/ }),
/* 25 */
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
    MOUSE_EVENT["ENTER"] = "mouseenter";
    MOUSE_EVENT["LEAVE"] = "mouseleave";
})(MOUSE_EVENT = exports.MOUSE_EVENT || (exports.MOUSE_EVENT = {}));
var TOUCH_EVENT;
(function (TOUCH_EVENT) {
    TOUCH_EVENT["START"] = "touchstart";
    TOUCH_EVENT["END"] = "touchend";
})(TOUCH_EVENT = exports.TOUCH_EVENT || (exports.TOUCH_EVENT = {}));
var KEY_EVENT;
(function (KEY_EVENT) {
    KEY_EVENT["DOWN"] = "keydown";
    KEY_EVENT["UP"] = "keyup";
})(KEY_EVENT = exports.KEY_EVENT || (exports.KEY_EVENT = {}));
class ElementEventHandler {
    constructor(target) {
        this.target = target;
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
        this.target.addEventListener(type, newHandler, false);
        this.internalEvents[type] = newHandler;
    }
    createEventHandler(type) {
        return (evt) => {
            evt.preventDefault();
            this.flaggedEvents[type] = evt;
            this.hasFlags = true;
        };
    }
}
exports.default = ElementEventHandler;


/***/ }),
/* 26 */
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


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*jshint eqnull:true*/
(function (root) {
  "use strict";

  var GLOBAL_KEY = "Random";

  var imul = (typeof Math.imul !== "function" || Math.imul(0xffffffff, 5) !== -5 ?
    function (a, b) {
      var ah = (a >>> 16) & 0xffff;
      var al = a & 0xffff;
      var bh = (b >>> 16) & 0xffff;
      var bl = b & 0xffff;
      // the shift by 0 fixes the sign on the high part
      // the final |0 converts the unsigned value into a signed value
      return (al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0;
    } :
    Math.imul);

  var stringRepeat = (typeof String.prototype.repeat === "function" && "x".repeat(3) === "xxx" ?
    function (x, y) {
      return x.repeat(y);
    } : function (pattern, count) {
      var result = "";
      while (count > 0) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern += pattern;
      }
      return result;
    });

  function Random(engine) {
    if (!(this instanceof Random)) {
      return new Random(engine);
    }

    if (engine == null) {
      engine = Random.engines.nativeMath;
    } else if (typeof engine !== "function") {
      throw new TypeError("Expected engine to be a function, got " + typeof engine);
    }
    this.engine = engine;
  }
  var proto = Random.prototype;

  Random.engines = {
    nativeMath: function () {
      return (Math.random() * 0x100000000) | 0;
    },
    mt19937: (function (Int32Array) {
      // http://en.wikipedia.org/wiki/Mersenne_twister
      function refreshData(data) {
        var k = 0;
        var tmp = 0;
        for (;
          (k | 0) < 227; k = (k + 1) | 0) {
          tmp = (data[k] & 0x80000000) | (data[(k + 1) | 0] & 0x7fffffff);
          data[k] = data[(k + 397) | 0] ^ (tmp >>> 1) ^ ((tmp & 0x1) ? 0x9908b0df : 0);
        }

        for (;
          (k | 0) < 623; k = (k + 1) | 0) {
          tmp = (data[k] & 0x80000000) | (data[(k + 1) | 0] & 0x7fffffff);
          data[k] = data[(k - 227) | 0] ^ (tmp >>> 1) ^ ((tmp & 0x1) ? 0x9908b0df : 0);
        }

        tmp = (data[623] & 0x80000000) | (data[0] & 0x7fffffff);
        data[623] = data[396] ^ (tmp >>> 1) ^ ((tmp & 0x1) ? 0x9908b0df : 0);
      }

      function temper(value) {
        value ^= value >>> 11;
        value ^= (value << 7) & 0x9d2c5680;
        value ^= (value << 15) & 0xefc60000;
        return value ^ (value >>> 18);
      }

      function seedWithArray(data, source) {
        var i = 1;
        var j = 0;
        var sourceLength = source.length;
        var k = Math.max(sourceLength, 624) | 0;
        var previous = data[0] | 0;
        for (;
          (k | 0) > 0; --k) {
          data[i] = previous = ((data[i] ^ imul((previous ^ (previous >>> 30)), 0x0019660d)) + (source[j] | 0) + (j | 0)) | 0;
          i = (i + 1) | 0;
          ++j;
          if ((i | 0) > 623) {
            data[0] = data[623];
            i = 1;
          }
          if (j >= sourceLength) {
            j = 0;
          }
        }
        for (k = 623;
          (k | 0) > 0; --k) {
          data[i] = previous = ((data[i] ^ imul((previous ^ (previous >>> 30)), 0x5d588b65)) - i) | 0;
          i = (i + 1) | 0;
          if ((i | 0) > 623) {
            data[0] = data[623];
            i = 1;
          }
        }
        data[0] = 0x80000000;
      }

      function mt19937() {
        var data = new Int32Array(624);
        var index = 0;
        var uses = 0;

        function next() {
          if ((index | 0) >= 624) {
            refreshData(data);
            index = 0;
          }

          var value = data[index];
          index = (index + 1) | 0;
          uses += 1;
          return temper(value) | 0;
        }
        next.getUseCount = function() {
          return uses;
        };
        next.discard = function (count) {
          uses += count;
          if ((index | 0) >= 624) {
            refreshData(data);
            index = 0;
          }
          while ((count - index) > 624) {
            count -= 624 - index;
            refreshData(data);
            index = 0;
          }
          index = (index + count) | 0;
          return next;
        };
        next.seed = function (initial) {
          var previous = 0;
          data[0] = previous = initial | 0;

          for (var i = 1; i < 624; i = (i + 1) | 0) {
            data[i] = previous = (imul((previous ^ (previous >>> 30)), 0x6c078965) + i) | 0;
          }
          index = 624;
          uses = 0;
          return next;
        };
        next.seedWithArray = function (source) {
          next.seed(0x012bd6aa);
          seedWithArray(data, source);
          return next;
        };
        next.autoSeed = function () {
          return next.seedWithArray(Random.generateEntropyArray());
        };
        return next;
      }

      return mt19937;
    }(typeof Int32Array === "function" ? Int32Array : Array)),
    browserCrypto: (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function" && typeof Int32Array === "function") ? (function () {
      var data = null;
      var index = 128;

      return function () {
        if (index >= 128) {
          if (data === null) {
            data = new Int32Array(128);
          }
          crypto.getRandomValues(data);
          index = 0;
        }

        return data[index++] | 0;
      };
    }()) : null
  };

  Random.generateEntropyArray = function () {
    var array = [];
    var engine = Random.engines.nativeMath;
    for (var i = 0; i < 16; ++i) {
      array[i] = engine() | 0;
    }
    array.push(new Date().getTime() | 0);
    return array;
  };

  function returnValue(value) {
    return function () {
      return value;
    };
  }

  // [-0x80000000, 0x7fffffff]
  Random.int32 = function (engine) {
    return engine() | 0;
  };
  proto.int32 = function () {
    return Random.int32(this.engine);
  };

  // [0, 0xffffffff]
  Random.uint32 = function (engine) {
    return engine() >>> 0;
  };
  proto.uint32 = function () {
    return Random.uint32(this.engine);
  };

  // [0, 0x1fffffffffffff]
  Random.uint53 = function (engine) {
    var high = engine() & 0x1fffff;
    var low = engine() >>> 0;
    return (high * 0x100000000) + low;
  };
  proto.uint53 = function () {
    return Random.uint53(this.engine);
  };

  // [0, 0x20000000000000]
  Random.uint53Full = function (engine) {
    while (true) {
      var high = engine() | 0;
      if (high & 0x200000) {
        if ((high & 0x3fffff) === 0x200000 && (engine() | 0) === 0) {
          return 0x20000000000000;
        }
      } else {
        var low = engine() >>> 0;
        return ((high & 0x1fffff) * 0x100000000) + low;
      }
    }
  };
  proto.uint53Full = function () {
    return Random.uint53Full(this.engine);
  };

  // [-0x20000000000000, 0x1fffffffffffff]
  Random.int53 = function (engine) {
    var high = engine() | 0;
    var low = engine() >>> 0;
    return ((high & 0x1fffff) * 0x100000000) + low + (high & 0x200000 ? -0x20000000000000 : 0);
  };
  proto.int53 = function () {
    return Random.int53(this.engine);
  };

  // [-0x20000000000000, 0x20000000000000]
  Random.int53Full = function (engine) {
    while (true) {
      var high = engine() | 0;
      if (high & 0x400000) {
        if ((high & 0x7fffff) === 0x400000 && (engine() | 0) === 0) {
          return 0x20000000000000;
        }
      } else {
        var low = engine() >>> 0;
        return ((high & 0x1fffff) * 0x100000000) + low + (high & 0x200000 ? -0x20000000000000 : 0);
      }
    }
  };
  proto.int53Full = function () {
    return Random.int53Full(this.engine);
  };

  function add(generate, addend) {
    if (addend === 0) {
      return generate;
    } else {
      return function (engine) {
        return generate(engine) + addend;
      };
    }
  }

  Random.integer = (function () {
    function isPowerOfTwoMinusOne(value) {
      return ((value + 1) & value) === 0;
    }

    function bitmask(masking) {
      return function (engine) {
        return engine() & masking;
      };
    }

    function downscaleToLoopCheckedRange(range) {
      var extendedRange = range + 1;
      var maximum = extendedRange * Math.floor(0x100000000 / extendedRange);
      return function (engine) {
        var value = 0;
        do {
          value = engine() >>> 0;
        } while (value >= maximum);
        return value % extendedRange;
      };
    }

    function downscaleToRange(range) {
      if (isPowerOfTwoMinusOne(range)) {
        return bitmask(range);
      } else {
        return downscaleToLoopCheckedRange(range);
      }
    }

    function isEvenlyDivisibleByMaxInt32(value) {
      return (value | 0) === 0;
    }

    function upscaleWithHighMasking(masking) {
      return function (engine) {
        var high = engine() & masking;
        var low = engine() >>> 0;
        return (high * 0x100000000) + low;
      };
    }

    function upscaleToLoopCheckedRange(extendedRange) {
      var maximum = extendedRange * Math.floor(0x20000000000000 / extendedRange);
      return function (engine) {
        var ret = 0;
        do {
          var high = engine() & 0x1fffff;
          var low = engine() >>> 0;
          ret = (high * 0x100000000) + low;
        } while (ret >= maximum);
        return ret % extendedRange;
      };
    }

    function upscaleWithinU53(range) {
      var extendedRange = range + 1;
      if (isEvenlyDivisibleByMaxInt32(extendedRange)) {
        var highRange = ((extendedRange / 0x100000000) | 0) - 1;
        if (isPowerOfTwoMinusOne(highRange)) {
          return upscaleWithHighMasking(highRange);
        }
      }
      return upscaleToLoopCheckedRange(extendedRange);
    }

    function upscaleWithinI53AndLoopCheck(min, max) {
      return function (engine) {
        var ret = 0;
        do {
          var high = engine() | 0;
          var low = engine() >>> 0;
          ret = ((high & 0x1fffff) * 0x100000000) + low + (high & 0x200000 ? -0x20000000000000 : 0);
        } while (ret < min || ret > max);
        return ret;
      };
    }

    return function (min, max) {
      min = Math.floor(min);
      max = Math.floor(max);
      if (min < -0x20000000000000 || !isFinite(min)) {
        throw new RangeError("Expected min to be at least " + (-0x20000000000000));
      } else if (max > 0x20000000000000 || !isFinite(max)) {
        throw new RangeError("Expected max to be at most " + 0x20000000000000);
      }

      var range = max - min;
      if (range <= 0 || !isFinite(range)) {
        return returnValue(min);
      } else if (range === 0xffffffff) {
        if (min === 0) {
          return Random.uint32;
        } else {
          return add(Random.int32, min + 0x80000000);
        }
      } else if (range < 0xffffffff) {
        return add(downscaleToRange(range), min);
      } else if (range === 0x1fffffffffffff) {
        return add(Random.uint53, min);
      } else if (range < 0x1fffffffffffff) {
        return add(upscaleWithinU53(range), min);
      } else if (max - 1 - min === 0x1fffffffffffff) {
        return add(Random.uint53Full, min);
      } else if (min === -0x20000000000000 && max === 0x20000000000000) {
        return Random.int53Full;
      } else if (min === -0x20000000000000 && max === 0x1fffffffffffff) {
        return Random.int53;
      } else if (min === -0x1fffffffffffff && max === 0x20000000000000) {
        return add(Random.int53, 1);
      } else if (max === 0x20000000000000) {
        return add(upscaleWithinI53AndLoopCheck(min - 1, max - 1), 1);
      } else {
        return upscaleWithinI53AndLoopCheck(min, max);
      }
    };
  }());
  proto.integer = function (min, max) {
    return Random.integer(min, max)(this.engine);
  };

  // [0, 1] (floating point)
  Random.realZeroToOneInclusive = function (engine) {
    return Random.uint53Full(engine) / 0x20000000000000;
  };
  proto.realZeroToOneInclusive = function () {
    return Random.realZeroToOneInclusive(this.engine);
  };

  // [0, 1) (floating point)
  Random.realZeroToOneExclusive = function (engine) {
    return Random.uint53(engine) / 0x20000000000000;
  };
  proto.realZeroToOneExclusive = function () {
    return Random.realZeroToOneExclusive(this.engine);
  };

  Random.real = (function () {
    function multiply(generate, multiplier) {
      if (multiplier === 1) {
        return generate;
      } else if (multiplier === 0) {
        return function () {
          return 0;
        };
      } else {
        return function (engine) {
          return generate(engine) * multiplier;
        };
      }
    }

    return function (left, right, inclusive) {
      if (!isFinite(left)) {
        throw new RangeError("Expected left to be a finite number");
      } else if (!isFinite(right)) {
        throw new RangeError("Expected right to be a finite number");
      }
      return add(
        multiply(
          inclusive ? Random.realZeroToOneInclusive : Random.realZeroToOneExclusive,
          right - left),
        left);
    };
  }());
  proto.real = function (min, max, inclusive) {
    return Random.real(min, max, inclusive)(this.engine);
  };

  Random.bool = (function () {
    function isLeastBitTrue(engine) {
      return (engine() & 1) === 1;
    }

    function lessThan(generate, value) {
      return function (engine) {
        return generate(engine) < value;
      };
    }

    function probability(percentage) {
      if (percentage <= 0) {
        return returnValue(false);
      } else if (percentage >= 1) {
        return returnValue(true);
      } else {
        var scaled = percentage * 0x100000000;
        if (scaled % 1 === 0) {
          return lessThan(Random.int32, (scaled - 0x80000000) | 0);
        } else {
          return lessThan(Random.uint53, Math.round(percentage * 0x20000000000000));
        }
      }
    }

    return function (numerator, denominator) {
      if (denominator == null) {
        if (numerator == null) {
          return isLeastBitTrue;
        }
        return probability(numerator);
      } else {
        if (numerator <= 0) {
          return returnValue(false);
        } else if (numerator >= denominator) {
          return returnValue(true);
        }
        return lessThan(Random.integer(0, denominator - 1), numerator);
      }
    };
  }());
  proto.bool = function (numerator, denominator) {
    return Random.bool(numerator, denominator)(this.engine);
  };

  function toInteger(value) {
    var number = +value;
    if (number < 0) {
      return Math.ceil(number);
    } else {
      return Math.floor(number);
    }
  }

  function convertSliceArgument(value, length) {
    if (value < 0) {
      return Math.max(value + length, 0);
    } else {
      return Math.min(value, length);
    }
  }
  Random.pick = function (engine, array, begin, end) {
    var length = array.length;
    var start = begin == null ? 0 : convertSliceArgument(toInteger(begin), length);
    var finish = end === void 0 ? length : convertSliceArgument(toInteger(end), length);
    if (start >= finish) {
      return void 0;
    }
    var distribution = Random.integer(start, finish - 1);
    return array[distribution(engine)];
  };
  proto.pick = function (array, begin, end) {
    return Random.pick(this.engine, array, begin, end);
  };

  function returnUndefined() {
    return void 0;
  }
  var slice = Array.prototype.slice;
  Random.picker = function (array, begin, end) {
    var clone = slice.call(array, begin, end);
    if (!clone.length) {
      return returnUndefined;
    }
    var distribution = Random.integer(0, clone.length - 1);
    return function (engine) {
      return clone[distribution(engine)];
    };
  };

  Random.shuffle = function (engine, array, downTo) {
    var length = array.length;
    if (length) {
      if (downTo == null) {
        downTo = 0;
      }
      for (var i = (length - 1) >>> 0; i > downTo; --i) {
        var distribution = Random.integer(0, i);
        var j = distribution(engine);
        if (i !== j) {
          var tmp = array[i];
          array[i] = array[j];
          array[j] = tmp;
        }
      }
    }
    return array;
  };
  proto.shuffle = function (array) {
    return Random.shuffle(this.engine, array);
  };

  Random.sample = function (engine, population, sampleSize) {
    if (sampleSize < 0 || sampleSize > population.length || !isFinite(sampleSize)) {
      throw new RangeError("Expected sampleSize to be within 0 and the length of the population");
    }

    if (sampleSize === 0) {
      return [];
    }

    var clone = slice.call(population);
    var length = clone.length;
    if (length === sampleSize) {
      return Random.shuffle(engine, clone, 0);
    }
    var tailLength = length - sampleSize;
    return Random.shuffle(engine, clone, tailLength - 1).slice(tailLength);
  };
  proto.sample = function (population, sampleSize) {
    return Random.sample(this.engine, population, sampleSize);
  };

  Random.die = function (sideCount) {
    return Random.integer(1, sideCount);
  };
  proto.die = function (sideCount) {
    return Random.die(sideCount)(this.engine);
  };

  Random.dice = function (sideCount, dieCount) {
    var distribution = Random.die(sideCount);
    return function (engine) {
      var result = [];
      result.length = dieCount;
      for (var i = 0; i < dieCount; ++i) {
        result[i] = distribution(engine);
      }
      return result;
    };
  };
  proto.dice = function (sideCount, dieCount) {
    return Random.dice(sideCount, dieCount)(this.engine);
  };

  // http://en.wikipedia.org/wiki/Universally_unique_identifier
  Random.uuid4 = (function () {
    function zeroPad(string, zeroCount) {
      return stringRepeat("0", zeroCount - string.length) + string;
    }

    return function (engine) {
      var a = engine() >>> 0;
      var b = engine() | 0;
      var c = engine() | 0;
      var d = engine() >>> 0;

      return (
        zeroPad(a.toString(16), 8) +
        "-" +
        zeroPad((b & 0xffff).toString(16), 4) +
        "-" +
        zeroPad((((b >> 4) & 0x0fff) | 0x4000).toString(16), 4) +
        "-" +
        zeroPad(((c & 0x3fff) | 0x8000).toString(16), 4) +
        "-" +
        zeroPad(((c >> 4) & 0xffff).toString(16), 4) +
        zeroPad(d.toString(16), 8));
    };
  }());
  proto.uuid4 = function () {
    return Random.uuid4(this.engine);
  };

  Random.string = (function () {
    // has 2**x chars, for faster uniform distribution
    var DEFAULT_STRING_POOL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

    return function (pool) {
      if (pool == null) {
        pool = DEFAULT_STRING_POOL;
      }

      var length = pool.length;
      if (!length) {
        throw new Error("Expected pool not to be an empty string");
      }

      var distribution = Random.integer(0, length - 1);
      return function (engine, length) {
        var result = "";
        for (var i = 0; i < length; ++i) {
          var j = distribution(engine);
          result += pool.charAt(j);
        }
        return result;
      };
    };
  }());
  proto.string = function (length, pool) {
    return Random.string(pool)(this.engine, length);
  };

  Random.hex = (function () {
    var LOWER_HEX_POOL = "0123456789abcdef";
    var lowerHex = Random.string(LOWER_HEX_POOL);
    var upperHex = Random.string(LOWER_HEX_POOL.toUpperCase());

    return function (upper) {
      if (upper) {
        return upperHex;
      } else {
        return lowerHex;
      }
    };
  }());
  proto.hex = function (length, upper) {
    return Random.hex(upper)(this.engine, length);
  };

  Random.date = function (start, end) {
    if (!(start instanceof Date)) {
      throw new TypeError("Expected start to be a Date, got " + typeof start);
    } else if (!(end instanceof Date)) {
      throw new TypeError("Expected end to be a Date, got " + typeof end);
    }
    var distribution = Random.integer(start.getTime(), end.getTime());
    return function (engine) {
      return new Date(distribution(engine));
    };
  };
  proto.date = function (start, end) {
    return Random.date(start, end)(this.engine);
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return Random;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module !== "undefined" && typeof require === "function") {
    module.exports = Random;
  } else {
    (function () {
      var oldGlobal = root[GLOBAL_KEY];
      Random.noConflict = function () {
        root[GLOBAL_KEY] = oldGlobal;
        return this;
      };
    }());
    root[GLOBAL_KEY] = Random;
  }
}(this));

/***/ }),
/* 28 */
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
const AssetManager_1 = __webpack_require__(7);
const InteractionLayer_1 = __webpack_require__(17);
const Provider_1 = __webpack_require__(0);
const RenderingPipeline_1 = __webpack_require__(19);
const RNG_1 = __webpack_require__(11);
const levels_1 = __webpack_require__(18);
const GameBoard_1 = __webpack_require__(8);
const Peg_1 = __webpack_require__(2);
const Slot_1 = __webpack_require__(6);
const Interstitial_1 = __webpack_require__(14);
const SplashScreen_1 = __webpack_require__(16);
const Button_1 = __webpack_require__(5);
const GameClock_1 = __webpack_require__(12);
const GameTimer_1 = __webpack_require__(9);
const ScoreDisplay_1 = __webpack_require__(15);
const ScoreManager_1 = __webpack_require__(10);
const GameOverScreen_1 = __webpack_require__(13);
class PegSolitaire {
    constructor() {
        this.needRestartConfirmation = false;
        document.body.innerHTML = '';
        this.pipeline = new RenderingPipeline_1.default(800, 600);
        this.pipeline.setBackground('#ececec');
        Provider_1.ServiceProvider.register(Provider_1.Service.PIPELINE, this.pipeline);
        this.registerCommonServices();
        const assetMan = new AssetManager_1.default();
        assetMan.loadAssets();
        document.body.appendChild(this.pipeline.getCanvas());
        this.startBGMusic();
        this.gotoSplashScreen();
    }
    registerCommonServices() {
        Provider_1.ServiceProvider.register(Provider_1.Service.RNG, RNG_1.default('silly string'));
        Provider_1.ServiceProvider.register(Provider_1.Service.UI, new InteractionLayer_1.default());
        Provider_1.ServiceProvider.register(Provider_1.Service.CLOCK, new GameClock_1.GameClock());
    }
    gotoSplashScreen() {
        if (!this.splash) {
            this.splash = new SplashScreen_1.default(800, 600);
            this.splash.on(SplashScreen_1.SplashScreenEvents.START, this.startGame.bind(this));
        }
        this.pipeline.clear();
        this.pipeline.addRenderer(this.splash, 0);
        if (this.gameOverScreen) {
            this.pipeline.removeRenderer(this.gameOverScreen);
            this.gameOverScreen.detach();
        }
        this.splash.attach();
    }
    gotoInterstitial(info) {
        Provider_1.ServiceProvider.lookup(Provider_1.Service.UI).unregisterAll();
        if (!this.interstitial) {
            this.interstitial = new Interstitial_1.default(800, 600);
            this.interstitial.on(Interstitial_1.InterstitialEvents.NEXT_LEVEL, () => {
                this.currentLevel += 1;
                this.totalScore += this.levelScore;
                this.totalPegsRemaining += info.numPegsRemaining;
                this.totalSlots += info.numSlots;
                this.totalTime += this.gameTimer.elapsed;
                this.loadMap(this.currentLevel);
            });
            this.interstitial.on(Interstitial_1.InterstitialEvents.RESTART_CURRENT, () => {
                this.resetCurrentLevel();
            });
        }
        this.interstitial.setRoundInfo(info, this.currentLevel + 1, this.levelScore, this.gameTimer.elapsed);
        this.interstitial.attach();
        this.pipeline.addRenderer(this.interstitial, 0);
    }
    gotoGameOverScreen() {
        Provider_1.ServiceProvider.lookup(Provider_1.Service.UI).unregisterAll();
        if (!this.gameOverScreen) {
            this.gameOverScreen = new GameOverScreen_1.default(800, 600);
            this.gameOverScreen.on(GameOverScreen_1.GameOverEvents.GO_HOME, () => {
                this.gotoSplashScreen();
            });
        }
        this.interstitial.detach();
        this.pipeline.removeRenderer(this.gameBoard);
        this.gameBoard.cleanupGame();
        this.pipeline.removeRenderer(this.interstitial);
        this.pipeline.removeRenderer(this.gameTimer);
        this.pipeline.removeRenderer(this.scoreDisplay);
        this.detachRestartButton();
        this.gameOverScreen.updateInfo({
            totalScore: this.totalScore,
            totalSlots: this.totalSlots,
            totalPegsRemaining: this.totalPegsRemaining,
            totalTime: this.totalTime,
        });
        this.gameOverScreen.attach();
        this.pipeline.addRenderer(this.gameOverScreen);
    }
    startBGMusic() {
        const sound = Provider_1.ServiceProvider.lookup(Provider_1.Service.SOUND);
        sound.play(AssetManager_1.GameSounds.MUSIC, true);
        sound.setSoundVolume(AssetManager_1.GameSounds.MUSIC, 0.65);
    }
    createCommonComponents() {
        this.gameTimer = new GameTimer_1.GameTimer();
        this.gameTimer.position[0] = 25;
        this.gameTimer.position[1] = 600 - 25;
        this.pipeline.addRenderer(this.gameTimer);
        this.scoreDisplay = new ScoreDisplay_1.default();
        this.scoreDisplay.position[0] = 800;
        this.scoreDisplay.position[1] = 600 - 25;
        this.pipeline.addRenderer(this.scoreDisplay);
        this.restartButton = new Button_1.Button('RESTART LEVEL', this.onRestartClick.bind(this));
        this.restartButton.isLowProfile = true;
        this.restartButton.position[0] = 650;
        this.restartButton.position[1] = 25;
        this.restartButton.height = 25;
        this.restartButton.paddingFactor = 0.2;
        this.restartButton.width = 125;
        this.attachRestartButton();
    }
    startGame() {
        if (this.splash) {
            this.splash.detach();
            this.pipeline.removeRenderer(this.splash);
        }
        this.currentLevel = 0;
        this.levelScore = 0;
        this.totalScore = 0;
        this.totalSlots = 0;
        this.totalPegsRemaining = 0;
        this.totalTime = 0;
        this.createCommonComponents();
        this.loadMap();
    }
    onRestartClick() {
        if (!this.needRestartConfirmation) {
            this.restartButton.label = 'ARE YOU SURE?';
            this.needRestartConfirmation = true;
            setTimeout(() => {
                this.restartButton.label = 'RESTART LEVEL';
                this.needRestartConfirmation = false;
            }, 5000);
        }
        else {
            this.restartButton.label = 'RESTART LEVEL';
            this.resetCurrentLevel();
        }
    }
    resetCurrentLevel() {
        this.loadMap();
    }
    attachRestartButton() {
        this.restartButton.enable();
        this.pipeline.addRenderer(this.restartButton);
    }
    detachRestartButton() {
        this.restartButton.disable();
        this.pipeline.removeRenderer(this.restartButton);
    }
    prepareForNextLevel() {
        if (this.gameBoard) {
            this.gameBoard.cleanupGame();
            this.pipeline.removeRenderer(this.gameBoard);
            this.detachRestartButton();
        }
        if (this.interstitial) {
            this.pipeline.removeRenderer(this.interstitial);
            this.interstitial.detach();
        }
        this.gameTimer.resetTime();
        this.gameTimer.disable();
        this.needRestartConfirmation = false;
        this.attachRestartButton();
        Peg_1.default.clearRenderCache();
        Slot_1.default.clearRenderCache();
        this.levelScore = 0;
        this.updateScoreDisplay(this.levelScore);
    }
    loadMap(index = this.currentLevel) {
        if (index >= levels_1.default.length) {
            this.gotoGameOverScreen();
            return;
        }
        this.prepareForNextLevel();
        const nextLevel = levels_1.default[index];
        if (!nextLevel) {
            throw new Error(`No map found for level "${index}"`);
        }
        this.setupSeededRNG(nextLevel.seed);
        this.createAndBindBoard(nextLevel);
        Provider_1.ServiceProvider.lookup(Provider_1.Service.CLOCK).start();
    }
    createAndBindBoard(options) {
        const LevelBoard = options.board;
        this.gameBoard = new LevelBoard(options);
        this.pipeline.addRenderer(this.gameBoard);
        this.gameBoard.on(GameBoard_1.GAME_EVENTS.GAME_OVER, this.onRoundEnd.bind(this));
        this.gameBoard.on(GameBoard_1.GAME_EVENTS.PEG_JUMPED, (consecutiveCount) => {
            const points = ScoreManager_1.default.DEFAULT_JUMP + (consecutiveCount * ScoreManager_1.default.CHECKERS_BONUS);
            this.onPlayerScore(points);
        });
        this.gameBoard.on(GameBoard_1.GAME_EVENTS.PEG_EXPLODED, () => {
            this.onPlayerScore(ScoreManager_1.default.EXPLODING_JUMP);
        });
        this.gameBoard.once(GameBoard_1.GAME_EVENTS.PEG_JUMPED, () => {
            this.gameTimer.enable();
        });
    }
    onPlayerScore(amount) {
        this.levelScore += amount;
        this.updateScoreDisplay(this.levelScore);
    }
    updateScoreDisplay(score) {
        this.scoreDisplay.points = score;
    }
    onRoundEnd(gameInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.gameBoard.disableAllPegs();
            this.gameTimer.disable();
            yield new Promise(resolve => setTimeout(resolve, 2000));
            this.gotoInterstitial(gameInfo);
        });
    }
    setupSeededRNG(seed) {
        Provider_1.ServiceProvider.unregister(Provider_1.Service.RNG);
        Provider_1.ServiceProvider.register(Provider_1.Service.RNG, RNG_1.default(seed));
    }
}
new PegSolitaire();


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map