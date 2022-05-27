import { context, u128, PersistentVector } from "near-sdk-as";
import { AccountId } from "../../utils";

/**
 * Exporting a new class PostedTask so it can be used outside of this file.
 */
@nearBindgen
export class PostedTask {
  balance: u128;
  sender: AccountId;
  finalApplicant: AccountId;
  applicants: Array<AccountId>;

  constructor(public task: string, public deadline: string) {
    this.balance = context.attachedDeposit;
    this.sender = context.sender;
    this.finalApplicant = "";
    this.applicants = new Array<AccountId>();
  }
}

@nearBindgen
export class TokenArg {
  token_id: string;
  grantee: AccountId;
  text: string;
  rating: u8;
}

/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const postTasks = new PersistentVector<PostedTask>("t");
