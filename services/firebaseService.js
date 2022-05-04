import { child, get } from "firebase/database";

import { firebaseDb } from '../Database/firebase';

const db = firebaseDb;

/* const addToFavorites = (address, name, priceLevel, rating) => {

  const reference = ref(db, `favorites/${userId}`)
} */

const snapshotToArray = (snapshot) => {
  let returnArr = [];
  snapshot.forEach((childSnapshot) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  })
  return returnArr;
}

const getUsers = () => {
  try {
    get(child(db, 'users/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
    console.log('Could not connect to Database.');
  }
}

const getFavorites = () => {
  try {
    return get(child(db, 'favorites/')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshotToArray(snapshot);
        return data;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
    console.log('Could not connect to Database.');
  }
}

export default { getUsers, getFavorites };