# EGF Streaming Tools

## What is this?
This is a tool to automatically add and change data that is used for the OBS-Setup of the EGF. It autogenerates textfiles from the information given in the database and can retrieve player-information by EGD-Pin. See further information on the How-To-Use below.
The textfiles can be used in OBS - they ARE used in the Standard-Twitch-Layout.

This tool does not work in both directions! It can only retrieve data from the database to the directories but local changes within the directory do not affect the database. Hence, we recommend deleting the filed within the ```labels```-Folder before each event.

Changes via the Web-Interface can be done remotely by everyone who has the link below.

## "UI"
https://console.firebase.google.com/u/0/project/egf-streaming/database/firestore/data~2Flabels

### Adding new elements
Open the link mentioned above.   
Add a document to the labels collection, use the foldername you want as document id.
Then you have several options:
* add a field with string-format with whatever data you like to synch
* add a field named black or white with string-format with an EGD-Pin as value.
    * this will search for the corresponding player-data in the EGD-html-file and add all sorts of information

## Get started
1. Install ```nodejs``` (https://nodejs.org/en/)
2. Run ```npm install``` in a terminal

## Running the tool
in Terminal navigate to this directory and type in
```
node syncer.js
```
Afterwards all files in ```labels``` will be synced from firebase.

## Known Errors
It can happen that one file is not downloaded/added correctly - an error message like this may occur:
```
{ Error: ENOENT: no such file or directory, open 'G:\Projects\egf-streaming\labels\review1\BlackClub.txt'
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'G:\\Projects\\egf-streaming\\labels\\review1\\BlackClub.txt' }
```
To resolve this, just restart the script with ```strg + c``` and ```node syncer.js```.
