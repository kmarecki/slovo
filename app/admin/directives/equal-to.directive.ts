import * as ng from 'angular';

export interface EqualToAttributes extends ng.IAttributes {
    equalTo: string;
}

export class EqualToDirective implements ng.IDirective {
    require: string = 'ngModel';

    constructor() {
    }

    link(scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attrs: EqualToAttributes,
        ngModel: ng.INgModelController,
        transclude: ng.ITranscludeFunction) {

        let path = `$ctrl.${attrs.equalTo}`;
        ngModel.$parsers.unshift((value) => {
            let evalval = scope.$eval(path);
            let isValid = evalval == value;
            ngModel.$setValidity('equalTo', isValid);
            return isValid ? value : undefined;
        });

        scope.$watch(path, () => {
            ngModel.$setViewValue(ngModel.$viewValue);
            let isValid = scope.$eval(path) == ngModel.$viewValue;
            ngModel.$setValidity('equalTo', isValid);
        })

    }

    static factory(): ng.IDirectiveFactory {
        var directive: ng.IDirectiveFactory = () => {
            return new EqualToDirective();
        }
        return directive;
    }
}