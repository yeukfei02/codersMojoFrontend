importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyD6OS3vRtvqJSivmF0B1K7-GFWqXQJjGhQ",
    authDomain: "codersmojo.firebaseapp.com",
    databaseURL: "https://codersmojo.firebaseio.com",
    projectId: "codersmojo",
    storageBucket: "codersmojo.appspot.com",
    messagingSenderId: "1036158114717",
    appId: "1:1036158114717:web:ce84402318b2084127ad74",
    measurementId: "G-VZ30SBGRFL"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message = ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
