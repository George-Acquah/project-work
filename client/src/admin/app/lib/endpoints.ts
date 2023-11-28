const endpoints = {
  USERS: {
    APPLICANTS: {
      BASE: "applicants/admin",
      ADD: "/dashboard/users/applicants/add",
      UPDATE: "/dashboard/users/applicants/update",
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

  APPLICATIONS: "",
  ADMIN: {
    BASE: "admin"
  }
};


export {
    endpoints,
}