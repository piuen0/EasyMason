EasyMason
=========

Angular Masonry in 3 Easy Steps

Credits: 

The masonry core is from: http://masonry.desandro.com

The Angular fiddle is from: http://jsfiddle.net/g/3SH7a/

Info:
I just cleaned up and modularized the Masonry ports into a few steps so that people don't have to copy and paste anything.

Dependencies:
jQuery
Angular

Instructions:
1. Add files to application:
  eg:

  ```html
    <link rel="stylesheet" href="masonryStyle.css">
    <script src="masonry.min.js"></script>
    <script src="masonry-module.js"></script>
  ```
2. Add 'masonry' module to application:
  eg:

  ```javascript
    var app = angular.module('app', ['masonry']);
  ```
3. Use masonry (pulling images from masonry-module.js):
  eg:

  ```html
    <ul masonry class="masonry-grid">
  	  <li ng-repeat="image in images">
  		  <img ng-src="{{image.location}}" />
  	  </li>
    </ul>
    ```
  
  Enjoy!
