// Script.js 

// Constants for tag options 
const tagOptions = [
    "p", "h1", "h2",
    "h3", "h4", "h5",
    "h6", "span",
];

// Get DOM elements 
const optionsContainer = document.querySelector(".options");
const outputContainer = document.querySelector(".output");
const tagsSelect = document.getElementById("tags");
const paragraphsSlider = document.getElementById("paragraphs");
const wordsSlider = document.getElementById("words");
const paragraphsValue = document.getElementById("paragraphsValue");
const wordsValue = document.getElementById("wordsValue");
const copyTextButton = document.getElementById("copyText");
const copyHtmlButton = document.getElementById("copyHtml");

// Create Options UI 
function createOptionsUI() {
    // With tag options, fill up the <select> element. 
    tagOptions.forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = `<${tag}>`;
        tagsSelect.appendChild(option);
    });

    // Event listeners for sliders 
    paragraphsSlider.addEventListener("input", updateParagraphsValue);
    wordsSlider.addEventListener("input", updateWordsValue);

    const generateButton = document.getElementById("generate");
    generateButton.addEventListener("click", generateLoremIpsum);
    copyTextButton.addEventListener("click", () => copyToClipboard(false));
    copyHtmlButton.addEventListener("click", () => copyToClipboard(true));
}

// Update the displayed value for Paragraphs 
function updateParagraphsValue() {
    paragraphsValue.textContent = paragraphsSlider.value;
}

// Words per Paragraph have got to be updated on the display 
function updateWordsValue() {
    wordsValue.textContent = wordsSlider.value;
}

// Generate Lorem Ipsum text 
function generateLoremIpsum() {
    const paragraphs = parseInt(paragraphsSlider.value);
    const tag = document.getElementById("tags").value;
    const includeHtml = document.getElementById("include").value;
    const wordsPerParagraph = parseInt(wordsSlider.value);

    const loremIpsumText = generateText(paragraphs, tag, includeHtml, wordsPerParagraph);
    displayLoremIpsum(loremIpsumText);
}

// Function to generate Lorem Ipsum text 
function generateText(paragraphs, tag, includeHtml, wordsPerParagraph) {
    // Use a placeholder text as an example for illustrating. 
    const placeholderText = `Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

    // Create an array of paragraphs 
    const loremIpsumArray = new Array(paragraphs).fill("");

    // Generate words for each paragraph 
    for (let i = 0; i < paragraphs; i++) {
        const words = generateWords(wordsPerParagraph);
        loremIpsumArray[i] = includeHtml === "Yes" ? `<${tag}>${words}</${tag}>` : words;
    }

    // Join paragraphs into a single string 
    return loremIpsumArray.join("\n");
}

// Function to generate a specified number of words 
function generateWords(numWords) {
    // Lorem Ipsum text for demonstration purposes 
    const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at efficitur lectus. Donec dapibus, sem sit amet ornare mollis, dolor diam cursus velit, vel luctus leo tellus sed enim. Phasellus et posuere orci. Quisque vestibulum dapibus erat, vel bibendum sem dignissim placerat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus suscipit purus sed est maximus, eu tincidunt nulla hendrerit. Suspendisse nec sodales velit. Morbi dapibus consectetur magna, sit amet fringilla neque consequat vel. Sed faucibus bibendum sapien, eget vehicula urna. Proin eu sollicitudin tellus. Nullam sed enim risus. Sed vel facilisis neque, quis porta risus. Etiam sit amet egestas nibh, id iaculis turpis. Nam placerat et dui at feugiat. In hac habitasse platea dictumst. Donec aliquam gravida ligula. Praesent nec lorem a velit lobortis egestas ac at sapien. Nunc sollicitudin nec neque mattis faucibus. Nam vulputate consectetur arcu, sed laoreet est commodo non. Pellentesque nec mattis sapien. Donec sed tortor a purus bibendum varius non quis lacus. Donec diam arcu, lacinia sed odio vitae, dictum condimentum ex. Fusce tempor, quam nec vulputate luctus, nibh dolor vulputate mi, non elementum sem nisi sed quam. Aliquam at vestibulum augue. Donec molestie condimentum egestas. Nullam placerat egestas interdum. Fusce tincidunt nulla faucibus augue feugiat fringilla. Ut luctus, nisi in ornare condimentum, risus magna sodales augue, eu auctor dolor diam sit amet tortor. Nulla facilisi. In hac habitasse platea dictumst. Nam scelerisque, elit eget maximus pulvinar, elit velit ornare velit, ac maximus dui felis at velit. In in nibh tellus. Etiam in pharetra leo. Vestibulum orci ante, porta quis dolor et, molestie ornare orci. Sed ut dolor eleifend orci venenatis fringilla id eu urna. Aliquam varius feugiat rhoncus. Donec felis quam, bibendum vel felis eu, aliquet dapibus augue. Vivamus in sagittis velit. Mauris congue ante at massa condimentum tincidunt. Phasellus commodo tempor felis ut viverra. Donec posuere nibh sit amet odio viverra, sed ultrices mi aliquam. Aliquam aliquet placerat purus, vel lobortis nibh consectetur ut. Nam dignissim a eros in blandit. Sed eget est orci. Donec blandit, ligula sed elementum pellentesque, arcu justo maximus tellus, rhoncus hendrerit felis elit et eros. In at est quis ligula condimentum finibus. Etiam suscipit imperdiet neque ut aliquet. Maecenas semper sapien id semper tincidunt. Aenean pretium feugiat feugiat. Ut vel magna vitae mi cursus sollicitudin. Sed eu lorem sed arcu ornare pretium. Curabitur tincidunt aliquam pretium. Duis mollis lacus urna, in convallis dui porta non. Proin tortor nisi, fermentum nec laoreet at, lobortis non lectus. Proin vehicula luctus nisl, quis commodo dui sollicitudin sit amet. Etiam leo nisl, euismod sit amet diam at, tempor molestie arcu.`;

    // Split the Lorem Ipsum text into words 
    const words = loremIpsumText.split(" ");

    // Ensure the number of words requested is within the bounds of the available words 
    if (numWords <= words.length) {
        return words.slice(0, numWords).join(" ");
    } else {
        return words.join(" ");
    }
}

// Display Lorem Ipsum text 
function displayLoremIpsum(text) {
    outputContainer.innerHTML = text;
}

// Copy to clipboard
function copyToClipboard(isHtml) {
    const content = outputContainer.innerHTML;
    const tempInput = document.createElement("textarea");
    tempInput.value = isHtml ? content : outputContainer.innerText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showCopiedMessage(isHtml ? copyHtmlButton : copyTextButton);
}

// Show copied message
function showCopiedMessage(button) {
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Copied!";
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

// Initialize the app 
createOptionsUI();
