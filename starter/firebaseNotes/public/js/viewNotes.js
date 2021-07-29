let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
  console.log("logged in as user" + userId)
  // Get access to all the current user's notes 
  const refDB = firebase.database().ref(`user/${userId}`)
  refDB.on('value', (snapshot) => {
    console.log(snapshot.val());
    document.querySelector('#app').innerHTML += " ";
    renderData(snapshot.val());
  });
};

const renderData = (data) => {
    console.log(data)
    for(let key in data){
        console.log(data[key]);
        const note = data[key];
        const destination = document.querySelector('#app');
        destination.innerHTML += createCard(note);
    //document.getElementById("app").innerHTML += "<"
    }

}

const createCard = (note) => {
 return `<div class = "column is-one-quarter"> 
 <div class = "card">
 <header class = "card-header"> 
 <p class = "card-header-title">${note.title} </p> 
 </header>
 <div class = "card-content">
 <p> ${note.text} </p>
</div>
 </div>
 </div>`;

}