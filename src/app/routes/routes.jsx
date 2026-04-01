import CalendarPage from "@/pages/calendar/CalendarPage";
import { role } from "./role/role";
import MainLayout from "@/widgets/mainLayout/MainLayout";
import Notes from "@/pages/notes/Notes";
import Statistics from "@/pages/statistics/Statistics";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/loginPage/Login";

export const routes = [
	{
		path: "/login",
		element: <Login/>
	},
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/calendar",
        element: <CalendarPage />,
        handle: {
          title: "Календар",
          isInMenu: true,
          roles: [role.admin, role.manager],
        },
      },
      {
        path: "/notes",
        element: <Notes />,
        handle: {
          title: "Записи",
          isInMenu: true,
          roles: [role.admin, role.manager],
        },
      },
      {
        path: "/statistics",
        element: <Statistics />,
        handle: {
          title: "Статистика",
          isInMenu: true,
          roles: [role.admin],
        },
      },
      {
        path: "*",
        element: <NotFound />,
        handle: {
          isInMenu: false,
          roles: [role.admin, role.manager],
        },
      },
    ],
  },
];
