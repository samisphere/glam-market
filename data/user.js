class User {
  id;
  fullName;
  email;
  password;
  address;
  orders;

  constructor(userDetails) {
    this.id = `#${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
    this.fullName = userDetails.fullName;
    this.email = userDetails.email;
    this.password = userDetails.password;
    this.address = userDetails.address || [];
    this.orders = userDetails.orders || [];
  }
}

export const users = [
  {
    id: `#${crypto.randomUUID().toUpperCase()}`,
    fullName: "Samia Hasan",
    email: "raisa@gmail.com",
    password: "1234Raisa",
    address: {
      address: [],
    },
    orders: {
      order: [],
    },
  },
].map((user) => {
  return new User(user);
});

function saveToStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}
export function getUser(email, password) {
  const matchingUser= users.find((user) => {
    return email === user.email && password === user.password;
  });
  return matchingUser
}
