import { HeaderProps } from '@/interfaces/components/header'
import Styled from '@/styles/components/header'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router'

export default ({ title, home }: HeaderProps) => {
    const router = useRouter();

    return <Styled.Header>
        {home ? <></> :
            <Button
                type="text"
                icon={<ArrowLeftOutlined style={{ color: "#fff" }} />}
                onClick={() => router.push('/')}
            />
        }

        <span>
            {title}
        </span>
    </Styled.Header>
}