# CommunionHub - React Web Application

### 📜 Overview
**CommunionHub** is a modern React web application designed to connect people of all faiths through events and community support. The application allows users to view events, filter them by category, and add new events with relevant details.

This project was developed using the following technologies:
- **React + Vite** for the frontend.
- **TypeScript** for type safety.
- **Tailwind CSS + Shadcn** for styling and modern UI components.
- **Framer Motion** for smooth transitions and animations.

The app has two primary pages:
1. **Home Page**: Displays an introduction to CommunionHub and encourages users to explore events.
2. **Event Listing Page**: Allows users to view, filter, and add new events.

---

## 🚀 Features
### ✅ Home Page
- Hero section with a clear message and CTA button to navigate to the Events Page.
- Responsive design compatible with desktop and mobile.
- Modern design using **Shadcn UI components**.

### ✅ Event Listing Page
- Displays a list of events with essential details: Title, Date, Location, and Description.
- Allows filtering events by category: **Religious, Social, Charity**.
- Provides an easy form to add new events.
- Pinning important events to stay on top.
- Smooth animations using **Framer Motion**.

### ✅ Add Event Form
- Input validation using **Zod + React Hook Form**.
- Form fields include: Title, Date, Location, Description, and Category.
- Allows editing and deleting events.
- Events persist using **localStorage**.

---

## 📂 Project Structure
The project is organized as follows:
```
src/
│
├── components/      --> Reusable UI components.
│   ├── event/       --> Event-specific components (Card, Dialog, Filters).
│   ├── ui/          --> Core UI elements like Button, Card, Dialog.
│
├── pages/           --> Application pages (Home, Events, About).
├── types/           --> Type definitions for events.
├── lib/             --> Utility functions and form validations.
│
├── App.tsx          --> Main application component.
├── index.css        --> Tailwind CSS styling.
├── main.tsx         --> Application entry point.
```

---

## 💻 Installation
To run the project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/communionhub.git
```

2. Navigate to the project directory:
```
cd communionhub
```

3. Install dependencies:
```
npm install
```

4. Run the development server:
```
npm run dev
```

5. Open the application in your browser at:
```
http://localhost:5173
```

---

## 🎉 Deployment
The project is easily deployable on platforms like **Vercel** or **Netlify**.

### Deploy to Vercel
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/).
3. Import your GitHub repository.
4. Deploy the project.

### Deploy to Netlify
1. Push your code to GitHub.
2. Go to [Netlify](https://netlify.com/).
3. Connect your repository.
4. Deploy the project.

---

## 🛠 Technologies Used
- **React + Vite** - Frontend framework and bundler.
- **TypeScript** - Static type checking.
- **Tailwind CSS + Shadcn** - Modern and responsive UI design.
- **Framer Motion** - Smooth page transitions and animations.
- **React Hook Form + Zod** - Form handling and validation.
- **LocalStorage** - Persisting events data.

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 💬 Contact
If you have any questions or want to connect:
- **Twitter:** [@me_safwan_07](https://x.com/me_safwan_07)
- **GitHub:** [@me-safwan-07](https://github.com/me-safwan-07)
- **LinkedIn:** [Muhammed Safwan](https://www.linkedin.com/in/muhammedsafwan07/)

---

✨ **Thank you for visiting CommunionHub! 🎉**

