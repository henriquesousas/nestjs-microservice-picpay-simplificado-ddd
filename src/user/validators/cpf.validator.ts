import { BadRequestException } from '@nestjs/common';
import { Result } from '../../../libs/core/src/common/types/types';
import { Document } from '../../../libs/core/src/feature/user/entities/document';
import { DocumentValidator } from '../../../libs/core/src/feature/user/document.validator';
import { DocumentType } from '../../../libs/core/src/feature/user/entities/document_type';
import { DocumentInvalidException } from '../../../libs/core/src/feature/user/exceptions/document-invalid.exception';

export class CPFValidator extends DocumentValidator {
  documentType = DocumentType.CPF;
  validate(cpf: string): Result<Document> {
    // Validar se é String
    if (typeof cpf !== 'string') new BadRequestException('CPF inválido');

    // Tirar formatação
    cpf = cpf.replace(/[^\d]+/g, '');

    // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      new BadRequestException('CPF inválido');
    }

    // String para Array
    const data = cpf.split('');

    // Pegar os últimos 2 digitos de validação
    const validator = data
      .filter((digit, index, array) => index >= array.length - 2 && digit)
      .map((el) => +el);

    // Pegar Array de items para validar
    const toValidate = (pop) =>
      data
        .filter((digit, index, array) => index < array.length - pop && digit)
        // Transformar digitos em números
        .map((el) => +el);

    // Calcular Soma dos digitos e multiplicar por 10
    const rest = (count, pop) =>
      ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
        10) %
        // Pegar o resto por 11
        11) %
      // transformar de 10 para 0
      10;

    const isValid = !(
      rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]
    );

    return isValid
      ? new Document(cpf, DocumentType.CPF)
      : new DocumentInvalidException(DocumentType.CPF);
  }
}
