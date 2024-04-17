"use client";

import ErrorBox from "@/app/components/ErrorBox";
import LoadingBox from "@/app/components/LoadingBox";
import { useGetUserByIdQuery } from "@/redux/features/user.api";
import { Box, Button } from "@mui/material";
import Link from "next/link";

type Props = {
  params: { id: number };
};
export default function DetailsPage({ params }: Props) {
  const { data: user, isLoading, isError } = useGetUserByIdQuery(params);
  if (isLoading) return <LoadingBox />;

  if (isError)
    return <ErrorBox message="Failed to load the views" title="Error :(" />;

  return (
    <div>
      <h1>User Details </h1>
      <div className="mb-5">
        <Button LinkComponent={Link} href="/" variant="contained">
          Go Home
        </Button>
      </div>
      <Box>
        <div className="mb-10">
          <img
            src={user?.data.avatar}
            className="w-12 h-12 rounded-full"
            alt={user?.data.first_name + " avatar"}
          />
        </div>
        <div>
          <div>
            <b>First name</b>: <p>{user?.data.first_name}</p>
          </div>
          <div>
            <b>Last name</b>: <p>{user?.data.last_name}</p>
          </div>
          <div>
            <b>Email</b>: <p>{user?.data.email}</p>
          </div>
        </div>
      </Box>
    </div>
  );
}
