/**
 * Stands in for the Workers runtime's `cloudflare:email` module, which only
 * exists inside a Worker, so unit tests can read the message a Worker sends.
 */
export class EmailMessage {
  constructor(
    readonly from: string,
    readonly to: string,
    readonly raw: string,
  ) {}
}
