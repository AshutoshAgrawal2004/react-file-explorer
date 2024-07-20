import { useState } from "react";
import { IFolder } from "../types/folder";
import Styles from "./folder.module.css";
import { FolderName } from "./folder-name";

interface FolderProps {
  parentId: number;
  folder: IFolder;
  insertNodeInTree: (
    nodeId: number,
    itemName: string,
    isFolder: boolean
  ) => void;
  renameNodeInTree: (nodeId: number, itemName: string) => void;
  deleteNodeInTree: (parentId: number, nodeId: number) => void;
}

export const Folder: React.FC<FolderProps> = ({
  parentId,
  folder,
  insertNodeInTree,
  renameNodeInTree,
  deleteNodeInTree,
}) => {
  const { id, isFolder, items } = folder;
  const [addingFolder, setAddingFolder] = useState({
    showInput: false,
    isFolder: false,
  });

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleAddFolder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isAddingFolder: boolean
  ) => {
    e.stopPropagation();
    setExpanded(true);
    setAddingFolder({ showInput: true, isFolder: isAddingFolder });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.target.value as string;

    if (e.keyCode === 13 && value) {
      insertNodeInTree(id, value, addingFolder.isFolder);
      setAddingFolder({ showInput: false, isFolder: false });
    }
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteNodeInTree(parentId, id);
  };

  return (
    <div className={Styles["folder"]}>
      <div className={Styles["folder-name-container"]} onClick={toggleExpanded}>
        <FolderName
          expanded={expanded}
          folder={folder}
          renameNodeInTree={renameNodeInTree}
        />

        <div>
          {isFolder && (
            <>
              <button onClick={(e) => toggleAddFolder(e, true)}>+ 📁</button>
              {"  "}
              <button onClick={(e) => toggleAddFolder(e, false)}>+ 📄</button>
              {"  "}
            </>
          )}
          {parentId != id && <button onClick={onDelete}>🗑️</button>}
        </div>
      </div>

      {expanded && (
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
              parentId={id}
              folder={item}
              insertNodeInTree={insertNodeInTree}
              renameNodeInTree={renameNodeInTree}
              deleteNodeInTree={deleteNodeInTree}
            />
          ))}
        </div>
      )}
    </div>
  );
};
