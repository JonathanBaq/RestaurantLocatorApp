import { firebaseDb } from '../Database/firebase';
import { child, get } from "firebase/database";

const db = firebaseDb;

/* const addToFavorites = (address, name, priceLevel, rating) => {

  const reference = ref(db, `favorites/${userId}`)
} */

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
    get(child(db, 'favorites/')).then((snapshot) => {
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

export default { getUsers, getFavorites };