/* eslint-disable no-console */
const DB_NAME = 'MyDatabase';
const STORE_NAME = 'files';

export const initIndexedDB = () => {
  const request: IDBOpenDBRequest = indexedDB.open(DB_NAME, 2);

  request.onupgradeneeded = event => {
    const db = (event.target as IDBOpenDBRequest).result;

    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
      console.log(`Object store "${STORE_NAME}" created`);
    }
  };

  request.onsuccess = () => {
    console.log('IndexedDB initialized successfully');
  };

  request.onerror = () => {
    console.error('IndexedDB initialization failed:', request.error);
  };
};
