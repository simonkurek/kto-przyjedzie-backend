import { IMailDto } from './IMailDto';

export interface IMailService {
  send(mailDTO: IMailDto): void;
}
