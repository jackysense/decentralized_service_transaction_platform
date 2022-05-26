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

const App = ({ contract,contract2, currentUser, nearConfig, wallet }) => {
  const [tasks, setMessages] = useState([]);
  const [selectMenu, setSelectMenu] = useState('1');
  const [applicants, setApplicants] = useState([]);
  const [receiver,setReceiver] = useState('');

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getTasks().then(setMessages);
  }, []);

  const onAddTask = (values) => {
    const { task, deadline, payment } = values;
    contract
      .addTask(
        { text: task, deadline: Date.parse(deadline).valueOf().toString() },
        BOATLOAD_OF_GAS,
        Big(payment || '0')
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        contract.getTasks().then((tasks) => {
          setMessages(tasks);
        });
      });
  };

  const onApply = (index) => {
    contract
      .apply(
        { index },
        BOATLOAD_OF_GAS,
        Big('0')
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        contract.getTasks().then((tasks) => {
          setMessages(tasks);
        });
      });
  };

  const onAccept = (receiver) => {
   setReceiver(receiver);
   setSelectMenu('3');
  };

  const onPay = (values) => {
    const { rating, comment } = values;
    // {"index":3,"receiver":"jacky110.testnet","rating":5,"comment":"good"}
    contract
      .ratingAndTransfer(
        {"index":3,"receiver":receiver,"rating":rating,"comment":comment},
        BOATLOAD_OF_GAS,
        Big('0')
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        setReceiver('');
        setSelectMenu('1');
        contract.getTasks().then((tasks) => {
          setMessages(tasks);
        });
      });
   };
 
  



  useEffect(() => {
    contract.getTasks().then((tasks) => {
      const applies = [];
      
      setMessages(tasks);
      // const myTasks =  tasks.filter(item =>item.sender ==currentUser.accountId)
      tasks.forEach(item => {
        item.sender ==currentUser.accountId && item.applicants.forEach(item2 => {
          if (!applies.includes(item2)) {
            applies.push(item2)
          }
        })
      })
      

     
      const allPromis = applies.map(item=> contract2.getUserRatingTokens( { user:item }))
      Promise.all(allPromis).then(res=>{
        const average = arr=> arr.reduce((acc,v,i,a)=>(acc+v/a.length),0);
        const applyComments = applies.map((item,index)=>{
          return {
            key:index,
            name:item,
            description:(
                <p>
                  AVG Rate : {average(res[index].map(subItem=>subItem.rating)) }<br/>
                  {res[index].map((subItem ,subIndex)=> (<>Comment {subIndex+1}: {subItem.comment} <br /></>))}
                </p>
              )}
        })
        setApplicants(applyComments) ;
       
      })
    });
  }, []);


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
    // { key: 3, label: `Rate` },
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
    //     ? <Form onAddTask={onAddTask} currentUser={currentUser} />
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
          style={{ float: 'left',minWidth:'260px' }}
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
          {selectMenu == '1' ? <TaskList tasks={tasks} onApply={onApply} onAddTask={onAddTask}></TaskList> : ''}
          {selectMenu == '2' ? <ApplyList applicants={applicants} onAccept={onAccept} ></ApplyList> : ''}
          {receiver ? <Rating receiver={receiver} onPay={onPay}></Rating> : ''}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2022 </Footer>
    </Layout>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addTask: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    ratingAndTransfer: PropTypes.func.isRequired,
  }).isRequired,
  contract2: PropTypes.shape({
    getUserRatingTokens: PropTypes.func.isRequired,
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
