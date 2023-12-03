#Adding a child element

This example uses a <div> element containing a <div> and two <button> elements. When the user clicks the first button we create a new element and add it as a child of the <div>. When the user clicks the second button we remove the child element. We use:

-     Document.querySelector() to access the <div> and the buttons
-     EventTarget.addEventListener() to listen for button clicks
-     Document.createElement to create the element
-     Node.appendChild() to add the child
-     Node.removeChild() to remove the child.
