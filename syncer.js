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
    findPins(doc.id, "", doc.data());
    var start_dir = `${__dirname}/${text_directory_name}/${doc.id}/`;
    writeDirectory(start_dir);
    writeFile(start_dir, doc.data())
  });
});

text_collection.onSnapshot(snapshot => {
  snapshot.forEach(doc => {
  })
});

function writeDirectory(dir) {
  mkdirp(dir, function (err) {
    if (err) console.error(err);
  });
}

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

function writePlayerData(doc_id, keys, player) {
  var object = {};
  for (const [key, value] of player) {
    attribute_name = `${keys}.${key}`;
    object[attribute_name] = value;
  };
  text_collection.doc(doc_id).update(object);
}

function findPins(doc_id, key_string, value) {
  if ((key_string.includes("black") || key_string.includes("white")) && !(value instanceof Object)){
    var data_string = findPlayer(value);
    var player = makePlayer(data_string);
    writePlayerData(doc_id, key_string, player);
  } else if (!(value instanceof Object)) {
    return;
  } else {
    Object.keys(value).forEach( key => {
      var future_key = "";
      if(key_string === ""){
        future_key = key;
      } else {
        furute_key = `${key_string}.${key}`
      }
      findPins(doc_id, `${future_key}`, value[key]);
    });
  }
}
