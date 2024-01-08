// Imported required Libraries / Modules
const { paraphrase } = require('paraphrase');
const readline = require('readline');

// Used Readline Module from Nodejs - To have Command Line Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Used Paraphrase Library to attain required output
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

// Exited the CLI
rl.on('close', () => {
  process.exit(0);
});
