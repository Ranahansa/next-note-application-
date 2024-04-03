# NOTE APPLICATION 

## Getting Started

This is a full-stack note application built with Next.js 14, TypeScript, and MongoDB. It allows users to create, update, delete, and view all their notes seamlessly. The application follows modern web development practices and leverages the latest features of Next.js for server-side rendering, static site generation, and API routes.

## Features

- **Create Notes**: Users can easily create new notes by providing a title and content.
- **Update Notes**: Existing notes can be updated with new content or title changes.
- **Delete Notes**: Users have the ability to remove unwanted notes from their collection.
- **View All Notes**: A comprehensive list of all notes is available for users to browse and manage.
- **Responsive Design**: The application is built with a responsive design, ensuring a seamless experience across various devices and screen sizes.
- **Secure**: User authentication and authorization mechanisms can be implemented to ensure data security and privacy.

## Technologies Used

- **Frontend**: Next.js 14, TypeScript, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB (with Mongoose)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/note-app.git

Navigate to the project directory:

```bash
cd note-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a .env.local file in the root directory and add the following variables:

MONGODB_URI=<your-mongodb-uri>
Replace <your-mongodb-uri> with the connection string for your MongoDB database.

4. Run the development server:

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser to view the app.


Deploying to Vercel

This application is deployed on Vercel, a popular hosting platform for serverless applications. You can deploy your own instance by following these steps:

Create a Vercel account (if you don't have one already).
Install the Vercel CLI:

```bash
npm install -g vercel
```
Deploy the application:

```bash
vercel
```

Follow the prompts to set up your deployment.

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
