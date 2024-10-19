import { Container } from "../components/common/Container/Container";
import { useTheme } from "@mui/material/styles";
import { Sources } from "../components/Content/Sources/Sources";

export const SourcesWrapper = () => {
  const theme = useTheme();

  return (
    <Container
      title="Zdroje"
      children={<Sources />}
      color={theme.palette.primary}
      fulllHeight
    />
  );
};
