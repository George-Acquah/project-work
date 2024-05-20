export type User = {
  name: string;
  email: string;
  id: string;
  image?: string;
};

const user: User = {
name: "John Doe",
email: "john.doe@example.com",
// image: "",
id: "5f63a74757e53f6519826a9d",
}

const fetchUser = () => {
  return new Promise<User>( resolve => {
    setTimeout(() => {
      resolve(user);
    }, 3000); // Delay for 3 seconds
  });
};

export {
    fetchUser,
}