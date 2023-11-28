const protectedRoutes = ["/profile"];
const authRoutes = ["/login"];
const publicRoutes = ["/about", "/"];
const loginCallbackUrl = "/dashboard";

const dashboardRoutes = {
  USERS: {
    APPLICANTS: {
      BASE: "/dashboard/users/applicants",
      ADD: "/dashboard/users/applicants/add",
      UPDATE: `/dashboard/users/applicants/update`,
    },
    STUDENTS: {
      BASE: "/dashboard/users/students",
      ADD: "/dashboard/users/students/add",
      UPDATE: "/dashboard/users/students/update",
    },
    ADMINS: {
      BASE: "/dashboard/users/admins",
      ADD: "/dashboard/users/admins/add",
      UPDATE: "/dashboard/users/admins/update",
    },
    UNVERIFIED: {
      BASE: "/dashboard/users/unverified",
      ADD: "/dashboard/users/unverified/add",
      UPDATE: "/dashboard/users/unverified/update",
    },
  },
  ADMIN: {
    BASE: "/dashboard/admin",
    UPDATE: "/dashboard/admin/update",
  },
  APPLICATIONS: '',
};



export {
    authRoutes,
    protectedRoutes,
    publicRoutes,
    loginCallbackUrl,
    dashboardRoutes,
}
