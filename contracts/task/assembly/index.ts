import { context, ContractPromiseBatch, ContractPromise } from "near-sdk-as";
import { PostedTask, postTasks, TokenArg } from './model';
import { AccountId } from "../../utils";

// --- contract code goes below

// The maximum number of latest tasks the contract returns.
const TASK_LIMIT = 10;

const TOKEN_CONTRACT_ACCOUNT = 'rating.testnet';

/**
 * Adds a new task under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addTask(text: string,deadline:string): void {
  // Creating a new task and populating fields with our data
  const task = new PostedTask(text,deadline);
  // Adding the message to end of the the persistent collection
  postTasks.push(task);
}

/**
 * Returns an array of last N tasks.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getTasks(): PostedTask[] {
  const numTasks = min(TASK_LIMIT, postTasks.length);
  const startIndex = postTasks.length - numTasks;
  const result = new Array<PostedTask>(numTasks);
  for(let i = 0; i < numTasks; i++) {
    result[i] = postTasks[i + startIndex];
  }
 
  return result;
}


export function apply(index: i32): void {
  assert(index < postTasks.length , "Task not exists");
  assert(!postTasks[index].finalApplicant  , "Task is Finished");
  assert(context.sender != postTasks[index].sender, "Can not apply yourself's task");  
  assert(!postTasks[index].applicants.includes(context.sender), "Can not apply twice");

  const task = postTasks[index];
  task.applicants.push(context.sender);
  postTasks[index]=task;
}


export function ratingAndTransfer(index:i32, receiver:AccountId, rating:u8, comment:string): void {
  assert(context.sender == postTasks[index].sender, "Only proposer can send!");
  assert(postTasks[index].applicants.includes(receiver), "Invalid receiver!");
  const task = postTasks[index];
  task.finalApplicant = receiver;
  postTasks[index]=task;

  const token_id = "comment_" + context.sender + "_" + receiver + "_" +  index.toString();
  const tokenArgs: TokenArg = {  token_id, grantee: receiver, text: comment, rating};
  //TODO sending deposit to receiver
  ContractPromise.create(
    TOKEN_CONTRACT_ACCOUNT, 
    'mint', // target method name
    tokenArgs.encode(), // target method arguments
    2_500_000_000_000 // gas attached to the call 2 428 115 526 258
    // projectBudget             // deposit attached to the call
  ); 
  ContractPromiseBatch.create(receiver).transfer(postTasks[index].balance);  
}
