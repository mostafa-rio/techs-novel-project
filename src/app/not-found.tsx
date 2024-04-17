import { Button, Card, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Card className="m-auto text-center h-fit w-fit p-10">
        <Typography className="text-2xl">Page Not Found</Typography>

        <div className="mt-4 mx-auto gap-4">
          <Button
            disableElevation
            variant="contained"
            LinkComponent={Link}
            href="/"
          >
            Go home
          </Button>
        </div>
      </Card>
    </div>
  );
}
