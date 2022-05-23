import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import TaskList from './components/TaskList';
import Rating from './components/Rating';

import ApplyList from './components/ApplyList';

import { Button, Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [tasks, setMessages] = useState([]);
  const [selectMenu, setSelectMenu] = useState('1');

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getMessageTasks().then(setMessages);
  }, []);

  const onSubmit = (values) => {
    debugger
//     deadline: "2022-05-23"
// key: "aaa"
// name: "aaa"
// payment: 1
    const { task, deadline, payment } = values;

 
    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract
      .addTask(
        { task:task,deadline:Date.parse(deadline).valueOf() },
        BOATLOAD_OF_GAS,
        Big(payment || '0')
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        contract.getMessageTasks().then((tasks) => {
          setMessages(tasks);
        
        });
      });
  };

  const signIn = () => {
    wallet.requestSignIn(
      { contractId: nearConfig.contractName, methodNames: [contract.addTask.name] }, //contract requesting access
      'NEAR Decentralized Service Transaction Platform', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    // eslint-disable-next-line no-undef
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const menuSelect = (e) => {
    setSelectMenu(e.key);
  };

  const menuList = [
    { key: 1, label: `Home` },
    { key: 2, label: `Task` },
    { key: 3, label: `Rate` },
  ];

  return (
    // <main>
    //   <header>
    //     <h2>Decentralized Service Transaction Platform </h2>
    //     { currentUser
    //       ? <button onClick={signOut}>Log out</button>
    //       : <button onClick={signIn}>Log in</button>
    //     }
    //   </header>
    //   { currentUser
    //     ? <Form onSubmit={onSubmit} currentUser={currentUser} />
    //     : <SignIn/>
    //   }
    //   { !!currentUser && !!tasks.length && <Messages tasks={tasks}/> }
    // </main>

    <Layout className="layout">
      <Header>
        {/* <div className="logo">Deservice Trade</div> */}
        <div className="logo">智慧楼宇</div>
        <Menu
          theme="dark"
          style={{ float: 'left' }}
          mode="horizontal"
          defaultSelectedKeys={['1']}
          onSelect={menuSelect}
          items={menuList}
        />
        <div className="right">
          {currentUser ? (
            <>
              {currentUser.accountId}
              <Button style={{ marginLeft: '20px' }} onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={signIn}>Login</Button>
          )}
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          {selectMenu == '1' ? <TaskList tasks={tasks} onSubmit={onSubmit}></TaskList> : ''}
          {selectMenu == '2' ? <ApplyList></ApplyList> : ''}
          {selectMenu == '3' ? <Rating></Rating> : ''}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2022 </Footer>
    </Layout>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addTask: PropTypes.func.isRequired,
    getMessageTasks: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
