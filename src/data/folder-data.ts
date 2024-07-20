import { IFolder } from "../types/folder";

export const root: IFolder = {
  id: 1,
  name: "root",
  isFolder: true,
  items: [
    {
      id: 2,
      name: "public",
      isFolder: true,
      items: [
        {
          id: 3,
          name: "index.html",
          isFolder: false,
          items: [],
        },
        {
          id: 4,
          name: "logo.svg",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: 5,
      name: "src",
      isFolder: true,
      items: [
        { id: 6, name: "data", isFolder: true, items: [] },
        { id: 7, name: "index.js", isFolder: false, items: [] },
      ],
    },
  ],
};
