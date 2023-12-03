function rewriteText(prompt) {
  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
  console.log("Elements:")
  console.log(elements)
  elements.forEach(element => {
    elementChanger(element, prompt);
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'rewriteText') {
    rewriteText(request.prompt);
    sendResponse({ status: 'Text rewritten' });
  }
});

document.addEventListener('click', rewriteText);

async function requestOpenai(originalText, userPrompt) {
  // Construct the data to be sent to the OpenAI API
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Here's the original text: "${originalText}". Rewrite it according to the following user instruction: "${userPrompt}". Make sure the output is similar in length as the original text.` }],
    // max_tokens: Number(originalText?.length * 1.5)
  };

// const fs = require('fs');
// const apiKey = fs.readFileSync('api_key.txt', 'utf8').trim();

  // Make an asynchronous request to the OpenAI API
  // Note: You need to include your OpenAI API Key in the request headers
const response = await fetch('https://api.openai.com/v1/chat/completions', {
method: 'POST',
headers: {
    'Authorization': `Bearer `,
    'Content-Type': 'application/json',
},
body: JSON.stringify(data)
});

  const responseData = await response.json();
  console.log("responseData: ", responseData)
  return responseData?.choices[0].message?.content;
}


// async function rewriteTextNodes(node, text) {
//   if (node.nodeType === Node.TEXT_NODE) {
//     if (node.textContent.trim() !== '') {
//       const rewrittenText = await rewriteTextInShakespeareStyle(node.textContent);
//       node.textContent = rewrittenText;
//     }
//   } else {
//     for (const child of node.childNodes) {
//       await rewriteTextNodes(child); // Ensure recursive calls are awaited
//     }
//   }
// }



const elementChanger = async (element, prompt) => {
  // Simulate an API call with a delay

  // setTimeout(() => {
  // After the delay, update the element's text content
  // element.textContent = 'Boilerplate text';

//   const storedPrompt = localStorage.getItem('userPrompt');

  const response = await requestOpenai(element.textContent, prompt);
  console.log("response: ", response)
  element.textContent = response;




  // }, 2000); // Set the delay in milliseconds, e.g., 2000 milliseconds for 2 seconds
}