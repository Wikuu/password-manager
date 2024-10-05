import { FormEvent, forwardRef } from "react";
import { FiKey } from "react-icons/fi";
import Button from "../../core/components/Button";
import Input from "../../core/components/Input";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  buttonLabel: string;
};

const CryptForm = forwardRef<HTMLFormElement, Props>((props, ref) => {
  const { onSubmit, buttonLabel } = props;

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={onSubmit}
      ref={ref}
      autoComplete="off"
    >
      <Input placeholder="File Password" name="filePassword" autoFocus />
      <Button className="mx-auto" type="submit">
        <FiKey />
        {buttonLabel}
      </Button>
    </form>
  );
});

export default CryptForm;
