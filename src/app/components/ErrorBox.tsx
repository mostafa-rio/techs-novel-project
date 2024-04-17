import { Button, Card, Typography } from "@mui/material";
type Props = {
  title: string;
  message: string;
};

function ErrorBox({ title, message }: Props) {
  return (
    <div className="flex w-screen h-screen">
      <Card className="m-auto text-center h-fit w-fit p-10">
        <Typography className="text-2xl">{title}</Typography>
        <Typography className="text-xs mt-2">{message}</Typography>
        <div className="mt-4 mx-auto gap-4">
          <Button
            disableElevation
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Reload the page
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ErrorBox;
