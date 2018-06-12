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
var currentUid = "";
firebase.auth().onAuthStateChanged(function (user) {

    // onAuthStateChanged listener triggers every time the user ID token changes.  
    // This could happen when a new user signs in or signs out.  
    // It could also happen when the current user ID token expires and is refreshed.  
    if (user && user.uid != currentUid) {
        // Update the UI when a new user signs in.  
        // Otherwise ignore if this is a token refresh.  
        // Update the current user UID.  
        currentUid = user.uid;
        console.log(currentUid);

        var ref = database.ref();

        ref.child(currentUid).orderByChild("User").equalTo(currentUid).on("value", function (snapshot) {
            console.log(snapshot.val());
            console.log(currentUid);
            snapshot.forEach(function (data) {
                $("#tablebody").append($("<tr><td>"
                    + data.val().Calories + "</td><td>"
                    + data.val().Notes
                    + "</td></tr>"))
            });
        });

    } else {
        // Sign out operation. Reset the current user UID.  
        currentUid = null;
        console.log("no user signed in");
    }
});


$("#logout").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });

    $('.table tbody').remove();

});






var user = "";
var calories = "";
var notes = "";
var temp = "";

$("#submit").on("click", function (event) {


    event.preventDefault();

    user = $("#userName").val().trim();
    calories = $("#userCalories").val().trim();
    notes = $("#userNotes").val().trim();

    temp = {
        User: currentUid,
        Calories: calories,
        Notes: notes
    }


    database.ref(currentUid).push(temp);
})



















