document.addEventListener('DOMContentLoaded', function() {
    // Step 0: HTML defined, variables for elements
    var messagesList = document.getElementById('messages'),
        textInput = document.getElementById('text'),
        sendButton = document.getElementById('send'),
        login = document.getElementById('login'),
        googleLogin = document.getElementById('google'),
        facebookLogin = document.getElementById('facebook'),
        signedIn = document.getElementById('loggedin'),
        logout = document.getElementById('logout'),
        usernameElm = document.getElementById('username'),
        password = document.getElementById('password'),
        username = "Web";

    var config = {
        apiKey: "AIzaSyD8jbrZ1scRETlwxCPBEUEN_oDf7FQZlCw",
        databaseURL: "https://digitalhackaton.firebaseio.com",
        storageBucket: "digitalhackaton.appspot.com",
        authDomain: 'digitalhackaton.firebaseapp.com'
    };

    // Get the Firebase app and all primitives we'll use
    var app = firebase.initializeApp(config),
        database = app.database(),
        auth = app.auth(),
        storage = app.storage();

    var databaseRef = database.ref().child('chat3');

    sendButton.addEventListener('click', function(evt) {
        var chat3 = {
            name: username,
            message: textInput.value
        };
        databaseRef.push().set(chat3);
        textInput.value = '';
    });

    // Listen for when child nodes get added to the collection
    databaseRef.on('child_added', function(snapshot) {
        // Get the chat message from the snapshot and add it to the UI
        var chat = snapshot.val();
        addMessage(chat);
    });

    // Show a popup when the user asks to sign in with Google
    googleLogin.addEventListener('click', function(e) {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    });
    // Allow the user to sign out
    logout.addEventListener('click', function(e) {
        auth.signOut();
    });

    facebookLogin.addEventListener('click', function(e) {
        auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    });
    // Allow the user to sign out
    logout.addEventListener('click', function(e) {
        auth.signOut();
    });
    // When the user signs in or out, update the username we keep for them
    auth.onAuthStateChanged(function(user) {
        if (user) {
            setUsername(user.displayName);
        } else {
            // User signed out, set a default username
            setUsername("Web");
        }
    });

    function handleFileSelect(e) {
        var file = e.target.files[0];

        // Get a reference to the location where we'll store our photos
        var storageRef = storage.ref().child('chat_photos');

        // Get a reference to store file at photos/<FILENAME>.jpg
        var photoRef = storageRef.child(file.name);

        // Upload file to Firebase Storage
        var uploadTask = photoRef.put(file);
        uploadTask.on('state_changed', null, null, function() {
            // When the image has successfully uploaded, we get its download URL
            var downloadUrl = uploadTask.snapshot.downloadURL;
            // Set the download URL to the message box, so that the user can send it to the database
            textInput.value = downloadUrl;
        });
    }
    file.addEventListener('change', handleFileSelect, false);


    function setUsername(newUsername) {
        if (newUsername == null) {
            newUsername = "Web";
        }
        console.log(newUsername);
        username = newUsername;
        var isLoggedIn = username != 'Web';
        usernameElm.innerText = newUsername;
        logout.style.display = isLoggedIn ? '' : 'none';
        facebookLogin.style.display = isLoggedIn ? 'none' : '';
        googleLogin.style.display = isLoggedIn ? 'none' : '';
    }

    function addMessage(chat) {
        var li = document.createElement('li');
        li.className = "list-group-item";
        var nameElm = document.createElement('h4');
        nameElm.innerText = chat.name;
        li.appendChild(nameElm);
        if (chat.message.indexOf("https://firebasestorage.googleapis.com/") == 0 ||
            chat.message.indexOf("https://lh3.googleusercontent.com/") == 0 ||
            chat.message.indexOf("http://pbs.twimg.com/") == 0 ||
            chat.message.indexOf("data:image/") == 0) {
            var imgElm = document.createElement("img");
            imgElm.src = chat.message;
            li.appendChild(imgElm);
        } else {
            var messageElm = document.createElement("span");
            messageElm.innerText = chat.message;
            li.appendChild(messageElm);
        }
        messagesList.appendChild(li);
        li.scrollIntoView(false);
        sendButton.scrollIntoView(false);
    }
    //window.app = app; // NOTE: just for debugging
    //for (var i=0; i < 10; i++) addMessage({ name: "Web", message: ''+i });
    setUsername('Web');
});