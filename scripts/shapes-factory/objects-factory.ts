import {factory} from './contract';
import {spaceObject} from '../models/space-object';
import {asteroid} from '../models/asteroids';
import {spaceShip} from '../models/space-ship';

export class objectFactory implements factory {

    private currentId: number;

    constructor() {
        this.currentId = 0;
    }

    createObject(type: string) {
        var newObject: spaceObject;

        switch (type) {
            case 'ship':
                newObject = new spaceShip(this.currentId);
                this.currentId += 1;
                break;
            default:
                break;
        }

        return newObject;
    }
}