const savedPapers = document.getElementById('savedPapers');

document.addEventListener('DOMContentLoaded', displaySavedPapers);

function displaySavedPapers() {
    savedPapers.innerHTML = '<p class="loading">Loading saved papers...</p>';
    
    fetch('http://localhost:3000/saved')
        .then(response => response.json())
        .then(data => {
            savedPapers.innerHTML = '';
            if (data.length === 0) {
                savedPapers.innerHTML = '<p>No saved papers yet. Go to the search page to save some papers!</p>';
                return;
            }
            data.forEach(paper => {
                const paperElement = createSavedPaperElement(paper);
                savedPapers.appendChild(paperElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            savedPapers.innerHTML = '<p class="error">An error occurred while loading saved papers. Please try again later.</p>';
        });
}

function createSavedPaperElement(paper) {
    const paperElement = document.createElement('div');
    paperElement.className = 'paper';
    paperElement.innerHTML = `
        <h3>${paper.title}</h3>
        <p><strong>Authors:</strong> ${paper.authors}</p>
        <p><strong>Year:</strong> ${paper.year}</p>
        <p><strong>Citations:</strong> ${paper.citations}</p>
        <button onclick="removePaper(${paper.id})"><i class="fas fa-trash"></i> Remove</button>
    `;
    return paperElement;
}

function removePaper(id) {
    fetch(`http://localhost:3000/saved/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        displaySavedPapers();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while removing the paper. Please try again.');
    });
}