declare global {
  type PasswordData = {
    id: string;
    title: string;
    usernameEmail: string;
    password: string;
  };

  type EncryptedData = {
    password: string;
    data: PasswordData[];
  };
}

export {};
