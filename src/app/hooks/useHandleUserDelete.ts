import { RevalidateAfter } from "@/constants";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  userApi,
} from "@/redux/features/user.api";
import { useAppDispatch } from "@/redux/store";
import toast from "react-hot-toast";

export default (page: number) => {
  const [deleteUserMutate, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { refetch } = useGetUsersQuery(page);
  const dispatch = useAppDispatch();
  const handleDelete = async (id: number, page: number) => {
    try {
      const res: any = await deleteUserMutate(id);
      if (res.error) {
        throw Error("Failed to delete user!");
      } else {
        dispatch(
          userApi.util.updateQueryData("getUsers", page, (users) => {
            users.data = users.data.filter((userItem) => userItem.id !== id);
          })
        );
        toast.success(
          "User deleted successfully! Table will be synced with the server each " +
            RevalidateAfter +
            " seconds!",
          { duration: 10000 }
        );
        setTimeout(() => {
          refetch();
        }, RevalidateAfter * 1000);
      }
    } catch (err) {
      toast.error("Failed to delete user! Please try again");
    }
  };
  return { handleDelete, isDeleting };
};
