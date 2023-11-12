const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your MongoDB connection string: ', (mongoURI) => {
  try {
    fs.writeFileSync(path.join(__dirname, './server/.env'), `MONGO_URI="${mongoURI}"\n`, 'utf8');
  } catch (err) {
    console.error(err);
    rl.close();
    return;
  }

  rl.question('Enter your session secret key: ', (secretKey) => {
    try {
      fs.appendFileSync(path.join(__dirname, './server/.env'), `SECRET_KEY="${secretKey}"\n`, 'utf8');
    } catch (err) {
      console.error(err);
    }

    rl.close();
  });
});