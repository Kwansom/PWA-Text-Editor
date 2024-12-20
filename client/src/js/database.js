import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  try {
    console.log("PUT to the database");
    const jateDb = await openDB("jate", 1);
    const transaction = jateDb.transaction("jate", "readwrite");
    const store = transaction.objectStore("jate");
    const result = await store.put({ id: id, jate: content });
    console.log("Data saved to the database", result);
  } catch (error) {
    console.error("Error saving data to the database", error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  try {
    console.log("GET all from the database");
    const jateDb = await openDB("jate", 1);
    const transaction = jateDb.transaction("jate", "readonly");
    const store = transaction.objectStore("jate");
    const result = await store.getAll();
    console.log("All content retrieved from the database", result);
  } catch (error) {
    console.error("Error retreiving content from the database", error);
  }
};
initdb();
