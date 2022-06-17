function generareToken(listTokensInUse) {
  var length = 64;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  if (listTokensInUse.includes(result)) {
    return generareToken(listTokensInUse)
  } else {
    return result;
   }
}


module.exports.generareToken = generareToken;