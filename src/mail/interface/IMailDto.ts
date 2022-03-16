export interface IMailDto {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
