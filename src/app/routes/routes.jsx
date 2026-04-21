import CalendarPage from "@/pages/calendar/CalendarPage";
import { role } from "./role/role";
import MainLayout from "@/widgets/mainLayout/MainLayout";
import Notes from "@/pages/notes/Notes";
import Statistics from "@/pages/statistics/Statistics";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/loginPage/Login";
import { frontRoutes } from "./frontRoutes/frontRoutes";
import ProtectedRoute from "@/shared/ui/components/ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: frontRoutes.calendarPage,
        element: (
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        ),
        meta: {
          title: "Календар",
          isInMenu: true,
          roles: [role.admin, role.manager],
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
          roles: [role.admin, role.manager],
        },
      },
    ],
  },
  {
    path: frontRoutes.loginPage,
    element: <Login />,
  },
];
