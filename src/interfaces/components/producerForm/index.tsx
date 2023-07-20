import { FormInstance } from "antd";
import { Subject } from "rxjs";

export interface ProducerFormProps {
    form: FormInstance<ProducerFormValues>
    sendForm: Function
}

export interface ProducerFormValues {
    cpfCnpj: string;
    producerName: string
    farmName: string
    city: string
    state: string
    totalAcre: string
    arableAcre: string
    vegetationAcre: string
    plantedCrops: string[]
}

export interface ProducerFormValuesWithId extends ProducerFormValues {
    id: string
}