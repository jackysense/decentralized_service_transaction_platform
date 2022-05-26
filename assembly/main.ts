import { TaskMessage, tasks } from './model';

// --- contract code goes below

// The maximum number of latest tasks the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addTask(task:string,deadline:number): void {
  // Creating a new message and populating fields with our data
  const message = new TaskMessage(task,deadline);
  // Adding the message to end of the persistent collection
  tasks.push(message);
}

/**
 * Returns an array of last N tasks.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessageTasks(): TaskMessage[] {
  const numMessages = min(MESSAGE_LIMIT, tasks.length);
  const startIndex = tasks.length - numMessages;
  const result = new Array<TaskMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = tasks[i + startIndex];
  }
  return result;
}
