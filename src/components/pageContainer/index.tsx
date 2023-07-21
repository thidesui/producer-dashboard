import { PageContainerProps } from "@/interfaces/components/pageContainer"
import Styled from "@/styles/components/pageContainer"

// Componente de container das páginas para padronizar o style
const PageContainerComponent = ({ children }: PageContainerProps) =>
    <Styled.Content>{...children}</Styled.Content>

export default PageContainerComponent