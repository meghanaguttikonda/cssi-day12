let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      document.getElementById("welcome").innerHTML = `<h1 class = "title is-1 has-text-info"> Welcome ${user.displayName} !</h1>`;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data
const titleElement = document.querySelector("#noteTitle");
const textElement = document.querySelector("#noteText");
    // 2. Format the data and write it to our database
const notes = {
    title: titleElement.value,
    text: textElement.value
}
    // 3. Clear the form so that we can write a new note
    titleElement.value = null; 
    textElement.value = null;
    //4. write it to our database 
    console.log(googleUser);
    console.log(notes);
    const refDB = firebase.database().ref(`users/${googleUser.uid}`);
    refDB.push(notes)
}
