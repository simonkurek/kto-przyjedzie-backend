import { IGmailAuth } from '../interface/IGmailAuth';
import { IGmailConfig } from '../interface/IGmailConfig';

export class GmailConfig implements IGmailConfig {
  host: 'smtp.gmail.com';
  port: 587;
  auth: IGmailAuth;

  constructor(authConfig: IGmailAuth) {
    this.auth = authConfig;
  }
}
