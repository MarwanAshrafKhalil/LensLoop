# LensLoop

LensLoop is a web application for sharing and discovering photography. Users can upload their photos, explore photos uploaded by others, and engage with the photography community.



## Architecture Overview

LensLoop is a web application designed to provide users with a platform for sharing and discovering images and videos. The project leverages the MERN (MongoDB, Express.js, React.js, Node.js) stack for its backend and frontend development, along with Tailwind CSS for styling. LensLoop is built using Vite for efficient development and TypeScript for enhanced type safety and developer productivity.

The application architecture is structured to ensure scalability and flexibility for future enhancements. MongoDB is utilized to maintain separate collections for images and videos, allowing for efficient data management and optimized querying. This approach enables seamless retrieval and manipulation of media content, enhancing the overall user experience.

LensLoop incorporates various middleware solutions to streamline functionality and improve user interactions. Authentication is implemented using JSON Web Tokens (JWT), ensuring secure access to features such as liking, disliking, and media uploads. Middleware tools like multer facilitate the seamless uploading of media files, enhancing user engagement and interaction within the platform.

On the frontend side, LensLoop features a visually appealing homepage designed to showcase media content effectively. Custom components such as MediaCard and upload forms are developed to provide intuitive user interfaces, enabling users to interact with the application seamlessly.

Overall, LensLoop's architecture prioritizes scalability, flexibility, and user experience, making it a robust platform for sharing and discovering multimedia content.

## Setup Instructions

Follow these steps to set up the LensLoop project locally:

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or access to a MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MarwanAshrafKhalil/LensLoop.git
   ```

2. Navigate to the project directory:

   ```bash
   cd LensLoop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To run the LensLoop application locally:

1. Start the server:

   ```bash
   npm run dev
   ```

2. Start the client:

   ```bash
   npm run dev
   ```

3. Open your web browser and visit http://localhost:5173 to access the LensLoop application.

## Folder Structure

The folder structure of the LensLoop project is as follows:

```
LensLoop/
├── client/                 # React client-side code
├── api/                 # Express.js server-side code
├── node_modules/           # Node.js modules
├── package.json            # Node.js dependencies and scripts
├── README.md               # Project README file
└── ...                     # Other project files
```

## Technologies Used

LensLoop is built using the following technologies:

- MongoDB
- Express.js
- React.js
- Node.js
- Tailwind CSS
- Vite
- TypeScript
- Other dependencies...

## Contributing

Contributions to LensLoop are welcome! To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

Please let me know if you need any further assistance!
