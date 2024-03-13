import { openDB } from 'idb';

const initdb = async () => // establish a connection to the database and create the object store
  openDB('jate', 1, { // new database name (jate), version number, and object store configuration
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true }); // keyPath id is the primary key, autoIncrement sets the key to increment by 1
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts revised content and adds it to the database
export const putDb = async (content) => { // function to add content to the database
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1); // open the database identified by the name and version number
  const tx = jateDb.transaction('jate', 'readwrite'); // open a transaction
  const jateStore = tx.objectStore('jate'); // access the object store
  const request = jateStore.put({ value: content, id: 1 }); // updating content to the object store using the put method
  const results = await request; // wait for the request to complete
  console.log('results', results);
};

// TODO: Add logic for a method that gets all the content from the database
// function to get content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1); // open the database identified by the name and version number
  const tx = jateDb.transaction('jate', 'readonly'); // open a read-only transaction
  const jateStore = tx.objectStore('jate'); // access the object store
  const request = jateStore.get(1); // find the content entered in the database by its key id "1"
  const result = await request; // wait for the request to complete
  console.log('result.value', result);
  return result?.value; // ternary to look for a result object and return the value property if it exists
};

initdb();
