import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import TaskList from './components/TaskList';
import Rating from './components/Rating';

import ApplyList from './components/ApplyList'

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([]);
  const [selectMenu, setSelectMenu] = useState('1');

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getMessages().then(setMessages);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract
      .addMessage(
        { text: message.value },
        BOATLOAD_OF_GAS,
        Big(donation.value || '0')
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        contract.getMessages().then((messages) => {
          setMessages(messages);
          message.value = '';
          donation.value = SUGGESTED_DONATION;
          fieldset.disabled = false;
          message.focus();
        });
      });
  };

  const signIn = () => {
    wallet.requestSignIn(
      { contractId: nearConfig.contractName, methodNames: [contract.addMessage.name] }, //contract requesting access
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
  
  const menuSelect =(e)=>{
    setSelectMenu(e.key)
  }

  const menuList = [{ key: 1, label: `Home` },{ key: 2, label: `Task` },{ key: 3, label: `Rate` },];

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
    //   { !!currentUser && !!messages.length && <Messages messages={messages}/> }
    // </main>

    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          onSelect={menuSelect}
          items={menuList}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
        {selectMenu=="1"?<TaskList></TaskList>:''}  
        {selectMenu=="2"?<ApplyList></ApplyList>:''}  
        {selectMenu=="3"?<Rating></Rating>:''}  
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2022 </Footer>
    </Layout>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
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
