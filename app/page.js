"use client";
import styles from "./page.module.css";
import Link from 'next/link'
import React from "react";
import { Button, Card, Input, Radio, Space, ConfigProvider, Result, Typography, Form, Steps, Divider, Checkbox, Col, Row, Modal } from 'antd';
import { useEffect, useState } from "react";
import { data } from "./data";
import { dataPhase2 } from "./dataPhase2";
import { useRouter } from "next/router";
import { CloseCircleOutlined } from '@ant-design/icons';
import FormItem from "antd/es/form/FormItem";
const { Paragraph, Text } = Typography;

export default function Home() {
  const passwordsConnection = ["A@t7#b4", "!1KB2:0"]
  let [index,setIndex] = useState(0);
  let [question,setQuestion] = useState(data[index]);
  let [stars, setStars] = useState([]);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [password, setPassword] = useState('');
  let [performance, setPerformance] = useState('You Failed');
  let [secondPhase, setSecondPhase] = useState(false);
  let [validatePassword, setValidatePassword] = useState(false);
  let [phase, setPhase] = useState(0);
  let [modalMessage, setModalMessage] = useState('');
  let [connection, setConnection] = useState(0);
  let [firstCathegory, setFirstCathegory]  = useState(false);
  let [secondCathegory, setSecondCathegory]  = useState(false);
  let [thirdCathegory, setThirdCathegory]  = useState(false);
  let [forthCathegory, setForthCathegory] = useState(false);
  let [letter, setLetter] = useState(false);
  let [letterMessege, setLetterMessege] = useState('');
  let [popUpPassword, setPopUpPassword] = useState(false);
  let [validatePassword2, setValidatePassword2] = useState(false);
  let [cathegoriesConcluded, setCategoriesConcluded] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [value, setValue] = useState(null);
  const [cathegoryGlobal, setCathegoryGlobal] = useState()
  const minSelection = 4;
  let [maxSelection, setMaxSelection] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    if (connection===0 &&cathegoriesConcluded.length === 4) {
      setLetter(true);
      setLetterMessege("--. .---- / ..-. .---- / . .---- / -.. .---- / -.-. .---- / -.-. ..--- / -.-. ...-- / -.. ...-- / -.. ....- / -.. ..... / . ..... / ..-. ..... / ..-. -.... / ..-. --... / . --... / -.. --... / -.. -.... / -.-. -.... / -.-. ..... / -... ..... / -... ....- / .- ....-");
    }
    if (connection===1 &&cathegoriesConcluded.length === 4) {
      setLetter(true);
      setLetterMessege(".--- ..--- / .. ..--- / .... ..--- / --. ..--- / ..-. ..--- / ..-. ...-- / . ...-- / . ....- / . ..... / . -.... / . --... / -.. --... / -.-. --... / -.-. ---.. / -... ---.. / -... --... / -... -.... / -... ..... / -... ....- / .- ....-");
    }
    if (connection===2 &&cathegoriesConcluded.length ===4) {
      setLetter(true);
      setLetterMessege(".--- ----. / .. ----. / .... ----. / --. ----. / --. ---.. / ..-. ---.. / ..-. --...");
      setPhase(phase + 1);
      console.log("Finish");
    }
  };
  const letsValidatePassword = () => {
    setPopUpPassword(true);
  }

  const handelCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      if (selectedItems.length >= maxSelection){
        e.target.checked = false;
        setModalMessage(`Select 4 options!`);
        showModal();
        return;
      }
      setSelectedItems([...selectedItems, value]);
    } else{
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
  }

  const initializeConnections = (e) => {
    setSelectedItems([]);
    setLetter(false);
    setPopUpPassword(false);
    setLetterMessege('');
    setValidatePassword2(false);
    setConnection(connection + 1);
    setCategoriesConcluded([]);
    setCathegoryGlobal(0);
    setFirstCathegory(false);
    setSecondCathegory(false);
    setThirdCathegory(false);
    setForthCathegory(false);
  }
  const handleSubmit = (e) => {
    let status = true;
    e.preventDefault();
    if (selectedItems.length < minSelection) {
      setModalMessage(`Select 4 options!`);
      showModal();
      // alert(`Please select ${minSelection} options.`);
    }
    else {
      let previousCathegory = "";
      let cathegoryNumber = 0;
      for (let i = 0; i < selectedItems.length; i++) {
        let cathegory = "";
        for (let j = 1; j < 5; j++){
          if (dataPhase2[connection][j].includes(selectedItems[i])){
            cathegory = dataPhase2[connection][j][0];
            cathegoryNumber = j;
          }
        }
        if (i === 0) {
           previousCathegory = cathegory;
        }
        console.log(`Item checked: ${selectedItems[i]} \n Cathegory: ${cathegory} \n Previous Cathegory ${previousCathegory}`);
        if(cathegory !== previousCathegory){
          status = false;
          {break};
        }
      }
      if(status === true){
        setCathegoryGlobal(cathegoryNumber);
        setModalMessage(`Congratulations, you completed the thread ${previousCathegory}!`);
        setSelectedItems([]);
        setMaxSelection(maxSelection * 4);
        if (cathegoryNumber === 1) {
          setFirstCathegory(true);
          cathegoriesConcluded.push(1);
        } else if (cathegoryNumber === 2) {
          setSecondCathegory(true);
          cathegoriesConcluded.push(2);
        } else if (cathegoryNumber === 3) {
          setThirdCathegory(true);
          cathegoriesConcluded.push(3);
        } else if (cathegoryNumber === 4) {
          setForthCathegory(true);
          cathegoriesConcluded.push(4);
        }
      }
      else {
        setModalMessage('Sorry, try again!');
      }
      showModal();
      console.log(status);
      console.log(cathegoryNumber);
    }
  }


  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const onFinish = (values) => {
    setValidatePassword(true);
    console.log('Success', values);
  };
  const onFinish2 = (values) => {
    setValidatePassword2(true);
    initializeConnections()
    console.log('Success', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const checkAns = (e, ans) => {
    if (question.ans===ans) {
      e.target.classList.add("correct");
      setScore(prev=>prev+1)
    }
    else{
      e.target.classList.add("wrong");
    }
  }

  const nextPhase = () => {
    setPhase(phase + 1);
    setSecondPhase(true);
  }
  
  const reload = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setResult(false);
    setValue(null);
    setPassword('');
    setPerformance('You Failed')
  }

  function generatePass() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);
 
        pass += str.charAt(char)
    }
 
    setPassword(pass);
}

  const next = () => {
    if(index === data.length - 1){
      if (score/data.length>0.8){
        setPerformance('You passed to the next phase!')
        generatePass();
      }
      setResult(true);
      return 0;
    }
    setIndex(++index);
    setValue(null);
    setQuestion(data[index]);
  }

  useEffect(()=> { 
    let sstars = [];
    let height = window.innerHeight;
    let width = window.innerWidth;
    let minBlur = 0.2;
    let maxBlur = 2;
    
    for (let i = 0; i < 200; i++) {
      let blur = (minBlur + (Math.random() * (maxBlur - minBlur))) + "px";
      sstars.push(<div style={{top:Math.random() * height, left: Math.random() * width, filter: "blur(" + blur + ")"}} className={styles.star}></div>);
    }
    setStars(sstars);
  }, []) 


  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <ConfigProvider
          theme={{
            components: {
              Steps: {
                colorPrimary: '#DB4C77',
                algorithm: true, // Enable algorithm
              }
            },
          }}
        >
          <Steps
          progressDot
          current={phase}
          items={[
            {
              title: 'Phase 1',
              description: 'Trivia Game',
            },
            {
              title: 'Phase 2',
              description: 'Connections',
            },
            {
              title: 'Finish',
              description: 'Prizes and gifts',
            },
          ]}
          />
          <Divider />
        </ConfigProvider>
      </div>
      <div className={styles.main}>
        {result?<></>:<>
        <h1>Trivia</h1>
          <Card className={styles.card} title={question.question} hoverable>
            <Radio.Group onChange={(event)=>{setValue(event.target.value)}} value={value} optionType='button' size="large">
              <ConfigProvider
                theme={{
                  components: {
                    Radio: {
                      colorPrimary: '#DB4C77',
                      algorithm: true, // Enable algorithm
                    }
                  },
                }}
              >
                <Space direction="vertical">
                  <Radio.Button className={styles.options} onClick={(e)=>{checkAns(e,1)}} value={1}>{question.option1}</Radio.Button>
                  <Radio.Button className={styles.options} onClick={(e)=>{checkAns(e,2)}} value={2}>{question.option2}</Radio.Button>
                  <Radio.Button className={styles.options} onClick={(e)=>{checkAns(e,3)}} value={3}>{question.option3}</Radio.Button>
                  <Radio.Button className={styles.options} onClick={(e)=>{checkAns(e,4)}} value={4}>{question.option4}</Radio.Button>
                </Space>
              </ConfigProvider>
            </Radio.Group>
            <div className={styles.cardBody}>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: '#DB4C77',
                      algorithm: true, // Enable algorithm
                    },
                  },
                }}
              >
                <Space>
                <Button className={styles.button} onClick={next} type="primary" size="large">Next</Button>
                </Space>
              </ConfigProvider>
              <div className={styles.section}>{index+1} of {data.length} questions</div>
            </div>
          </Card>
        </>}
        {result&&(!secondPhase)&&(!validatePassword)?<>
          <Card className={styles.triviaResult} title={performance} hoverable>
            <div className={styles.section}>Socore: {score} out of {data.length}</div>
            {score/data.length>0.8?<>
              <Result
                status="success"
                title={password}
                subTitle="Use the password above to access the next game!" 
                extra={[
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: '#DB4C77',
                        algorithm: true, // Enable algorithm
                      },
                    },
                  }}
                >
                  <Space><Button key="buy" onClick={nextPhase} className={styles.nextButton} type="primary" size="large">Next Game!</Button></Space>
                </ConfigProvider>
                ]}
              />    
            </>:<>
              <Result
                status="error"
                subTitle="You did't pass to next phase. Try again!"
                extra={[
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: '#DB4C77',
                          algorithm: true, // Enable algorithm
                        },
                      },
                    }}
                  >
                  <Space><Button key="buy" onClick={reload} className={styles.nextButton} type="primary" size="large">Play again</Button></Space>
                  </ConfigProvider>
                ]}
              >
              </Result>
            </>}
          </Card></>:<>
            {secondPhase&&(!validatePassword)?<>
              <div className={styles.mainPhase2}>
                <Card className={styles.cardPhase2} title="Welcome to Connections!" hoverable>
                  <Form
                    name="basic"
                    labelCol={{
                    span: 8,

                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <ConfigProvider
                      theme={{
                        components: {
                          Input: {
                            colorPrimary: '#DB4C77',
                            algorithm: true, // Enable algorithm
                          },
                        },
                      }}
                    >
                      <Space>
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                            required: true,
                            message: 'Please input your password!',
                            },
                            () => ({
                              validator(_, value) {
                                if (value === password) {
                                  return Promise.resolve();
                                }
                                return Promise.reject("This password is not authorized!");
                              },
                            }),
                          ]}
                          hasFeedback
                        >
                          <Input.Password />
                        </Form.Item>
                      </Space>
                    </ConfigProvider>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: '#DB4C77',
                            algorithm: true, // Enable algorithm
                          },
                        },
                      }}
                    >
                      <Space className={styles.hello}>
                        <Form.Item>
                          <Button className={styles.buttonPhase2} type="primary" htmlType="submit"> 
                            Submit
                          </Button>
                        </Form.Item>
                      </Space>
                    </ConfigProvider>
                  </Form>
                </Card>
              </div>
            </>:<>
            {validatePassword&&!letter?<>
              <h1>Connections</h1>
              <Card className={styles.connections} title="Group words that share a common thread">
                  <Checkbox.Group
                    style={{
                      width: '104%',
                    }}
                    onChange={onChange}
                  >
                    <ConfigProvider
                      theme={{
                        components: {
                          Checkbox: {
                            colorPrimary: '#DB4C77',
                            algorithm: true, // Enable algorithm
                          }
                        },
                      }}
                    ><Space>
                    <Row>
                      <Col span={6}>
                        {cathegoryGlobal === 2 || secondCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][2][3]}>{dataPhase2[connection][2][3]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][2][3]}>{dataPhase2[connection][2][3]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 4|| forthCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][4][4]}>{dataPhase2[connection][4][4]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][4][4]}>{dataPhase2[connection][4][4]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 3|| thirdCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][3][1]}>{dataPhase2[connection][3][1]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][3][1]}>{dataPhase2[connection][3][1]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 1 || firstCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][1][3]}>{dataPhase2[connection][1][3]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][1][3]}>{dataPhase2[connection][1][3]}</Checkbox>
                        </>}
                      </Col>
                      <Divider className={styles.diivider}/>
                      <Col span={6}>
                        {cathegoryGlobal === 1 || firstCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][1][1]}>{dataPhase2[connection][1][1]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} size="large" value={dataPhase2[connection][1][1]}>{dataPhase2[connection][1][1]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 4|| forthCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][4][2]}>{dataPhase2[connection][4][2]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][4][2]}>{dataPhase2[connection][4][2]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 3 || thirdCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][3][3]}>{dataPhase2[connection][3][3]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][3][3]}>{dataPhase2[connection][3][3]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 1 || firstCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][1][4]}>{dataPhase2[connection][1][4]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][1][4]}>{dataPhase2[connection][1][4]}</Checkbox>
                        </>}
                      </Col>
                      <Divider />
                      <Col span={6}>
                        {cathegoryGlobal === 2 || secondCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][2][2]}>{dataPhase2[connection][2][2]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][2][2]}>{dataPhase2[connection][2][2]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 1 || firstCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][1][2]}>{dataPhase2[connection][1][2]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][1][2]}>{dataPhase2[connection][1][2]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 4|| forthCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][4][1]}>{dataPhase2[connection][4][1]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][4][1]}>{dataPhase2[connection][4][1]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 2 || secondCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][2][1]}>{dataPhase2[connection][2][1]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][2][1]}>{dataPhase2[connection][2][1]}</Checkbox>
                        </>}
                      </Col>
                      <Divider />
                      <Col span={6}>
                        {cathegoryGlobal === 3 || thirdCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][3][2]}>{dataPhase2[connection][3][2]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][3][2]}>{dataPhase2[connection][3][2]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 4|| forthCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][4][3]}>{dataPhase2[connection][4][3]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][4][3]}>{dataPhase2[connection][4][3]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 2 || secondCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][2][4]}>{dataPhase2[connection][2][4]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][2][4]}>{dataPhase2[connection][2][4]}</Checkbox>
                        </>}
                      </Col>
                      <Col span={6}>
                        {cathegoryGlobal === 3 || thirdCathegory?<>
                          <Checkbox onChange={handelCheckboxChange} disabled value={dataPhase2[connection][3][4]}>{dataPhase2[connection][3][4]}</Checkbox>
                        </>:<>
                          <Checkbox onChange={handelCheckboxChange} value={dataPhase2[connection][3][4]}>{dataPhase2[connection][3][4]}</Checkbox>
                        </>}
                      </Col>
                    </Row>
                    </Space>
                    </ConfigProvider>
                  </Checkbox.Group>
                  <div className={styles.cardBody}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: '#DB4C77',
                          algorithm: true, // Enable algorithm
                        },
                      },
                    }}
                  >
                    <Space>
                    <Button className={styles.buttonConnections} onClick={handleSubmit} type="primary" htmlType="submit"> 
                      Submit
                    </Button>
                    </Space>
                  </ConfigProvider>
                </div>
                <Modal title={modalMessage} open={isModalOpen} onOk={handleOk} footer={[
                  <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: '#DB4C77',
                        algorithm: true, // Enable algorithm
                      },
                    },
                  }}
                >
                  <Space>
                  <Button key="submit" type="primary" onClick={handleOk}>
                    Ok
                  </Button>,
                  </Space>
                  </ConfigProvider>
                ]} >
                </Modal>
              </Card>
            </>:<>
              {validatePassword&&!popUpPassword?<>
                {phase===2?<>
                  <h1>Morse Code time:</h1>
                  <Card className={styles.connections} title="You Completed the Connections Game, good luck on your last treasure hunt!">
                    <p>{letterMessege}</p>
                    <Card className={styles.finish}><h1>I love you!</h1></Card>
                  </Card>
                </>:<>
                  <h1>Morse Code time:</h1>
                  <Card className={styles.connections} title="Use this to find your tresure!">
                    <p>{letterMessege}</p>
                    <div  className={styles.cardBody}>
                    <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: '#DB4C77',
                          algorithm: true, // Enable algorithm
                        },
                      },
                    }}
                  >
                    <Space>
                    <Button className={styles.buttonConnections} type="primary" onClick={letsValidatePassword}> 
                      Next
                    </Button>
                    </Space>
                  </ConfigProvider>
                  </div>
                  </Card>
                </>}
              </>:<>
              {validatePassword&&popUpPassword&&!validatePassword2?<>
              <Card className={styles.cardPhase2} title="Input password found on the letter!" hoverable>
                  <Form
                    name="basic"
                    labelCol={{
                    span: 8,

                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish2}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <ConfigProvider
                      theme={{
                        components: {
                          Input: {
                            colorPrimary: '#DB4C77',
                            algorithm: true, // Enable algorithm
                          },
                        },
                      }}
                    >
                      <Space>
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                            required: true,
                            message: 'Please input your password!',
                            },
                            () => ({
                              validator(_, value) {
                                if (value === passwordsConnection[connection]) {
                                  return Promise.resolve();
                                }
                                return Promise.reject("This password is not authorized!");
                              },
                            }),
                          ]}
                          hasFeedback
                        >
                          <Input.Password />
                        </Form.Item>
                      </Space>
                    </ConfigProvider>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: '#DB4C77',
                            algorithm: true, // Enable algorithm
                          },
                        },
                      }}
                    >
                      <Space className={styles.hello}>
                        <Form.Item>
                          <Button className={styles.buttonPhase2} type="primary" htmlType="submit" onClick={()=>{initializeConnections()}}> 
                            Submit
                          </Button>
                        </Form.Item>
                      </Space>
                    </ConfigProvider>
                  </Form>
                </Card>
                </>:<></>}
              </>}
            </>}
            </>}
          </>}
      </div>
    </div>
  );
}
