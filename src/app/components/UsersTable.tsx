"use client";
import { RevalidateAfter } from "@/constants";
import { useGetUsersQuery } from "@/redux/features/user.api";
import { TUser } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Pagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useHandleUserDelete from "../../hooks/useHandleUserDelete";
import CreateUserModal from "./CreateUserModal";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";
import UpdateUserModal from "./UpdateUserModal";

function UsersTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {
    isLoading,
    data: usersQueryData,
    error,
    refetch,
  } = useGetUsersQuery(page);
  const { handleDelete, isDeleting } = useHandleUserDelete(page);
  const users = usersQueryData ? usersQueryData.data : [];
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<TUser | null>(null);
  const isUpdateUserModalOpen = Boolean(userToUpdate);

  if (isLoading) return <LoadingBox />;

  if (error)
    return <ErrorBox message="Failed to load the views" title="Error :(" />;

  return (
    <>
      {/* //!Create user modal */}
      {isCreateModalOpen && (
        <CreateUserModal
          page={page}
          onClose={() => {
            setTimeout(() => {
              refetch();
            }, RevalidateAfter * 1000);
            setIsCreateModalOpen(false);
          }}
          open={isCreateModalOpen}
        />
      )}

      {/* //!Update user modal */}
      {userToUpdate && (
        <UpdateUserModal
          page={page}
          user={userToUpdate}
          open={isUpdateUserModalOpen}
          onClose={() => {
            setTimeout(() => {
              refetch();
            }, RevalidateAfter * 1000);
            setUserToUpdate(null);
          }}
        />
      )}

      <TableContainer component={Paper}>
        {/* //!Table Top action buttons */}
        <div className="flex p-4 mb-5">
          <Button
            size="small"
            onClick={() => {
              refetch();
              toast.success("Users table is synced with server!", {
                duration: 8000,
              });
            }}
            variant="contained"
            className="ml-auto text-xs"
          >
            Refetch Users
          </Button>
          <Button
            size="small"
            onClick={() => setIsCreateModalOpen(true)}
            variant="contained"
            className="ml-2 text-xs"
            startIcon={<AddIcon />}
          >
            Create User
          </Button>
        </div>

        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                onClick={() => router.push("/details/" + user.id)}
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell width={20} align="left">
                  {user.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="flex gap-2">
                    <img
                      className="rounded-full object-cover my-auto"
                      src={user.avatar}
                      width={30}
                      height={30}
                      alt={user.email}
                    />
                    <Typography className="my-auto">
                      {user.first_name + " " + user.last_name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell align="left" className="text-xs">
                  {user.email}
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserToUpdate(user);
                    }}
                  >
                    <EditIcon color="info" />
                  </IconButton>
                  <IconButton
                    disabled={isDeleting}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user.id, page);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          className="py-3 mx-auto"
          onChange={(e, newPage) => setPage(newPage)}
          count={usersQueryData?.total_pages}
          color="primary"
        />
      </TableContainer>
    </>
  );
}

export default UsersTable;
