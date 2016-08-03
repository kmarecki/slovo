import * as ng from 'angular';
import {MessageBoxController} from './message-box.controller';

let module = ng.module('components.messageBox', []);

module.controller('MessageBoxController', MessageBoxController);
