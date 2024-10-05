import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiHome, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CryptForm from "../components/shared/CryptForm";
import Button from "../core/components/Button";
import Card from "../core/components/Card";
import Dialog from "../core/components/Dialog";
import Input from "../core/components/Input";
import Typography from "../core/components/Typography";
import ScreenLayout from "../core/layout/ScreenLayout";
import { decryptData } from "../core/utils/cryptoUtils";
import formDataToObject from "../core/utils/formDataToObject";

const DecryptPage = () => {
  const [filePassword, setFilePassword] = useState("");
  const [filePasswordDialogOpen, setFilePasswordDialogOpen] = useState(false);
  const closeFilePasswordDialog = () => setFilePasswordDialogOpen(false);
  const [passwordDatas, setPasswordDatas] = useState<PasswordData[]>([]);

  const [passwordDataDetail, setPasswordDataDetail] =
    useState<PasswordData | null>(null);
  const [filter, setFilter] = useState("");

  const passwordFormRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const openFilePasswordDialog = () => setFilePasswordDialogOpen(true);
  const onPasswordEnter = (e: FormEvent) => {
    e.preventDefault();

    if (passwordFormRef.current) {
      const data = formDataToObject(passwordFormRef.current);
      const password = data.filePassword as string;
      setFilePassword(password);
      closeFilePasswordDialog();
      fileInputRef.current?.click();
    }
  };

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") return;

      try {
        const decryptedData = JSON.parse(
          decryptData(result, filePassword)
        ) as EncryptedData;
        setPasswordDatas(decryptedData.data);
      } catch {
        alert("Wrong Password");
        setFilePassword("");
        fileInputRef.current!.value = "";
      }
    };
    reader.readAsText(file);
  };

  const onPasswordDataClick = (data: PasswordData) =>
    setPasswordDataDetail(data);
  const resetPasswordDataDetail = () => setPasswordDataDetail(null);
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
          placeholder={passwordDatas.length === 0 ? "Upload File" : "Search..."}
          value={filter}
          onChange={onFilterChange}
        />
        <Button
          className="!w-9 !h-9 !flex !items-center !justify-center !p-0"
          onClick={openFilePasswordDialog}
        >
          <FiUpload />
        </Button>
      </div>

      <input hidden type="file" onChange={onFileUpload} ref={fileInputRef} />

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
        open={!!passwordDataDetail}
        onClose={resetPasswordDataDetail}
        title={`Detail`}
      >
        <Card className="bg-white flex flex-col gap-4">
          <Typography>Title: {passwordDataDetail?.title}</Typography>
          <Typography>
            Username/Email: {passwordDataDetail?.usernameEmail}
          </Typography>
          <Typography>Password: {passwordDataDetail?.password}</Typography>
        </Card>
      </Dialog>

      <Dialog
        open={filePasswordDialogOpen}
        onClose={closeFilePasswordDialog}
        title="Open Encrypted File"
      >
        <CryptForm
          ref={passwordFormRef}
          onSubmit={onPasswordEnter}
          buttonLabel="Open"
        />
      </Dialog>
    </ScreenLayout>
  );
};

export default DecryptPage;
