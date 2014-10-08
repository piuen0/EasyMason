(function () {
    var app = angular.module('masonry', []);
    app.directive("masonry", function () {
        var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';
        return {
            compile: function(element, attrs) {
            // auto add animation to brick element
            var animation = attrs.ngAnimate || "'masonry'";
            var $brick = element.children();
            $brick.attr("ng-animate", animation);
            
            // generate item selector (exclude leaving items)
            var type = $brick.prop('tagName');
            var itemSelector = type+":not([class$='-leave-active'])";
            
            return function (scope, element, attrs) {
                var options = angular.extend({
                    itemSelector: itemSelector
                }, scope.$eval(attrs.masonry));
                
                // try to infer model from ngRepeat
                if (!options.model) { 
                    var ngRepeatMatch = element.html().match(NGREPEAT_SOURCE_RE);
                    if (ngRepeatMatch) {
                        options.model = ngRepeatMatch[4];
                    }
                }
                
                // initial animation
                element.addClass('masonry');
                
                // Wait inside directives to render
                setTimeout(function () {
                    element.masonry(options);
                    
                    element.on("$destroy", function () {
                        element.masonry('destroy')
                    });
                    
                    if (options.model) {
                        scope.$apply(function() {
                            scope.$watchCollection(options.model, function (_new, _old) {
                                if(_new == _old) return;
                                
                                // Wait inside directives to render
                                setTimeout(function () {
                                    element.masonry("reload");
                                });
                            });
                        });
                    }
                });
            };
        },
        controller: function($scope, $http) {
            $scope.images = [
            {'location': 'SampleImages/1.jpg', 'title': 'alfa'},
            {'location': 'SampleImages/2.jpg', 'title': 'bravo'},
            {'location': 'SampleImages/3.jpg', 'title': 'charlie'},
            {'location': 'SampleImages/4.jpg', 'title': 'delta'},
            {'location': 'SampleImages/5.jpg', 'title': 'echo'},
            {'location': 'SampleImages/6.jpg', 'title': 'foxtrot'},
            {'location': 'SampleImages/7.jpg', 'title': 'golf'},
            {'location': 'SampleImages/8.jpg', 'title': 'hotel'},
            {'location': 'SampleImages/9.jpg', 'title': 'india'},
            {'location': 'SampleImages/10.jpg', 'title': 'juliett'},
            {'location': 'SampleImages/11.jpg', 'title': 'kilo'},
            {'location': 'SampleImages/12.jpg', 'title': 'lima'},
            {'location': 'SampleImages/13.jpg', 'title': 'mike'},
            {'location': 'SampleImages/14.jpg', 'title': 'november'},
            {'location': 'SampleImages/15.jpg', 'title': 'oscar'},
            ];        
        }
    };
});
})();
