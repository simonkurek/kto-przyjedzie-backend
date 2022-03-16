import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check/lib';
import { Match } from '../validators/match.decorator';

const passwordRequiments: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainUpperLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
};

export class CreateUserDto {
  @IsDefined({ message: '' })
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  @Length(2, 20, {
    message: 'Długość imienia powinna być pomiędzy 2 a 20 liter.',
  })
  name: string;

  @IsDefined({ message: '' })
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  @Length(8, 100, {
    message: 'Długość hasła powinna być między 8 a 100 znaków',
  })
  @Validate(PasswordValidation, [passwordRequiments], {
    message:
      'Hasło powinno zawierać małe oraz duże litery, liczby oraz znaki specjalne',
  })
  password: string;

  @IsDefined({ message: '' })
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  @Match('password', { message: 'Hasła nie są identyczne' })
  confirmPassword: string;

  @IsDefined({ message: '' })
  @IsNotEmpty({ message: '' })
  @IsString({ message: '' })
  @IsEmail({}, { message: 'Niepoprawny adres email' })
  email: string;
}
