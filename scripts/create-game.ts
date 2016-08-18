import {asteroid} from './models/asteroids';
import {spaceShip} from './models/space-ship';
import {kineticGraphicsEngine} from './graphics/engine';
import {graphics} from './contracts/igraphics';
import {objectFactory} from './shapes-factory/objects-factory';
import {player} from './models/player';
import {shapesFactory} from './graphics/shapes-factory'
import {asteroidsGame} from './game/asteroids-game';
import {IControls, keyboardControls} from './game/controls'

export function createGame() {
    var factory = new objectFactory()

    var shapeFactory = new shapesFactory();
    var stageOptions = {
        container: 'game',
        width: 960,
        height: 540
    };
    
    var engine = new kineticGraphicsEngine(stageOptions, 3, shapeFactory);
    var ship = factory.createObject('ship');
    var playerOne = new player(ship as spaceShip, 'player one');
    var controls = new keyboardControls();

    var game = new asteroidsGame(engine, playerOne, controls, factory);
    console.log('it works');

    return game;
}