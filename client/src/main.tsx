import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set the title based on the application
document.title = "NoBS_GPT - A Tough Love AI Assistant";

// Add font imports to the head
const linkElement = document.createElement("link");
linkElement.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap";
linkElement.rel = "stylesheet";
document.head.appendChild(linkElement);

createRoot(document.getElementById("root")!).render(<App />);
