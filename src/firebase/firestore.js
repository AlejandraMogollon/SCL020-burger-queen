import { db, collection, addDoc } from "./init.js";

export const createOrders = async (currentUser, tableName, order) => {
  const today = new Date();
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      time: today,
      user: currentUser,
      tableName,
      order,
      status: "pending",
    });
    // ;
    console.log(docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
