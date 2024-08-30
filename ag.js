const wordLevel1 = ['apple', 'banana', 'grape', 'orange', 'mango', 'peach'];
const wordLevel2=['pineapple','strawberry','blueberry','watermelon'];
const wordLevel3=['india','australia','germany','japan']
const wordLevel4=['red','black','blue','orange'];
const wordLevel5=['crow','cat','bird','peacock'];

        const targetWordElement = document.getElementById('targetWord');
        const result = document.getElementById('result');
        const startButton = document.getElementById('startButton');
        const score=document.getElementById('score');
        let count=0;
        let var1=0;
        let targetWord = '';

        function getRandomWord() {
            switch (count) {
                case 1:
                    return wordLevel1[Math.floor(Math.random() * wordLevel1.length)];
                case 2:
                    return wordLevel2[Math.floor(Math.random() * wordLevel2.length)];
                case 3:
                    return wordLevel3[Math.floor(Math.random() * wordLevel3.length)];
                case 4:
                    return wordLevel4[Math.floor(Math.random() * wordLevel4.length)];
                case 5:
                    return wordLevel5[Math.floor(Math.random() * wordLevel5.length)];
                default:
                    return wordLevel1[Math.floor(Math.random() * wordLevel1.length)];
            }
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
                    count++;
                    var1++;
                    document.getElementById('score').textContent = 'Score:'+ count+"/"+var1;
                } else {
                    result.textContent = `Incorrect. You said "${spokenWord}", but the word is "${targetWord}"`;
                    var1++;
                    document.getElementById('score').textContent = 'Score:'+ count+"/"+var1;
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
                }, 3000);
            });


        } else {
            result.textContent = "Sorry, your browser doesn't support the Web Speech API.";
        }
