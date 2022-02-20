import { AxiosInstance } from "axios";

export type Status = 'success' | 'failed' | 'pending';

export type Country = 'NG'

export type Currency = 'USD' | 'NGN';

export type CryptoCodes = 'BTC' | 'USDT' | 'USDC' | 'ETH' | 'MATIC' | 'LTC'| 'DODGE' | 'XRP'
| 'XLM' | 'TRON' | 'BUSD' | 'BCH' | 'BNB'
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
  number?: string;
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

declare class  FluidCoins {
  public secretKey: string;
  private request: AxiosInstance

  constructor(secretKey: string)

  /**
   * Gets the list of address
   */
  getAddresses(): Promise<any | undefined>

  /**
   * Create a new address
   * @param code Code for the coin you want to generate an address for. e.g (XLM, USDC)
   * @param network erc20,trc20,bep20 and others
   */
  createNewAddress(code: CryptoCodes, network: string): Promise<any | undefined>

  /**
   * Fetches an address by its id
   * @param id address unique identifier
   */
  getSingleAddress(id: string): Promise<any | undefined>

  /**
   * Fetches List of transactions for a given address
   * @param id address unique identifier
   */
  getAddressTransactions(id: string): Promise<any | undefined>

  /**
   * Fetchs addresses for a specific coin
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 20 items
   * @param coin_id id of the coin to query data from.
   */
  getAddresses (page: number, per_page: number, coin_id?:string): Promise<any | undefined>

  /**
   * Create a new address
   * @param code Code for the coin you want to generate an address for. e.g (XLM, USDC)
   * @param network erc20,trc20,bep20 and others
   */
  createNewAddress(code: string, network: string): Promise<any | undefined>

  /**
   * Fetches an address by its id
   * @param id address unique identifier
   */
  getSingleAddress(id: string): Promise<any | undefined>

  /**
   * 
   * @param id address unique identifier
   * @param page Page to query data from. Defaults to 1
   * @param per_page Number to items to return. Defaults to 20 items
   */
  getAddressTransactions(id: string, page: number, per_page: number): Promise<any | undefined>

  /**
   * Fetches a List of all crypto deposits
   * @param page Page to query data from. Defaults to 1
   * @param per_page Per page number to query data from. Defaults to 20 items
   */
  getCryptoDeposits(page: number, per_page: number): Promise<any | undefined>

  /**
   * Fetch a single transaction that occurred on a given address
   * @param id transaction reference
   */
   getAddressSingleTransaction(id: string): Promise<any | undefined>

   /**
    * Fetches all balances of a merchant
    */
   getBalance(): Promise<any | undefined>

   /**
    * Fetches a List currencies
    * @param test_net_only Retrieve only coins that have a test-net network
    */
   getCurrencies(test_net_only?: boolean): Promise<any | undefined>

   /**
    * Fetch a list of the current exchange rate of all supported 
    * fiat currencies on Fluidcoins. If you provide both to and from query params, 
    * we will return only that currency pair.
    * @param from base currency to convert from
    * @param to base currency to convert to
    */
   getFiatRate(from?: string, to?: string): Promise<any | undefined>

   /**
    * Fetches a List customers of customers
    * @param page Page to query data from. Defaults to 1
    * @param per_page Number to items to return. Defaults to 10 items
    * @param blacklist Fetch only blacklisted customers
    */
   getCustomers(page: number, per_page: number, blacklist?: boolean): Promise<any | undefined>

   /**
    * 
    * @param email The email of the customer
    * @param full_name The full name of the customer
    * @param phone The phone object
    */
   createNewCustomer(email: string, full_name: string, phone: Required<Phone>): Promise<any | undefined>

   /**
    * Fetch a customer
    * @param id customer unique identifier
    */
   getCustomer(id: string): Promise<any | undefined>
   
   /**
    * Edit a customer
    * @param id customer unique identifier
    * @param data customer data
    */
   editCustomer(id: string, data: CustomerData): Promise<any | undefined>


   /**
    * Whitelists a customer
    * @param id Customer unique identifier
    */
   whiteListCustomer(id: string): Promise<any | undefined>

   /**
    * Blacklists a customer
    * @param id Customer unique identifier
    */
   blackListCustomer(id: string): Promise<any | undefined>

   /**
    * Fetches a List of transactions that belong to a specific customer
    * @param id customer unique identifier
    * @param status The status of the transaction
    */
   getCustomerTransactions(id: string, status: Status): Promise<any | undefined>

   /**
    * Fetches a List payment of links
    * @param page Page to query data from. Defaults to 1
    * @param per_page Number of results per page. Defaults to 10
    * @param status filter results by the status of the links Can either be disabled or enabled
    */
   getPaymentLinks(page: number, per_page: number, status: 'disabled' | 'enabled'): Promise<any | undefined>

   /**
    * Create a new payment link
    * @param amount Amount in kobo/cents
    * @param collect_phone_number CollectPhoneNumber set to true will request
    * for the phone number of the customer (defaults to false)
    * @param currency Currency denotes the currency this payment link
    * should be denoted in supported: USD, NGN. Will default to NGN
    * @param description The description of the payment link
    * @param disable_after_payment DisableAfterPayment set to true will disable
    * this payment link after the first successful payment (defaults to false)
    * @param title The title of the payment link
    */
   createNewPaymentLink(amount: number, collect_phone_number:boolean, currency: Currency, description:string, disable_after_payment: boolean, title: string): Promise<any | undefined>

   /**
    * Fetchs a payment link
    * @param id Link unique identifier
    */
   getSinglePaymentLink(id: string): Promise<any | undefined>

   /**
    * Edits a payment link
    * @param id Link unique identifier
    * @param data The data to be sent
    */
   editPaymentLink(id: string, data: PaymentData): Promise<any | undefined>

    /**
    * Disables a payment link for collection
    * @param id payment link unique identifier
    */
   disablePaymentLink(id: string): Promise<any | undefined>

    /**
    * Enables a payment link for collection
    * @param id payment link unique identifier
    */
   enablePaymentLink(id: string): Promise<any | undefined>

   /**
    * Fetches a List of transactions that belong to a payment link
    * @param id Link unique identifier
    */
   getPaymentLinkTransactions(id: string): Promise<any | undefined>

   /**
    * Fetches the current merchant
    */
   getCurrentMerchant(): Promise<any | undefined>

   /**
    * Fetches a List of payouts
    * @param page Page to query data from. Defaults to 1
    * @param per_page Number to items to return. Defaults to 20 items
    */
   getPayouts(page: number, per_page: number): Promise<any | undefined>

   /**
    * Request for a payout
    * @param amount Amount to be sent to the recipient.
    * Please note that this is shouldvbe in the currency's lowest denomination.
    * 1,000 Naira would be 100000 while 1 BTC would be 100 million satoshis
    * The currency is automatically retrieved from the payout account
    * @param recipient The reference of the payout account
    */
   requestNewPayout(amount: number, recipient: string): Promise<any | undefined>
   /**
    * Fetches a List of payouts accounts
    * @param page Page to query data from. Defaults to 1
    * @param per_page Number to items to return. Defaults to 20 items
    */
   getPayoutAccounts(page: number, per_page: number): Promise<any | undefined>

   /**
    * Creates a new payout account
    * @param bank The bank object
    * @param crypto The crypto object
    * @param currency The currency type only 'NGN' is supported
    */
   createNewPayoutAccount(bank: Bank, crypto: Crypto, currency: 'NGN') : Promise<any | undefined>

   /**
    * Fetches a List of banks
    * @param country The country code
    */
   getBanks(country: string): Promise<any | undefined>

   /**
    * Resolves bank accounts
    * @param bank_code Sort code of the bank
    * @param account Bank account number
    */
   resolveBankAccount(bank_code: string, account: string): Promise<any | undefined>

   /**
    * Cancels a payout
    * @param id Payout unique identifier
    */
   cancelPayout(id:string): Promise<any | undefined>

   /**
    * Fetches the details of a payout
    * @param id Payout unique identifier
    */
   getPayoutDetails(id:string) : Promise<any | undefined>

   /**
    * Fetches swap history
    * @param page Page to query data from. Defaults to 1
    * @param per_page Number to items to return. Defaults to 20 items
    */
   getSwapHistory(page: number, per_page: number): Promise<any | undefined>

   /**
    * Swap currencies
    * @param amount  Non zero amount and must be in the smallest unit of the From currency
    * @param from from currency
    * @param to to currency
    */
   swapCurrencies(amount:number, from: string, to: string): Promise<any | undefined>

   /**
    * Fetches a List payment of links
    * @param page Page to query data from. Defaults to 1
    * @param per_page Number of results per page. Defaults to 20
    * @param status filter results by the status of the links Can either be success, failed or pending
    */
   getAllTransactions(page: number, per_page: number, status: Status): Promise<>

   /**
    * Fetches a single transaction
    * @param id Unique ID for the transaction
    */
   getSingleTransaction(id: string): Promise <any | undefined>
}

export default  FluidCoins
