import { openDB } from 'idb';

const initdb = async () => // establish a connection to the database
  openDB('jate', 1, { //
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts revised content and adds it to the database
export const putDb = async (content) => { // add content to the database
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite'); // open a transaction
  const jateStore = tx.objectStore('jate');
  const request = jateStore.put({ value: content, id:1 });
  const results = await request;
  console.log('results', results);
};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const jateStore = tx.objectStore('jate');
  const request = jateStore.get(1); // find the content in the database by its key "1"
  const result = await request;
  console.log('result.value', result);
  return result?.value; // return the content from value key
};

initdb();
