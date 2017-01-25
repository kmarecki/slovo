import * as ng from 'angular';
import { AutosizeDirective } from './autosize.directive';

export let module = ng.module('directives', []);
module.directive('directives.autosize', AutosizeDirective.factory());