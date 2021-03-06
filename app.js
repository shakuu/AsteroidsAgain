/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var create_game_1 = __webpack_require__(1);
	$(function () {
	    var logoContainer = initializeLogo();
	    var nameInput = $('<input />')
	        .attr('maxlength', '3')
	        .addClass('name-input');
	    var nameLableText = $('<span />')
	        .addClass('label-text-span')
	        .html('ID yourself, pilot!');
	    var nameLabel = $('<label />')
	        .addClass('name-label')
	        .append(nameLableText)
	        .append(nameInput);
	    var btnGo = $('<a />')
	        .addClass('btn-go')
	        .addClass('inactive')
	        .html('Ready and able!');
	    var nameInputContainer = $('<div />')
	        .addClass('name-input-container')
	        .append(nameLabel)
	        .append(btnGo)
	        .appendTo('#game');
	    nameInput.on('input', activateBtnGo);
	    btnGo.on('click', function () {
	        var playerName = getPlayerName();
	        var asteroids = create_game_1.createGame(playerName, logoContainer);
	        nameInputContainer.remove();
	        asteroids.displayMainScreen();
	    });
	    function activateBtnGo() {
	        var input = $(this);
	        if (input.val().length > 0) {
	            btnGo.removeClass('inactive');
	        }
	        else {
	            btnGo.addClass('inactive');
	        }
	    }
	    function getPlayerName() {
	        var inputText = nameInput.val();
	        if (inputText.length < 3) {
	            for (var i = inputText.length; i < 3; i += 1) {
	                inputText += ' ';
	            }
	        }
	        if (inputText.length > 3) {
	            inputText = inputText.substr(0, 3);
	        }
	        return inputText;
	    }
	    function initializeLogo() {
	        var links = [
	            { name: 'GitHub Repo', url: 'https://github.com/shakuu/AsteroidsGame' },
	            { name: 'TypeScript', url: 'http://www.typescriptlang.org/' },
	            { name: 'Kinetic.js', url: 'http://kineticjs.com/' },
	            { name: 'Express.js', url: 'http://expressjs.com/' },
	            { name: 'jQuery', url: 'http://jquery.com/' }
	        ];
	        var linkTemplate = $('<li />')
	            .addClass('link-item');
	        var linkTemplateAnchor = $('<a />')
	            .appendTo(linkTemplate);
	        var linksList = $('<ul />')
	            .addClass('links-list');
	        for (var i = 0; i < links.length; i += 1) {
	            linkTemplateAnchor
	                .html(links[i].name)
	                .attr('href', links[i].url);
	            linksList.append(linkTemplate.clone());
	        }
	        var heading = $('<h1 />')
	            .addClass('logo-heading')
	            .html('asteroids');
	        var logoContainer = $('<div />')
	            .addClass('logo-container')
	            .append(heading)
	            .append(linksList)
	            .appendTo('#game');
	        return logoContainer;
	    }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var engine_1 = __webpack_require__(2);
	var engine_plugins_1 = __webpack_require__(3);
	var objects_factory_1 = __webpack_require__(4);
	var player_1 = __webpack_require__(9);
	var shapes_factory_1 = __webpack_require__(10);
	var asteroids_game_1 = __webpack_require__(14);
	var controls_1 = __webpack_require__(15);
	var jquery_ui_1 = __webpack_require__(16);
	var high_score_client_1 = __webpack_require__(17);
	function createGame(playerName, logo) {
	    var factory = new objects_factory_1.objectFactory();
	    var shapeFactory = new shapes_factory_1.shapesFactory();
	    var stageOptions = {
	        container: 'game',
	        width: window.innerWidth,
	        height: window.innerHeight
	    };
	    // var scoreClient = new HighScoreLocalStorage();
	    var scoreClient = new high_score_client_1.MyServerHighScoreClient();
	    var gameCommands = new asteroids_game_1.asteroidsGameCommands();
	    var gameUi = new jquery_ui_1.jqueryGameUi(stageOptions, scoreClient, logo);
	    var engine = new engine_1.kineticGraphicsEngine(stageOptions, 3, shapeFactory);
	    var ship = factory.createObject(gameCommands.createShip);
	    var playerOne = new player_1.player(ship, playerName);
	    var controls = new controls_1.keyboardControls();
	    var game = new asteroids_game_1.asteroidsGame(engine, playerOne, controls, factory, gameCommands, gameUi);
	    var hiScorePlugin = new engine_plugins_1.ScoreTrackerKineticGraphicsPlugin('HI-SCORE ', 8, { x: stageOptions.width - 310, y: 10 });
	    var scoreGraphicsPlugin = new engine_plugins_1.ScoreTrackerKineticGraphicsPlugin('SCORE ', 8, { x: 10, y: 10 });
	    game.addHiScoreGraphicsPlugin(hiScorePlugin);
	    game.addScoreGraphicsPlugin(scoreGraphicsPlugin);
	    return game;
	}
	exports.createGame = createGame;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var kineticGraphicsEngine = (function () {
	    function kineticGraphicsEngine(stageOptions, numberOfLayers, shapesFactory) {
	        this.layers = [];
	        this.shapes = [];
	        this.plugins = [];
	        this.shapesFactory = shapesFactory;
	        this.stage = this.createStage(stageOptions.container, stageOptions.width, stageOptions.height);
	        this.layers = this.createLayers(numberOfLayers);
	        this.stageOptions = stageOptions;
	    }
	    kineticGraphicsEngine.prototype.createStage = function (containerId, width, height) {
	        var stage;
	        stage = new Kinetic.Stage({
	            container: containerId,
	            width: width,
	            height: height
	        });
	        return stage;
	    };
	    kineticGraphicsEngine.prototype.createLayers = function (amount) {
	        var layers = [];
	        for (var i = 0; i < amount; i += 1) {
	            var layer = new Kinetic.Layer();
	            layers.push(layer);
	            this.stage.add(layer);
	        }
	        return layers;
	    };
	    kineticGraphicsEngine.prototype.getStageOptions = function () {
	        return this.stageOptions;
	    };
	    kineticGraphicsEngine.prototype.addPlugin = function (plugin) {
	        this.plugins.push(plugin);
	        this.stage.add(plugin.Layer);
	    };
	    kineticGraphicsEngine.prototype.addShapes = function (type, id, position, layerId) {
	        var newShape = this.shapesFactory.createShape(type), position;
	        newShape.setPosition(position);
	        this.layers[layerId].add(newShape);
	        this.shapes[id] = newShape;
	        newShape.setId(id + '');
	        position = newShape.getPosition();
	        return position;
	    };
	    kineticGraphicsEngine.prototype.destroyShape = function (id) {
	        var shapeToRemove = this.shapes[id];
	        shapeToRemove.remove();
	        this.shapes[id] = null;
	    };
	    kineticGraphicsEngine.prototype.rotateShape = function (id, degree) {
	        var currentAngleOfRotationInDegrees, shapeToRotate = this.shapes[id];
	        shapeToRotate.rotate(degree);
	        currentAngleOfRotationInDegrees = shapeToRotate.getRotation();
	        return currentAngleOfRotationInDegrees % 360;
	    };
	    kineticGraphicsEngine.prototype.detectCollision = function (shapeId, layer) {
	        var shape = this.shapes[shapeId], layerToCheck = this.layers[layer];
	        var isColliding = layerToCheck.getIntersection(shape.getPosition());
	        return isColliding;
	    };
	    kineticGraphicsEngine.prototype.moveShape = function (id, position) {
	        var shapeToMove = this.shapes[id], shapeSize = shapeToMove.getSize();
	        if (this.checkLeft(position.x, shapeSize.height)) {
	            position.x = this.stageOptions.width + shapeSize.height;
	        }
	        else if (this.checkRight(position.x, shapeSize.height)) {
	            position.x = -shapeSize.height;
	        }
	        else if (this.checkTop(position.y, shapeSize.height)) {
	            position.y = this.stageOptions.height + shapeSize.height;
	        }
	        else if (this.checkBot(position.y, shapeSize.height)) {
	            position.y = -shapeSize.height;
	        }
	        shapeToMove.setPosition({ x: position.x, y: position.y });
	    };
	    kineticGraphicsEngine.prototype.moveShot = function (id, position) {
	        var outOfBounds, shotToMove = this.shapes[id], shapeSize = shotToMove.getSize();
	        outOfBounds = this.checkLeft(position.x, shapeSize.width) ||
	            this.checkRight(position.x, shapeSize.width) ||
	            this.checkTop(position.y, shapeSize.height) ||
	            this.checkBot(position.y, shapeSize.height);
	        if (outOfBounds) {
	            this.destroyShape(id);
	        }
	        else {
	            shotToMove.setPosition({ x: position.x, y: position.y });
	        }
	        return outOfBounds;
	    };
	    kineticGraphicsEngine.prototype.checkLeft = function (x, height) {
	        if (x + height < 0) {
	            return true;
	        }
	        return false;
	    };
	    kineticGraphicsEngine.prototype.checkRight = function (x, height) {
	        if (x - height > this.stageOptions.width) {
	            return true;
	        }
	        return false;
	    };
	    kineticGraphicsEngine.prototype.checkTop = function (y, height) {
	        if (y + height < 0) {
	            return true;
	        }
	        return false;
	    };
	    kineticGraphicsEngine.prototype.checkBot = function (y, height) {
	        if (y - height > this.stageOptions.height) {
	            return true;
	        }
	        return false;
	    };
	    kineticGraphicsEngine.prototype.nextFrame = function () {
	        for (var i = 0; i < this.layers.length; i += 1) {
	            this.layers[i].draw();
	        }
	        // for (let i = 0; i < this.plugins.length; i += 1) {
	        //     this.plugins[i].draw();
	        // }
	    };
	    kineticGraphicsEngine.prototype.clear = function () {
	        this.stage.clear();
	    };
	    kineticGraphicsEngine.prototype.removeAllGameShapes = function () {
	        for (var i = 0; i < this.layers.length; i += 1) {
	            this.layers[i].removeChildren();
	            this.layers[i].clear();
	        }
	        this.shapes = [];
	    };
	    return kineticGraphicsEngine;
	}());
	exports.kineticGraphicsEngine = kineticGraphicsEngine;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var KineticGraphicsPlugin = (function () {
	    function KineticGraphicsPlugin() {
	        this.layer = new Kinetic.Layer();
	    }
	    Object.defineProperty(KineticGraphicsPlugin.prototype, "Layer", {
	        get: function () {
	            return this.layer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    KineticGraphicsPlugin.prototype.update = function (content) {
	        this.layer.draw();
	    };
	    KineticGraphicsPlugin.prototype.draw = function () {
	        this.layer.draw();
	    };
	    return KineticGraphicsPlugin;
	}());
	exports.KineticGraphicsPlugin = KineticGraphicsPlugin;
	var ScoreTrackerKineticGraphicsPlugin = (function (_super) {
	    __extends(ScoreTrackerKineticGraphicsPlugin, _super);
	    function ScoreTrackerKineticGraphicsPlugin(label, contentLengthInCharacters, position) {
	        _super.call(this);
	        this.label = label;
	        this.contentLength = contentLengthInCharacters;
	        this.intializeTextShape(position);
	    }
	    ScoreTrackerKineticGraphicsPlugin.prototype.update = function (content) {
	        this.updateText(content);
	        _super.prototype.update.call(this, content);
	    };
	    ScoreTrackerKineticGraphicsPlugin.prototype.updateText = function (content) {
	        var len = this.contentLength - content.length;
	        for (var i = 0; i < len; i += 1) {
	            content = '0' + content;
	        }
	        this.kineticText.setText(this.label + content);
	    };
	    ScoreTrackerKineticGraphicsPlugin.prototype.intializeTextShape = function (position) {
	        var filler = '';
	        for (var i = 0; i < this.contentLength; i += 1) {
	            filler += '0';
	        }
	        this.kineticText = new Kinetic.Text({
	            x: position.x,
	            y: position.y,
	            height: 100,
	            width: 300,
	            text: this.label + filler,
	            fill: 'yellowgreen',
	            fontSize: 24
	        });
	        this.layer.add(this.kineticText);
	    };
	    return ScoreTrackerKineticGraphicsPlugin;
	}(KineticGraphicsPlugin));
	exports.ScoreTrackerKineticGraphicsPlugin = ScoreTrackerKineticGraphicsPlugin;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var asteroids_1 = __webpack_require__(5);
	var space_ship_1 = __webpack_require__(7);
	var ship_attacks_1 = __webpack_require__(8);
	var objectFactory = (function () {
	    function objectFactory() {
	        this.currentId = 0;
	    }
	    objectFactory.prototype.createObject = function (type) {
	        var newObject;
	        switch (type) {
	            case 'ship':
	                newObject = new space_ship_1.spaceShip(this.currentId);
	                this.currentId += 1;
	                break;
	            case 'basicAttack':
	                newObject = new ship_attacks_1.basicAttack(this.currentId);
	                this.currentId += 1;
	                break;
	            case 'largeAsteroid':
	                newObject = new asteroids_1.largeAsteroid(this.currentId);
	                this.currentId += 1;
	                break;
	            case 'mediumAsteroid':
	                newObject = new asteroids_1.mediumAsteroid(this.currentId);
	                this.currentId += 1;
	                break;
	            case 'smallAsteroid':
	                newObject = new asteroids_1.smallAsteroid(this.currentId);
	                this.currentId += 1;
	                break;
	            default:
	                break;
	        }
	        return newObject;
	    };
	    return objectFactory;
	}());
	exports.objectFactory = objectFactory;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var space_object_1 = __webpack_require__(6);
	var asteroid = (function (_super) {
	    __extends(asteroid, _super);
	    function asteroid(id, size, pointsReward, type) {
	        _super.call(this, id, type);
	        this.size = size;
	        this.reward = pointsReward;
	    }
	    Object.defineProperty(asteroid.prototype, "Reward", {
	        get: function () {
	            return this.reward;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(asteroid.prototype, "Size", {
	        get: function () {
	            return this.size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return asteroid;
	}(space_object_1.spaceObject));
	exports.asteroid = asteroid;
	var largeAsteroid = (function (_super) {
	    __extends(largeAsteroid, _super);
	    function largeAsteroid(id) {
	        _super.call(this, id, 3, 20, 'largeAsteroid');
	        this.maximumForwardSpeed = 0.1;
	        this.yawSpeed = 1;
	    }
	    return largeAsteroid;
	}(asteroid));
	exports.largeAsteroid = largeAsteroid;
	var mediumAsteroid = (function (_super) {
	    __extends(mediumAsteroid, _super);
	    function mediumAsteroid(id) {
	        _super.call(this, id, 2, 50, 'mediumAsteroid');
	        this.maximumForwardSpeed = 0.2;
	        this.yawSpeed = 1.25;
	    }
	    return mediumAsteroid;
	}(asteroid));
	exports.mediumAsteroid = mediumAsteroid;
	var smallAsteroid = (function (_super) {
	    __extends(smallAsteroid, _super);
	    function smallAsteroid(id) {
	        _super.call(this, id, 1, 100, 'smallAsteroid');
	        this.maximumForwardSpeed = 0.33;
	        this.yawSpeed = 1.5;
	    }
	    return smallAsteroid;
	}(asteroid));
	exports.smallAsteroid = smallAsteroid;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var spaceObject = (function () {
	    function spaceObject(id, type) {
	        this.minimumSpeed = 0;
	        this.yawSpeed = 0;
	        this.forwardSpeed = 0;
	        this.objectId = id;
	        this.type = type;
	    }
	    // x = cx + r * cos(a)
	    // y = cy + r * sin(a)
	    spaceObject.prototype.getForwardMotionDelta = function (rotationInDegrees) {
	        var deltaX, deltaY, rotationInRadians = (rotationInDegrees - 90) * Math.PI / 180;
	        deltaX = 10 * Math.cos(rotationInRadians);
	        deltaY = 10 * Math.sin(rotationInRadians);
	        return { deltaX: deltaX, deltaY: deltaY, speed: 0 };
	    };
	    spaceObject.prototype.createForwardMotion = function (forwardMotionToAdd) {
	        forwardMotionToAdd.speed = this.maximumForwardSpeed;
	        this.forwardMotion = forwardMotionToAdd;
	    };
	    spaceObject.prototype.applyForwardMotion = function () {
	        var currentPosition = this.position;
	        currentPosition.x += this.forwardMotion.deltaX * this.forwardMotion.speed;
	        currentPosition.y += this.forwardMotion.deltaY * this.forwardMotion.speed;
	        this.position = currentPosition;
	    };
	    return spaceObject;
	}());
	exports.spaceObject = spaceObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var space_object_1 = __webpack_require__(6);
	var spaceShip = (function (_super) {
	    __extends(spaceShip, _super);
	    function spaceShip(id) {
	        _super.call(this, id, 'ship');
	        this.forwardMotions = [];
	        this.setStats();
	    }
	    spaceShip.prototype.setStats = function () {
	        this.maximumYawSpeed = 5;
	        this.yawAcceleration = 0.25;
	        this.yawDeceleration = 0.10;
	        this.maximumForwardSpeed = 0.025;
	        this.forwardAcceleration = 0.05;
	        this.forwardDeceleration = 0.0005;
	        this.minimumTimeBetweenShots = 333;
	    };
	    Object.defineProperty(spaceShip.prototype, "MinimumTimeBetweenShots", {
	        get: function () {
	            return this.minimumTimeBetweenShots;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    spaceShip.prototype.increseYawSpeed = function () {
	        this.yawSpeed += this.yawAcceleration;
	        if (this.yawSpeed > this.maximumYawSpeed) {
	            this.yawSpeed = this.maximumYawSpeed;
	        }
	    };
	    spaceShip.prototype.decreaseYawSpeed = function () {
	        this.yawSpeed -= this.yawAcceleration;
	        if (this.yawSpeed < -this.maximumYawSpeed) {
	            this.yawSpeed = -this.maximumYawSpeed;
	        }
	    };
	    spaceShip.prototype.decelerateYawSpeed = function () {
	        if (this.yawSpeed < 0) {
	            this.yawSpeed += this.yawDeceleration;
	            if (this.yawSpeed > 0) {
	                this.yawSpeed = 0;
	            }
	        }
	        else if (this.yawSpeed > 0) {
	            this.yawSpeed -= this.yawDeceleration;
	            if (this.yawSpeed < 0) {
	                this.yawSpeed = 0;
	            }
	        }
	    };
	    spaceShip.prototype.createForwarMotion = function (forwardMotionToAdd) {
	        forwardMotionToAdd.speed = this.maximumForwardSpeed;
	        this.forwardMotions.filter(function (existingForwardMotion) {
	            var result = existingForwardMotion.deltaX === forwardMotionToAdd.deltaX &&
	                existingForwardMotion.deltaY === forwardMotionToAdd.deltaY;
	            return !result;
	        });
	        this.forwardMotions.push(forwardMotionToAdd);
	    };
	    spaceShip.prototype.decelerateForwardMotions = function () {
	        for (var i = 0; i < this.forwardMotions.length; i += 1) {
	            this.forwardMotions[i].speed -= this.forwardDeceleration;
	            if (this.forwardMotions[i].speed <= 0) {
	                this.forwardMotions.splice(i, 1);
	            }
	        }
	    };
	    spaceShip.prototype.applyForwardMotions = function () {
	        var currentMotion, currentPosition = this.position;
	        for (var i = 0; i < this.forwardMotions.length; i += 1) {
	            currentMotion = this.forwardMotions[i];
	            currentPosition.x += currentMotion.deltaX * currentMotion.speed;
	            currentPosition.y += currentMotion.deltaY * currentMotion.speed;
	        }
	        this.position = currentPosition;
	    };
	    spaceShip.prototype.clearAllMovement = function () {
	        this.forwardMotions = [];
	        this.yawSpeed = 0;
	    };
	    return spaceShip;
	}(space_object_1.spaceObject));
	exports.spaceShip = spaceShip;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var space_object_1 = __webpack_require__(6);
	var attack = (function (_super) {
	    __extends(attack, _super);
	    // private forwardMotion: forwardMotion;
	    function attack(id, type) {
	        _super.call(this, id, 'basicAttack');
	    }
	    return attack;
	}(space_object_1.spaceObject));
	exports.attack = attack;
	var basicAttack = (function (_super) {
	    __extends(basicAttack, _super);
	    function basicAttack(id) {
	        _super.call(this, id, 'basicAttack');
	        this.maximumForwardSpeed = 1;
	    }
	    return basicAttack;
	}(attack));
	exports.basicAttack = basicAttack;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var player = (function () {
	    function player(ship, name) {
	        this.score = 0;
	        this.gameOver = false;
	        this.ship = ship;
	        this.name = name;
	    }
	    Object.defineProperty(player.prototype, "Ship", {
	        get: function () {
	            return this.ship;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(player.prototype, "Name", {
	        get: function () {
	            return this.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(player.prototype, "Score", {
	        get: function () {
	            return this.score;
	        },
	        set: function (score) {
	            this.score = score;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return player;
	}());
	exports.player = player;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var large_asteroids_1 = __webpack_require__(11);
	var medium_asteroids_1 = __webpack_require__(12);
	var small_asteroids_1 = __webpack_require__(13);
	var shapesFactory = (function () {
	    function shapesFactory() {
	    }
	    shapesFactory.prototype.createShape = function (type) {
	        var newShape;
	        switch (type) {
	            case 'ship':
	                newShape = createShipShape();
	                break;
	            case 'basicAttack':
	                newShape = createBasicAttackShape();
	                break;
	            case 'largeAsteroid':
	                newShape = createLargeAsteroid();
	                break;
	            case 'mediumAsteroid':
	                newShape = createMediumAsteroid();
	                break;
	            case 'smallAsteroid':
	                newShape = createSmallAsteroid();
	                break;
	        }
	        return newShape;
	    };
	    return shapesFactory;
	}());
	exports.shapesFactory = shapesFactory;
	function createLargeAsteroid() {
	    var newShape, typeNr = getRandomInt(1, 2);
	    switch (typeNr) {
	        case 1:
	            newShape = large_asteroids_1.createLargeAsteroidTypeOne();
	            break;
	        case 2:
	            newShape = large_asteroids_1.createLargeAsteroidTypeTwo();
	            break;
	        default:
	            newShape = large_asteroids_1.createLargeAsteroidTypeOne();
	            break;
	    }
	    return newShape;
	}
	function createMediumAsteroid() {
	    var newShape, typeNr = getRandomInt(1, 3);
	    switch (typeNr) {
	        case 1:
	            newShape = medium_asteroids_1.createMediumAsteroidTypeOne();
	            break;
	        case 2:
	            newShape = medium_asteroids_1.createMediumAsteroidTypeTwo();
	            break;
	        case 3:
	            newShape = medium_asteroids_1.createMediumAsteroidTypeThree();
	            break;
	        default:
	            newShape = medium_asteroids_1.createMediumAsteroidTypeOne();
	            break;
	    }
	    return newShape;
	}
	function createSmallAsteroid() {
	    var newShape, typeNr = getRandomInt(1, 2);
	    switch (typeNr) {
	        case 1:
	            newShape = small_asteroids_1.createSmallAsteroidTypeOne();
	            break;
	        case 2:
	            newShape = small_asteroids_1.createSmallAsteroidTypeTwo();
	            break;
	        default:
	            newShape = small_asteroids_1.createSmallAsteroidTypeOne();
	            break;
	    }
	    return newShape;
	}
	function createShipShape() {
	    var newShape = new Kinetic.Line({
	        x: 470,
	        y: 250,
	        points: [10, 0, 20, 40, 0, 40, 10, 0],
	        width: 20,
	        height: 40,
	        stroke: 'yellowgreen',
	        closed: true,
	        fill: 'transparent',
	        offset: { x: 10, y: 20 }
	    });
	    return newShape;
	}
	function createBasicAttackShape() {
	    var newShape = new Kinetic.Rect({
	        x: 0,
	        y: 0,
	        width: 10,
	        height: 10,
	        fill: 'yellowgreen',
	        offset: {
	            x: 5,
	            y: 5
	        }
	    });
	    return newShape;
	}
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	function createLargeAsteroidTypeOne() {
	    // 160x160
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            40, 0,
	            80, 0,
	            160, 20,
	            160, 80,
	            40, 160,
	            0, 120,
	            0, 40,
	            40, 0
	        ],
	        closed: true,
	        width: 160,
	        height: 160,
	        stroke: 'yellowgreen',
	        fill: 'transparent',
	        offset: { x: 80, y: 80 }
	    });
	    return newShape;
	}
	exports.createLargeAsteroidTypeOne = createLargeAsteroidTypeOne;
	function createLargeAsteroidTypeTwo() {
	    // 160x160
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            0, 0,
	            80, 0,
	            160, 80,
	            160, 160,
	            80, 160,
	            0, 160,
	            0, 100,
	            60, 80,
	            0, 0
	        ],
	        closed: true,
	        width: 160,
	        height: 160,
	        stroke: 'yellowgreen',
	        fill: 'transparent',
	        offset: { x: 80, y: 80 }
	    });
	    return newShape;
	}
	exports.createLargeAsteroidTypeTwo = createLargeAsteroidTypeTwo;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	function createMediumAsteroidTypeOne() {
	    // 80x80
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            30, 0,
	            70, 0,
	            80, 50,
	            70, 80,
	            10, 80,
	            0, 30,
	            30, 0
	        ],
	        closed: true,
	        width: 80,
	        height: 80,
	        stroke: 'yellowgreen',
	        fill: 'transparent',
	        offset: { x: 40, y: 40 }
	    });
	    return newShape;
	}
	exports.createMediumAsteroidTypeOne = createMediumAsteroidTypeOne;
	function createMediumAsteroidTypeTwo() {
	    // 80x80
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            0, 0,
	            50, 30,
	            60, 0,
	            80, 80,
	            50, 50,
	            20, 80,
	            0, 80,
	            30, 40,
	            0, 0
	        ],
	        closed: true,
	        width: 80,
	        height: 80,
	        stroke: 'yellowgreen',
	        fill: 'transparent',
	        offset: { x: 40, y: 40 }
	    });
	    return newShape;
	}
	exports.createMediumAsteroidTypeTwo = createMediumAsteroidTypeTwo;
	function createMediumAsteroidTypeThree() {
	    // 80x80
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            20, 0,
	            30, 10,
	            60, 0,
	            80, 60,
	            40, 80,
	            30, 70,
	            30, 60,
	            0, 30,
	            20, 0
	        ],
	        closed: true,
	        width: 80,
	        height: 80,
	        stroke: 'yellowgreen',
	        fill: 'transparent',
	        offset: { x: 40, y: 40 }
	    });
	    return newShape;
	}
	exports.createMediumAsteroidTypeThree = createMediumAsteroidTypeThree;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	function createSmallAsteroidTypeOne() {
	    // 40x40
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            0, 0,
	            30, 0,
	            40, 40,
	            0, 30,
	            0, 0
	        ],
	        closed: true,
	        width: 40,
	        height: 40,
	        stroke: 'yellowgreen',
	        fill: 'transparent',
	        offset: { x: 20, y: 20 }
	    });
	    return newShape;
	}
	exports.createSmallAsteroidTypeOne = createSmallAsteroidTypeOne;
	function createSmallAsteroidTypeTwo() {
	    // 40x40
	    var newShape = new Kinetic.Line({
	        x: 200,
	        y: 200,
	        points: [
	            30, 0,
	            30, 20,
	            40, 30,
	            40, 40,
	            20, 40,
	            0, 30,
	            0, 10,
	            30, 0
	        ],
	        closed: true,
	        width: 40,
	        height: 40,
	        stroke: 'yellowgreen',
	        fill: 'transparent',
	        offset: { x: 20, y: 20 }
	    });
	    return newShape;
	}
	exports.createSmallAsteroidTypeTwo = createSmallAsteroidTypeTwo;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var asteroidsGameCommands = (function () {
	    function asteroidsGameCommands() {
	        this.createShip = 'ship';
	        this.createBasicAttack = 'basicAttack';
	        this.createLargeAsteroid = 'largeAsteroid';
	        this.createMediumAsteroid = 'mediumAsteroid';
	        this.createSmallAsteroid = 'smallAsteroid';
	    }
	    return asteroidsGameCommands;
	}());
	exports.asteroidsGameCommands = asteroidsGameCommands;
	var asteroidsGame = (function () {
	    function asteroidsGame(engine, player, controls, factory, commands, gameUi) {
	        var _this = this;
	        this.asteroids = [];
	        this.shots = [];
	        this.lastKilledAsteroidReward = 0;
	        this.lastKilledAsteroidSize = 0;
	        this.shipLayerId = 0;
	        this.asteroidsLayerId = 1;
	        this.shotsLayerId = 2;
	        this.start = null;
	        this.shipLastShotTimestamp = 0;
	        this.shipCanShoot = false;
	        this.asteroidSpawnTimestamp = 0;
	        this.asteroidSpawnInterval = 20000;
	        this.asteroidSpawnIntervamMinimumValue = 5000;
	        this.asteroidSpawnIntervalDecreasingStep = 2500;
	        this.lastCollisionDetectionTimeStamp = 0;
	        this.Start = function () {
	            _this.scoreGraphicsPlugin.update(_this.player.Score.toString());
	            _this.hiScoreGraphicsPlugin.update(_this.gameUi.currentHighScore);
	            _this.gameUi.displayGameScreen(_this.controls.evaluateKeyDown, _this.controls.evaluateKeyUp);
	            _this.player.Ship.position = _this.getInitialShipPosition();
	            _this.engine.addShapes(_this.player.Ship.type, _this.player.Ship.objectId, _this.player.Ship.position, _this.shipLayerId);
	            _this.createNewAsteroid(_this.commands.createLargeAsteroid, { x: 200, y: 200 });
	            _this.createNewAsteroid(_this.commands.createLargeAsteroid, { x: 900, y: 360 });
	            window.requestAnimationFrame(_this.run);
	        };
	        this.run = function (timestamp) {
	            _this.currentTimestamp = timestamp;
	            if (!_this.start) {
	                _this.start = timestamp;
	            }
	            // Game logic related timers:
	            if (timestamp - _this.shipLastShotTimestamp > _this.player.Ship.MinimumTimeBetweenShots) {
	                _this.shipCanShoot = true;
	            }
	            else {
	                _this.shipCanShoot = false;
	            }
	            if (timestamp - _this.asteroidSpawnTimestamp > _this.asteroidSpawnInterval) {
	                var position = _this.getRandomAsteroidPosition(_this.player.Ship.position);
	                _this.createNewAsteroid(_this.commands.createLargeAsteroid, position);
	                _this.asteroidSpawnTimestamp = timestamp;
	                _this.asteroidSpawnInterval = _this.asteroidSpawnInterval > _this.asteroidSpawnIntervamMinimumValue ?
	                    _this.asteroidSpawnInterval - _this.asteroidSpawnIntervalDecreasingStep : _this.asteroidSpawnIntervamMinimumValue;
	            }
	            _this.gameLogic();
	            // Collision detection interval, affects performance
	            if (timestamp - _this.lastCollisionDetectionTimeStamp > 50) {
	                _this.collisionDetection();
	                _this.lastCollisionDetectionTimeStamp = timestamp;
	            }
	            // Fixed framerate.
	            if (timestamp - _this.start > 1000 / 60) {
	                _this.start = null;
	                _this.engine.nextFrame();
	            }
	            if (!_this.player.gameOver) {
	                window.requestAnimationFrame(_this.run);
	            }
	            else {
	                _this.gameOver();
	            }
	            if (_this.controls.pause) {
	                _this.gameOver();
	            }
	        };
	        this.engine = engine;
	        this.player = player;
	        this.factory = factory;
	        this.controls = controls;
	        this.commands = commands;
	        this.gameUi = gameUi;
	    }
	    asteroidsGame.prototype.addScoreGraphicsPlugin = function (plugin) {
	        this.scoreGraphicsPlugin = plugin;
	        this.engine.addPlugin(plugin);
	    };
	    asteroidsGame.prototype.addHiScoreGraphicsPlugin = function (plugin) {
	        this.hiScoreGraphicsPlugin = plugin;
	        this.engine.addPlugin(plugin);
	    };
	    Object.defineProperty(asteroidsGame.prototype, "Controls", {
	        get: function () {
	            return this.controls;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    asteroidsGame.prototype.displayMainScreen = function () {
	        this.engine.clear();
	        this.player.gameOver = false;
	        this.gameUi.displayMainScreen(this.Start);
	    };
	    asteroidsGame.prototype.getInitialShipPosition = function () {
	        var stage = this.engine.getStageOptions();
	        var position = {
	            x: (stage.width - 20) / 2,
	            y: (stage.height - 40) / 2
	        };
	        return position;
	    };
	    asteroidsGame.prototype.getRandomAsteroidPosition = function (shipPosition) {
	        var stage = this.engine.getStageOptions();
	        var newPosition = {
	            x: 0,
	            y: 0
	        };
	        if (shipPosition.x <= stage.width / 2) {
	            newPosition.x = stage.width - 1000;
	        }
	        else {
	            newPosition.x = stage.width + 1000;
	        }
	        if (shipPosition.y <= stage.height / 2) {
	            newPosition.y = stage.height - 1000;
	        }
	        else {
	            newPosition.y = stage.height + 1000;
	        }
	        return newPosition;
	    };
	    asteroidsGame.prototype.createNewAsteroid = function (type, position) {
	        var newAsteroid = this.factory.createObject(type);
	        newAsteroid.position = {
	            x: position.x,
	            y: position.y
	        };
	        this.engine.addShapes(newAsteroid.type, newAsteroid.objectId, newAsteroid.position, this.asteroidsLayerId);
	        var angle = this.getRandomInt(0, 360);
	        var delta = newAsteroid.getForwardMotionDelta(angle);
	        newAsteroid.createForwardMotion(delta);
	        var newAsteroidSpeed = this.getRandomInt(75, 200) / 100;
	        if (this.getRandomInt(0, 100) < 50) {
	            newAsteroidSpeed *= -1;
	        }
	        newAsteroid.yawSpeed = newAsteroidSpeed;
	        this.asteroids.push(newAsteroid);
	    };
	    asteroidsGame.prototype.getRandomInt = function (min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    };
	    asteroidsGame.prototype.collisionDetection = function () {
	        this.checkPlayerCollision();
	        this.checkAsteroidCollision();
	    };
	    asteroidsGame.prototype.gameLogic = function () {
	        // Decelerate
	        this.deceleratePlayerShip();
	        // Read Controls and Accelerate
	        this.handleUserInput();
	        // Move/ Rotate
	        this.applyPlayerShipMovement();
	        this.applyAsteroidsMovement();
	        this.applyShotsMovement();
	    };
	    asteroidsGame.prototype.checkPlayerCollision = function () {
	        var isColliding = this.engine.detectCollision(this.player.Ship.objectId, this.asteroidsLayerId);
	        if (isColliding) {
	            this.player.gameOver = true;
	        }
	    };
	    asteroidsGame.prototype.checkAsteroidCollision = function () {
	        var isColliding, current;
	        for (var i = 0; i < this.shots.length; i += 1) {
	            current = this.shots[i];
	            isColliding = null;
	            isColliding = this.engine.detectCollision(current.objectId, this.asteroidsLayerId);
	            if (isColliding) {
	                var collidingShapeObjectId = +isColliding.getId();
	                this.removeShapeWithObjectId(collidingShapeObjectId);
	                this.player.Score += this.lastKilledAsteroidReward;
	                this.scoreGraphicsPlugin.update(this.player.Score.toString());
	                var position = isColliding.getPosition();
	                var newAsteroidsOptions = this.getCreateNewAsteroidsAfterKillOptions(this.lastKilledAsteroidSize);
	                for (var j = 0; j < newAsteroidsOptions.numberOfNewAsteroids; j += 1) {
	                    this.createNewAsteroid(newAsteroidsOptions.typeOfNewAsteroidsCommand, position);
	                }
	                // Destroy Shot
	                isColliding.remove();
	                isColliding.destroy();
	                this.engine.destroyShape(current.objectId);
	                this.shots.splice(i, 1);
	                i -= 1;
	            }
	        }
	    };
	    asteroidsGame.prototype.getCreateNewAsteroidsAfterKillOptions = function (killedAsteroidSize) {
	        var options, numberOfNewAsteroids = 0, typeOfAsteroidCommand = '';
	        if (this.lastKilledAsteroidSize === 3) {
	            numberOfNewAsteroids = 3;
	            typeOfAsteroidCommand = this.commands.createMediumAsteroid;
	        }
	        else if (this.lastKilledAsteroidSize == 2) {
	            numberOfNewAsteroids = 4;
	            typeOfAsteroidCommand = this.commands.createSmallAsteroid;
	        }
	        else {
	            numberOfNewAsteroids = 0;
	            typeOfAsteroidCommand = null;
	        }
	        options = {
	            numberOfNewAsteroids: numberOfNewAsteroids,
	            typeOfNewAsteroidsCommand: typeOfAsteroidCommand
	        };
	        return options;
	    };
	    asteroidsGame.prototype.removeShapeWithObjectId = function (id) {
	        var _this = this;
	        this.asteroids.filter(function (asteroid) {
	            var keepAsteroid = true;
	            if (asteroid.objectId === id) {
	                _this.lastKilledAsteroidReward = asteroid.Reward;
	                _this.lastKilledAsteroidSize = asteroid.Size;
	                keepAsteroid = false;
	            }
	            return keepAsteroid;
	        });
	    };
	    asteroidsGame.prototype.deceleratePlayerShip = function () {
	        this.player.Ship.decelerateYawSpeed();
	        this.player.Ship.decelerateForwardMotions();
	    };
	    asteroidsGame.prototype.handleUserInput = function () {
	        if (this.controls.rotateLeft) {
	            this.player.Ship.decreaseYawSpeed();
	        }
	        if (this.controls.rotateRight) {
	            this.player.Ship.increseYawSpeed();
	        }
	        if (this.controls.moveUp) {
	            var forwardMotion = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);
	            this.player.Ship.createForwarMotion(forwardMotion);
	        }
	        if (this.controls.shoot && this.shipCanShoot) {
	            this.shipLastShotTimestamp = this.currentTimestamp;
	            this.createNewShot();
	        }
	    };
	    asteroidsGame.prototype.applyAsteroidsMovement = function () {
	        for (var i = 0; i < this.asteroids.length; i += 1) {
	            var current = this.asteroids[i];
	            current.applyForwardMotion();
	            current.currentYawAngleInDegrees = this.engine.rotateShape(current.objectId, current.yawSpeed);
	            this.engine.moveShape(current.objectId, current.position);
	        }
	    };
	    asteroidsGame.prototype.applyPlayerShipMovement = function () {
	        this.player.Ship.currentYawAngleInDegrees =
	            this.engine.rotateShape(this.player.Ship.objectId, this.player.Ship.yawSpeed);
	        this.player.Ship.applyForwardMotions();
	        this.engine.moveShape(this.player.Ship.objectId, this.player.Ship.position);
	    };
	    asteroidsGame.prototype.applyShotsMovement = function () {
	        for (var i = 0; i < this.shots.length; i += 1) {
	            this.shots[i].applyForwardMotion();
	            var isOutOfBounds = this.engine.moveShot(this.shots[i].objectId, this.shots[i].position);
	            if (isOutOfBounds) {
	                this.shots.splice(i, 1);
	                i -= 1;
	            }
	        }
	    };
	    asteroidsGame.prototype.createNewShot = function () {
	        var newShot = this.factory.createObject(this.commands.createBasicAttack);
	        var forwardMotionDelta = this.player.Ship.getForwardMotionDelta(this.player.Ship.currentYawAngleInDegrees);
	        this.shots.push(newShot);
	        newShot.position = {
	            x: this.player.Ship.position.x + forwardMotionDelta.deltaX,
	            y: this.player.Ship.position.y + forwardMotionDelta.deltaY
	        };
	        newShot.position = this.engine.addShapes(newShot.type, newShot.objectId, newShot.position, this.shotsLayerId);
	        newShot.createForwardMotion(forwardMotionDelta);
	    };
	    asteroidsGame.prototype.gameOver = function () {
	        this.asteroids = [];
	        this.shots = [];
	        this.gameUi.displayGameOverScreen(this.player.Score, this.player.Name);
	        this.gameUi.displayMainScreen(this.Start);
	        this.engine.removeAllGameShapes();
	        this.engine.clear();
	        this.controls.resetState();
	        this.asteroidSpawnInterval = 20000;
	        this.player.Ship.clearAllMovement();
	        this.player.gameOver = false;
	        this.player.Score = 0;
	    };
	    return asteroidsGame;
	}());
	exports.asteroidsGame = asteroidsGame;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	var keyboardControls = (function () {
	    function keyboardControls() {
	        var _this = this;
	        this.moveUp = false;
	        this.moveDown = false;
	        this.rotateLeft = false;
	        this.rotateRight = false;
	        this.shoot = false;
	        this.pause = false;
	        this.evaluateKeyDown = function (keyCode) {
	            _this.setValue(keyCode, true);
	        };
	        this.evaluateKeyUp = function (keyCode) {
	            _this.setValue(keyCode, false);
	        };
	        this.setValue = function (keyCode, value) {
	            switch (keyCode) {
	                case 37:
	                    _this.rotateLeft = value;
	                    break;
	                case 38:
	                    _this.moveUp = value;
	                    break;
	                case 39:
	                    _this.rotateRight = value;
	                    break;
	                case 40:
	                    _this.moveDown = value;
	                    break;
	                case 32:
	                    _this.shoot = value;
	                    break;
	                case 27:
	                    _this.pause = value;
	                    break;
	                default:
	                    break;
	            }
	        };
	    }
	    keyboardControls.prototype.resetState = function () {
	        this.moveUp = false;
	        this.moveDown = false;
	        this.rotateLeft = false;
	        this.rotateRight = false;
	        this.shoot = false;
	        this.pause = false;
	    };
	    return keyboardControls;
	}());
	exports.keyboardControls = keyboardControls;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	var jqueryGameUi = (function () {
	    function jqueryGameUi(options, scoreClient, logo) {
	        var _this = this;
	        this.documentRoot = $(':root');
	        this.hiScoreStringLenght = 27;
	        this.displayTopScores = function () {
	            _this.btnMenu.hide();
	            _this.btnScore.removeClass('hovered');
	            _this.scoreClient.getScoreList(3, _this.populateHighScoreList);
	        };
	        this.populateHighScoreList = function (data) {
	            _this.hiScoreBackground = $('<div />')
	                .addClass('inactive-background')
	                .appendTo('body')
	                .on('click', _this.restoreStateBeforeHiScoreMenu);
	            var container = $('<div />')
	                .addClass('high-score-list')
	                .appendTo(_this.hiScoreBackground);
	            var itemScore = $('<span />')
	                .addClass('item-score');
	            var item = $('<div />')
	                .addClass('high-score-item')
	                .append(itemScore);
	            var newHiScoreString = '';
	            for (var i in data) {
	                newHiScoreString = _this.generateHiScoreString(data[i].name, data[i].score.toString());
	                itemScore.html(newHiScoreString);
	                container.append(item.clone());
	            }
	            container
	                .children('.high-score-item')
	                .first().addClass('first')
	                .next().addClass('second')
	                .next().addClass('third');
	        };
	        this.restoreStateBeforeHiScoreMenu = function (event) {
	            _this.btnMenu.show();
	            _this.hiScoreBackground.off('click').remove();
	        };
	        this.scoreClient = scoreClient;
	        this.options = options;
	        this.initializeElements();
	        this.logo = logo;
	    }
	    Object.defineProperty(jqueryGameUi.prototype, "currentHighScore", {
	        get: function () {
	            return this.scoreClient.currentHighScore;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    jqueryGameUi.prototype.initializeElements = function () {
	        this.scoreClient.updateCurrentHighScore();
	        this.root = $('#' + this.options.container);
	        this.kineticStage = this.root.children('.kineticjs-content');
	        this.btnMenu = $('<div />')
	            .addClass('start-menu')
	            .css({
	            'left': ((this.options.width - 160) / 2) + 'px',
	            'top': ((this.options.height - 160) / 2) + 'px'
	        });
	        this.btnStart = $('<a />')
	            .addClass('start-button')
	            .addClass('button')
	            .html('START')
	            .appendTo(this.btnMenu);
	        this.btnScore = $('<a />')
	            .addClass('score-button')
	            .addClass('button')
	            .html('HI-SCORE')
	            .appendTo(this.btnMenu);
	    };
	    jqueryGameUi.prototype.displayMainScreen = function (startGameFunction) {
	        this.kineticStage.hide();
	        this.logo.appendTo(this.root);
	        this.btnMenu
	            .appendTo(this.root)
	            .on('mouseenter', '.button', function (event) {
	            $(event.target).addClass('hovered');
	        }).on('mouseleave', '.button', function (event) {
	            $(event.target).removeClass('hovered');
	        });
	        this.btnStart.on('click', function () {
	            $(this).removeClass('hovered');
	            startGameFunction();
	        });
	        this.btnScore.on('click', this.displayTopScores);
	    };
	    jqueryGameUi.prototype.displayGameScreen = function (keyDownHandler, keyUpHandler) {
	        this.logo.remove();
	        this.btnMenu
	            .off('mouseenter')
	            .off('mouseleave')
	            .remove();
	        this.btnStart.off('click');
	        this.btnScore.off('click');
	        this.kineticStage.show();
	        this.documentRoot.on('keydown', function (event) {
	            event.preventDefault();
	            keyDownHandler(event.keyCode);
	        });
	        this.documentRoot.on('keyup', function (event) {
	            event.preventDefault();
	            keyUpHandler(event.keyCode);
	        });
	    };
	    jqueryGameUi.prototype.displayGameOverScreen = function (score, name) {
	        this.documentRoot.off('keydown');
	        this.documentRoot.off('keyup');
	        this.scoreClient.submitScore(score, name);
	    };
	    jqueryGameUi.prototype.generateHiScoreString = function (name, score) {
	        var hiScoreString = name;
	        var currentStringLenght = hiScoreString.length;
	        for (var i = currentStringLenght; i < this.hiScoreStringLenght - 8; i += 1) {
	            hiScoreString += '.';
	        }
	        var scoreStringLength = score.length;
	        currentStringLenght = hiScoreString.length;
	        for (var i = currentStringLenght; i < this.hiScoreStringLenght - scoreStringLength; i += 1) {
	            hiScoreString += '0';
	        }
	        hiScoreString += score;
	        return hiScoreString;
	    };
	    return jqueryGameUi;
	}());
	exports.jqueryGameUi = jqueryGameUi;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	var MyServerHighScoreClient = (function () {
	    function MyServerHighScoreClient() {
	        var _this = this;
	        this.url = window.location.href;
	        this.assignHighScore = function (score) {
	            _this.highScore = +score;
	        };
	    }
	    Object.defineProperty(MyServerHighScoreClient.prototype, "currentHighScore", {
	        get: function () {
	            if (this.highScore) {
	                return this.highScore.toString();
	            }
	            else {
	                return '0';
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MyServerHighScoreClient.prototype.submitScore = function (score, name) {
	        var submitScoreUrl = this.url + 'score/' + score.toString() + '/name/' + name;
	        $.get(submitScoreUrl, function () { });
	        this.updateCurrentHighScore();
	        return false;
	    };
	    MyServerHighScoreClient.prototype.getScoreList = function (amount, callback) {
	        var url = this.url + 'get/top/' + amount;
	        $.get(url, callback);
	        return '';
	    };
	    MyServerHighScoreClient.prototype.updateCurrentHighScore = function () {
	        var updateCurrentHighScoreUrl = this.url + 'get/hiscore';
	        $.get(updateCurrentHighScoreUrl, this.assignHighScore);
	    };
	    return MyServerHighScoreClient;
	}());
	exports.MyServerHighScoreClient = MyServerHighScoreClient;


/***/ }
/******/ ]);