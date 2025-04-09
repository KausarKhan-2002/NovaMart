import React, { useEffect, useState } from "react";
import AllUsersTable from "../Components/Admin/AllUsersTable";
import RoleModel from "../Components/Admin/RoleModel";
import { useAllUsers } from "../Hooks/useAllUsers";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState(false);
  // console.log(users);
  // console.log(currUser);

  const allUsers = useAllUsers();

  useEffect(() => {
    allUsers(setUsers);
  }, []);

  return (
    <div>
      <AllUsersTable users={users} setCurrUser={setCurrUser} />
      {currUser && (
        <RoleModel
          currUser={currUser}
          setusers={setUsers}
          setCurrUser={setCurrUser}
        />
      )}
    </div>
  );
}

export default AllUsers;
