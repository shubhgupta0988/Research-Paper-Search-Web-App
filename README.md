# Research-Paper-Search-Web-App
This web app allows users to search for research papers, view results, and save selected papers to a personal collection. Built with Node.js and JavaScript for seamless frontend and backend integration.

## Prerequisites
- Node.js (v12.0 or higher)
- npm (v6.0 or higher)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/shubhgupta0988/Research-Paper-Search-Web-App.git
   cd research-paper-search-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application
1. Start the server:
   ```
   npm start
   ```
3. Open your web browser and navigate to `http://localhost:3000`

## Features
- Search for research papers
- View paper details including title, authors, year, and citation count
- Save papers for later reference
- View and manage saved papers

## File Structure
- `index.html`: Main search page
- `saved.html`: Saved papers page
- `app.js`: JavaScript for the search functionality
- `saved.js`: JavaScript for managing saved papers
- `styles.css`: Styling for the application
- `server.js`: Backend for the application

## API Endpoints
- GET `/search?q={query}`: Search for papers
- POST `/save`: Save a paper
- GET `/saved`: Retrieve saved papers
- DELETE `/saved/{id}`: Remove a saved paper

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
