const words = ['apple', 'banana', 'grape', 'orange', 'pineapple', 'mango', 'strawberry', 'blueberry', 'peach', 'watermelon'];
        const targetWordElement = document.getElementById('targetWord');
        const result = document.getElementById('result');
        const startButton = document.getElementById('startButton');

        let targetWord = '';

        function getRandomWord() {
            return words[Math.floor(Math.random() * words.length)];
        }

        // Set a random word when the page loads
        function setNewWord() {
            targetWord = getRandomWord();
            targetWordElement.textContent = targetWord;
        }

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
                setNewWord();
                result.textContent = `Get ready to say the word...`;
                
                // Add a 5-second delay before starting recognition
                setTimeout(() => {
                    recognition.start();
                }, 5000);
            });
        } else {
            result.textContent = "Sorry, your browser doesn't support the Web Speech API.";
        }
