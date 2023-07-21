import { ProducerWithId } from "../producerForm"

export interface ProducerListProps {
    producerList: ProducerWithId[]
    deleteFarm: Function
}