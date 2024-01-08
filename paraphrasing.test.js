const { paraphrase } = require('paraphrase');


// Written Test Cases and Used Jest Library for it.
test('Paraphrase function with professional option', async () => {
  const text = 'The weather forecast predicts rain throughout the weekend.';
  const paraphrasedText = await paraphrase(text, 'professional');
  expect(paraphrasedText).toBeDefined();
});

test('Paraphrase function with creative option', async () => {
  const text = 'The majestic mountain stood tall amidst the swirling mist.';
  const paraphrasedText = await paraphrase(text, 'creative');
  expect(paraphrasedText).toBeDefined();
});

test('Paraphrase function with urgent option', async () => {
  const text = 'Emergency services rushed to the scene within minutes of the accident.';
  const paraphrasedText = await paraphrase(text, 'urgent');
  expect(paraphrasedText).toBeDefined();
});

test('Paraphrase function with empty text', async () => {
  const text = '';
  const paraphrasedText = await paraphrase(text, 'professional');
  expect(paraphrasedText).toBeDefined();
});

test('Paraphrase function with unknown option', async () => {
  const text = 'The city skyline glowed with lights as the sun set behind the horizon.';
  const unknownOption = 'unknown';
  const paraphrasedText = await paraphrase(text, unknownOption);
  expect(paraphrasedText).toBeDefined();
});


// Passed all 5 Test Cases
