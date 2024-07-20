export interface IFolder {
  id: number;
  name: string;
  isFolder: boolean;
  items: IFolder[];
}
