import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "./firebase";
import { User } from "firebase/auth";

const db = getFirestore(app);
const usersCollection = collection(db, "users");
const messagesCollection = collection(db, "messages");

// FUNCTIONALITIES FOR THE USERS COLLECTION.
export async function addUser(username: string, email: string) {
  try {
    await addDoc(usersCollection, { username, email });
  } catch (e: any) {
    alert(e.message);
  }
}

export async function getUser(
  email: string,
  setEmail: (email: string) => void,
  setUsername: (username: string) => void
) {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const data = await getDocs(q);

    data.forEach((document) => {
      setEmail(document.data().email!);
      setUsername(document.data().username!);
    });
  } catch (e: any) {}
}
