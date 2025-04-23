import * as React from "react";

type FocusIndex = number | null;

/**
 * A React hook for managing focus of elements in a list based on keyboard
 * arrows (up and down). Great for a11y and UX.
 *
 * This hook does not deal with the actual imperative `.focus()` part at all.
 * It solely calculates the which index in a list which should currently be
 * focused.
 *
 * Usage:
 *
```tsx
const users = [...];
const [focusedIndex] = useCyclingFocus(users.length);
<ul>
    {users.map((u, idx) => (
        <ListItem
            user={u}
            key={u._id}
            // This item is focused if it's index is the same as the
            // currently focused index, according to the useCyclingFocus hook.
            focus={focusedIndex === idx}
        />
    ))}
</ul>
const ListItem = (props) => {
    const ref = React.useRef<HTMLLIElement>(null);
    React.useEffect(() => {
        if (props.focus) {
            // The actual focus call
            ref.current?.focus();
        }
    }, [props.focus]);
    return (
        <li ref={ref} tabIndex={props.focus ? 0 : -1}>
            {props.user.name}
        </li>
    );
};
```
 */
export const useCyclingFocus = (
  /** The size of your list of items. */
  listSize: number,
  /** The index of the initially focused item. Defaults to `null`. */
  initialFocus: FocusIndex = null
): [FocusIndex, React.Dispatch<React.SetStateAction<FocusIndex>>] => {
  const [currentFocus, setCurrentFocus] = React.useState<FocusIndex>(initialFocus);

  const handleKeyDown = React.useCallback<(evt: KeyboardEvent) => void>(
    (evt) => {
      // Cycle up or down. Also start over if we're outside the list bounds.
      switch (evt.key) {
        case "ArrowDown":
          evt.preventDefault();

          setCurrentFocus(currentFocus === null ? 0 : currentFocus === listSize - 1 ? 0 : currentFocus + 1);
          break;
        case "ArrowUp":
          evt.preventDefault();
          setCurrentFocus(currentFocus === null ? listSize - 1 : currentFocus === 0 ? listSize - 1 : currentFocus - 1);
          break;
      }
    },
    [listSize, currentFocus, setCurrentFocus]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
};
