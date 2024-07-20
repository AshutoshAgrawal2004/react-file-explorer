import { useState } from "react";
import { root } from "../data/folder-data";
import { IFolder } from "../types/folder";

export const useExplorer = () => {
  const [treeRoot, setTreeRoot] = useState(root);

  const sortItems = (a: IFolder, b: IFolder) => {
    if (a.isFolder && !b.isFolder) return -1;
    if (!a.isFolder && b.isFolder) return 1;
    return a.name.localeCompare(b.name);
  };

  const insertNode = (
    parent: IFolder,
    nodeId: number,
    itemName: string,
    isFolder: boolean
  ) => {
    if (nodeId == parent.id && parent.isFolder) {
      parent.items.push({
        id: new Date().getTime(),
        name: itemName,
        isFolder,
        items: [],
      });

      parent.items.sort(sortItems);
      return parent;
    }

    const newFolders: IFolder[] = parent.items.map((item) => {
      return insertNode(item, nodeId, itemName, isFolder);
    });

    return { ...parent, items: newFolders };
  };

  const findAndRenameNode = (
    parent: IFolder,
    nodeId: number,
    itemName: string
  ) => {
    if (parent.id === nodeId) {
      parent.name = itemName;
      return true;
    }

    for (let item of parent.items) {
      if (findAndRenameNode(item, nodeId, itemName)) {
        if (parent.isFolder) {
          parent.items.sort(sortItems);
        }
        return true;
      }
    }
    return false;
  };

  const deleteNode = (parent: IFolder, parentId: number, nodeId: number) => {
    if (parent.id == parentId) {
      return {
        ...parent,
        items: parent.items.filter((item) => item.id !== nodeId),
      };
    }

    const newFolders: IFolder[] = parent.items.map((item) => {
      return deleteNode(item, parentId, nodeId);
    });

    return { ...parent, items: newFolders };
  };

  const insertNodeInTree = (
    nodeId: number,
    itemName: string,
    isFolder: boolean
  ) => {
    const updatedTree = insertNode(treeRoot, nodeId, itemName, isFolder);
    setTreeRoot(updatedTree);
  };

  const renameNodeInTree = (nodeId: number, itemName: string) => {
    setTreeRoot((prevTreeRoot) => {
      const newTreeRoot = { ...prevTreeRoot };
      findAndRenameNode(newTreeRoot, nodeId, itemName);
      return newTreeRoot;
    });
  };

  const deleteNodeInTree = (parentId: number, nodeId: number) => {
    const updatedTree = deleteNode(treeRoot, parentId, nodeId);
    setTreeRoot(updatedTree);
  };

  return { treeRoot, insertNodeInTree, renameNodeInTree, deleteNodeInTree };
};
