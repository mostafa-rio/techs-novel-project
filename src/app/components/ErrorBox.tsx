import { Button, Card, Typography } from "@mui/material";
import Link from "next/link";
type Props = {
  link: string;
  buttonTitle: string;
  title: string;
  desc: string;
};

function ErrorBox({ link, title, buttonTitle, desc }: Props) {
  return (
    <div className="flex w-screen h-screen">
      <Card className="m-auto text-center h-fit w-fit p-10">
        <Typography className="text-2xl">{title}</Typography>
        <Typography className="text-xs mt-2">{desc}</Typography>
        <div className="mt-4 mx-auto gap-4">
          <Button
            disableElevation
            variant="contained"
            LinkComponent={Link}
            href={link}
          >
            {buttonTitle}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ErrorBox;
