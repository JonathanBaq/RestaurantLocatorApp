import { child, get, push, ref, update } from "firebase/database";

import { firebaseDbRef, firebaseDb } from '../Config/firebase';
import { getAuth } from 'firebase/auth';

const dbRef = firebaseDbRef;

const addToFavorites = async (item) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!item) {
    console.error('Item data missing!');
  } else {
    const favoriteData = {
      address: item.address,
      name: item.name,
      priceLevel: item.priceLevel,
      rating: item.rating,
    };
    const favoriteDbRef = ref(firebaseDb, `favorites/${currentUser.uid}`);
    const newFavoriteRef = push(favoriteDbRef);
    try {
      await update(newFavoriteRef, favoriteData);
      console.log('Saved to DB successfully.');
    } catch (error) {
      console.log(error);
    }
  }
}

const snapshotToArray = (snapshot) => {
  if (!snapshot) {
    console.error('Snapshot missing!');
  } else {
    let returnArr = [];
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    })
    return returnArr;
  }
}

const getFavorites = async () => {
  const snapshot = await get(child(dbRef, 'favorites/testUser'));
  try {
    if (snapshot.exists()) {
      const data = snapshotToArray(snapshot);
      return data;
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

const saveNewUser = async (user) => {
  const newUser = {
    email: user.user.email,
    uid: user.user.uid,
  };
  const userDbRef = ref(firebaseDb, `users/${user.user.uid}`);
  try {
    await update(userDbRef, newUser);
    console.log('Saved to DB successfully.');
  } catch (error) {
    console.log(error);
  }
}

export default { getFavorites, addToFavorites, saveNewUser };