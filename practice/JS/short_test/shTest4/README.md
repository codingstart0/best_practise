#Setting text content

This example uses a <div> element containing a <textarea> and two <button> elements. When the user clicks the first button we set some text in the <textarea>. When the user clicks the second button we clear the text. We use:

- Document.querySelector() to access the <textarea> and the button
- EventTarget.addEventListener() to listen for button clicks
- Node.textContent to set and clear the text.
