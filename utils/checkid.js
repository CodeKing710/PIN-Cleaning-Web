module.exports = async function checkID(userID) {
  try {
    const user = await User.findOne({username: userID});
    if(user.access) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log('ID Check failed'+e);
    return false;
  }
};