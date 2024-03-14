// Check if document object is defined (i.e., running in a browser environment)
if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", function () {
        const quoteContainer = document.getElementById("quote");
        const newQuoteBtn = document.getElementById("newQuoteBtn");
        const copyBtn = document.getElementById("copyBtn");
        const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"]; // Array of background colors
        const fonts = ["Arial", "Verdana", "Georgia", "Times New Roman", "Courier New"]; // Array of font families

        function fetchQuote() {
            fetch("https://api.quotable.io/random")
                .then(response => response.json())
                .then(data => {
                    const quote = data.content;
                    const author = data.author;
                    const html = `<blockquote>"${quote}"<footer>- ${author}</footer></blockquote>`;
                    quoteContainer.innerHTML = html;
                    displayDateAndLocation();
                })
                .catch(error => {
                    console.error("Error fetching quote:", error);
                    quoteContainer.innerHTML = "<p>Failed to fetch quote. Please try again later.</p>";
                });
        }

        function copyQuoteToClipboard() {
            const quoteText = quoteContainer.textContent.trim();
            navigator.clipboard.writeText(quoteText)
                .then(() => {
                    console.log("Quote copied to clipboard:", quoteText);
                    alert("Quote copied to clipboard!");
                })
                .catch(error => {
                    console.error("Error copying quote to clipboard:", error);
                    alert("Failed to copy quote to clipboard. Please try again.");
                });
        }

        function displayDateAndLocation() {
            const dateElement = document.getElementById("date");
            const locationElement = document.getElementById("location");

            // Get current date and time in Indian time zone
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                timeZone: 'Asia/Kolkata' // Indian time zone
            };
            const currentDate = new Date().toLocaleDateString('en-IN', options);
            const currentTime = new Date().toLocaleTimeString('en-IN', {timeStyle: 'short', timeZone: 'Asia/Kolkata'});
            const formattedDateTime = `${currentDate}, ${currentTime}`;
            
            dateElement.textContent = formattedDateTime;

            // Simulated location (Replace this with actual location retrieval)
            const location = "New Delhi, India";
            locationElement.textContent = location;
        }

        // Fetch a new quote when the page loads
        fetchQuote();

        // Fetch a new quote when the "New Quote" button is clicked
        newQuoteBtn.addEventListener("click", fetchQuote);

        // Copy the quote to clipboard when the "Copy Quote" button is clicked
        copyBtn.addEventListener("click", copyQuoteToClipboard);

        // Change background color when the "New Quote" button is clicked
        newQuoteBtn.addEventListener("click", function () {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;
        });

        // Change font when the "New Quote" button is clicked
        newQuoteBtn.addEventListener("click", function () {
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            document.body.style.fontFamily = randomFont;
        });
    });
}
