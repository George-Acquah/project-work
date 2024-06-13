import { deleteCustomer, deleteOwner, deleteUser } from "@/app/lib/actions";
import { dashboardRoutes } from "@/app/lib/routes";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface _IVerificationBtn {
  id: string;
  status: boolean;
  action: any;
}

const btnClasses = {
  EDIT: "rounded-lg border p-2 md:py-1 md:px-2 bg-custom-primary/20 md:flex justify-between items-center gap-4 dark:bg-[#2C303B] dark:hover:border-custom-primary dark:hover:bg-custom-primary/20 dark:hover:shadow-none w-fit border-custom-primary/50 dark:border-custom-primary/70 cursor-pointer",
  VERIFY:
    "rounded-2xl border p-2 md:py-1 md:px-4 dark:hover:shadow-none w-fit cursor-pointer",
  DELETE: "bg-red-500 rounded-md border border-red-500 p-2 hover:bg-red-400",
  ADD: "flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
};
//ADDS
function AddCustomer() {
  return (
    <Link
      href={`${dashboardRoutes.USERS.CUSTOMERS.ADD}`}
      className={btnClasses.ADD}
    >
      <span className="hidden md:block">Add Customer</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

function AddCenter() {
  return (
    <Link
      href={`${dashboardRoutes.PARKING_LOTS.ADD}`}
      className={btnClasses.ADD}
    >
      <span className="hidden md:block">Add Parking Center</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

function AddOwner() {
  return (
    <Link
      href={`${dashboardRoutes.USERS.OWNERS.ADD}`}
      className={btnClasses.ADD}
    >
      <span className="hidden md:block">Add Owner</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

function AddSlot() {
  return (
    <Link href={`${dashboardRoutes.SLOTS.ADD}`} className={btnClasses.ADD}>
      <span className="hidden md:block">Add Slot</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

function AddUser() {
  return (
    <Link href={`${dashboardRoutes.USERS.BASE}/add`} className={btnClasses.ADD}>
      <span className="hidden md:block">Add User</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

//EDITS
function EditCustomer({ id }: _Id) {
  return (
    <Link
      href={`${dashboardRoutes.USERS.CUSTOMERS.BASE}/${id}/update`}
      className={btnClasses.EDIT}
    >
      <p className="hidden md:flex text-base font-thin">Edit</p>
      <PencilIcon className="w-5" />
    </Link>
  );
}

function EditOwner({ id }: _Id) {
  return (
    <Link
      href={`${dashboardRoutes.USERS.OWNERS.BASE}/${id}/update`}
      className={btnClasses.EDIT}
    >
      <p className="hidden md:flex text-base font-thin">Edit</p>
      <PencilIcon className="w-5" />
    </Link>
  );
}

function EditSlot({ id }: _Id) {
  return (
    <Link
      href={`${dashboardRoutes.SLOTS.BASE}/${id}/update`}
      className={btnClasses.EDIT}
    >
      <p className="hidden md:flex text-base font-thin">Edit</p>
      <PencilIcon className="w-5" />
    </Link>
  );
}

function EditUser({ id }: _Id) {
  return (
    <Link
      href={`${dashboardRoutes.USERS.BASE}/${id}/update`}
      className={btnClasses.EDIT}
    >
      <p className="hidden md:flex text-base font-thin">Edit</p>
      <PencilIcon className="w-5" />
    </Link>
  );
}

function EditCenter({ id }: _Id) {
  return (
    <Link
      href={`${dashboardRoutes.PARKING_LOTS.BASE}/${id}/update`}
      className={btnClasses.EDIT}
    >
      <p className="hidden md:flex text-base font-thin">Edit</p>
      <PencilIcon className="w-5" />
    </Link>
  );
}

//DELETES

function DeleteCustomer({ id }: _Id) {
  const deleteInvoiceWithId = deleteCustomer.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className={btnClasses.DELETE}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 text-white" />
      </button>
    </form>
  );
}

function DeleteOwner({ id }: _Id) {
  const deleteInvoiceWithId = deleteOwner.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className={btnClasses.DELETE}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 text-white" />
      </button>
    </form>
  );
}

function DeleteUser({ id }: _Id) {
  const deleteInvoiceWithId = deleteUser.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className={btnClasses.DELETE}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 text-white" />
      </button>
    </form>
  );
}

function DeleteCenter({ id }: _Id) {
  const deleteInvoiceWithId = deleteUser.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className={btnClasses.DELETE}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 text-white" />
      </button>
    </form>
  );
}

function DeleteSlot({ id }: _Id) {
  const deleteInvoiceWithId = deleteUser.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className={btnClasses.DELETE}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 text-white" />
      </button>
    </form>
  );
}

function EditProfileButton({linkTo}: {linkTo: string}) {
  return (
    <Link href={linkTo} className={`flex  ${btnClasses.EDIT}`}>
      <p className="text-base font-thin">Edit Profile</p>
      <PencilSquareIcon className="w-4" />
    </Link>
  );
}

async function VerificationButton({ id, status = false }: _IVerificationBtn) {
  const deleteInvoiceWithId = deleteUser.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button
        className={`dark:bg-[#2C303B] ${btnClasses.VERIFY} ${
          status
            ? "bg-red-50 dark:hover:bg-red-500 dark:hover:bg-opacity-20 hover:bg-red-100 hover:border-red-500 border-red-500/70"
            : "bg-green-50 dark:hover:bg-green-500 dark:hover:bg-opacity-20 hover:bg-green-100 hover:border-green-500 border-green-500/70"
        }`}
      >
        <p className="text-sm font-thin">{status ? "Unverify" : "Verify"}</p>
      </button>
    </form>
  );
}

export {
  AddCenter,
  AddCustomer,
  AddOwner,
  AddSlot,
  AddUser,
  EditCenter,
  EditCustomer,
  EditOwner,
  EditSlot,
  EditUser,
  DeleteCenter,
  DeleteCustomer,
  DeleteOwner,
  DeleteSlot,
  DeleteUser,
  VerificationButton,
  EditProfileButton,
};
