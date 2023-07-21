import { describe, expect, it } from '@jest/globals';
import formService from '.'
import { ProducerFormValues } from '@/interfaces/components/producerForm';

describe('cpfCnpjValidator function', () => {
  const cbMock = (value: any): any => value;
  const validCpf = '946.627.265-90'
  const invalidCpf = '072.011.673-23'
  const validCnpj = '16.817.519/0001-05'
  const invalidCnpj = '95.411.686/0001-11'
  const invalidCpfAndCnpj = '12345'

  it('should validate cpf', async() => {
    await expect(formService.cpfCnpjValidator(null as any, validCpf, cbMock)).resolves.toBe(undefined);
  });

  it('should identify invalid cpf', () => {
    expect(formService.cpfCnpjValidator(null as any, invalidCpf, cbMock)).toBe('CPF inválido');
  });

  it('should validate cnpj', async() => {
    await expect(formService.cpfCnpjValidator(null as any, validCnpj, cbMock)).resolves.toBe(undefined);
  });

  it('should identify invalid cnpj', () => {
    expect(formService.cpfCnpjValidator(null as any, invalidCnpj, cbMock)).toBe('CNPJ inválido');
  });

  it('should identify invalid input', () => {
    expect(formService.cpfCnpjValidator(null as any, invalidCpfAndCnpj, cbMock)).toBe('Por favor, digite um CPF ou um CNPJ válido');
  });

  it('should ignore empty input', () => {
    expect(formService.cpfCnpjValidator(null as any, undefined, cbMock)).toBe(undefined);
  });
});

describe('formatCpfCnpj function', () => {
  const validCpf = '94662726590'
  const validCpfFormatted = '946.627.265-90'
  const validCnpj = '16817519000105'
  const validCnpjFormatted = '16.817.519/0001-05'
  const invalidCpfAndCnpj = '12345'

  it('should format cpf',  () => {
    expect(formService.formatCpfCnpj(validCpf)).toBe(validCpfFormatted);
  });

  it('should format cnpj',  () => {
    expect(formService.formatCpfCnpj(validCnpj)).toBe(validCnpjFormatted);
  });

  it('should ignore invalid input', () => {
    expect(formService.formatCpfCnpj(invalidCpfAndCnpj)).toBe(invalidCpfAndCnpj);
  });
});

describe('hectareValidator function', () => {
  const validHectare = { totalHectare: 4, arableHectare: 1, vegetationHectare: 1 } as any as ProducerFormValues
  const invalidHectare = { totalHectare: 1, arableHectare: 1, vegetationHectare: 1 } as any as ProducerFormValues

  it('should validate hectare',  () => {
    expect(formService.hectareValidator(validHectare)).toBe(undefined);
  });

  it('should return hectare error',  () => {
    expect(formService.hectareValidator(invalidHectare)).toBe('A soma de área agricultável e vegetação, não deverá ser maior que a área total da fazenda');
  });
});