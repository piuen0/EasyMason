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
            {'location': 'content/directives/gallery/galleryContent/1.jpg', 'title': 'alfa'},
            {'location': 'content/directives/gallery/galleryContent/2.jpg', 'title': 'bravo'},
            {'location': 'content/directives/gallery/galleryContent/3.jpg', 'title': 'charlie'},
            {'location': 'content/directives/gallery/galleryContent/4.jpg', 'title': 'delta'},
            {'location': 'content/directives/gallery/galleryContent/5.jpg', 'title': 'echo'},
            {'location': 'content/directives/gallery/galleryContent/6.jpg', 'title': 'foxtrot'},
            {'location': 'content/directives/gallery/galleryContent/8.jpg', 'title': 'echo'},
            {'location': 'content/directives/gallery/galleryContent/7.jpg', 'title': 'golf'},
            {'location': 'content/directives/gallery/galleryContent/10.jpg', 'title': 'hotel'},
            {'location': 'content/directives/gallery/galleryContent/11.jpg', 'title': 'india'},
            {'location': 'content/directives/gallery/galleryContent/12.jpg', 'title': 'juliett'},
            {'location': 'content/directives/gallery/galleryContent/13.jpg', 'title': 'kilo'},
            {'location': 'content/directives/gallery/galleryContent/14.jpg', 'title': 'lima'},
            {'location': 'content/directives/gallery/galleryContent/15.jpg', 'title': 'mike'},
            {'location': 'content/directives/gallery/galleryContent/16.jpg', 'title': 'november'},
            {'location': 'content/directives/gallery/galleryContent/17.jpg', 'title': 'oscar'},
            {'location': 'content/directives/gallery/galleryContent/18.jpg', 'title': 'papa'},
            {'location': 'content/directives/gallery/galleryContent/19.jpg', 'title': 'quebec'},
            {'location': 'content/directives/gallery/galleryContent/20.jpg', 'title': 'romeo'},
            {'location': 'content/directives/gallery/galleryContent/21.jpg', 'title': 'sierra'},
            {'location': 'content/directives/gallery/galleryContent/22.jpg', 'title': 'tango'},
            {'location': 'content/directives/gallery/galleryContent/23.jpg', 'title': 'uniform'},
            {'location': 'content/directives/gallery/galleryContent/24.jpg', 'title': 'victor'},
            {'location': 'content/directives/gallery/galleryContent/25.jpg', 'title': 'whiskey'},
            {'location': 'content/directives/gallery/galleryContent/26.jpg', 'title': 'xray'},
            {'location': 'content/directives/gallery/galleryContent/27.jpg', 'title': 'yankee'},
            {'location': 'content/directives/gallery/galleryContent/28.jpg', 'title': 'zulu'},
            {'location': 'content/directives/gallery/galleryContent/29.jpg', 'title': 'zero'},
            {'location': 'content/directives/gallery/galleryContent/30.jpg', 'title': 'one'},
            {'location': 'content/directives/gallery/galleryContent/31.jpg', 'title': 'two'},
            {'location': 'content/directives/gallery/galleryContent/32.jpg', 'title': 'three'},
            {'location': 'content/directives/gallery/galleryContent/33.jpg', 'title': 'four'},
            ];        
        }
    };
});
})();
