// Author: Deep Adeshra (dp974154@dal.ca)
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
  reload,
  getIdToken,
  updateProfile,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import AXIOS_CLIENT from "./apiClient";

const firebaseConfig = {
  apiKey: "AIzaSyATrMVRXFxJ6_XhBOyf2NANfgFmD4GaI68",
  authDomain: "web-project-9751f.firebaseapp.com",
  projectId: "web-project-9751f",
  storageBucket: "web-project-9751f.appspot.com",
  messagingSenderId: "604191467484",
  appId: "1:604191467484:web:9b4e215a3ec3347be21119",
  measurementId: "G-RDSC7N5F84",
};

const AUTH_TOKEN_KEY = "authToken";
const USER_ID = "userId";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const setLocalToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const getLocalToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const setUserId = (id) => {
  localStorage.setItem(USER_ID, id);
};

const getUserId = (id) => {
  return localStorage.getItem(USER_ID);
};

const deleteLocalToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    setLocalToken(await user.getIdToken());
    setUserId(user.uid);

    await AXIOS_CLIENT.post("/users", {
      email: user.email,
      name: user.displayName,
      firebaseId: user.uid,
    });

    window.location.href = "/show_products";
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong!");
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    setLocalToken(await user.getIdToken());
    sendEmailVerification(user);
    setUserId(user.uid);

    await AXIOS_CLIENT.post("/users", {
      email: user.email,
      name: name,
      firebaseId: user.uid,
    });

    await updateFirebaseUserProfile({ password, name });
    window.location.href = "/show_products";
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    setLocalToken(await user.getIdToken());
    setUserId(user.uid);
    window.location.href = "/show_products";
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success(
      "Password reset link sent! Please check your spam folder too. "
    );
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const updateUserPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
  } catch (err) {
    toast.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
  deleteLocalToken();
  window.location.href = "/";
};

const isUserLoggedIn = () => {
  return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
};

const reloadUser = async () => {
  const token  = await auth.currentUser.getIdToken()
  await auth.currentUser.reload()
  setLocalToken(token)
};

const updateFirebaseUserProfile = async ({ email, password, name }) => {
  await updateProfile(auth.currentUser, { displayName: name });
  if (email != auth.currentUser.email) {
    await updateEmail(auth.currentUser, email);
    sendEmailVerification(auth.currentUser)
    toast.success("Please verify link sent to this email. Check in your spam!");
  }
  if (password) {
    await updateUserPassword(password);
  }
  await reloadUser();
};

const getUserProfile = async () => {
  return {
    name: await auth.currentUser.displayName,
    email: await auth.currentUser.email,
    password: "",
  };
};

export {
  logInWithEmailAndPassword,
  signInWithGoogle,
  logout,
  sendPasswordReset,
  registerWithEmailAndPassword,
  deleteLocalToken,
  isUserLoggedIn,
  updateUserPassword,
  reloadUser,
  getUserProfile,
  updateFirebaseUserProfile,
  getUserId,
  getLocalToken,
  auth,
  AUTH_TOKEN_KEY,
};
