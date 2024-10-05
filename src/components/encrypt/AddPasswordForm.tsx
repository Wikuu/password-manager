import { FormEvent, forwardRef } from "react";

import { FiSave, FiTrash2 } from "react-icons/fi";

import Button from "../../core/components/Button";
import Input from "../../core/components/Input";

type Props = {
  onSave: (e: FormEvent<HTMLFormElement>) => void;
  onPasswordDataRemove: (id: string) => void;
  editPasswordData?: PasswordData | null;
};

const AddPasswordForm = forwardRef<HTMLFormElement, Props>((props, ref) => {
  const { onSave, editPasswordData, onPasswordDataRemove } = props;

  return (
    <form
      ref={ref}
      onSubmit={onSave}
      className="w-full flex flex-col gap-4"
      autoComplete="off"
    >
      <Input
        placeholder="Title"
        name="title"
        defaultValue={editPasswordData?.title}
        autoFocus
      />
      <Input
        placeholder="Username / Email"
        name="usernameEmail"
        defaultValue={editPasswordData?.usernameEmail}
      />
      <Input
        placeholder="Password"
        name="password"
        defaultValue={editPasswordData?.password}
      />
      <Button className="mx-auto" type="submit">
        <FiSave />
        Save
      </Button>
      {editPasswordData && (
        <Button
          className="mx-auto !text-red-500"
          type="button"
          onClick={() => onPasswordDataRemove(editPasswordData.id)}
        >
          <FiTrash2 />
          Delete
        </Button>
      )}
    </form>
  );
});

export default AddPasswordForm;
