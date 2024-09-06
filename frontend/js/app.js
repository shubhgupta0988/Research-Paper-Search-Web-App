const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', searchPapers);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchPapers();
    }
});

function searchPapers() {
    const query = searchInput.value;
    if (query.trim() === '') {
        alert('Please enter a search query');
        return;
    }
    
    searchResults.innerHTML = '<p class="loading">Searching...</p>';
    
    fetch(`http://localhost:3000/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
            searchResults.innerHTML = '<p class="error">An error occurred while searching. Please try again.</p>';
        });
}

function displaySearchResults(papers) {
    searchResults.innerHTML = '';
    if (papers.length === 0) {
        searchResults.innerHTML = '<p>No results found. Try different keywords.</p>';
        return;
    }
    papers.forEach(paper => {
        const paperElement = createPaperElement(paper);
        searchResults.appendChild(paperElement);
    });
}

function createPaperElement(paper) {
    const paperElement = document.createElement('div');
    paperElement.className = 'paper';
    paperElement.innerHTML = `
        <h3>${paper.title}</h3>
        <p><strong>Authors:</strong> ${paper.authors}</p>
        <p><strong>Year:</strong> ${paper.year}</p>
        <p><strong>Citations:</strong> ${paper.citations}</p>
        <button onclick="savePaper(${JSON.stringify(paper).replace(/"/g, '&quot;')})"><i class="fas fa-bookmark"></i> Save</button>
    `;
    return paperElement;
}

function savePaper(paper) {
    fetch('http://localhost:3000/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Paper saved successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while saving the paper. Please try again.');
    });
}