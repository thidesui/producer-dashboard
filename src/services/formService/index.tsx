import { ProducerFormValues } from '@/interfaces/components/producerForm';
import { FormProps } from 'antd'
import { RuleObject } from 'antd/es/form';

const formSettings: FormProps = {
  validateMessages: { required: '${label} é obrigatório!' }
}

const plantedCropsOptions = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'].map(a => ({ label: a, value: a }))

const validateCPF = (cpf: string) => {
  if (cpf == '') return false;
  if (cpf.length != 11 ||
        cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999')
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
    return false;
  add = 0;
  for (let i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
    return false;
  return true;
}

const validateCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj == '') return false;
  if (cnpj.length != 14)
    return false;
  if (cnpj == '00000000000000' ||
        cnpj == '11111111111111' ||
        cnpj == '22222222222222' ||
        cnpj == '33333333333333' ||
        cnpj == '44444444444444' ||
        cnpj == '55555555555555' ||
        cnpj == '66666666666666' ||
        cnpj == '77777777777777' ||
        cnpj == '88888888888888' ||
        cnpj == '99999999999999')
    return false;
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != Number(digitos.charAt(0)))
    return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != Number(digitos.charAt(1)))
    return false;
  return true;
}

const cpfCnpjValidator = (_rule: RuleObject, value: string, cb: (_msg?: string) => void) => {
  if (!value) return

  const cleanInput = value.replace(/[^\d]+/g, '');

  if (cleanInput?.length === 11) { if (!validateCPF(cleanInput)) return cb('CPF inválido') }
  else if (cleanInput?.length === 14) { if (!validateCNPJ(cleanInput)) return cb('CNPJ inválido') }
  else return cb('Por favor, digite um CPF ou um CNPJ válido')

  return Promise.resolve()
}

const formatCpfCnpj = (value: string) => {
  const cleanInput = value.replace(/[^\d]+/g, '');

  if (cleanInput?.length === 11) return cleanInput.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4')
  else if (cleanInput?.length === 14) return cleanInput.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})/, '$1.$2.$3/$4-$5')
  else return cleanInput
}

const hectareValidator = ({ totalHectare, arableHectare, vegetationHectare }: ProducerFormValues) => {
  if (totalHectare && (Number(arableHectare) + Number(vegetationHectare)) > Number(totalHectare))
    return 'A soma de área agricultável e vegetação, não deverá ser maior que a área total da fazenda'
}

const FormService = { formSettings, plantedCropsOptions, cpfCnpjValidator, formatCpfCnpj, hectareValidator }

export default FormService