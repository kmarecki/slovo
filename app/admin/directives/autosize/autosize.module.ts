import * as ng from 'angular';
import {AutosizeDirective} from './autosize.directive';

export let module = ng.module('directives.autosize', []);
module.directive('autosize', AutosizeDirective.factory());