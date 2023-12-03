document.getElementById('sendPrompt').addEventListener('click', () => {
    console.log("Calling Rewrite Text!!!")
    const userPrompt = document.getElementById('userPrompt').value;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'rewriteText', prompt: userPrompt});
    });
  });
  