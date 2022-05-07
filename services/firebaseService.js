import { child, get, push, ref, update } from "firebase/database";

import { firebaseDbRef, firebaseDb } from '../Database/firebase';

const dbRef = firebaseDbRef;

const addToFavorites = async (item) => {
  if(!item) {
    console.error('Item data missing!');
  } else {
    const favoriteData = {
      address: item.address,
      name: item.name,
      priceLevel: item.priceLevel,
      rating: item.rating,
    };
    const favoriteDbRef = ref(firebaseDb, `favorites/testUser`);
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
  if(!snapshot) {
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

const getUsers = async () => {
 const snapshot = await get(child(dbRef, 'users/'));
 try {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
 } catch (error) {
  console.error(error);
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

export default { getUsers, getFavorites, addToFavorites };