// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all the left grid items
    const leftItems = document.querySelectorAll('.left-container .grid-item');
    const rightContent = document.getElementById('right-content');
    const txtButton = document.getElementById('txtButton')
    const pdfButton = document.getElementById("pdfButton")
    const wordButton = document.getElementById("wordButton")

    // Add click event listeners to each left grid item
    leftItems.forEach(item => {
        item.addEventListener('click', async () => {
            // Get the file name from the data-file attribute
            const paperName = item.getAttribute('data-file');
            const txtPath = "writing/" +paperName+"/"+paperName + ".txt"
            const wordPath = "writing/" +paperName+"/"+paperName + ".docx"
            const pdfPath = "writing/" +paperName+"/"+paperName + ".pdf"
            
            try {
                // Fetch the content from the text file
                const response = await fetch(txtPath);
                if (!response.ok) {
                    throw new Error('File not found');
                }
                const text = await response.text();

                // Update the right content with the fetched text
                rightContent.textContent = text;
                txtButton.href = txtPath;
                pdfButton.href = pdfPath;
                wordButton.href = wordPath;
            } catch (error) {
                // Handle errors (e.g., file not found)
                rightContent.textContent = 'Error loading content.';
                console.error(error);
            }
        });
    });
});