#Linking JavaScript with HTML

- There are following three main ways to add JavaScript to your web pages.

1. Embedding code: Adding the JavaScript code between a pair of <script>...</script> tag.

- The script in the head section:
<script>console.log('Hello World in head');</script>

- The script in the body section:
    <script>console.log('Hello World in body');</script>

2. Inline code: Placing JavaScript code directly inside HTML tags using some special attributes.

- <button onclick="console.log('Hello World inline JS code')">Inline JavaScript code</button>

3. External file: Making a separate JavaScript file having .js as an extension.

- <script src='script.js'></script>
