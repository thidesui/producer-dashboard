import { ProducerListProps } from '@/interfaces/components/producerList'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, List, Popconfirm } from 'antd'
import Link from 'next/link'

// Componente que monta a lista de produtores para a tela de Dashboard 
const ProducerList = ({ producerList, deleteFarm }: ProducerListProps) => {
  const emptyText = 'Sem fazendas cadastradas!'

  return <List
    header={<h3>Produtores</h3>}
    footer={<Link href="/new"><Button type="primary">Adicionar novo produtor</Button></Link>}
    bordered
    style={{ backgroundColor: 'white' }}
    dataSource={producerList}
    locale={{ emptyText }}
    renderItem={(item) => (
      <List.Item
        actions={[
          <Link key="link-edit" href={`/edit/${item.id}`} >
            <Button type='text' icon={<EditTwoTone />} />
          </Link>,

          <Popconfirm
            key={'pop-confirm-delete'}
            icon={<DeleteTwoTone twoToneColor="#eb2f58" />}
            title="Excluir produtor"
            description="Tem certeza disso?"
            onConfirm={() => deleteFarm(item.id)}
            okText="Sim, excluir"
            okType='danger'
            cancelText="Não"
          >
            <Button
              type='text'
              key="button-delete"
              icon={<DeleteTwoTone twoToneColor="#eb2f58" />}
            />
          </Popconfirm>
        ]}
      >
        <List.Item.Meta
          title={`${item.producerName} - ${item.cpfCnpj}\n${item.farmName} (${item.totalHectare}hectares)`}
          description={`${item.plantedCrops.join(' | ')}\n${item.city} - ${item.state}`}
          style={{ whiteSpace: 'pre' }}
        />
      </List.Item>)}
  >
  </List>
}

export default ProducerList