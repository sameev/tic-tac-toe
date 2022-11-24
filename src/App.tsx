import { createRoot } from "react-dom/client";
import Board from "./Board";
import "./style.css";

const App = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
