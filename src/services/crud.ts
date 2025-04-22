import { StorageService } from "./storage";

type List = { _id?: string; title: string; progress: number };

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

export const CrudService = { fetchAllLists, addNewList };
