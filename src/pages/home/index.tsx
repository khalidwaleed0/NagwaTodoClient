import { useState } from "react";
import { TasksContainer } from "./tasksContainer";
import { ListsContainer } from "./ListsContainer";
import { StorageService } from "../../services/storage";
import { AuthService } from "../../services/auth";
import { useNavigate } from "react-router";
import { List } from "../../types";
import "./style.css";

export function Home() {
  const navigate = useNavigate();
  const username = StorageService.getUserName();
  const [selectedList, setSelectedList] = useState<List>();
  function logout() {
    AuthService.logout()
      .then(() => StorageService.clear())
      .then(() => navigate("/login"));
  }
  return (
    <div className="home">
      <div className="home-card">
        <header>
          <span className="badge">
            {username?.charAt(0)}
            <ul className="dropdown">
              <li onClick={logout}>Signout</li>
            </ul>
          </span>
          <span className="greet">Welcome back, {username}!</span>
        </header>
        <div className="home-content">
          {selectedList ? (
            <TasksContainer selectedList={selectedList} setSelectedList={setSelectedList} />
          ) : (
            <ListsContainer setSelectedList={setSelectedList} />
          )}
        </div>
      </div>
    </div>
  );
}
