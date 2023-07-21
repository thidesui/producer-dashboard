import { HeaderProps } from "@/interfaces/components/header"
import Styled from "@/styles/components/header"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useRouter } from "next/router"

// Componente de Header usado nas 3 páginas (dashboard, criar e editar)
const HeaderComponent = ({ title, home }: HeaderProps) => {
    const router = useRouter();

    return <Styled.Header>
        {/* Botão de voltar não aparece na tela de dashboard (home) */}
        {home ? null :
            <Button
                type="text"
                icon={<ArrowLeftOutlined style={{ color: "#fff" }} />}
                onClick={() => router.push("/")}
            />
        }
        {title}
    </Styled.Header>
}

export default HeaderComponent