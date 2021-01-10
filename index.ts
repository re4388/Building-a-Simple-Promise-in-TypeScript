import { makeApiCall } from './myAjax';

makeApiCall()
  .then((user) => {
    return user;
  })
  .then((user) => {
    // you get the passed user here
    console.log(
      `User ${user.username}'s favorite number is ${user.favoriteNumber}`
    );

    return user;
  })
  .then((user) => {
    console.log('The previous .then() told you the favoriteNumber');

    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log('This is the last then()');
  })
  .catch((error) => {
    console.log(error.message);
  });
