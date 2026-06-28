export type SmsExpenseDetectorModuleEvents = {
  onSmsReceived: (event: { body: string; sender: string; receivedAt: number }) => void;
};
