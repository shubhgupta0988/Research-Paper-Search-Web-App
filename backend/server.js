const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let savedPapers = [];

// Extended set of dummy papers
const dummyPapers = [
  { id: 1, title: "Machine Learning Advances in Natural Language Processing", authors: "John Doe, Jane Smith", year: 2023, citations: 150 },
  { id: 2, title: "Artificial Intelligence in Healthcare: A Comprehensive Review", authors: "Alice Johnson, Bob Brown", year: 2022, citations: 200 },
  { id: 3, title: "Quantum Computing: Challenges and Future Prospects", authors: "Charlie Davis, Eva Wilson", year: 2023, citations: 80 },
  { id: 4, title: "Blockchain Technology in Supply Chain Management", authors: "David Lee, Fiona Taylor", year: 2021, citations: 120 },
  { id: 5, title: "The Impact of Social Media on Mental Health", authors: "Grace Moore, Henry Clark", year: 2022, citations: 180 },
  { id: 6, title: "Climate Change: Mitigation Strategies and Global Policies", authors: "Irene White, Jack Robinson", year: 2023, citations: 250 },
  { id: 7, title: "Advancements in Renewable Energy Technologies", authors: "Kevin Young, Laura Hall", year: 2021, citations: 160 },
  { id: 8, title: "The Role of Artificial Intelligence in Autonomous Vehicles", authors: "Michael Green, Nancy Adams", year: 2022, citations: 140 },
  { id: 9, title: "Cybersecurity in the Age of Internet of Things", authors: "Oliver Wright, Pamela Scott", year: 2023, citations: 110 },
  { id: 10, title: "Gene Editing: Ethical Considerations and Future Applications", authors: "Quinn Miller, Rachel Turner", year: 2021, citations: 190 },
  { id: 11, title: "The Future of Work: Remote Work and Digital Nomadism", authors: "Samuel Baker, Tina Foster", year: 2022, citations: 95 },
  { id: 12, title: "Nanotechnology in Medicine: Current Applications and Future Prospects", authors: "Uma Patel, Victor Martinez", year: 2023, citations: 130 },
  { id: 13, title: "The Psychology of Decision Making in Economic Behavior", authors: "Wendy Lewis, Xander Thompson", year: 2021, citations: 170 },
  { id: 14, title: "Sustainable Urban Planning: Challenges and Innovations", authors: "Yolanda Carter, Zack Peterson", year: 2022, citations: 85 },
  { id: 15, title: "The Impact of Artificial Intelligence on Job Markets", authors: "Adam Wilson, Beth Davis", year: 2023, citations: 120 },
  { id: 16, title: "Advances in Cancer Research: Immunotherapy and Targeted Treatments", authors: "Carol Martin, Daniel Harris", year: 2021, citations: 220 },
  { id: 17, title: "The Role of Big Data in Modern Business Analytics", authors: "Emily Chen, Frank Lopez", year: 2022, citations: 160 },
  { id: 18, title: "Virtual Reality Applications in Education and Training", authors: "Gina Roberts, Harry Kim", year: 2023, citations: 90 },
  { id: 19, title: "The Neuroscience of Sleep and its Impact on Cognitive Function", authors: "Isabel Nguyen, James Wilson", year: 2021, citations: 140 },
  { id: 20, title: "Sustainable Agriculture: Innovations for Food Security", authors: "Kathy Brown, Liam O'Connor", year: 2022, citations: 180 },
  { id: 21, title: "The Evolution of 5G Technology and Its Societal Impact", authors: "Mark Johnson, Nina Patel", year: 2023, citations: 110 },
  { id: 22, title: "Robotics in Healthcare: Current Applications and Future Possibilities", authors: "Oscar Lee, Penny White", year: 2021, citations: 130 },
  { id: 23, title: "The Economics of Renewable Energy: Challenges and Opportunities", authors: "Quincy Adams, Rita Chen", year: 2022, citations: 95 },
  { id: 24, title: "Artificial Intelligence in Financial Services: Risks and Rewards", authors: "Steve Taylor, Tina Davis", year: 2023, citations: 170 },
  { id: 25, title: "Ocean Plastic Pollution: Innovative Solutions and Global Initiatives", authors: "Ursula Brown, Vincent Garcia", year: 2021, citations: 200 },
  { id: 26, title: "The Future of Transportation: Hyperloop and Beyond", authors: "Walter Scott, Xena Lewis", year: 2022, citations: 75 },
  { id: 27, title: "Advancements in Solar Cell Efficiency: A Technical Review", authors: "Yvonne Clark, Zach Peterson", year: 2023, citations: 120 },
  { id: 28, title: "The Psychology of Social Media Addiction", authors: "Alan Reed, Bella Martinez", year: 2021, citations: 190 },
  { id: 29, title: "Blockchain in Voting Systems: Ensuring Electoral Integrity", authors: "Cameron White, Diana Lee", year: 2022, citations: 85 },
  { id: 30, title: "Machine Learning in Weather Prediction: Improving Accuracy", authors: "Ethan Brown, Fiona Taylor", year: 2023, citations: 140 },
  { id: 31, title: "The Impact of Telemedicine on Rural Healthcare Access", authors: "George Wilson, Hannah Davis", year: 2021, citations: 160 },
  { id: 32, title: "Quantum Cryptography: Ensuring Future Data Security", authors: "Ian Foster, Julia Kim", year: 2022, citations: 110 },
  { id: 33, title: "Sustainable Fashion: Innovations in Eco-Friendly Textiles", authors: "Kyle Green, Lila Patel", year: 2023, citations: 70 },
  { id: 34, title: "The Role of Gut Microbiome in Mental Health", authors: "Mike Chen, Nora Adams", year: 2021, citations: 210 },
  { id: 35, title: "Smart Cities: Integrating IoT for Urban Development", authors: "Oliver Scott, Penny White", year: 2022, citations: 130 },
  { id: 36, title: "Artificial Intelligence in Drug Discovery and Development", authors: "Quentin Lee, Rachel Turner", year: 2023, citations: 180 },
  { id: 37, title: "The Psychology of Fake News Propagation on Social Media", authors: "Samuel Baker, Tina Foster", year: 2021, citations: 220 },
  { id: 38, title: "Renewable Energy Storage Solutions: Current State and Future Directions", authors: "Uma Patel, Victor Martinez", year: 2022, citations: 100 },
  { id: 39, title: "The Ethics of Autonomous Weapons Systems", authors: "William Jones, Xena Lewis", year: 2023, citations: 90 },
  { id: 40, title: "Personalized Medicine: Tailoring Treatment Using Genetic Information", authors: "Yolanda Carter, Zack Peterson", year: 2021, citations: 170 },
  { id: 41, title: "The Impact of Screen Time on Child Development", authors: "Adam Wilson, Beth Davis", year: 2022, citations: 190 },
  { id: 42, title: "Sustainable Packaging: Innovations in Biodegradable Materials", authors: "Carol Martin, Daniel Harris", year: 2023, citations: 80 },
  { id: 43, title: "The Role of Artificial Intelligence in Cybersecurity", authors: "Emily Chen, Frank Lopez", year: 2021, citations: 150 },
  { id: 44, title: "Urban Farming: Solutions for Food Security in Cities", authors: "Gina Roberts, Harry Kim", year: 2022, citations: 110 },
  { id: 45, title: "The Neuroscience of Addiction: New Insights and Treatments", authors: "Isabel Nguyen, James Wilson", year: 2023, citations: 200 },
  { id: 46, title: "Quantum Sensing: Applications in Medicine and Beyond", authors: "Kathy Brown, Liam O'Connor", year: 2021, citations: 70 },
  { id: 47, title: "The Future of Work: AI, Automation, and Human Skills", authors: "Mark Johnson, Nina Patel", year: 2022, citations: 160 },
  { id: 48, title: "Sustainable Water Management: Innovations for Water Scarcity", authors: "Oscar Lee, Penny White", year: 2023, citations: 130 },
  { id: 49, title: "The Psychology of Consumer Behavior in Digital Marketplaces", authors: "Quincy Adams, Rita Chen", year: 2021, citations: 180 },
  { id: 50, title: "Fusion Energy: Progress and Challenges in Achieving Sustainable Fusion", authors: "Steve Taylor, Tina Davis", year: 2022, citations: 100 },
  { id: 51, title: "The Impact of Social Robots on Elderly Care", authors: "Ursula Brown, Vincent Garcia", year: 2023, citations: 90 },
  { id: 52, title: "Blockchain in Healthcare: Ensuring Data Privacy and Interoperability", authors: "Walter Scott, Xena Lewis", year: 2021, citations: 140 },
  { id: 53, title: "Climate Change and Biodiversity: Assessing Impacts and Adaptation Strategies", authors: "Yvonne Clark, Zach Peterson", year: 2022, citations: 210 },
  { id: 54, title: "The Role of Artificial Intelligence in Music Composition", authors: "Alan Reed, Bella Martinez", year: 2023, citations: 60 },
  { id: 55, title: "Nanorobotics in Medicine: Current Progress and Future Applications", authors: "Cameron White, Diana Lee", year: 2021, citations: 120 },
  { id: 56, title: "The Psychology of Online Learning: Challenges and Best Practices", authors: "Ethan Brown, Fiona Taylor", year: 2022, citations: 170 },
  { id: 57, title: "Sustainable Aviation: Innovations in Green Aircraft Technology", authors: "George Wilson, Hannah Davis", year: 2023, citations: 80 },
  { id: 58, title: "The Impact of Artificial Intelligence on Legal Systems", authors: "Ian Foster, Julia Kim", year: 2021, citations: 130 },
  { id: 59, title: "Precision Agriculture: Using AI and IoT for Sustainable Farming", authors: "Kyle Green, Lila Patel", year: 2022, citations: 150 },
  { id: 60, title: "The Neuroscience of Creativity: Understanding and Enhancing Innovation", authors: "Mike Chen, Nora Adams", year: 2023, citations: 190 },
  { id: 61, title: "Circular Economy: Strategies for Sustainable Manufacturing", authors: "Oliver Scott, Penny White", year: 2021, citations: 110 },
  { id: 62, title: "The Role of Virtual Reality in Pain Management", authors: "Quentin Lee, Rachel Turner", year: 2022, citations: 85 },
  { id: 63, title: "Artificial Intelligence in Education: Personalized Learning and Assessment", authors: "Samuel Baker, Tina Foster", year: 2023, citations: 160 },
  { id: 64, title: "The Psychology of Climate Change Denial: Overcoming Barriers to Action", authors: "Uma Patel, Victor Martinez", year: 2021, citations: 200 },
  { id: 65, title: "Quantum Machine Learning: Harnessing Quantum Computers for AI", authors: "William Jones, Xena Lewis", year: 2022, citations: 70 },
  { id: 66, title: "Sustainable Fashion: The Rise of Lab-Grown and Alternative Materials", authors: "Yolanda Carter, Zack Peterson", year: 2023, citations: 95 },
  { id: 67, title: "The Impact of Artificial Intelligence on Journalism and Media", authors: "Adam Wilson, Beth Davis", year: 2021, citations: 140 },
  { id: 68, title: "Green Computing: Energy-Efficient Algorithms and Hardware", authors: "Carol Martin, Daniel Harris", year: 2022, citations: 120 },
  { id: 69, title: "The Neuroscience of Decision-Making: Implications for Economics", authors: "Emily Chen, Frank Lopez", year: 2023, citations: 180 },
  { id: 70, title: "Sustainable Tourism: Balancing Economic Benefits and Environmental Protection", authors: "Gina Roberts, Harry Kim", year: 2021, citations: 100 },
  { id: 71, title: "The Role of Artificial Intelligence in Space Exploration", authors: "Isabel Nguyen, James Wilson", year: 2022, citations: 130 },
  { id: 72, title: "Bioplastics: Innovations in Biodegradable and Compostable Materials", authors: "Kathy Brown, Liam O'Connor", year: 2023, citations: 90 },
  { id: 73, title: "The Psychology of Virtual Team Collaboration", authors: "Mark Johnson, Nina Patel", year: 2021, citations: 150 },
  { id: 74, title: "Sustainable Construction: Innovations in Green Building Materials", authors: "Oscar Lee, Penny White", year: 2022, citations: 110 },
  { id: 75, title: "The Impact of Social Media on Political Polarization", authors: "Quincy Adams, Rita Chen", year: 2023, citations: 190 },
  { id: 76, title: "Artificial Intelligence in Art: Creativity and Authorship in the Digital Age", authors: "Steve Taylor, Tina Davis", year: 2021, citations: 80 },
  { id: 77, title: "The Future of Transportation: Flying Cars and Urban Air Mobility", authors: "Ursula Brown, Vincent Garcia", year: 2022, citations: 70 },
  { id: 78, title: "Blockchain in Supply Chain: Ensuring Transparency and Traceability", authors: "Walter Scott, Xena Lewis", year: 2023, citations: 130 },
  { id: 79, title: "The Neuroscience of Empathy: Implications for Conflict Resolution", authors: "Yvonne Clark, Zach Peterson", year: 2021, citations: 160 },
  { id: 80, title: "Sustainable Fishing: Innovations in Aquaculture and Fish Farming", authors: "Alan Reed, Bella Martinez", year: 2022, citations: 95 },
  { id: 81, title: "The Role of Artificial Intelligence in Personalized Marketing", authors: "Cameron White, Diana Lee", year: 2023, citations: 140 }
];

app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = dummyPapers.filter(paper => 
    paper.title.toLowerCase().includes(query) || 
    paper.authors.toLowerCase().includes(query)
  );
  res.json(results);
});

app.post('/save', (req, res) => {
  const paper = req.body;
  savedPapers.push(paper);
  res.json({ message: 'Paper saved successfully', savedPapers });
});

app.get('/saved', (req, res) => {
  res.json(savedPapers);
});

app.delete('/saved/:id', (req, res) => {
  const id = parseInt(req.params.id);
  savedPapers = savedPapers.filter(paper => paper.id !== id);
  res.json({ message: 'Paper removed successfully', savedPapers });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});