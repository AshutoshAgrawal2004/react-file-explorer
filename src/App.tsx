import { Folder } from "./components/folder";
import { useExplorer } from "./hooks/use-explorer";
import Styles from "./app.module.css";

const App = () => {
  const { treeRoot, insertNodeInTree, renameNodeInTree } = useExplorer();

  return (
    <div className={Styles["file-explorer"]}>
      <Folder
        folder={treeRoot}
        insertNodeInTree={insertNodeInTree}
        renameNodeInTree={renameNodeInTree}
      />
    </div>
  );
};

export default App;
