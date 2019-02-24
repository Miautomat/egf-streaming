const firebase = require('firebase');
const fs = require('fs');
const mkdirp = require('mkdirp');
require("firebase/firestore");
var egd_player_data = 'allworld_lp.html';

var app = firebase.initializeApp({
  apiKey: "AIzaSyA1Rv1Ctbi2rOfexycsc_T_dk9O_KKMVnA",
  authDomain: "egf-streaming.firebaseapp.com",
  databaseURL: "https://egf-streaming.firebaseio.com",
  projectId: "egf-streaming",
  storageBucket: "egf-streaming.appspot.com",
  messagingSenderId: "516232938200"
});

var db = firebase.firestore();
const text_directory_name = "labels";
const text_collection = db.collection(text_directory_name);

text_collection.onSnapshot(snapshot => {
  snapshot.forEach(doc => {
    findPinsAndAddData(doc);
    var start_dir = `${__dirname}/${text_directory_name}/${doc.id}/`;
    writeDirectory(start_dir);
    retrieveAndWriteData(start_dir, doc.data())
  });
});

// Maximum depht of structure: 2! document = {attribute: { key: value, ...}}
function retrieveAndWriteData(dir, doc_data) {
  Object.keys(doc_data).forEach( key => {
    var path = `${dir}${key.charAt(0).toUpperCase() + key.slice(1)}`;
    value = doc_data[key];
    if (!(value instanceof Object)){
      writeFile(path, value);
    } else {
      Object.keys(value).forEach( sub_key => {
        path = `${path}${sub_key.charAt(0).toUpperCase() + sub_key.slice(1)}`
        writeFile(path, value[sub_key]);
      });
    }
  });
}

function writeDirectory(dir) {
  mkdirp(dir, function (err) {
    if (err) console.error(err);
  });
}

function writeFile(path, value) {
  fs.writeFile(`${path}.txt`, value, err => {
    if(err) {
      console.log(err);
    }
  });
  console.log("successfully written: " + `${path}.txt`);
}

function findPinsAndAddData(doc) {
  var doc_data = doc.data();
  Object.keys(doc_data).forEach( key => {
    if((key.includes("black") || key.includes("white")) && !(doc_data[key] instanceof Object)) {
      var data = findPlayer(doc_data[key]);
      var player = makePlayer(data);
      writePlayerData(doc.id, key, player);
    }
  });
}

function findPlayer(pin) {
  var lines = fs.readFileSync(egd_player_data).toString().match(/^.+$/gm);
  return lines.find(element => {
    return element.includes(pin);
  });
}

function makePlayer(data) {
//" 12662870  Kachanovskyi Artem                    UA  Rivn    2p   --   2734   176  T190208B"
  var player = new Map();
  player.set("pin", data.substring(0,10).trim());
  player.set("name", data.substring(10,49).trim());
  player.set("country", data.substring(49,53).trim());
  player.set("club", data.substring(53,61).trim());
  player.set("grade", data.substring(61,66).trim());
  player.set("rating", data.substring(71,77).trim());
  player.set("number_of_tournaments", data.substring(77,83).trim());
  player.set("last_tournament", data.substring(83, 93).trim());
  return player;
}

function writePlayerData(doc_id, key, player) {
  var object = {};
  for (const [sub_key, value] of player) {
    attribute_name = `${key}.${sub_key}`;
    object[attribute_name] = value;
  };
  text_collection.doc(doc_id).update(object);
}
