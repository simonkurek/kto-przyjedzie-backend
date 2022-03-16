import { IGmailAuth } from './IGmailAuth';

export interface IGmailConfig {
  host: string;
  port: number;
  auth: IGmailAuth;
}
