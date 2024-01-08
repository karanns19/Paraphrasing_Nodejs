const { paraphrase } = require('paraphrase');

test('Paraphrase function with professional option', async () => {
  const text = 'Original text to paraphrase';
  const paraphrasedText = await paraphrase(text, 'professional');
  expect(paraphrasedText).toBeDefined();
});
