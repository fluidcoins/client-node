import { AxiosInstance } from "axios";

export type Status = "success" | "failed" | "pending";

export type Country = "NG";

export type Currency = "USD" | "NGN";

export type CryptoCodes =
  | "BTC"
  | "USDT"
  | "USDC"
  | "ETH"
  | "MATIC"
  | "LTC"
  | "DODGE"
  | "XRP"
  | "XLM"
  | "TRON"
  | "BUSD"
  | "BCH"
  | "BNB";
export interface Bank {
  account_number: string;
  bank_code: string;
}

export interface Crypto {
  address: string;
  label: string;
  network: string;
}

export interface Phone {
  code?: string;
  phone?: string;
}

export interface CustomerData {
  email?: string;
  full_name?: string;
  phone?: Phone;
}

export interface PaymentData {
  amount?: number;
  collect_phone_number?: boolean;
  description?: string;
  disable_after_payment?: boolean;
  title?: string;
}

export interface AddressData {
  code: string;
  network: string;
}

export interface CreateCustomerData {
  email: string;
  full_name: string;
  phone?: Required<Phone>;
}

export interface CreatePaymentData {
  amount: number;
  description: string;
  title: string;
  collect_phone_number?: boolean;
  currency?: Currency;
  disable_after_payment?: boolean;
}

export interface PayoutAccountData {
  bank?: Bank;
  crypto?: Crypto;
  currency: string;
}

declare class FluidCoins {
  public secretKey: string;
  private request: AxiosInstance;

  constructor(secretKey: string);

  /**
   *
   * @param coin_id fetch addresses for a specific coin.
   * Must be a uuid and you can fetch the reference of the coin by using the v1/currencies endpoint
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 20 items
   */
  getAddresses(
    coin_id?: string,
    page?: number,
    per_page?: number
  ): Promise<any | undefined>;

  /**
   *
   * @param data AddressData
   * @param data.code for the coin you want to generate an address for. e.g (XLM, USDC)
   * @param data.network erc20,trc20,bep20 and others
   */
  createNewAddress(data: AddressData): Promise<any | undefined>;

  /**
   * Fetches a List of all crypto deposits
   * @param page Page to query data from. Defaults to 1
   * @param per_page Per page number to query data from. Defaults to 20 items
   */
  getCryptoDeposits(page?: number, per_page?: number): Promise<any | undefined>;

  /**
   * Fetch a single transaction that occurred on a given address
   * @param reference transaction reference
   */
  getAddressSingleTransaction(reference: string): Promise<any | undefined>;

  /**
   * Fetches an address by its reference
   * @param reference address unique identifier E.g ADDR_xy
   */
  getSingleAddress(reference: string): Promise<any | undefined>;

  /**
   * Fetches List of transactions for a given address
   * @param reference address unique identifier E.g ADDR_xy
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 20 items
   */
  getAddressTransactions(
    reference: string,
    page?: number,
    per_page?: number
  ): Promise<any | undefined>;

  /**
   * Fetches all balances of a merchant
   */
  getBalance(): Promise<any | undefined>;

  /**
   * Fetches a List currencies
   * @param test_net_only Retrieve only coins that have a test-net network
   */
  getCurrencies(test_net_only?: boolean): Promise<any | undefined>;

  /**
   * Fetch a list of the current exchange rate of all supported
   * fiat currencies on Fluidcoins. If you provide both to and from query params,
   * we will return only that currency pair.
   * @param from base currency to convert from
   * @param to base currency to convert to
   */
  getFiatRate(from?: string, to?: string): Promise<any | undefined>;

  /**
   * Fetches a List customers of customers
   * @param blacklist Fetch only blacklisted customers
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 10 items
   */
  getCustomers(
    blacklist?: boolean,
    page?: number,
    per_page?: number
  ): Promise<any | undefined>;

  /**
   * @param data CustomerData
   * @param data.email The email of the customer
   * @param data.full_name The full name of the customer
   * @param data.phone The phone object
   * @param data.phone.code The country code of the customer eg NG
   * @param data.phone.phone The phone number of the customer eg 09090909090
   */
  createNewCustomer(data: CreateCustomerData): Promise<any | undefined>;

  /**
   * Fetch a customer
   * @param reference Customer unique identifier. E.g CUS_xyz
   */
  getCustomer(reference: string): Promise<any | undefined>;

  /**
   * Edit a customer
   * @param reference Customer unique identifier. E.g CUS_xyz
   * @param data customer data
   * @param data.email The email of the customer
   * @param data.full_name The full name of the customer
   * @param data.phone The phone object
   * @param data.phone.code The country code of the customer eg NG
   * @param data.phone.phone The phone number of the customer eg 09090909090
   */
  editCustomer(reference: string, data: CustomerData): Promise<any | undefined>;

  /**
   * Whitelists a customer
   * @param reference Customer unique identifier. E.g CUS_xyz
   */
  whiteListCustomer(reference: string): Promise<any | undefined>;

  /**
   * Blacklists a customer
   * @param reference Customer unique identifier. E.g CUS_xyz
   */
  blackListCustomer(reference: string): Promise<any | undefined>;

  /**
   * Fetches a List of transactions that belong to a specific customer
   * @param reference Customer unique identifier. E.g CUS_xyz
   * @param status The status of the transaction
   */
  getCustomerTransactions(
    reference: string,
    status?: Status
  ): Promise<any | undefined>;

  /**
   * Fetches a List payment of links
   * @param status filter results by the status of the links Can either be disabled or enabled
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number of results per page. Defaults to 10
   */
  getPaymentLinks(
    status?: "disabled" | "enabled",
    page?: number,
    per_page?: number
  ): Promise<any | undefined>;

  /**
   * Create a new payment link
   * @param data PaymentData
   * @param data.amount Amount in kobo/cents
   * @param data.description The description of the payment link
   * @param data.title The title of the payment link
   * @param data.collect_phone_number CollectPhoneNumber set to true will request
   * for the phone number of the customer (defaults to false)
   * @param data.currency Currency denotes the currency this payment link
   * should be denoted in supported: USD, NGN. Will default to NGN
   * @param data.disable_after_payment DisableAfterPayment set to true will disable
   * this payment link after the first successful payment (defaults to false)
   */
  createNewPaymentLink(data: CreatePaymentData): Promise<any | undefined>;

  /**
   * Fetchs a payment link
   * @param reference Link unique identifier eg LINK_rkK
   */
  getSinglePaymentLink(reference: string): Promise<any | undefined>;

  /**
   * Edits a payment link
   * @param reference Link unique identifier eg LINK_rkK
   * @param data The data to be sent
   */
  editPaymentLink(
    reference: string,
    data: PaymentData
  ): Promise<any | undefined>;

  /**
   * Disables a payment link for collection
   * @param reference payment Link unique identifier eg LINK_rkK
   */
  disablePaymentLink(reference: string): Promise<any | undefined>;

  /**
   * Enables a payment link for collection
   * @param reference payment Link unique identifier eg LINK_rkK
   */
  enablePaymentLink(reference: string): Promise<any | undefined>;

  /**
   * Fetches a List of transactions that belong to a payment link
   * @param reference Link unique identifier eg LINK_rkK
   */
  getPaymentLinkTransactions(reference: string): Promise<any | undefined>;

  /**
   * Fetches the current merchant
   */
  getCurrentMerchant(): Promise<any | undefined>;

  /**
   * Fetches a List of payouts
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 20 items
   */
  getPayouts(page?: number, per_page?: number): Promise<any | undefined>;

  /**
   * Request for a payout
   * @param amount Amount to be sent to the recipient.
   * Please note that this is shouldvbe in the currency's lowest denomination.
   * 1,000 Naira would be 100000 while 1 BTC would be 100 million satoshis
   * The currency is automatically retrieved from the payout account, PAY_ACCT_XYZ
   * @param recipient The reference of the payout account
   */
  requestNewPayout(amount: number, recipient: string): Promise<any | undefined>;
  /**
   * Fetches a List of payouts accounts
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 20 items
   */
  getPayoutAccounts(page?: number, per_page?: number): Promise<any | undefined>;

  /**
   * Creates a new payout account with either bank or crypto
   * @param data PayoutAccountData
   * @param data.bank The bank object
   * @param data.bank.account_number - The account number
   * @param data.bank.bank_code - The bank code
   * @param data.crypto The crypto object
   * @param data.crypto.address - The crypto address
   * @param data.crypto.label - The identifier eg. recipient name
   * @param data.crypto.network - erc20,trc20,bep20 and others
   * @param data.currency The currency type only
   */
  createNewPayoutAccount(data: PayoutAccountData): Promise<any | undefined>;

  /**
   * Fetches a List of banks
   * @param country The country code
   */
  getBanks(country?: string): Promise<any | undefined>;

  //  /**
  //   * Resolves bank accounts
  //   * @param bank_code Sort code of the bank
  //   * @param account Bank account number
  //   */
  //  resolveBankAccount(bank_code: string, account: string): Promise<any | undefined>

  /**
   * Cancels a payout
   * @param reference payout unique identifier. E.g Payout_xx
   */
  cancelPayout(reference: string): Promise<any | undefined>;

  /**
   * Fetches the details of a payout
   * @param reference payout unique identifier. E.g Payout_xx
   */
  getPayoutDetails(reference: string): Promise<any | undefined>;

  /**
   * Fetches swap history
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 20 items
   */
  getSwapHistory(page: number, per_page: number): Promise<any | undefined>;

  //  /**
  //   * Swap currencies
  //   * @param amount  Non zero amount and must be in the smallest unit of the From currency
  //   * @param from from currency
  //   * @param to to currency
  //   */
  //  swapCurrencies(amount:number, from: string, to: string): Promise<any | undefined>

  /**
   * Fetches a List payment of links
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number of results per page. Defaults to 20
   * @param status filter results by the status of the links Can either be success, failed or pending
   */
  getAllTransactions(
    status?: Status,
    page?: number,
    per_page?: number
  ): Promise<any | undefined>;

  /**
   * Fetches a single transaction
   * @param reference Unique ID for the transaction eg (TRANS_qgc)
   */
  getSingleTransaction(reference: string): Promise<any | undefined>;
}

export default FluidCoins;

