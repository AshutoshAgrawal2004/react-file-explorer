import { useState } from "react";
import { root } from "../data/folder-data";
import { IFolder } from "../types/folder";

export const useExplorer = () => {
  const [treeRoot, setTreeRoot] = useState(root);

  const insertNode = (
    parent: IFolder,
    nodeId: number,
    itemName: string,
    isFolder: boolean
  ) => {
    if (nodeId == parent.id && parent.isFolder) {
      parent.items.unshift({
        id: new Date().getTime(),
        name: itemName,
        isFolder,
        items: [],
      });
      return parent;
    }

    const newFolders: IFolder[] = parent.items.map((item) => {
      return insertNode(item, nodeId, itemName, isFolder);
    });

    return { ...parent, items: newFolders };
  };

  const renameNode = (parent: IFolder, nodeId: number, itemName: string) => {
    if (nodeId == parent.id) {
      parent.name = itemName;
      return parent;
    }

    const newFolders: IFolder[] = parent.items.map((item) => {
      return renameNode(item, nodeId, itemName);
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
    const updatedTree = renameNode(treeRoot, nodeId, itemName);
    setTreeRoot(updatedTree);
  };

  return { treeRoot, insertNodeInTree, renameNodeInTree };
};
