import { ProducerFormValues, ProducerWithId } from '@/interfaces/components/producerForm'

const bffBasePath = 'https://bffjsonserver-z37l2ehg4q-uc.a.run.app'

const GetProducerList = async (): Promise<ProducerWithId[]> => {
  const producerList = await fetch(`${bffBasePath}/producers`)

  return await producerList.json()
}

const GetProducerById = async (id: string): Promise<ProducerWithId> => {
  const producerFound = await fetch(`${bffBasePath}/producers/${id}`)

  if (producerFound.status !== 200)
    throw new Error(producerFound.statusText)

  return await producerFound.json()
}

const UpdateProducerById = async (id: string, producer: ProducerFormValues): Promise<ProducerWithId> => {
  const producerUpdated = await fetch(`${bffBasePath}/producers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(producer),
    headers: { 'Content-Type': 'application/json' }
  })

  if (producerUpdated.status !== 200)
    throw new Error(producerUpdated.statusText)

  return producerUpdated.json()
}

const DeleteProducerById = async (id: string): Promise<void> => {
  const producerUpdated = await fetch(`${bffBasePath}/producers/${id}`, {
    method: 'DELETE'
  })

  if (producerUpdated.status !== 200)
    throw new Error(producerUpdated.statusText)

  return producerUpdated.json()
}

const CreateNewProducer = async (producer: ProducerFormValues): Promise<ProducerWithId> => {
  const producerCreated = await fetch(`${bffBasePath}/producers`, {
    method: 'POST',
    body: JSON.stringify(producer),
    headers: { 'Content-Type': 'application/json' }
  })

  if (producerCreated.status !== 201)
    throw new Error(producerCreated.statusText)

  return producerCreated.json()
}

const ProducersService = {
  GetProducerList: GetProducerList,
  GetProducerById,
  UpdateProducerById,
  DeleteProducerById,
  CreateNewProducer
}

export default ProducersService