// Imported different libraries
const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Paraphrasing Function
async function paraphraseText(text, option) {
  const words = text.split(' ');

  const paraphrasedWords = await Promise.all(
    words.map(async (word) => {
      try {
        const synonyms = await getSynonyms(word, option);
        const paraphrasedWord = synonyms.length > 0 ? synonyms[0].word : word;

        return paraphrasedWord;
      } catch (error) {
        console.error(error.message);
        return word;
      }
    })
  );

  return paraphrasedWords.join(' ');
}
// Get Synonyms Function using API
async function getSynonyms(word, option) {
  let apiUrl = `https://api.datamuse.com/words?rel_syn=${word}`;

  // Add options based on user selection
  if (option === 'professional') {
    apiUrl += '&topics=professional';
  } else if (option === 'urgent') {
    apiUrl += '&topics=urgent';
  } else if (option === 'creative') {
    apiUrl += '&topics=creative';
  }

  const response = await axios.get(apiUrl);
  return response.data;
}

// Nodejs CLI Readlines Function
rl.question('Enter the text you want to paraphrase: ', async (text) => {
  rl.question('Select an option (Professional, Creative, Urgent): ', async (option) => {
    try {
      const paraphrasedText = await paraphraseText(text, option.toLowerCase());
      console.log('Paraphrased text:', paraphrasedText);
    } catch (error) {
      console.error('Error occurred:', error.message);
    } finally {
      rl.close();
    }
  });
});

// Exited CLI
rl.on('close', () => {
  process.exit(0);
});
