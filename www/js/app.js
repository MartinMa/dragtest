/* App Main File */

/*global angular: true, console: true */

angular.module('ionicApp', ['ionic'])
  .controller('MyCtrl', function ($scope, $ionicGesture) {
    'use strict';
    var onDrag, onRelease, dragElement, dragGesture, release, x, y;

    x = 0;
    y = 0;

    dragElement = angular.element(document.getElementById("dragElement"));

    onDrag = function (event) {
      var deltaX, deltaY;

      deltaX = event.gesture.deltaX;
      deltaY = event.gesture.deltaY;

      dragElement.css('margin-left', String(x + deltaX) + 'px');
      dragElement.css('margin-top', String(y + deltaY) + 'px');
    };

    onRelease = function (event) {
      x = x + event.gesture.deltaX;
      y = y + event.gesture.deltaY;
    };

    dragGesture = $ionicGesture.on('drag', onDrag, dragElement);
    release = $ionicGesture.on('release', onRelease, dragElement);

    $scope.$on('$destroy', function () {
      $ionicGesture.off(dragGesture, 'drag', onDrag);
      $ionicGesture.off(release, 'release', onRelease);
    });
  });