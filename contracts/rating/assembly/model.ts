import { AccountId } from "../../utils";

@nearBindgen
export class RatingToken {
  constructor(
    public id: string,
    public grantor: AccountId,
    public grantee: AccountId,
    public comment: string,
    public rating: u8,
    // grantDate: i64
  ){}
}
