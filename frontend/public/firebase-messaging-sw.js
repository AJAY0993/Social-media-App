/* global firebase */
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js")

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js")

// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true
}
// Initialize Firebase app
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

//Listens for background notifications
messaging.onBackgroundMessage(({ data }) => {
  console.log("Received background message: ", data)

  //customise notification
  if (data && data.title) {
    const notificationTitle = data.title
    const notificationOptions = {
      body: data.body,
      image: data.image,
      icon: data.icon || "/icon.png"
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
  }
})
