export interface AtpToken {
  /*
   * scope: Defines the specific permissions granted by the token. This field specifies the scope of access the token provides to the user or system.
   */
  readonly scope: string;
  /*
   * sub: The subject of the token, typically a user identifier or system component that the token represents.
   */
  readonly sub: string;
  /*
   * iat: Issued At Time. Represents the time at which the token was issued, expressed as a Unix timestamp.
   */
  readonly iat: number;
  /*
   * exp: Expiration Time. Indicates the Unix timestamp after which the token is no longer valid.
   */
  readonly exp: number;
  /*
   * aud: Audience. Specifies the intended recipient or group of recipients for the token. This is used to ensure that the token is being used by the intended party.
   */
  readonly aud: string;
}
