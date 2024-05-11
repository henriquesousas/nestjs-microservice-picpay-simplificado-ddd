import { Document } from '../../../../src/user/domain/models/document';
import { DocumentType } from '../../../../src/customer/domain/enum/DocumentType';
import { CNPJValidator } from '../../../../src/user/domain/validators/cnpj.validator';

describe('CNPJValidator', () => {
  it('should return Document (CNPJ) if valid cnpj', () => {
    const sut = new CNPJValidator();
    const document = sut.validate('123456') as Document;
    expect(document.getType).toEqual(DocumentType.CNPJ);
  });
});
