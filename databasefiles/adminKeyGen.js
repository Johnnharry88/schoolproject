async function generateUniqueNumber(user_id) {
  const year = new Date().getFullYear();
  const id = String(user_id).padStart(5, '0')
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const double_letters = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)]
  return(`RS/${year}/${id}${double_letters}`);
}

module.exports =  { generateUniqueNumber };
