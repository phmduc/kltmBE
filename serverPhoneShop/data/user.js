import bcrypt from 'bcryptjs'
export const users = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync('123456',10),
      isAdmin: true
    },
    {
  
        name: "User",
        email: "User@gmail.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
      },
  ];
  