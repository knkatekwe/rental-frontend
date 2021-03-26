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
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
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

  //create lease agreement
  createLease(value) {
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

  // public createNewLease({
  // 	numberOfMonths,
  // 	monthlyAmountUsd,
  // 	leaseDepositUsd,
  // 	leasePaymentWindowSeconds,
  // 	depositPaymentWindowSeconds,
  // 	tenantAddr
  // }): Promise<any> {
  // 	return this.web3Service.abi.methods
  // 		.createNewLease(
  // 			numberOfMonths,
  // 			monthlyAmountUsd,
  // 			leaseDepositUsd,
  // 			leasePaymentWindowSeconds,
  // 			depositPaymentWindowSeconds,
  // 			tenantAddr
  // 		)
  // 		.send({ from: this.web3Service.getAccount() });
  // }

  // public subscribeToEvent(eventName: string, callback: (data: any) => any) {
  // 	return this.web3Service.abi.events[eventName]().on('data', callback).on('error', console.error);
  // }

  // getLease({
  // 	numberOfMonths,
  // 	monthlyAmountUsd,
  // 	leaseDepositUsd,
  // 	leasePaymentWindowSeconds,
  // 	depositPaymentWindowSeconds,
  // 	tenantAddr
  // }): Promise<any> {
  // 	return this.web3Service.abi.methods
  // 		.getLease(
  // 			numberOfMonths,
  // 			monthlyAmountUsd,
  // 			leaseDepositUsd,
  // 			leasePaymentWindowSeconds,
  // 			depositPaymentWindowSeconds,
  // 			tenantAddr
  // 		)
  // 		.call();
  // }

  // payLeaseDeposit(): Promise<any> {
  // 	return this.web3Service.abi.methods.payLeaseDeposit().call();
  // }

  // payLease() {
  // 	return this.web3Service.abi.methods.payLease().send({ from: this.web3Service.getAccount() });
  // }
  // collectLeaseDeposit(): Promise<any> {
  // 	return this.web3Service.abi.methods.collectLeaseDeposit().call();
  // }
  // reclaimeDeposit(): Promise<any> {
  // 	return this.web3Service.abi.methods.reclaimDeposit().call();
  // }
  // withdrawFunds(): Promise<any> {
  // 	return this.web3Service.abi.methods.withdrawFunds().call();
  // }

  // getContractBalance(): Promise<any> {
  // 	return this.web3Service.abi.methods.payLeaseDeposit().call();
  // }
  // getRate(): Promise<any> {
  // 	return this.web3Service.abi.methods.getRate().call();
  // }
}
