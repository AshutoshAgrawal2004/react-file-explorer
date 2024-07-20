import { Folder } from "./components/folder";
import { useExplorer } from "./hooks/use-explorer";

const App = () => {
  const { treeRoot, insertNodeInTree } = useExplorer();
  return (
    <div>
      <Folder folder={treeRoot} insertNodeInTree={insertNodeInTree} />
    </div>
  );
};

export default App;
