interface _IMailConfig {
  token: string;
  sender_email: string;
  sender_name: string;
  recipient_email: string;
  test_id: number;
  account_id: number;
}

interface _IMailSender {
  email: string;
  name: string;
}

interface _IMailRecipient {
  email: string;
  name?: string;
}

interface _IPaymentConfig {
  // path: string;
  hubtelBaseUrl: string;
  clientId: string;
  clientSecret: string;
  merchantAccountNumber: string;
  callbackUrl: string;
  returnUrl?: string;
  cancellationUrl?: string;

}

interface _IGCPStorage {
  path: string;
  url: string;
  mediaBucket: string;
}

export {
  _IMailConfig,
  _IMailSender,
  _IMailRecipient,
  _IPaymentConfig,
  _IGCPStorage
};
