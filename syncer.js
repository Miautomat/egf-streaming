const firebase = require('firebase');
require("firebase/firestore");
const fs = require('fs');

var app = firebase.initializeApp({
  apiKey: "AIzaSyA1Rv1Ctbi2rOfexycsc_T_dk9O_KKMVnA",
  authDomain: "egf-streaming.firebaseapp.com",
  databaseURL: "https://egf-streaming.firebaseio.com",
  projectId: "egf-streaming",
  storageBucket: "egf-streaming.appspot.com",
  messagingSenderId: "516232938200"
});

var db = firebase.firestore();

const labels = db.collection("labels");
labels.onSnapshot(snapshot => {
  snapshot.forEach(doc => {
    const {content} = doc.data();
    console.log(doc.id + ": " + content);
    fs.writeFile(`labels/${doc.id}.txt`, content, err => {
      if(err) {
        console.log(err);
      }
    });
  });
});
