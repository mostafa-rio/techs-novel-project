"use client";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
type Props = {
  id: number;
  params: { id: number };
};
type FormData = {
  name: string;
  job: string;
};
function UpdateUserPage({ params }: Props) {
  // fetch user for update using rkq
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      job: "",
    },
  });

  return (
    <div className=" max-w-xl mx-auto">
      <h1>Update User with ID: {params.id}</h1>
      <form className="mt-5">
        <TextField
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
          label="Name"
          className="w-full"
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
          FormHelperTextProps={{
            className: "text-red-400",
          }}
        />
        <TextField
          {...register("job", {
            required: {
              value: true,
              message: "Job is required",
            },
          })}
          label="Job"
          className="w-full mt-3"
          error={Boolean(errors.job?.message)}
          helperText={errors.job?.message}
          FormHelperTextProps={{
            className: "text-red-400",
          }}
        />
        <div className="mt-5">
          <Button className="w-full" variant="contained" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserPage;
