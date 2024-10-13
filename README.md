# 🎯Goooooals

## Discover your most meaningful goal

Goooooals is a web application designed to help individuals set, refine, and achieve their personal and professional goals. In today's fast-paced world, many struggle with goal-setting, leading to feelings of aimlessness. Goooooals provides structured tools for discovering direction and motivation.

## 🌐 Live Demo

Experience Goooooals in action! Visit the live demo at [here](https://goooooals.vercel.app)

## 🖼️ Screenshots

Below are some screenshots of the Goooooals in action:

![image](https://github.com/user-attachments/assets/5c58a95e-0795-4c8e-bed1-9e6587a4a262)

![image](https://github.com/user-attachments/assets/0e503c75-c1b4-4bf5-b907-5afab9aaed54)

![image](https://github.com/user-attachments/assets/61c00c75-949b-480a-896d-1ef3be97f9fe)

## 🌟 Features

-   **Goal Generation Mode**:

    -   **Standard Goals Generator**: This feature allows users to generate random, impactful goals at the click of a button. Each goal is designed to be broad yet meaningful, providing a solid starting point for users. Additionally, users can add further details for refinement, ensuring that the goals resonate with their personal aspirations. Each goal includes:

        -   ⌛ **Duration**: Estimated time to complete the goal.
        -   📅 **Frequency**: Recommended frequency of effort (e.g., daily, weekly).
        -   🎚️ **Difficulty**: Challenge level categorized as easy, medium, or hard.
        -   🔡 **Category**: Broad area of the goal (e.g., personal development, health, career).
        -   🏷️ **Tags**: Relevant tags to help categorize and prioritize goals.
        -   💪 **Motivation**: A compelling explanation of why the goal is valuable.
        -   🚩 **Subgoals**: A breakdown of the main goal into actionable steps.
        -   ✅ **Criteria**: Metrics or outcomes that will indicate successful completion.

    -   **External Goals Generator**: Utilizing the [BoredAPI](https://boredapi.com/), this generator offers a diverse range of goal suggestions based on various activities. This is ideal for users looking to explore new interests or discover fresh, unexpected goals that might inspire them outside their usual pursuits. Each external goal includes:

        -   🕙 **Availability**: Timeframe when the activity can be pursued.
        -   👪 **Participants**: Recommended number of participants or whether it can be done solo.
        -   💰 **Price**: Estimated cost associated with the activity.
        -   🔡 **Type**: Categorization of the activity type.
        -   ♿ **Accessibility**: Information on how accessible the activity is for different users.
        -   ⏳ **Duration**: Expected time commitment for the activity.
        -   👶 **Kid Friendly**: Indicates whether the activity is suitable for children.
        -   🔗 **Link**: Additional resources or links related to the activity.

    -   **Intelligent Goals Generator**: This generator is intended to employ AI to provide tailored goal suggestions based on user input. Users will be able to specify their interests, values, and preferred difficulty levels, allowing the app to recommend customized goals that align with their unique circumstances. _(Note: This feature is not yet implemented but is planned for future development.)_

-   **Subgoals and Customization**:

    -   Users can request detailed breakdowns of their goals into actionable subgoals, making it easier to track progress. Customization options allow users to modify these subgoals or regenerate them to better align with their evolving needs and preferences.

-   **Interactive User Experience**:

    -   Users can generate and review multiple goals, giving them the freedom to explore different paths. They have the option for an in-depth breakdown of selected goals and subgoals, facilitating better planning and tracking of their progress.

-   **Seamless Email Integration**:
    -   Users can opt to receive goal details directly in their inbox, which includes comprehensive information about each goal, subgoal breakdowns, and motivational content.

## 🔮 Future Enhancements

-   AI-generated goals for highly personalized suggestions.
-   Progress tracking features, including reminders and motivational prompts.

## 🛠️ Technology Stack

Goooooals is built using the following technologies:

-   **Frontend**:

    -   **Next.js**: A React framework for building server-side rendered applications.
    -   **NextUI**: A modern UI library for React, providing pre-built components for a sleek design.
    -   **React**: A JavaScript library for building user interfaces.

-   **Backend**:

    -   **Node.js**: JavaScript runtime for building scalable network applications.
    -   **BoredAPI**: An external API used for generating diverse goal suggestions.

-   **Email Service**:

    -   **Nodemailer**: A module for Node.js to send emails easily.

-   **Deployment**:
    -   **Vercel**: For deploying the Next.js application seamlessly.

This technology stack allows for a scalable application, providing users with a seamless goal-setting experience.

## ⚙️ Installation and Setup

Follow these steps to set up the Goooooals on your local machine:

### Prerequisites

Before you start, make sure you have the following installed:

-   **[Node.js](https://nodejs.org/)**: This is required to run the app and comes with npm (Node Package Manager). You need Node.js version 14.x or higher.
-   **[npm](https://www.npmjs.com/)**: This is included with Node.js and is used to manage project dependencies. Alternatively, you can use [Yarn](https://classic.yarnpkg.com/), which is an optional package manager that some developers prefer.

### Getting Started

1. **Clone the Repository**

    Start by cloning the Goooooals repository to your local machine. Open your terminal and run:

    ```bash
    git clone [url]
    ```

    Replace `[url]` with the URL of the repository. This command creates a copy of the project on your computer.

2. **Navigate to the Project Directory**

    Move into the project directory where the cloned files are located:

    ```bash
    cd goooooals
    ```

3. **Install Project Dependencies**

    Install the necessary libraries and packages required for the app to run. You can use either npm or Yarn:

    - With npm:

        ```bash
        npm install
        ```

    - With Yarn:
        ```bash
        yarn install
        ```

    This command will download and install all dependencies listed in the `package.json` file.

4. **Set Up Environment Variables**

    The app requires certain environment variables to function correctly. Create a `.env` file in the root of the project if it doesn’t already exist, and add the following variables:

    - `SMTP_HOST`: The hostname of your SMTP server used for sending emails.
    - `EMAIL_USER`: The username or email address used for authentication with the SMTP server.
    - `EMAIL_PASS`: The password associated with the EMAIL_USER. This is used for authentication when connecting to the SMTP server. _(Note: Sometimes, this may be an app password depending on the user and email provider.)_

    Make sure to replace these placeholders with your actual values.

5. **Start the Development Server**

    Launch the app in development mode. This will start a local server where you can view and interact with the app:

    - With npm:

        ```bash
        npm run dev
        ```

    - With Yarn:
        ```bash
        yarn dev
        ```

6. **Open and View the Application**

    After starting the development server, open your web browser and go to [http://localhost:3000](http://localhost:3000) to see the app in action.

### Build and Deploy (Optional)

If you want to prepare the app for production or deploy it to a server, follow these additional steps:

7. **Build for Production**

    To create a production-ready build of the app, which optimizes it for performance:

    - With npm:

        ```bash
        npm run build
        ```

    - With Yarn:
        ```bash
        yarn build
        ```

    This command generates static files that are ready to be deployed.

8. **Start the Production Server**

    To run the production build of the app:

    - With npm:

        ```bash
        npm start
        ```

    - With Yarn:
        ```bash
        yarn start
        ```

    This starts the server using the optimized production build.

9. **Deploy to Vercel**

    To deploy your app, you can use Vercel’s deployment platform. You can either use the [Vercel CLI](https://vercel.com/docs/concepts/cli) or deploy directly through the Vercel dashboard. For an easy deployment experience, follow the instructions on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). For more details, check the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

By following these steps, you should be able to set up and run the Goooooals locally. If you encounter any issues or have questions, feel free to reach out or consult the provided documentation.

Feel free to adjust these instructions based on your specific setup or additional requirements!

## 📄 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code under the terms of this license. For more details, please refer to the [LICENSE](LICENSE) file in the repository.

## 👤 Credits

This project was developed and is maintained solely by [Nicholas Lee](https://github.com/nicholaslhq). All aspects of the design, development, and implementation have been carried out independently.

Special thanks to:

- **[ChatGPT](https://www.openai.com/chatgpt)**: For providing assistance and guidance throughout the development process.
- **[Stack Overflow](https://stackoverflow.com/)**: For the invaluable community support and solutions that helped resolve various technical challenges.
