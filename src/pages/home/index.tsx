import { useState } from "react";
import { TasksContainer } from "./tasksContainer";
import { ListsContainer } from "./ListsContainer";
import "./style.css";
import { StorageService } from "../../services/storage";

export function Home() {
  const [isListOpen, setListOpen] = useState(false);
  const username = StorageService.getUserName();
  return (
    <div className="home">
      <div className="home-card">
        <header>
          <span className="badge">{username?.charAt(0)}</span>
          <span className="greet">Welcome back, {username}!</span>
        </header>
        <div className="home-content">{isListOpen ? <TasksContainer /> : <ListsContainer />}</div>
      </div>
    </div>
  );
}
