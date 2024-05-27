declare module '@everapi/currencyapi-js' {
  export default class CurrencyAPI {
    baseUrl: string
    headers: { apikey: string }

    constructor(apiKey?: string)

    call(endpoint: string, params?: Record<string, any>): Promise<any>

    status(): Promise<any>

    currencies(params: Record<string, any>): Promise<any>

    latest(params: Record<string, any>): Promise<any>

    historical(params: Record<string, any>): Promise<any>

    range(params: Record<string, any>): Promise<any>

    convert(params: Record<string, any>): Promise<any>
  }
}
