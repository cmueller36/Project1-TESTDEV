// Initialize Firebase
var config = {
    apiKey: "AIzaSyBBmBBRUZAr5nK4iW39KtxrjXiUPWyW1eQ",
    authDomain: "project1-testdev.firebaseapp.com",
    databaseURL: "https://project1-testdev.firebaseio.com",
    projectId: "project1-testdev",
    storageBucket: "project1-testdev.appspot.com",
    messagingSenderId: "128017361927"
};
firebase.initializeApp(config);

var database = firebase.database();


// Initialize the FirebaseUI Widget using Firebase.  
var ui = new firebaseui.auth.AuthUI(firebase.auth()); 

// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: "./index.html",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
}; 

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// if (ui.isPendingRedirect()) {
//     ui.start('#firebaseui-auth-container', uiConfig);
// };

// Track the UID of the current user.  
var currentUid = null;  
firebase.auth().onAuthStateChanged(function(user) {  
 // onAuthStateChanged listener triggers every time the user ID token changes.  
 // This could happen when a new user signs in or signs out.  
 // It could also happen when the current user ID token expires and is refreshed.  
 if (user && user.uid != currentUid) {  
  // Update the UI when a new user signs in.  
  // Otherwise ignore if this is a token refresh.  
  // Update the current user UID.  
  currentUid = user.uid; 
  console.log(currentUid);
//   document.body.innerHTML = '<h1> Congrats ' + user + ', you are done! </h1> <h2> Now get back to what you love building. </h2> <h2> Need to verify your email address or reset your password? Firebase can handle all of that for you using the email you provided: ' + user.email + '. <h/2>';  
 } else {  
  // Sign out operation. Reset the current user UID.  
  currentUid = null;  
  console.log("no user signed in");  
 }  
});  


var user = "";
var calories = "";
var notes = "";

$("button").on("click", function (event) {


    event.preventDefault();

    console.log("stayed")

    user = $("#userName").val().trim();
    calories = $("#userCalories").val().trim();
    notes = $("#userNotes").val().trim();

    var temp = {

    }

})

