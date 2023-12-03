function rewriteText() {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    console.log("Elements:")
    console.log(elements)
    elements.forEach(element => {
      element.textContent = 'Boilerplate text';
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'rewriteText') {
      rewriteText();
      sendResponse({status: 'Text rewritten'});
    }
  });
  
document.addEventListener('click', rewriteText);

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "rewriteText") {
//       const elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
//       elements.forEach(element => {
//         element.textContent = "Boilerplate text";
//       });
//     }
//   });
  

async function requestOpenai(originalText, userPrompt) {
  // Construct the data to be sent to the OpenAI API
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: `Here's the original text: "${originalText}". Rewrite it according to the following user instruction: "${userPrompt}". Make sure the output is similar in length as the original text.` }],
    max_tokens: length(originalText) * 1.5
  };

  // Make an asynchronous request to the OpenAI API
  // Note: You need to include your OpenAI API Key in the request headers
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer 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`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  console.log("responseData: ", responseData)
  return responseData.choices[0]["message"]["content"];
}


async function rewriteTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.textContent.trim() !== '') {
      const rewrittenText = await rewriteTextInShakespeareStyle(node.textContent);
      node.textContent = rewrittenText;
    }
  } else {
    for (const child of node.childNodes) {
      await rewriteTextNodes(child); // Ensure recursive calls are awaited
    }
  }
}
