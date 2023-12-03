document.getElementById('sendPrompt').addEventListener('click', () => {
  console.log("Calling Rewrite Text!!!")
  const userPrompt = document.getElementById('userPrompt').value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'rewriteText', prompt: userPrompt });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the stored value from LocalStorage
  const storedPrompt = localStorage.getItem('userPrompt');
  if (storedPrompt) {
    document.getElementById('userPrompt').value = storedPrompt;
  }

  // Event listener for changes in the textarea
  document.getElementById('userPrompt').addEventListener('input', function (event) {
    // Save the current value to LocalStorage
    localStorage.setItem('userPrompt', event.target.value);
  });
});
