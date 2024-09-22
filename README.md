# Chat-Flow

Chat-Flow is a modern, real-time chat application built using Next.js and Firebase. It enables seamless communication through instant messaging, user authentication, and an intuitive user interface. Chat-Flow is responsive, making it accessible on both desktop and mobile devices. With features like real-time updates, user profiles, and authentication, it aims to provide an efficient and enjoyable chat experience.

## Features

- **Real-time Messaging**: Instantly send and receive messages.
- **User Authentication**: Secure login and registration via Firebase Authentication.
- **Responsive Design**: Optimized for both desktop and mobile use.
- **User Profiles**: Each user has a customizable profile with settings.
- **File Uploads**: Seamlessly upload and share images using Cloudinary.
- **User Status**: Real-time online/offline status updates using Pusher.

## Technologies Used

### Frontend:
- **Next.js**: For building a server-rendered React application.
- **TypeScript**: Ensuring type safety and scalability.
- **Tailwind CSS**: For building responsive and customizable UI.
- **Sadcn UI**: For pre-built UI components to speed up development.

### Backend:
- **NextAuth**: For authentication and session management.
- **Prisma**: An ORM to simplify database interaction.
- **MongoDB**: As the primary database for storing user and message data.
- **Pusher JS**: For real-time features like live messaging and user status updates.

### File Storage:
- **Cloudinary**: For storing and serving uploaded images efficiently.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```
DATABASE_URL=<Your MongoDB connection string>
NEXTAUTH_SECRET=<A secure secret for NextAuth>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<Your Cloudinary API Key>
NEXT_PUBLIC_CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
AUTH_SECRET=<Your Authentication Secret>
NEXT_PUBLIC_PUSHER_APP_ID=<Your Pusher App ID>
NEXT_PUBLIC_PUSHER_APP_KEY=<Your Pusher App Key>
PUSHER_SECRET=<Your Pusher Secret>
NEXT_PUBLIC_PUSHER_CLUSTER=<Your Pusher Cluster>
NEXT_PUBLIC_WEB_URL=<Your application's public URL>
```

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vikashkhati007/Chat-Flow
   cd Chat-Flow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and add the required environment variables listed above.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Your app will be running at `http://localhost:3000`.

5. **Build the project for production:**
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Feel free to open a pull request or submit issues to improve Chat-Flow.

## License

This project is licensed under the MIT License.

---

This README covers all essential aspects of your project, from features to environment setup. Anything else you'd like to add?