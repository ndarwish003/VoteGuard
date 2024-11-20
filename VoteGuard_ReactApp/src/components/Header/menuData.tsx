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
      },
      {
        id: 43,
        title: "Dashboard",
        path: "/User-Dashboard",
        newTab: false,
      },
      {
        id: 44,
        title: "History",
        path: "/info-Dashboard",
        newTab: false,
      },
      {
        id: 43,
        title: "Profile",
        path: "/Profile",
        newTab: false,
      },
    ],
  },
];
export default menuData;

{/* Involve useState such that the the menu will include the necessary pages for a logged in user, such as dashboard, history, and profile. Adjust the header based on logging in to the system */}