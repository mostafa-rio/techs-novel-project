"use client";
import { RevalidateAfter } from "@/constants";
import { useUpdateUserMutation, userApi } from "@/redux/features/user.api";
import { useAppDispatch } from "@/redux/store";
import { TUser } from "@/types";
import { Button, CircularProgress, Dialog, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
type Props = {
  user: TUser;
  open: boolean;
  page: number;
  onClose: () => void;
};
type FormData = Omit<TUser, "id">;
function UpdateUserModal({ user, page, open, onClose }: Props) {
  const userId = user.id;
  const [mutate] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      avatar: user.avatar,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const updateUser = async (data: FormData) => {
    try {
      const response: any = await mutate({ id: userId, ...data });
      if (response.data) {
        dispatch(
          userApi.util.updateQueryData("getUsers", page, (users) => {
            users.data = users.data.map((userItem) => {
              if (userItem.id === userId) {
                return response.data;
              }
              return userItem;
            });
          })
        );
        toast.success(
          "User updated successfully! Table will be synced with the server each " +
            RevalidateAfter +
            " seconds!",
          { duration: 10000 }
        );
        onClose();
      } else {
        throw Error("Failed to update user!");
      }
    } catch (err) {
      toast.error("Failed to update user! Please try again");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-5">
        <h1>Update User with ID: {userId}</h1>
        <form className="mt-5" onSubmit={handleSubmit(updateUser)}>
          <TextField
            {...register("first_name", {
              required: {
                value: true,
                message: "Field is required",
              },
            })}
            label="First Name"
            className="w-full"
            error={Boolean(errors.first_name?.message)}
            helperText={errors.first_name?.message}
            FormHelperTextProps={{
              className: "text-red-400",
            }}
          />
          <TextField
            {...register("last_name", {
              required: {
                value: true,
                message: "Field is required",
              },
            })}
            label="Last Name"
            className="w-full mt-5"
            error={Boolean(errors.last_name?.message)}
            helperText={errors.last_name?.message}
            FormHelperTextProps={{
              className: "text-red-400",
            }}
          />
          <TextField
            {...register("email", {
              required: {
                value: true,
                message: "Field is required",
              },
            })}
            label="Email"
            type="email"
            className="w-full mt-5"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            FormHelperTextProps={{
              className: "text-red-400",
            }}
          />
          <TextField
            {...register("avatar", {
              required: {
                value: true,
                message: "Field is required",
              },
            })}
            placeholder="https://reqres.in/img/faces/7-image.jpg"
            label="Avatar Link"
            className="w-full mt-5"
            error={Boolean(errors.avatar?.message)}
            helperText={errors.avatar?.message}
            FormHelperTextProps={{
              className: "text-red-400",
            }}
          />
          <div className="mt-5">
            <Button
              disabled={isSubmitting}
              className="w-full"
              variant="contained"
              type="submit"
            >
              {isSubmitting ? <CircularProgress size={20} /> : " Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default UpdateUserModal;
