import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiHome, FiPlus } from "react-icons/fi";

import AddPasswordForm from "../components/encrypt/AddPasswordForm";
import Button from "../core/components/Button";
import Dialog from "../core/components/Dialog";
import Input from "../core/components/Input";

import ScreenLayout from "../core/layout/ScreenLayout";

import CryptForm from "../components/shared/CryptForm";

import { useNavigate } from "react-router-dom";
import { encryptData } from "../core/utils/cryptoUtils";
import formDataToObject from "../core/utils/formDataToObject";
import generateUUID from "../core/utils/generateUUID";

const EncryptPage = () => {
  const [passwordDataDialogOpen, setPasswordDataDialogOpen] = useState(false);
  const [passwordDatas, setPasswordDatas] = useState<PasswordData[]>([]);
  const [editPasswordData, setEditPasswordData] = useState<PasswordData | null>(
    null
  );

  const [encryptPasswordDataDialogOpen, setEncryptPasswordDataDialogOpen] =
    useState(false);

  const [filter, setFilter] = useState("");

  const passwordDataFormRef = useRef<HTMLFormElement>(null);
  const encryptFormRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const openDialog = () => setPasswordDataDialogOpen(true);
  const closeDialog = () => {
    setPasswordDataDialogOpen(false);
    setEditPasswordData(null);
  };

  const onSave = (e: FormEvent) => {
    e.preventDefault();

    if (passwordDataFormRef.current) {
      const id = generateUUID();
      const data = formDataToObject(
        passwordDataFormRef.current
      ) as PasswordData;

      if (editPasswordData) {
        const index = passwordDatas.findIndex(
          (item) => item.id === editPasswordData.id
        );
        const newDatas = [...passwordDatas];
        newDatas[index] = { ...data, id: editPasswordData.id };
        setPasswordDatas(newDatas);
      } else {
        setPasswordDatas([...passwordDatas, { ...data, id }]);
      }
    }

    closeDialog();
  };

  const createEncryptedFile = () => setEncryptPasswordDataDialogOpen(true);
  const closeEncryptDialog = () => setEncryptPasswordDataDialogOpen(false);

  const onPasswordDataRemove = (id: string) => {
    setPasswordDatas(passwordDatas.filter((data) => data.id !== id));
    closeDialog();
  };

  const onPasswordDataClick = (data: PasswordData) => {
    setEditPasswordData(data);
    openDialog();
  };

  const onEncrypt = (e: FormEvent) => {
    e.preventDefault();

    if (encryptFormRef.current) {
      const formData = formDataToObject(encryptFormRef.current);

      const filePassword = formData.filePassword as string;

      const encryptedData = encryptData(
        { password: filePassword, data: passwordDatas },
        filePassword
      );

      const blob = new Blob([encryptedData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "encrypted-data.txt";
      a.click();
      URL.revokeObjectURL(url);

      setEncryptPasswordDataDialogOpen(false);
      setPasswordDatas([]);
    }
  };

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const goHome = () => navigate("/");

  return (
    <ScreenLayout>
      <div className="flex items-center gap-4">
        <Button
          className="!w-9 !h-9 !flex !items-center !justify-center !p-0"
          onClick={goHome}
        >
          <FiHome />
        </Button>
        <Input
          placeholder={
            passwordDatas.length === 0 ? "Add Passwords" : "Search..."
          }
          value={filter}
          onChange={onFilterChange}
          disabled={passwordDatas.length === 0}
        />
        <Button
          className="!w-9 !h-9 !flex !items-center !justify-center !p-0"
          onClick={openDialog}
        >
          <FiPlus />
        </Button>
      </div>

      {passwordDatas.length > 0 && (
        <Button onClick={createEncryptedFile}>Create Encrypted File</Button>
      )}

      <div className="flex flex-wrap gap-4 w-full">
        {passwordDatas
          .filter((data) => data.title.includes(filter))
          .map((data) => (
            <Button key={data.id} onClick={() => onPasswordDataClick(data)}>
              {data.title}
            </Button>
          ))}
      </div>

      <Dialog
        onClose={closeDialog}
        title="Add Password"
        open={passwordDataDialogOpen}
      >
        <AddPasswordForm
          ref={passwordDataFormRef}
          onSave={onSave}
          editPasswordData={editPasswordData}
          onPasswordDataRemove={onPasswordDataRemove}
        />
      </Dialog>

      <Dialog
        open={encryptPasswordDataDialogOpen}
        onClose={closeEncryptDialog}
        title="Create Encrypted File"
      >
        <CryptForm
          ref={encryptFormRef}
          onSubmit={onEncrypt}
          buttonLabel="Create"
        />
      </Dialog>
    </ScreenLayout>
  );
};

export default EncryptPage;
