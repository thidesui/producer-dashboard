import { PageContainerProps } from '@/interfaces/components/pageContainer'
import Styled from '@/styles/components/pageContainer'

export default ({ children }: PageContainerProps) =>
    <Styled.Content>{...children}</Styled.Content>