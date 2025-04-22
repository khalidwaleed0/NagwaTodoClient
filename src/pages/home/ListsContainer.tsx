import { FormEvent, forwardRef, useEffect, useState } from "react";
import { CrudService } from "../../services/crud";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
type List = { _id?: string; title: string; progress: number };

export function ListsContainer() {
  const [lists, setLists] = useState<List[]>([]);
  useEffect(() => {
    CrudService.fetchAllLists()
      .then((res) => res.json())
      .then((res) => setLists(res));
  }, []);
  function handleSort(oldIndex: number, newIndex: number) {
    setLists((oldLists) => arrayMoveImmutable(oldLists, oldIndex, newIndex));
  }
  function addList(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let value = e.currentTarget.listName.value;
    CrudService.addNewList(value)
      .then((res) => res.json())
      .then((res) => setLists((oldList) => [...oldList, res]));
    e.currentTarget.reset();
  }
  return (
    <>
      <SortableList className="sortable-list" onSortEnd={handleSort} lockAxis="y">
        {lists.map((list) => (
          <SortableItem key={list._id}>
            <ListCard _id={list._id} title={list.title} progress={list.progress} />
          </SortableItem>
        ))}
      </SortableList>
      <form onSubmit={addList}>
        <input id="listname" className="add-new" placeholder="+ add a new list" name="listName" />
      </form>
    </>
  );
}

const ListCard = forwardRef<HTMLDivElement, List>(({ _id, title, progress }, ref) => {
  return (
    <div className="list-card" ref={ref}>
      <span className="list-card-title">{title}</span>
      <span
        className="progress-bar"
        style={{
          background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
          conic-gradient(hotpink ${progress}%, pink 0)`,
        }}
      >
        {progress}%
      </span>
    </div>
  );
});
