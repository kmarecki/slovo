import * as angular from 'angular';
import {PostDataService} from './post.service';

let module = angular.module('core.post', ['ngResource']);

module.service('postDataService', PostDataService);
