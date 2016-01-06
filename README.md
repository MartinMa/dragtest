# dragtest
Small Ionic example to demonstrate a fix for gestures.js.

This example shows a list in an ion-content container with native scrolling.
Additionally there is a draggable red box.
Scolling and dragging works side by side.

Ionic, v1.2.4 work in progress with this fix: [fix(gestures): On KitKat preventDefault on touchstart #4904](https://github.com/driftyco/ionic/pull/4904)

To get it up and running on your Android device, follow the steps below.
* Make sure you have Ionic and the Android SDK installed
* `git clone https://github.com/MartinMa/dragtest.git`
* `cd dragtest`
* `ionic platform add android`
* `ionic run android`

Related Ionic issue: https://github.com/driftyco/ionic/issues/3695
