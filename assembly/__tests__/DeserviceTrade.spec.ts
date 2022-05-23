import { addTask, getMessageTasks } from '../main';
import { TaskMessage, tasks } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createMessage(task: string,deadline: Date): TaskMessage {
  return new TaskMessage(task,deadline);
}

const message = createMessage('hello world',new Date(1653306156881));

describe('message tests', () => {
  afterEach(() => {
    while(tasks.length > 0) {
      tasks.pop();
    }
  });

  it('adds a message', () => {
    addTask('hello world',new Date(1653306156881));
    expect(tasks.length).toBe(
      1,
      'should only contain one message'
    );
    expect(tasks[0]).toStrictEqual(
      message,
      'message should be "hello world"'
    );
  });

  it('adds a payment message', () => {
    VMContext.setAttached_deposit(u128.from('10000000000000000000000'));
    addTask('hello world',new Date(1653306156881));
    const messageAR = getMessageTasks();
    expect(messageAR[0].payment).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves tasks', () => {
    addTask('hello world',new Date(1653306156881));
    const messagesArr = getMessageTasks();
    expect(messagesArr.length).toBe(
      1,
      'should be one message'
    );
    expect(messagesArr).toIncludeEqual(
      message,
      'tasks should include:\n' + message.toJSON()
    );
  });

  it('only show the last 10 tasks', () => {
    addTask('hello world',new Date(1653306156881));
    const newMessages: TaskMessage[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'message #' + i.toString();
      newMessages.push(createMessage(text,new Date(1653306156881)));
      addTask(text,new Date(1653306156881));
    }
    const tasks = getMessageTasks();
    log(tasks.slice(7, 10));
    expect(tasks).toStrictEqual(
      newMessages,
      'should be the last ten tasks'
    );
    expect(tasks).not.toIncludeEqual(
      message,
      'shouldn\'t contain the first element'
    );
  });
});

describe('attached deposit tests', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(u128.fromString('0'));
    VMContext.setAccount_balance(u128.fromString('0'));
  });

  it('attaches a deposit to a contract call', () => {
    log('Initial account balance: ' + Context.accountBalance.toString());

    addTask('hello world',new Date(1653306156881));
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
