# EGF Streaming Tools

## "UI"
https://console.firebase.google.com/u/0/project/egf-streaming/database/firestore/data~2Flabels

### Adding new labels
Add a document to the labels collection, use the filename as document id and a field named "content" for the supposed file content.

## Get started
Install ```nodejs``` and run ```npm install``` in terminal
## Running the tool
in Terminal navigate to this directory
```
node syncer.js

```
Afterwards all files in ```labels``` will be synced from firebase.
