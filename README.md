# Met Museum Digital Gallery

A simple web application that allows users to explore curated artworks from The Metropolitan Museum of Art using their public API.
<img width="1920" height="976" alt="image" src="https://github.com/user-attachments/assets/f4505b91-57e9-4a39-940c-888010340128" />

## Features

- Browse artworks by department:
  - European Paintings
  - Drawings & Prints
  - The Robert Lehman Collection
- View artwork thumbnails, titles, and artists.
- Click "Learn More" to see detailed information and a larger image in a modal.
- "Load more" button to paginate through additional artworks.
- Responsive design for desktop and mobile.

<img width="1887" height="860" alt="image" src="https://github.com/user-attachments/assets/92e278a3-f282-4b86-9d11-ed1e45256304" />

## Used Technologies

- **HTML5**: Markup for the web page structure.
- **CSS3**: Styling and responsive layout.
- **JavaScript (ES6+)**: Application logic, DOM manipulation, and API requests.
- **Fetch API**: For making HTTP requests to the Met Museum API.
- **Metropolitan Museum of Art Collection API**: Source of artwork data and images.

## Getting Started
Clicking the GitHub pages link automatically starts up the project.

## Project Structure
app.js # Main JavaScript logic (API calls, DOM updates, modal) 
index.html # Main HTML file 
style.css # Styling for the gallery and modal 
images/ failed.png # Placeholder image for missing artwork images


## API

This project uses the [Metropolitan Museum of Art Collection API](https://metmuseum.github.io/).

## Customization

- To add more departments, update the department buttons and their corresponding department IDs in `app.js`.
- To change the number of artworks shown per page, modify the `showedArts` variable in `app.js`.

## License

This project is for educational purposes.
