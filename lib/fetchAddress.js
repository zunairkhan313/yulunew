import { getDocs, collection } from 'firebase/firestore';
import { db } from '../app/firebase/Firebase';

export async function fetchAddress() {
  const moviesCollectionRef = collection(db, 'Card');
  try {
    const data = await getDocs(moviesCollectionRef);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error('Error fetching data: ', err);
    return [];
  }
}
