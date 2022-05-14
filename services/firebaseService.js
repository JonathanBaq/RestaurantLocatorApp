import { child, get, push, ref, remove, update } from "firebase/database";

import { firebaseDbRef, firebaseDb } from '../Config/firebase';
import { getAuth } from 'firebase/auth';

const addToFavorites = async (item) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!item) {
    console.error('Item data missing!');
  } else {
    const favoriteData = {
      address: item.address ? item.address : 'not provided',
      name: item.name,
      priceLevel: item.priceLevel ? item.priceLevel : 0,
      rating: item.rating ? item.rating : 0,
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

const removeFavorite = async (item) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!item) {
    console.error('Item data missing!');
  } else {
    const favoriteDbRef = ref(firebaseDb, `favorites/${currentUser.uid}/${item.key}`);
    try {
      await remove(favoriteDbRef);
      console.log('Removed from DB successfully.');
    } catch (error) {
      console.log(error);
    }
  }
}

const getFavorites = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const snapshot = await get(child(firebaseDbRef, `favorites/${currentUser.uid}`));

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

export default {
  getFavorites,
  addToFavorites,
  saveNewUser,
  removeFavorite
};