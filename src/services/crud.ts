import { List } from "../types";
import { StorageService } from "./storage";

type Task = { _id: string; title: string; isDone: boolean; order?: number; list: string };
function fetchAllLists() {
  return fetch(import.meta.env.VITE_APP_URL + "/list/all", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
  });
}

function addNewList(title: string) {
  return fetch(import.meta.env.VITE_APP_URL + "/list/new", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
    method: "POST",
    body: JSON.stringify({ title: title }),
  });
}
function editList(list: List) {
  return fetch(import.meta.env.VITE_APP_URL + "/list/edit", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
    method: "POST",
    body: JSON.stringify(list),
  });
}
function addNewTask(title: string, order: number, listId: string) {
  return fetch(import.meta.env.VITE_APP_URL + "/task/new", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
    method: "POST",
    body: JSON.stringify({ title: title, order: order, id: listId }),
  });
}

function fetchListTasks(listId: string) {
  return fetch(import.meta.env.VITE_APP_URL + "/task/all", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
    method: "POST",
    body: JSON.stringify({ _id: listId }),
  });
}
function editTask(task: Task) {
  return fetch(import.meta.env.VITE_APP_URL + "/task/edit", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
    method: "POST",
    body: JSON.stringify(task),
  });
}
function deleteTask(taskId: string) {
  return fetch(import.meta.env.VITE_APP_URL + "/task", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
    method: "DELETE",
    body: JSON.stringify({ _id: taskId }),
  });
}
export const CrudService = { fetchAllLists, addNewList, editList, fetchListTasks, addNewTask, editTask, deleteTask };
