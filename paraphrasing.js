const { paraphrase } = require('paraphrase');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the text you want to paraphrase: ', (text) => {
  rl.question('Select an option (Professional, Creative, Urgent): ', (option) => {
    paraphrase(text, option.toLowerCase())
      .then((result) => {
        console.log('Paraphrased text:', result);
        rl.close();
      })
      .catch((error) => {
        console.error('Error occurred:', error);
        rl.close();
      });
  });
});

rl.on('close', () => {
  process.exit(0);
});
