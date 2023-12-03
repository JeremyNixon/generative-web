chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
if (request.action === 'callOpenAI') {
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        prompt: request.prompt,
        max_tokens: 50
    })
    })
    .then(response => response.json())
    .then(data => sendResponse({response: data}))
    .catch(error => sendResponse({error: error}));
    return true;  // Indicates asynchronous response
}
});
