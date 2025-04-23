import { Dispatch, SetStateAction } from "react";

export type List = { _id: string; title: string; progress: number };
export type ListCardProps = { list: List; setSelectedList: (list: List) => void };

export type Task = { _id: string; title: string; isDone: boolean; order: number; list: string };
export type TasksContainerProps = { selectedList: List; setSelectedList: Dispatch<SetStateAction<List | undefined>> };
export type TaskCardProps = { task: Task; editTask: (task: Task) => void; deleteTask: (taskId: string) => void };
