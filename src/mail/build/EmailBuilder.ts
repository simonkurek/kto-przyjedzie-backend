import { Mail } from '../classes/Mail';
import { IMailDto } from '../interface/IMailDto';

export class EmailBuilder {
  private _draft: IMailDto;

  static create() {
    return new EmailBuilder();
  }

  from(from: string): EmailBuilder {
    this._draft.from = from;
    return this;
  }

  to(to: string): EmailBuilder {
    this._draft.to = to;
    return this;
  }

  subject(subject: string): EmailBuilder {
    this._draft.subject = subject;
    return this;
  }

  text(text: string): EmailBuilder {
    this._draft.text = text;
    return this;
  }

  html(html: string): EmailBuilder {
    this._draft.html = html;
    return this;
  }

  build(): Mail {
    return new Mail(
      this._draft.from,
      this._draft.to,
      this._draft.subject,
      this._draft.text,
      this._draft.html,
    );
  }
}
