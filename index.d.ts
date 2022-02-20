import { AxiosInstance } from "axios";

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
  createNewAddress(code: string, network: string): Promise<any | undefined>

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
  getAddresses (page: number, per_page: number, coin_id:string): Promise<any | undefined>

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
}

export default  FluidCoins
