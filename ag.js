const targetWord = document.getElementById('targetWord').textContent;
const result = document.getElementById('result');
const startButton = document.getElementById('startButton');

// Check if the Web Speech API is supported
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Set the recognition language to English
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        result.textContent = "Listening...";
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const spokenWord = event.results[0][0].transcript.toLowerCase();
        if (spokenWord === targetWord) {
            result.textContent = `Correct! You said "${spokenWord}"`;
        } else {
            result.textContent = `Try again. You said "${spokenWord}", but the word is "${targetWord}"`;
        }
    };

    recognition.onerror = function(event) {
        result.textContent = `Error occurred: ${event.error}`;
    };

    startButton.addEventListener('click', function() {
        recognition.start();
    });
} else {
    result.textContent = "Sorry, your browser doesn't support the Web Speech API.";
}