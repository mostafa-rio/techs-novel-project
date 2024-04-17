"use client";
import { RevalidateAfter } from "@/constants";
import { useCreateUserMutation, userApi } from "@/redux/features/user.api";
import { useAppDispatch } from "@/redux/store";
import { TUser } from "@/types";
import { Button, CircularProgress, Dialog, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = Omit<TUser, "id">;
function CreateUserModal({
  page,
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  page: number;
}) {
  const [mutate] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const createUser = async (data: FormData) => {
    try {
      const res: any = await mutate(data);
      if (res.data) {
        dispatch(
          userApi.util.updateQueryData("getUsers", page, (users: any) => {
            users.data.unshift(res.data as TUser);
          })
        );
        toast.success(
          "User created and added to the table successfully!  Table will be synced with the server each " +
            RevalidateAfter +
            " seconds!",
          {
            duration: 10000,
          }
        );
        onClose();
      } else {
        throw Error("Failed to create user!");
      }
    } catch (err) {
      toast.error("Failed to create user! Please try again");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className=" p-5">
        <h1>Create User</h1>
        <form className="mt-5" onSubmit={handleSubmit(createUser)}>
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
              {isSubmitting ? <CircularProgress size={20} /> : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default CreateUserModal;
