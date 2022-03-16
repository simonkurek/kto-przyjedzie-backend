import { EmailBuilder } from './build/EmailBuilder';
import { GmailService } from './GmailService';
import { IGmailAuth } from './interface/IGmailAuth';

const gmailCreds: IGmailAuth = {
  email: '',
  password: '',
};

GmailService.auth(gmailCreds);
const gmailService = GmailService.getInstance();

gmailService.send(
  EmailBuilder.create()
    .from('simonkurek@protonmail.com')
    .to('iszymonkurek@gmail.com')
    .subject('Test')
    .text('Test')
    .html('<h1>Test</h1>')
    .build(),
);
