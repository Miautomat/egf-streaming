# EGF Streaming Tools

## "UI"
https://console.firebase.google.com/u/0/project/egf-streaming/database/firestore/data~2Flabels

### Adding new labels
Add a document to the labels collection, use the filename as document id and a field named "content" for the supposed file content.

## Get started
```
npm install

```
## Running the tool

```
node syncer.js

```
Afterwards all files in ```labels``` will be synced from firebase.
