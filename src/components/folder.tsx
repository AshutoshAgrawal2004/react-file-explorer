import { useState } from "react";
import { IFolder } from "../types/folder";
import Styles from "./folder.module.css";

interface FolderProps {
  folder: IFolder;
  insertNodeInTree: (
    nodeId: number,
    itemName: string,
    isFolder: boolean
  ) => void;
}

export const Folder: React.FC<FolderProps> = ({
  folder: { id, name, isFolder, items },
  insertNodeInTree,
}) => {
  const [addingFolder, setAddingFolder] = useState({
    showInput: false,
    isFolder: false,
  });

  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const toggleAddFolder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isAddingFolder: boolean
  ) => {
    e.stopPropagation();
    setExpand(true);
    setAddingFolder({ showInput: true, isFolder: isAddingFolder });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.target.value as string;

    if (e.keyCode === 13 && value) {
      console.log(value);
      insertNodeInTree(id, value, addingFolder.isFolder);
      setAddingFolder({ showInput: false, isFolder: false });
    }
  };

  if (!isFolder) return <div>📄 {name}</div>;

  return (
    <div className="folder">
      <div className="folder-name" onClick={toggleExpand}>
        <span>
          {expand ? "^" : ">"} 📁 {name}
        </span>
        <span>
          <button onClick={(e) => toggleAddFolder(e, true)}>+ 📁</button>
          <button onClick={(e) => toggleAddFolder(e, false)}>+ 📄</button>
        </span>
      </div>

      {expand && (
        <div className={Styles["folder-items"]}>
          {addingFolder.showInput && (
            <div>
              <input
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() =>
                  setAddingFolder({ ...addingFolder, showInput: false })
                }
              />
            </div>
          )}
          {items.map((item) => (
            <Folder
              key={item.id}
              folder={item}
              insertNodeInTree={insertNodeInTree}
            />
          ))}
        </div>
      )}
    </div>
  );
};
