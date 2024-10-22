import { Container } from "../components/common/Container/Container";
import { Sources } from "../components/Content/Sources/Sources";

export const SourcesWrapper = () => {
  return <Container title="Zdroje" children={<Sources />} fulllHeight />;
};
