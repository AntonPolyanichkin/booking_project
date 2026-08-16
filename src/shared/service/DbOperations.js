import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  setDoc,
  Timestamp,
} from "firebase/firestore/lite";
import db from "../config/firebase/firebase-config";

class DbOperations {
  constructor(name) {
    this.collectionRef = collection(db, name);
  }

  async getAllPaginated({ page = 1, perPage = 6, cursors = [] }) {
    let q;

    const realLimit = perPage + 1; // беремо на 1 більше

    if (page === 1) {
      q = query(this.collectionRef, orderBy("date"), limit(realLimit));
    } else {
      const cursor = cursors[page - 2];
      if (!cursor) throw new Error("Cursor not found");
      q = query(this.collectionRef, orderBy("date"), startAfter(cursor), limit(realLimit));
    }
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const hasMore = docs.length > perPage;

    const data = docs.slice(0, perPage).map((doc) => ({ id: doc.id, ...doc.data() }));
    const lastVisible = docs[docs.length - 2] || null;

    return { data, cursor: lastVisible, hasMore };
  }

  // async getPaginatedByMonth({ year, month, page = 1, perPage = 6, cursors = [] }) {
  //   // month тут 1-індексований (серпень = 8), як і в твоєму поточному коді
  //   const startOfMonth = Timestamp.fromDate(new Date(year, month - 1, 1));
  //   const endOfMonth = Timestamp.fromDate(new Date(year, month, 1)); // ексклюзивно — 1 число наступного місяця

  //   const realLimit = perPage + 1;

  //   const constraints = [
  //     where("date", ">=", startOfMonth),
  //     where("date", "<", endOfMonth),
  //     orderBy("date"),
  //     orderBy(documentId()),
  //   ];

  //   let q;
  //   if (page === 1) {
  //     q = query(this.collectionRef, ...constraints, limit(realLimit));
  //   } else {
  //     const cursor = cursors[page - 2];
  //     if (!cursor) throw new Error("Cursor not found");
  //     q = query(
  //       this.collectionRef,
  //       ...constraints,
  //       startAfter(Timestamp.fromMillis(cursor.dateMillis), cursor.id),
  //       limit(realLimit),
  //     );
  //   }

  //   const snapshot = await getDocs(q);
  //   const docs = snapshot.docs;
  //   const hasMore = docs.length > perPage;

  //   const data = docs.slice(0, perPage).map((doc) => ({ id: doc.id, ...doc.data() }));

  //   const lastVisibleDoc = docs[docs.length - 2] || null;
  //   const cursor = lastVisibleDoc ? { dateMillis: lastVisibleDoc.data().date.toMillis(), id: lastVisibleDoc.id } : null;

  //   return { data, cursor, hasMore };
  // }

  async getList() {
    const snapshot = await getDocs(this.collectionRef);
    const docs = snapshot.docs;

    const data = docs.length ? docs.map((doc) => ({ id: doc.id, ...doc.data() })) : [];

    return data;
  }

  async getById(id) {
    const snap = await getDoc(doc(this.collectionRef, id));
    if (!snap.exists()) {
      return null;
    } else {
      return { id: snap.id, ...snap.data() };
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
