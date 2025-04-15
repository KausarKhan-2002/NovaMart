import React, { useEffect, useState } from "react";
import AllUsersTable from "../Components/Admin/AllUsersTable";
import RoleModel from "../Components/Admin/RoleModel";
import { useAllUsers } from "../Hooks/useAllUsers";
import TableShimmer from "../Components/ShimmerUI/TableShimmer";
import { useSelector } from "react-redux";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState(false);
  const user = useSelector((store) => store.user);
  console.log(user);

  const allUsers = useAllUsers();

  useEffect(() => {
    allUsers(setUsers);
  }, []);

  if (users.length === 0) return <TableShimmer />;

  return (
    <div>
      {user?.role === "Admin" && (
        <AllUsersTable users={users} setCurrUser={setCurrUser} />
      )}
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
