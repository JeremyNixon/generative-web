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
  