const authorizeUser = async (signal) => {
  //we can attach any object we want to this auth object, as is done on the client side. Otherwise this would simply be a null value.
  const userID = localStorage.getItem("userID");
  let response, responseJSON, user;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user/${userID}`, { signal });
    responseJSON = await response.json();
    if (responseJSON.data.user == null) {
      //userID does not exist -> new user if null user is found
      response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user`, { signal, method: "POST", body: JSON.stringify() }); //remember userID is in buffer format! use userIDString instead!
      if (signal.aborted) return;
      responseJSON = await response.json();
    }
  } catch (error) {
    if (signal.aborted) return;
    try {
      //userID is null
      //new user created if error occurs in fetching
      response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user`, { signal, method: "POST", body: JSON.stringify() }); //remember userID is in buffer format! use userIDString instead!
      if (signal.aborted) return;
      responseJSON = await response.json();
    } catch (error) {
      //do nothing
      return;
    }
  }
  user = responseJSON.data.user;
  // console.log(user);
  localStorage.setItem("userID", user.userIDString);
  return user;
};

export { authorizeUser };
