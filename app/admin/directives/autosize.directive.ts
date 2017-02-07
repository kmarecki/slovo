import * as ng from 'angular';

export class AutosizeDirective implements ng.IDirective {

    require: string = 'ngModel';
    scope = {
        ngModel: '='
    };

    constructor() {
    }

    link(scope: ng.IScope,
        element: ng.IAugmentedJQuery,
        attributes: ng.IAttributes,
        controller: any,
        transclude: ng.ITranscludeFunction) {

        scope.$watch('ngModel', () => this.resize(element));
        // element.bind('keyup keydown keypress change',
        //     () => this.resize(element));
    }

    private resize(element: ng.IAugmentedJQuery) {
        element.css('height', 'auto');
        //TODO: Must 2 px be added otherwise scrollbars are shown
        element.css('height', `${element[0].scrollHeight}px`);
    }


    static factory(): ng.IDirectiveFactory {
        var directive: ng.IDirectiveFactory = () => {
            return new AutosizeDirective();
        }
        return directive;
    }
}