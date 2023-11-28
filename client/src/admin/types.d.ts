//ACCESS
interface _ITokens {
  access_token: string;
  u_id: string;
  refresh_token: string;
  expiresIn: number;
}


interface _IChildren {
  children: React.ReactNode;
}

//EEEEE 
interface _ILoginError {
  username?: string[];
  password?: string[];
}

interface _IFetcher {
  url: string;
  token?: string;
  method?: RequestMethod;
  cache?: RequestCache;
}

//IIIIIIIIIII
interface _Id {
  id: string
}

interface _IdParams {
  params: _Id;
}


/// NNNN
interface _INavProps {
  pathname: string;
  data: _INavLinks[];
  title: string;
  rem?: boolean;
}
interface _INavLinks {
  href: string;
  type: NavColors;
  name: string;
  icon: 
  IconType;
}

// PPP

interface _IProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
}

// SSSSSSSSSSS
interface _ISpecificTableProps {
  applicant: string;
  currentPage: number;
  pageSize: number;
}

//TTTTTTT
interface _ITableProps<T = _IFormattedUser[]> {
  query: string;
  currentPage: number;
  columnData: string[];
  data?: T;
}

// UUU
interface _IUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  profile: _IProfile;
}

interface _IFormattedUser {
  [key: string]: string | null;
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isActive: string;
  image: string | null;
}

interface _IEditUser {
  [key: string]: string | null;
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  first_name: string | null;
  last_name: string | null;
  contact_no: string | null;
  image: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;
}

//VVVVVV
interface _IValidationState<T=any> {
  errors?: T;
  message?: string | null;
};

interface _IPostApiResponse {
  statusCode: number;
  message: string;
}

interface _IApiResponse<T> extends _IPostApiResponse {
    data: T
}

interface _ICommonInputComp {
  id: string;
  placeholder: string;
  value: string;
  label: string;
  icon: IconType;
  type: string;
  disabled?: boolean;
  errors?: any;
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

type Role = "owner" | "customer" | "admin" | "user" | "moderator";
