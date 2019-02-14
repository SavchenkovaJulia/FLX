function userCard(num) {
  let userCredits = 100;
  let transactionLimit = 100;
  let historyLogs = [];

  return {
    getCardOptions() {
      return {
        balance: userCredits,
        transactionLimit: transactionLimit,
        historyLogs: historyLogs,
        key: num
      };
    },

    putCredits(credits) {
      userCredits += credits;
      trackHistoryLogs('Received credits', credits);
    },

    takeCredits(credits) {
      if (!validityAndLog(credits, userCredits, transactionLimit)) {
        return;
      }
      userCredits -= credits;
      trackHistoryLogs('Withdrawal of credits', credits);
    },

    setTransactionLimit(credits) {
      transactionLimit = credits;
      trackHistoryLogs('Transaction Limit Change', credits);
    },

    transferCredits(credits, recipientCard) {
      const TAX = 0.005;
      let transferWithTax = credits * TAX;

      if (!validityAndLog(credits, userCredits, transactionLimit)) {
        return;
      }
      this.takeCredits(transferWithTax + credits);
      recipientCard.putCredits(credits);
    }
  };

  function trackHistoryLogs(operationType, credits) {
    historyLogs.push({
      operationType: operationType,
      credits: credits,
      operationTime: new Date().toLocaleString('en-GB')
    });
  }

  function validityAndLog(credits, userCredits, transactionLimit) {
    if (credits > transactionLimit) {
      console.error(`Transaction limit is ${transactionLimit}`);
      return false;
    } else if (credits > userCredits) {
      console.error(
        `This amount is unacceptable. Available balance is ${userCredits}`
      );
      return false;
    }
    return true;
  }
}

class UserAccount {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.max = 3;
  }

  addCard() {
    if (this.cards.length < this.max) {
      this.cards.push(userCard(this.cards.length + 1));
    } else {
      console.error(`You can not have more than 3 cards`);
    }
  }

  getCardByKey(num) {
    return this.cards[num - 1];
  }
}