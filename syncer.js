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
var mkdirp = require('mkdirp');

const labels = db.collection("labels");
labels.onSnapshot(snapshot => {
  snapshot.forEach(doc => {
    var start_dir = `${__dirname}/labels/${doc.id}/`;
    mkdirp(start_dir, function (err) {
      if (err) console.error(err);
    });
    writeFile(start_dir, doc.data())
  })
});

function writeFile(dir, value) {
 if (!(value instanceof Object)){
    fs.writeFile(`${dir}.txt`, value, err => {
      if(err) {
        console.log(err);
      }
    });
    console.log("successfully written: " + `${dir}.txt`);
  } else {
    Object.keys(value).forEach( key => {
      writeFile(`${dir}${key.charAt(0).toUpperCase() + key.slice(1)}`, value[key]);
    });
  }
}
