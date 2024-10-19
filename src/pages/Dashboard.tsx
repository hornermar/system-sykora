import { useNavigate } from "react-router-dom";
import { Container } from "../components/common/Container/Container";
import { Introduction } from "../components/Content/Introduction/Introduction";

export const DashboardWrapper = () => {
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate("/struktura");
  };

  return (
    <Container
      children={<Introduction />}
      title="Systém Sýkora"
      nextButton="Začít"
      onNextButtonClick={handleNextButtonClick}
      fulllHeight
    />
  );
};
