export class SettingsDto {
  constructor(object: any) {
    object = object || {};
    this.username = object.username;
  }
  readonly username: string;
}
