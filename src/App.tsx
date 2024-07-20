import { Folder } from "./components/folder";
import { useExplorer } from "./hooks/use-explorer";
import Styles from "./app.module.css";

const App = () => {
  const { treeRoot, insertNodeInTree, renameNodeInTree, deleteNodeInTree } =
    useExplorer();

  return (
    <div className={Styles["file-explorer"]}>
      <Folder
        parentId={treeRoot.id}
        folder={treeRoot}
        insertNodeInTree={insertNodeInTree}
        renameNodeInTree={renameNodeInTree}
        deleteNodeInTree={deleteNodeInTree}
      />
    </div>
  );
};

export default App;
