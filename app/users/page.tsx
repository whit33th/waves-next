"use client";
import React, { useEffect, useState } from "react";
import { addUser, getUsers } from "../actions/userActions";
import { User } from "@prisma/client";

export default function UsersPage() {
  const [users, setUsers] = useState<User>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  const handleAddUser = async () => {
    await addUser(name, email);
    setUsers(await getUsers());
  };
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
