// The Workers runtime's email module, which only exists inside a Worker. Its
// types are declared here rather than pulling in the whole Workers runtime's
// types, which clash with the browser's.
declare module "cloudflare:email" {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
    readonly from: string;
    readonly to: string;
  }
}
