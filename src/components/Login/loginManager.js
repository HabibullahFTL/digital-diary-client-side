import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./config.firebase";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const signUpWithEmail = (email, password, userDetails) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        const newUserInfo = { ...userDetails };
        newUserInfo.success = true;
        newUserInfo.error = '';
        newUserInfo.password = '';
        updateNameAndMobile(userDetails.displayName,userDetails.phoneNumber);
        return newUserInfo;
    }).catch((error) => {
        var errorMessage = error.message;
        const newUserInfo = { ...userDetails };
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        return newUserInfo;

    });
}

export const signInWithEmail = (email, password, loginUserDetails) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const { displayName, uid, photoURL, phoneNumber } = userCredential.user;
            const newUserInfo = { ...loginUserDetails };
            newUserInfo.isSignIn = true;
            newUserInfo.uid = uid;
            newUserInfo.displayName = displayName;
            newUserInfo.phoneNumber = phoneNumber;
            newUserInfo.photo = photoURL;
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            var errorMessage = error.message;
            const newUserInfo = { ...loginUserDetails };
            newUserInfo.error = errorMessage;
            return newUserInfo;
        });
}

export const updateNameAndMobile = (displayName,phoneNumber) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: displayName,
        phoneNumber: phoneNumber
    }).then(function () {
        // Update successful.
    }).catch(function (error) {
        //...
    });
}


export const fileUploadHandle = (imgFile, imgDir, obj) => {
    return firebase.storage().ref(imgDir).put(imgFile).then(() => {
        return firebase.storage().ref(imgDir).getDownloadURL().then(imgUrl => {
            const newObj = { ...obj };
            newObj.photo = imgUrl;
            newObj.message = "";
            return newObj;
        }).catch(err => {
            const newObj = { ...obj };
            newObj.message = err.message;
            return newObj;
        })
    }).catch((err) => {
        const newObj = { ...obj };
        newObj.message = err.message;
        return newObj;
    })
}