import * as ng from 'angular';
import { AutosizeDirective } from './autosize.directive';
import { EqualToDirective } from './equal-to.directive';

export let module = ng.module('directives', []);
module.directive('autosize', AutosizeDirective.factory());
module.directive('equalTo', EqualToDirective.factory());