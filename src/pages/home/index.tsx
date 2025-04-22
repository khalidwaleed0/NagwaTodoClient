import { useState } from "react";
import { TasksContainer } from "./tasksContainer";
import { ListsContainer } from "./ListsContainer";
import "./style.css";

export function Home() {
  const [isListOpen, setListOpen] = useState(false);
  return (
    <div className="home">
      <div className="home-card">
        <header>
          <span className="badge"></span>
          <span className="greet">Let's make today great!</span>
        </header>
        <div className="home-content">{isListOpen ? <TasksContainer /> : <ListsContainer />}</div>
      </div>
    </div>
  );
}
