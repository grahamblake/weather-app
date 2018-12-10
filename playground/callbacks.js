var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Graham'
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(1000, (userObject) => {
  console.log(userObject);
});
