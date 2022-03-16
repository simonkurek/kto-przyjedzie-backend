import { IGmailConfig } from './interface/IGmailConfig';
import { IMailDto } from './interface/IMailDto';
import { IMailService } from './interface/IMailService';

import nodemailer from 'nodemailer';
import { IGmailAuth } from './interface/IGmailAuth';
import { GmailConfig } from './config/gmail.config';

export class GmailService implements IMailService {
  private static initalized = false;
  private static instance: IMailService;
  private static config: IGmailConfig;

  private _transporter: nodemailer.Transporter;

  public static auth(config: IGmailAuth): void {
    GmailService.config = new GmailConfig(config);
  }

  public static getInstance(): IMailService {
    if (GmailService.config) {
      throw new Error('GmailService is not authotized!');
    }
    if (!GmailService.initalized) {
      GmailService.initalized = true;
      GmailService.instance = new GmailService(GmailService.config);
    }
    return GmailService.instance;
  }

  private constructor(config: IGmailConfig) {
    this._transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      auth: {
        user: config.auth.email,
        pass: config.auth.password,
      },
    });
  }

  send(mailDTO: IMailDto): void {
    this._transporter.sendMail(mailDTO);
  }
}
