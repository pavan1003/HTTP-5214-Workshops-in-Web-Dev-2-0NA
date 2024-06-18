# Vite React App

This is a simple Vite-powered React application deployed on Netlify.

## Overview

This project demonstrates how to build a React application using Vite and deploy it on Netlify. It fetches a random meme from Reddit's ProgrammerHumor subreddit using Reddit's API.

### Features

- Fetches a random meme from Reddit's ProgrammerHumor subreddit.
- Allows users to refresh and load a new meme.
- Displays loading animation while fetching data.
- Responsive design with a centered main content area.

### Technologies Used

- Vite
- React
- Axios for HTTP requests
- CSS for styling (basic styles included)

## Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment variables:**

   Create a .env file in the root directory and add the following:

   ```bash
   VITE_CLIENT_ID=""
   VITE_CLIENT_SECRET=""
   VITE_REFRESH_TOKEN=""
   ```

4. **Run the development server:**

   ```bash
   npm run dev

   ```

## Credits

Reddit API: [Reddit API](https://www.reddit.com/dev/api/)
