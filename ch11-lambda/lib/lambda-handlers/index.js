exports.handler = async function(event, context) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 2000));
  const pokemon = ["Charmander", "Bulbasaur", "Squirtle"];

  const index = Math.floor(Math.random() * 3);
  const message = "Congratulations! You are given " + pokemon[index];

  return message;
}
