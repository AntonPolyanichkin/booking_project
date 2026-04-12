import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, updateDoc, query, orderBy, limit, startAfter, setDoc } from "firebase/firestore/lite";
import db from "../config/firebase/firebase-config";

class DbOperations {
  constructor(name) {
    this.collectionRef = collection(db, name);
  }

  async getAllPaginated({ page = 1, perPage = 6, cursors = [] }) {
    let q;

    const realLimit = perPage + 1; // беремо на 1 більше

    if (page === 1) {
      q = query(this.collectionRef, orderBy("title"), limit(realLimit));
    } else {
      const cursor = cursors[page - 2];
      if (!cursor) throw new Error("Cursor not found");
      q = query(this.collectionRef, orderBy("title"), startAfter(cursor), limit(realLimit));
    }
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const hasMore = docs.length > perPage;

    const data = docs.slice(0, perPage).map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastVisible = docs[docs.length - 2] || null;

    return { data, cursor: lastVisible, hasMore };
  }

  async getList() {
    const snapshot = await getDocs(this.collectionRef);
    const docs = snapshot.docs;

    const data = docs.length ? docs.map((doc) => ({ id: doc.id, ...doc.data() })) : [];

    return { data };
  }

  async getById(id) {
    const snap = await getDoc(doc(this.collectionRef, id));
	 if(!snap.exists()){
		return null
	 }
	 else{
		return {id: snap.id, ...snap.data()}
	 }
  }

  async setWithId(id, data) {
    await setDoc(doc(this.collectionRef, id), data);
    return true;
  }

  async add(data) {
    await addDoc(this.collectionRef, data);
    return true;
  }
  async update(id, data) {
    await updateDoc(doc(this.collectionRef, id), data);
    return true;
  }
  async delete(id) {
    await deleteDoc(doc(this.collectionRef, id));
    return true;
  }
}

export default DbOperations;
