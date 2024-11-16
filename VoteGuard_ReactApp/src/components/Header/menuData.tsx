import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 4,
    title: "More",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Guide",
        path: "/guide",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact Us",
        path: "/contact",
        newTab: false,
      }
    ],
  },
  {
    id: 3,
    title: "User-Dashboard",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Dashboard",
        path: "/User-Dashboard",
        newTab: false,
      },
      {
        id: 42,
        title: "info",
        path: "/info-Dashboard",
        newTab: false,
      },
      {
        id: 43,
        title: "Protfile",
        path: "/Profile",
        newTab: false,
      }
    ],
  }
];
export default menuData;
