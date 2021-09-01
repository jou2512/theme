const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const setUserData = (uid, Data) => {
  admin.firestore().collection("users").doc(uid).set(Data, {merge: true});
};

exports.addAdminRole = functions
    .https.onCall((data, context) => {
      return admin.auth().setCustomUserClaims(data.uid, {
        admin: data.disable,
      }).then(() => {
        setUserData(data.uid, {login: {admin: data.disable}});
        return {
          message:
            `Success! ${data.uid} has been set to Admin: ${data.disable}`,
        };
      }).catch((err) => {
        return err;
      });
    });
exports.deactivateUser = functions
    .https.onCall((data, context) => {
      return admin.auth().updateUser(data.uid, {
        disabled: data.disable,
      }).then(() => {
        setUserData(data.uid, {login: {gesperrt: data.disable}});
        return {
          message:
            `Success! ${data.uid} has been set to Gesperrt: ${data.disable}`,
        };
      }).catch((err) => {
        return err;
      });
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
