import { FormEvent, forwardRef, useEffect, useState } from "react";
import { CrudService } from "../../services/crud";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
import { List, ListCardProps } from "../../types";

export function ListsContainer({ setSelectedList }: { setSelectedList: (list: List) => void }) {
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
            <ListCard list={list} setSelectedList={setSelectedList} />
          </SortableItem>
        ))}
      </SortableList>
      <form onSubmit={addList}>
        <input id="listname" className="add-new" placeholder="+ new list" name="listName" />
      </form>
    </>
  );
}

const ListCard = forwardRef<HTMLDivElement, ListCardProps>(({ list, setSelectedList }, ref) => {
  return (
    <div className="list-card" ref={ref} onClick={() => setSelectedList(list)}>
      <span className="list-card-title">{list.title}</span>
      <span
        className="progress-bar"
        style={{
          background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
          conic-gradient(hotpink ${list.progress}%, pink 0)`,
        }}
      >
        {list.progress}%
      </span>
    </div>
  );
});
