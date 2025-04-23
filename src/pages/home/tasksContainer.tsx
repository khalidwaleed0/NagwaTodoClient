import { FormEvent, forwardRef, useEffect, useRef, useState } from "react";
import { CrudService } from "../../services/crud";
import SortableList, { SortableItem } from "react-easy-sort";
import { Task, TaskCardProps, TasksContainerProps } from "../../types";

export function TasksContainer({ selectedList, setSelectedList }: TasksContainerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    CrudService.fetchListTasks(selectedList._id)
      .then((res) => res.json())
      .then((res) => setTasks(res));
  }, []);
  useEffect(() => {
    if (tasks.length) {
      let progress = (tasks.filter((t) => t.isDone).length * 100) / tasks.length;

      CrudService.editList({ ...selectedList, progress: Math.floor(progress) });
    }
  }, [tasks]);
  function handleSort(oldIndex: number, newIndex: number) {
    let sortedTasks = [...tasks].sort((t1, t2) => t1.order - t2.order);
    let beforeTaskOrder = newIndex !== 0 ? sortedTasks[newIndex]?.order ?? -2 : sortedTasks[0].order - 2;
    let afterTaskOrder = newIndex !== tasks.length - 1 ? sortedTasks[newIndex + 1]?.order : tasks.at(-1)!.order + 2;
    let newOrder = (beforeTaskOrder + afterTaskOrder) / 2;
    editTask({ ...sortedTasks[oldIndex], order: newOrder });
  }
  function editTask(task: Task) {
    setTasks((oldTasks) => [...oldTasks.filter((t) => t._id !== task._id), task]);
    CrudService.editTask(task);
  }
  function deleteTask(taskId: string) {
    CrudService.deleteTask(taskId);
    setTasks((oldTasks) => [...oldTasks.filter((t) => t._id !== taskId)]);
  }
  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let value = e.currentTarget.taskName.value;
    let lastOrder = [...tasks].sort((t1, t2) => t2.order - t1.order).at(0)?.order ?? -1;
    CrudService.addNewTask(value, lastOrder + 1, selectedList._id)
      .then((res) => res.json())
      .then((res) => setTasks((oldTasks) => [...oldTasks, res]));
    e.currentTarget.reset();
  }
  return (
    <>
      <h2 onClick={() => setSelectedList(undefined)}>‹ {selectedList.title}</h2>
      <SortableList className="sortable-list" onSortEnd={handleSort} lockAxis="y">
        {[...tasks]
          .sort((t1, t2) => t1.order - t2.order)
          .map((task) => (
            <SortableItem key={task._id}>
              <TaskCard task={task} editTask={editTask} deleteTask={deleteTask} />
            </SortableItem>
          ))}
      </SortableList>
      <form onSubmit={addTask}>
        <input id="taskname" className="add-new" placeholder="+ new task" name="taskName" />
      </form>
    </>
  );
}
const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(({ task, editTask, deleteTask }, ref) => {
  const [isEditable, setEditable] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);
  function handleCheck() {
    editTask({ ...task, isDone: !task.isDone });
  }
  function handleEdit() {
    let editedTitle = titleRef.current?.textContent;
    if (isEditable && editedTitle) editTask({ ...task, title: editedTitle });
    setEditable((value) => !value);
  }
  useEffect(() => {
    if (isEditable) titleRef.current?.focus();
  }, [isEditable]);
  return (
    <div className="task-card" ref={ref}>
      <span ref={titleRef} className={`task-card-title ${task.isDone ? "checked" : ""}`} contentEditable={isEditable}>
        {task.title}
      </span>
      <div className="task-options">
        <span onClick={handleEdit}>{isEditable ? `✅` : `✏️`}</span>
        <span onClick={() => deleteTask(task._id)}>🗑️</span>
        <input type="checkbox" checked={task.isDone} onChange={handleCheck} />
      </div>
    </div>
  );
});
