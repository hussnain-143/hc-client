# HC Client

The frontend client for the Healthcare Referral Management System. Built with React, Vite, and TailwindCSS.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 🛠 Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository_url>
    cd hc-client
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### ⚙️ Environment Setup

1.  Create a `.env` file in the root directory by copying the example:
    ```bash
    cp .env.example .env
    ```

2.  Update the `.env` file with your API URL if different from the default:
    ```env
    VITE_API_URL=https://hc-server-1.onrender.com/api
    ```

### 🏃‍♂️ Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or detailed in the terminal).

### 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds the application for production to the `dist` folder. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

## 📦 Technologies Used

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **State/HTTP:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## 📂 Project Structure

```
hc-client/
├── node_modules/       # Project dependencies
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages/views
│   ├── context/        # React Context providers
│   ├── layout/         # Layout components
│   └── ...
├── .env.example        # Environment variables example
├── package.json        # Project metadata and dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```
