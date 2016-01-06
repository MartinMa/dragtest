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

# How it works
The implementation of touch and scrolling in Android 4.4 webview differs from other versions and platforms. See https://developers.google.com/web/updates/2014/05/A-More-Compatible-Smoother-Touch (*4. Touchcancel on scroll start*).

In Ionic, native and js-scrolling works well on its own. But as soon you add gestures via `$ionicGesture.on()`, things get a bit more complicated.
In order to be able to process all `touchmove` events of a gesture, you have to call `preventDefault()` on `touchstart` or the first `touchmove` event.
Otherwise, as described in the document above, the browser emits `touchcancel` and starts scrolling. Subsequently no additional `touchmove` events are emitted.

In [ionic/js/utils/gestures.js](https://github.com/driftyco/ionic/blob/master/js/utils/gestures.js) an event listener for `touchmove` is added to the `document`. We **do not** call `preventDefault()` in the corresponding listener, as it would cancel out any attempt to scroll the page. Instead we call `preventDefault()` within `bindDomOnTouch()` on `touchstart`. It is the *entry point* for any gesture detection and it enables native scrolling and custom drag/swipe/whatever gestures to coexist.

Though, it will break native scrolling, if you bind a user-defined gesture (and thus `touchstart`) to the `document` itself.
