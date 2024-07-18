import { Flunt } from '../../../../../libs/common/src/core/application/validator/flunt';
import { Notification } from '../../../../../libs/common/src/core/application/validator/notification';
import { ValueObject } from '../../../../../libs/common/src/core/domain/value-object/value-object';

export type NameConstructorProps = {
  firstName: string;
  surName: string;
};

export class Name extends ValueObject {
  private constructor(private props: NameConstructorProps) {
    super();
    this.validate(props.firstName, 'firstName');
    this.validate(props.surName, 'surName');
  }

  static create(props: NameConstructorProps): Name {
    return new Name(props);
  }

  get getfirstName(): string {
    return this.props.firstName;
  }

  get getSurName(): string {
    return this.props.surName;
  }

  get fullName(): string {
    return this.props.firstName + ' ' + this.props.surName;
  }

  changeName(firstName: string) {
    this.props.firstName = firstName;
    this.validate(this.props.firstName, 'firstName');
  }

  changeSurName(surName: string) {
    this.props.surName = surName;
    this.validate(this.props.surName, 'surName');
  }

  validate(value: string, propertyName: string) {
    const errors = Flunt.values(value, propertyName).minLength(3).errors;
    for (let error of errors) {
      this.notification.addError(error, propertyName);
    }
  }
}
