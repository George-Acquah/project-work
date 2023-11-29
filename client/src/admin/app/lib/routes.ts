const protectedRoutes = ["/profile"];
const authRoutes = ["/login"];
const publicRoutes = ["/about", "/"];
const loginCallbackUrl = "/dashboard";

const dashboardRoutes = {
  DASHBOARD: {
    BASE: "/dashboard",
    OVERVIEW: "/dashboard/overview",
  },
  USERS: {
    CUSTOMERS: {
      BASE: "/dashboard/users/customers",
      ADD: "/dashboard/users/customers/add",
      EDIT: "/dashboard/users/customers/edit/:id",
      VIEW: "/dashboard/users/customers/view/:id",
    },
    OWNERS: {
      BASE: "/dashboard/users/owners",
      ADD: "/dashboard/users/owners/add",
      EDIT: "/dashboard/users/owners/edit/:id",
      VIEW: "/dashboard/users/owners/view/:id",
    },
    ADMINS: {
      BASE: "/dashboard/users/admins",
      ADD: "/dashboard/users/admins/add",
      EDIT: "/dashboard/users/admins/edit/:id",
      VIEW: "/dashboard/users/admins/view/:id",
    },
    UNVERIFIED: {
      BASE: "/dashboard/users/unverified",
      ADD: "/dashboard/users/unverified/add",
      UPDATE: "/dashboard/users/unverified/update/:id",
    },
  },
  PARKING_LOTS: {
    BASE: "/dashboard/parking-lots",
    ADD: "/dashboard/parking-lots/add",
    EDIT: "/dashboard/parking-lots/edit/:id",
    VIEW: "/dashboard/parking-lots/view/:id",
  },
  SLOTS: {
    BASE: "/dashboard/slots",
    ADD: "/dashboard/slots/add",
    EDIT: "/dashboard/slots/edit/:id",
    VIEW: "/dashboard/slots/view/:id",
  },
  BOOKINGS: {
    BASE: "/dashboard/bookings",
    VIEW: "/dashboard/bookings/view/:id",
  },
  REPORTS: {
    BASE: "/dashboard/reports",
    DAILY: "/dashboard/reports/daily",
    WEEKLY: "/dashboard/reports/weekly",
    MONTHLY: "/dashboard/reports/monthly",
  },
  SETTINGS: {
    BASE: "/dashboard/settings",
    PROFILE: "/dashboard/settings/profile",
    NOTIFICATIONS: "/dashboard/settings/notifications",
  },
  SECURITY: {
    BASE: "/dashboard/security",
    ACCESS_CONTROL: "/dashboard/security/access-control",
    AUDIT_LOGS: "/dashboard/security/audit-logs",
  },
  MAINTENANCE: {
    BASE: "/dashboard/maintenance",
    SYSTEM_HEALTH: "/dashboard/maintenance/system-health",
    TASKS: "/dashboard/maintenance/tasks",
  },
  SUPPORT: {
    BASE: "/dashboard/support",
    COMMUNICATION: "/dashboard/support/communication",
    TICKETS: "/dashboard/support/tickets",
  },
};


export {
  authRoutes,
  protectedRoutes,
  publicRoutes,
  loginCallbackUrl,
  dashboardRoutes,
};
