import { FormInstance } from 'antd';

export interface ProducerFormProps {
    form: FormInstance<ProducerFormValues>
    submitForm: Function
}

export interface ProducerFormValues {
    cpfCnpj: string;
    producerName: string
    farmName: string
    city: string
    state: string
    totalHectare: string
    arableHectare: string
    vegetationHectare: string
    plantedCrops: string[]
}

export interface ProducerWithId extends ProducerFormValues {
    id: string
}