import { ProducerFormProps } from "@/interfaces/components/producerForm"
import formService from "@/services/formService"
import { Form, Input, Select } from "antd"
import { RuleObject } from "antd/es/form"

// Componente com o formulário do produtor, usado tanto na criação quanto na edição
const ProducerForm = ({ form, submitForm }: ProducerFormProps) => {
    // Trigger para formatar o campo CPF/CNPJ
    const formatCpfCnpj = (ev: { target: { value: string } }) => {
        form.setFieldValue("cpfCnpj", formService.formatCpfCnpj(ev.target.value))
    }

    // Trigger de validação do campo total de hectares (precisa estar aqui porque usa outros campos para validar)
    const totalHectareValidator = (_rule: RuleObject, _value: string, cb: (msg?: string) => void) => {
        const validation = formService.hectareValidator(form.getFieldsValue())

        if (validation) return cb(validation)
        else return Promise.resolve()
    }

    return <Form
        name="producerForm"
        layout='vertical'
        form={form}
        {...formService.formSettings}
        onFinish={() => submitForm()}
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
            name="totalHectare"
            rules={[{ required: true }, { validator: totalHectareValidator }]}
        >
            <Input type="number" />
        </Form.Item>

        <Form.Item
            label="Área agricultável em hectares"
            name="arableHectare"
            rules={[{ required: true }]}
        >
            <Input type="number" />
        </Form.Item>

        <Form.Item
            label="Área de vegetação em hectares"
            name="vegetationHectare"
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
}

export default ProducerForm