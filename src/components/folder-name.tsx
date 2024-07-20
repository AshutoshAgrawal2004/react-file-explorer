import { useState } from "react";
import { IFolder } from "../types/folder";
import Styles from "./folder.module.css";

interface FolderNameProps {
  folder: IFolder;
  expanded: boolean;
  renameNodeInTree: (nodeId: number, itemName: string) => void;
}

export const FolderName: React.FC<FolderNameProps> = ({
  expanded,
  folder: { id, name, isFolder },
  renameNodeInTree,
}) => {
  const [renamingFolder, setRenamingFolder] = useState({
    name: "",
    showInput: false,
  });

  const onRenameFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.target.value as string;

    if (e.keyCode === 13 && value) {
      renameNodeInTree(id, value);
      setRenamingFolder({ showInput: false, name: "" });
    }
  };

  return (
    <div className={Styles["folder-name"]}>
      {isFolder ? (expanded ? "^" : ">") : ""}
      {isFolder ? "📁" : "📄"}{" "}
      {renamingFolder.showInput ? (
        <div>
          <input
            autoFocus
            defaultValue={renamingFolder.name}
            onKeyDown={onRenameFolder}
            onBlur={() => setRenamingFolder({ name: "", showInput: false })}
          />
        </div>
      ) : (
        <span
          onDoubleClick={() => setRenamingFolder({ name, showInput: true })}
        >
          {name}
        </span>
      )}
    </div>
  );
};
