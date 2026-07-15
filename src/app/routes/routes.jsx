import CalendarPage from "@/pages/calendar/CalendarPage/CalendarPage";
import { role } from "./role/role";
import MainLayout from "@/app/layoutes/mainLayout/MainLayout";
import Notes from "@/pages/notes/Notes";
import Statistics from "@/pages/statistics/Statistics";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/loginPage/LoginPage";
import { frontRoutes } from "./frontRoutes/frontRoutes";
import ProtectedRoute from "@/app/routes/ProtectedRoute";
import Forbidden from "@/pages/Forbidden";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        ),
        meta: {
          title: "Календар",
          isInMenu: true,
          roles: [role.admin, role.manager, role.user],
        },
      },
      {
        path: frontRoutes.notesPage,
        element: (
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        ),
        meta: {
          title: "Записи",
          isInMenu: true,
          roles: [role.admin, role.manager],
        },
      },
      {
        path: frontRoutes.statisticsPage,
        element: (
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        ),
        meta: {
          title: "Статистика",
          isInMenu: true,
          roles: [role.admin],
        },
      },
      {
        path: "*",
        element: <NotFound />,
        meta: {
          isInMenu: false,
          roles: [role.admin, role.manager, role.user],
        },
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
        meta: {
          isInMenu: false,
          roles: [role.admin, role.manager, role.user],
        },
      },
    ],
  },
  {
    path: frontRoutes.loginLayout,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
];
