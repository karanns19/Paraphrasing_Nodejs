const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function paraphraseText(text, option) {
  const words = text.split(' ');

  const paraphrasedWords = await Promise.all(
    words.map(async (word) => {
      try {
        // Retrieve synonyms for each word using datamuse API
        const synonyms = await getSynonyms(word, option);

        // Use a synonym if available, otherwise keep the original word
        const paraphrasedWord = synonyms.length > 0 ? synonyms[0].word : word;

        return paraphrasedWord;
      } catch (error) {
        console.error(error.message);
        return word; // Keep the original word if an error occurs
      }
    })
  );

  return paraphrasedWords.join(' ');
}

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

rl.on('close', () => {
  process.exit(0);
});
