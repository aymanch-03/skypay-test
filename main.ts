interface AccountService {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  printStatement(): void;
}

interface Transaction {
  date: string;
  amount: number;
  balance: number;
}

class BankService implements AccountService {
  private balance: number = 0;
  private transactions: Transaction[] = [];
  private nextTransactionDate: string | null = null;

  setDate(date: string): void {
    this.nextTransactionDate = date;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.addTx(amount);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (this.balance < amount) {
      throw new Error("Insufficient funds");
    }
    this.addTx(-amount);
  }

  printStatement(): void {
    console.log("Date       || Amount || Balance");
    [...this.transactions].reverse().forEach((tx) => {
      console.log(`${tx.date} || ${tx.amount} || ${tx.balance}`);
    });
  }

  private addTx(amount: number): void {
    const newBalance = this.balance + amount;
    const date = this.nextTransactionDate || new Date().toLocaleDateString('en-GB');
    this.balance = newBalance;
    this.transactions.push({
      date: date,
      amount: amount,
      balance: newBalance,
    });
    this.nextTransactionDate = null;
  }
}


const bankAccount = new BankService();

bankAccount.setDate("10-01-2012");
bankAccount.deposit(1000);
bankAccount.setDate("13-01-2012");
bankAccount.deposit(2000);
bankAccount.setDate("14-01-2012");
bankAccount.withdraw(500);

bankAccount.printStatement();