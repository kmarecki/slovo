import * as ng from 'angular';
import {MessageBoxController} from './message-box.controller';

const module = ng.module('components.messageBox', []);

module.controller('MessageBoxController', MessageBoxController);
