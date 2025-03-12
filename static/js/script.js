document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('promptInput');
    const resultContainer = document.getElementById('resultContainer');
    const loading = document.getElementById('loading');
    const errorContainer = document.getElementById('errorContainer');
    const generatedImage = document.getElementById('generatedImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const previousPromptElement = document.getElementById("previousPrompt");
    function fetchPreviousPrompt() {
        fetch("/history")
            .then(response => response.json())
            .then(data => {
                if (data.previous_prompt) {
                    previousPromptElement.textContent = data.previous_prompt;
                } else {
                    previousPromptElement.textContent = "No previous prompt available";
                }
            })
            .catch(error => console.error("Error fetching history:", error));
    }

    fetchPreviousPrompt();

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            showError('Please enter a prompt');
            return;
        }

        // Clear previous results and errors
        resultContainer.classList.add('hidden');
        errorContainer.classList.add('hidden');
        errorContainer.textContent = ''; // Clear previous error messages
        loading.classList.remove('hidden');

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            generatedImage.src = data.image_url;
            resultContainer.classList.remove('hidden');

            // Setup download
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = data.image_url;
                link.download = `generated_image_${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        } catch (error) {
            showError(error.message || 'Something went wrong. Please try again.');
        } finally {
            loading.classList.add('hidden');
        }
    });

    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
    }
});
