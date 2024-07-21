require('dotenv').config()

async function token(req, res){
    res.send({yes:'yes'})
}

async function nutrition(req, res){
  if(req.body.branded)
    fetch(`https://trackapi.nutritionix.com/v2/search/item/?nix_item_id=${req.body.food}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-app-id': process.env.NUTRITIONIXID,
        'x-app-key': process.env.NUTRITIONIXKEY,
        'x-remote-user-id': 0
      },
    })
    .then(async response => {res.send(await response.json())})
    .catch((error) => {
      console.error('Error:', error);
    });
  else
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.NUTRITIONIXID,
        'x-app-key': process.env.NUTRITIONIXKEY,
        'x-remote-user-id': 0

      },
      body: JSON.stringify({ 
        query: req.body.food
      }) 
    })
    .then(async response => {res.send(await response.json())})
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function nutritionSearch(req, res){
    var url = `https://trackapi.nutritionix.com/v2/search/instant/?query=${req.query.query}`;
    
    fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.NUTRITIONIXID,
        'x-app-key': process.env.NUTRITIONIXKEY,
        'x-remote-user-id': 0
      },
    })
    .then(async response => {res.send(await response.json())})
    .catch((error) => {
      console.error('Error:', error);
    });
}

module.exports = {
    token,
    nutrition,
    nutritionSearch
}