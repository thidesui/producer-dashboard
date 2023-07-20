import Header from '@/components/header'
import PageContainer from '@/components/pageContainer'
import { ProducerFormValuesWithId } from '@/interfaces/components/producerForm'
import { DashboardInfos, generateDashboardInfos, producersFormMock } from '@/services/mockup'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Card, Col, Divider, Layout, List, Row, Statistic } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

export default function Home() {
  const [producersList, setProducersList] = useState<ProducerFormValuesWithId[]>([])
  const [dashboardInfos, setDashboardInfos] = useState<DashboardInfos>()

  useEffect(() => {
    setProducersList(producersFormMock)
    setDashboardInfos(generateDashboardInfos(producersFormMock))
  }, [])

  const deleteFarm = (id: string) => {
    const producersListUpdated = producersList.filter(producer => producer.id !== id)
    setProducersList(producersListUpdated)
    setDashboardInfos(generateDashboardInfos(producersListUpdated))
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Layout>
        <Header title="Dashboard" home />

        <PageContainer>
          <Row>
            <Col offset={2} span={20}>
              <List
                header={<h3>Fazendas</h3>}
                footer={<Link href="/new"><Button type="primary">Adicionar nova fazenda</Button></Link>}
                bordered
                style={{ backgroundColor: 'white' }}
                dataSource={producersList}
                locale={{ emptyText: "Sem fazendas cadastradas!" }}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Link href={`/edit/${item.id}`} >
                        <Button type='text' icon={<EditTwoTone />} />
                      </Link>,
                      <Button
                        type='text'
                        icon={<DeleteTwoTone twoToneColor="#eb2f58" />}
                        onClick={() => deleteFarm(item.id)}
                      />
                    ]}
                  >
                    {item.farmName}
                  </List.Item>)}
              >
              </List>
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col offset={2} span={20}>
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={[
                  { title: 'Total de fazendas em quantidade', value: dashboardInfos?.totalFarm },
                  { title: 'Total de fazendas em hectares (área total)', value: dashboardInfos?.totalHectare }
                ]}
                renderItem={(item) => (
                  < List.Item >
                    <Card bordered={false}>
                      <Statistic title={item.title} value={item.value} />
                    </Card>
                  </List.Item>
                )}
              >
              </List>
            </Col>
          </Row>

          <Divider />


          <Row>
            <Col offset={2} span={20}>
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={[
                  { title: 'Fazendas por estado', value: dashboardInfos?.farmPerState },
                  { title: 'Distribuição de cultura', value: dashboardInfos?.cropsQtd },
                  { title: 'Uso do solo', value: dashboardInfos?.acreUtilization }
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Card bordered={false}>
                      <Chart
                        chartType='PieChart'
                        width='100%'
                        height='300px'
                        options={{ title: item.title }}
                        data={[['Item', 'Value'], ...(item.value?.map(a => ([a.label, a.qtd])) || [])]}
                      />
                    </Card>
                  </List.Item>
                )}
              >
              </List>
            </Col>
          </Row>

        </PageContainer >
      </Layout >
    </>
  )
}
