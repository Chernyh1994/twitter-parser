import { SettingsDto } from './settings.dto';
export class UserDto {
  constructor(object: any) {
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.email = object.email;
    this.settings = new SettingsDto(object.settings);
}
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  settings: SettingsDto;
}
