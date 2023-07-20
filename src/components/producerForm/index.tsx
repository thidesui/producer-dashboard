import { ProducerFormProps } from "@/interfaces/components/producerForm"
import formService from "@/services/formService"
import { Form, Input, Select } from "antd"
import { RuleObject } from "antd/es/form"

const ProducerForm = ({ form, sendForm }: ProducerFormProps) => {
    const formatCpfCnpj = (ev: { target: { value: string } }) => {
        form.setFieldValue('cpfCnpj', formService.formatCpfCnpj(ev.target.value))
    }

    const totalAcreValidator = (_rule: RuleObject, _value: string, cb: (msg?: string) => void) => {
        const validation = formService.acreValidator(form.getFieldsValue())

        if (validation) return cb(validation)
        else return Promise.resolve()
    }

    return <>
        <Form
            name="producerForm"
            layout='vertical'
            form={form}
            {...formService.formSettings}
            onFinish={() => sendForm()}
        >
            <Form.Item
                label="CPF ou CNPJ"
                name="cpfCnpj"
                rules={[{ required: true }, { validator: formService.cpfCnpjValidator }]}
            >
                <Input onChange={formatCpfCnpj} />
            </Form.Item>

            <Form.Item
                label="Nome do produtor"
                name="producerName"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Nome da fazenda"
                name="farmName"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Cidade"
                name="city"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Estado"
                name="state"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Área total em hectares da fazenda"
                name="totalAcre"
                rules={[{ required: true }, { validator: totalAcreValidator }]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item
                label="Área agricultável em hectares"
                name="arableAcre"
                rules={[{ required: true }]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item
                label="Área de vegetação em hectares"
                name="vegetationAcre"
                rules={[{ required: true }]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item
                label="Culturas plantadas"
                name="plantedCrops"
                rules={[{ required: true }]}
            >
                <Select
                    mode="multiple"
                    allowClear
                    options={formService.plantedCropsOptions} />
            </Form.Item>
        </Form>
    </>
}

export default ProducerForm