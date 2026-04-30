import { frontRoutes } from "../frontRoutes/frontRoutes";
import { role } from "../role/role";

export const navigation = [
  {
    path: frontRoutes.calendarPage,
    meta: {
      title: "Календар",
      isInMenu: true,
      roles: [role.admin, role.manager],
    },
  },
  {
    path: frontRoutes.notesPage,
    meta: {
      title: "Записи",
      isInMenu: true,
      roles: [role.admin, role.manager],
    },
  },
  {
    path: frontRoutes.statisticsPage,
    meta: {
      title: "Статистика",
      isInMenu: true,
      roles: [role.admin],
    },
  },
];
