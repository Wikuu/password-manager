import { useNavigate } from "react-router-dom";
import Background from "../assets/bg.jpg";
import Button from "../core/components/Button";
import Typography from "../core/components/Typography";
import ScreenLayout from "../core/layout/ScreenLayout";

const HomePage = () => {
  const navigate = useNavigate();

  const toEncrypt = () => navigate("/encrypt");
  const toDecrypt = () => navigate("/decrypt");

  return (
    <ScreenLayout>
      <img
        src={Background}
        className="sm:w-full lg:w-2/4 h-auto object-contain"
      />
      <div className="flex flex-col gap-6 items-center">
        <Typography className="sm:text-xl">
          Welcome to Password Manager
        </Typography>
        <div className="flex gap-4">
          <Button onClick={toEncrypt}>Encrypt</Button>
          <Button onClick={toDecrypt}>Decrypt</Button>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default HomePage;
