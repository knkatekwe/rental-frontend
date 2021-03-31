import { Injectable } from '@angular/core';

const Web3 = require('web3');
const contract = require('@truffle/contract');
declare let require: any;
declare let window: any;
const transferAbi = require('../../../../build/contracts/Transfer.json');
const leaseAbi = require('../../../../build/contracts/leaseGenerator.json');

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private account: any = null;
  private readonly web3: any;
  private enable: any;

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      console.log('transfer.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('transfer.service :: constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
    }
  }

  //enabling metamask
  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  //get account
  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    if (this.account == null) {
      this.account = (await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      })) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  //get account balance
  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();
    console.log('transfer.service :: getUserBalance :: account');
    console.log(account);
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function (err, balance) {
        console.log('transfer.service :: getUserBalance :: getBalance');
        //convert wei to ether
        const etherValue = Web3.utils.fromWei(balance, 'ether');
        console.log(etherValue);
        if (!err) {
          const retVal = {
            account: account,
            balance: etherValue,
          };
          console.log(
            'transfer.service :: getUserBalance :: getBalance :: retVal'
          );
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({ account: 'error', balance: 0 });
        }
      });
    }) as Promise<any>;
  }

  //transfer ether
  transferEther(value) {
    const that = this;
    console.log(
      'transfer.service :: transferEther to: ' +
        value.transferAddress +
        ', from: ' +
        that.account +
        ', amount: ' +
        value.amount
    );
    return new Promise((resolve, reject) => {
      console.log('transfer.service :: transferEther :: transferAbi');
      console.log(transferAbi);

      const transferContract = contract(transferAbi);
      transferContract.setProvider(that.web3);
      console.log('transfer.service :: transferEther :: transferContract');

      const weiValue = Web3.utils.toWei(value.amount, 'ether');

      console.log(transferContract);
      transferContract
        .deployed()
        .then(function (instance) {
          return instance.pay(value.transferAddress, {
            from: that.account,
            value: weiValue,
          });
        })
        .then(function (status) {
          if (status) {
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //methods to interact with lease agreeement smart contract methods

  //create lease agreement
  createLease(value) {
    const that = this;
    console.log('transfer.service :: create lease agreement');
    return new Promise((resolve, reject) => {
      console.log('transfer.service :: create lease :: contractAbi');
      console.log(leaseAbi);

      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: transferEther :: transferContract');

      const weiMonthlyAmountUsd = Web3.utils.toWei(
        value.amount.toString(),
        'ether'
      );

      const weiLeaseDepositUsd = Web3.utils.toWei(
        value.amount.toString(),
        'ether'
      );

      console.log(leaseContract);

      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.createNewLease(
            value.leasePeriod,
            weiMonthlyAmountUsd,
            weiLeaseDepositUsd,
            '2.628e6', //1 month in seconds
            '172800', // 48 hours in seconds
            value.tenantWalletAddress
          );
        })
        .then(function (status) {
          if (status) {
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //pay lease deposite
  payLeaseDeposit(value) {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: payLeaseDeposit :: leaseAbi');
      console.log(leaseAbi);

      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: payLeaseDeposit :: leaseContract');

      const weiValue = Web3.utils.toWei(value.amount, 'ether');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.payLease({
            from: that.account,
            value: weiValue,
          });
        })
        .then(function (status) {
          if (status) {
            console.log('Yaay!, lease deposit payment was a success!');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log('Oops!, lease deposit payment failed');
          return reject('transfer.service error');
        });
    });
  }

  //pay lease
  payLease(value) {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: payLease :: leaseAbi');
      console.log(leaseAbi);

      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: payLease :: leaseContract');

      const weiValue = Web3.utils.toWei(value.amount, 'ether');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.payLease({
            from: that.account,
            value: weiValue,
          });
        })
        .then(function (status) {
          if (status) {
            console.log('Yaaay!, lease payment was a success');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log('Oops!, lease payment failed');
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //collect lease deposit
  collectLeaseDeposit(value) {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: collectLeaseDeposit :: leaseAbi');
      console.log(leaseAbi);

      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: collectLeaseDeposit :: leaseContract');

      const weiValue = Web3.utils.toWei(value.amount, 'ether');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.collectLeaseDeposit(value.tenantAddr, {
            from: that.account,
          });
        })
        .then(function (status) {
          if (status) {
            console.log('Yaaay!, lease payment collection was a success');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log('Oops!, lease payment collection failed');
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //re-claim lease deposit
  reclaimLeaseDeposit(value) {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: reclaimLeaseDeposit :: leaseAbi');
      console.log(leaseAbi);

      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: reclaimLeaseDeposit :: leaseContract');

      const weiValue = Web3.utils.toWei(value.amount, 'ether');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.reclaimLeaseDeposit({
            from: that.account,
          });
        })
        .then(function (status) {
          if (status) {
            console.log('Yaaay!, lease deposit reclaim was a success');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log('Oops!, lease deposit re-claim failed');
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //withdraw funds
  withdrawFunds() {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: withdrawFunds :: leaseAbi');
      console.log(leaseAbi);

      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: withdrawFunds :: leaseContract');

      // const weiValue = Web3.utils.toWei(value.amount, 'ether');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.withdrawFunds({
            from: that.account,
          });
        })
        .then(function (status) {
          if (status) {
            console.log('Yaaay!, lease deposit reclaim was a success');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log('Oops!, lease deposit re-claim failed');
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //get lease for a tenant
  getLease(tenantAddr) {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: withdrawFunds :: leaseAbi');
      console.log(leaseAbi);
      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: withdrawFunds :: leaseContract');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.getLease(tenantAddr);
        })
        .then(function (status) {
          if (status) {
            console.log('Yaaay!, lease retrieved successfully');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log('Oops!, lease lease not retrieved');
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //get lease for a tenant
  getRate() {
    const that = this;

    return new Promise((resolve, reject) => {
      console.log('transfer.service :: withdrawFunds :: leaseAbi');
      console.log(leaseAbi);
      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: withdrawFunds :: leaseContract');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          return instance.getRate();
        })
        .then(function (status) {
          if (status) {
            console.log('Yaaay!, lease retrieved successfully');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log('Oops!, lease lease not retrieved');
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }
  //get contract balance
  getContractBalance() {
    const that = this;
    return new Promise((resolve, reject) => {
      console.log('transfer.service :: getContractBalance :: leaseAbi');
      console.log(leaseAbi);
      const leaseContract = contract(leaseAbi);
      leaseContract.setProvider(that.web3);
      console.log('transfer.service :: getContractBalance :: leaseContract');

      console.log(leaseContract);
      leaseContract
        .deployed()
        .then(function (instance) {
          //console.log(instance.getContractBalance())
          return instance.getContractBalance();
        })
        .then(function (status) {
          console.log(status);
          if (status) {
            console.log('Yaaay!, contract balance retrieved successfully');
            return resolve({ status: true });
          }
        })
        .catch(function (error) {
          console.log('Oops!, contract balance not retrieved');
          console.log(error);
          return reject('transfer.service error');
        });
    });
  }

  //methods to subscribe to lease agreement events/responses
}
