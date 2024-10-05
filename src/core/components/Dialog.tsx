import { ReactNode } from "react";
import Card from "./Card";
import Typography from "./Typography";
import { FiX } from "react-icons/fi";
import Button from "./Button";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
};

const Dialog = (props: Props) => {
  const { open, onClose, title, children } = props;

  if (!open) return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="flex flex-col gap-4 min-w-96">
        <div className="flex justify-between items-center">
          <Typography>{title}</Typography>
          <Button
            onClick={onClose}
            className="!p-0 !w-8 !h-8 !flex !justify-center !items-center"
          >
            <FiX />
          </Button>
        </div>
        {children}
      </Card>
    </div>
  );
};

export default Dialog;
