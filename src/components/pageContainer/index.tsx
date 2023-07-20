import { PageContainerProps } from '@/interfaces/components/pageContainer'
import Styled from '@/styles/components/pageContainer'

const PageContainerComponent = ({ children }: PageContainerProps) =>
    <Styled.Content>{...children}</Styled.Content>

export default PageContainerComponent