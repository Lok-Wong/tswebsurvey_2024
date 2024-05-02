'use client'
import Image from "next/image";
import styles from "./page.module.css";
import * as React from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Vcode from 'react-vcode';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
export default function Home() {
  const router = useRouter()
  const [vCode, setVCode] = React.useState()
  const [inputVcode, setInputVcode] = React.useState()
  const [openAlertBar, setOpenAlertBar] = React.useState(false)
  const [vCodeError,setVCodeError] = React.useState(false)
  const [survey, setSurvey] = React.useState({
    weclomePage : {
      startTime : 999,
      ip : 999,
      uuid : 999,
    }
  })

  const [ip, setIP] = React.useState("");

  const enterToNext = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (!inputVcode){
        handleAlertBarOpen()
        setVCodeError("未填寫驗證碼哦！")
        return
      }
  
      if (vCode != inputVcode){
        handleAlertBarOpen()
        setVCodeError("驗證碼錯誤哦！")
        return
      }
  
      setSurvey((prevState) => ({
        ...prevState,
        weclomePage:{
          ...prevState.weclomePage,
          ip:ip,
          uuid : uuidv4(),
          startTime : new Date(),
        }
      }))
      sessionStorage.setItem('pathList',window.location.pathname)

      router.push('/surveyMain')
    }
  }
  
  
  async function handleNextButton(event) {
    if (!inputVcode){
      handleAlertBarOpen()
      setVCodeError("未填寫驗證碼哦！")
      return
    }

    if (vCode != inputVcode){
      handleAlertBarOpen()
      setVCodeError("驗證碼錯誤哦！")
      return
    }

    setSurvey((prevState) => ({
      ...prevState,
      weclomePage:{
        ...prevState.weclomePage,
        ip:ip,
        uuid : uuidv4(),
        startTime : new Date(),
      }
    }))
    if (event.target.name == "next"){
      sessionStorage.setItem('pathList',window.location.pathname)

      router.push('/surveyMain')
      return
      }

    if (event.target.name == "Testing"){
      sessionStorage.setItem('pathList',window.location.pathname)

      router.push('/mapTesting')
      return
      }
  }

  const handleAlertBarOpen = () => {
    setOpenAlertBar(true);
  };

  const handleAlertBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertBar(false);
  };

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };

  React.useEffect(() => {
    getData()
    sessionStorage.setItem("home",JSON.stringify(survey))
  },[ip,survey]);



  return (
    <main className={styles.main}>
        <div className={styles.description}>
          <p>
            tsWebSurvey2024_V0.7
          </p>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/ts2024Logo.jpeg"
                alt="ts2024 Logo"
                className={styles.vercelLogo}
                width={120}
                height={34}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.startLetter}>
          <a className={styles.letterText}>
            親愛的先生／女士，您好：<br /><br />
            　　歡迎您參加『澳門線上學生出行調查』。這次調查的主要目的是想了解澳門中小學及幼兒園學生的出行習慣，以及使用交通服務的情况。您的寶貴資料和意見對這個研究非常重要，同時對學校周邊交通建設和澳門未來的交通規劃、管理、改善都有非常大的幫助。問卷填寫每人約只需要用五分鐘的時間，懇請您抽空作答。您所填寫的個人資料只會用於研究分析，絕不對外公開，請您安心回答。感謝閣下的支持與協助。
    　　    <br /><br />敬祝您　　身體健康
          </a>
          <a>
            <br />
          </a>
          <div className={styles.startTextcompany}>
            <a >
            <br />
              執行單位：澳大創科有限公司
              {}
            </a>
          </div>
        </div>

        <div className={styles.verifyBlock}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '8rem' },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField 
              error = {vCodeError}
              sx={{backgroundColor:"white"}} 
              id="verify_textField" 
              label="驗證碼" 
              onChange={(event) => {
                setInputVcode(event.target.value)
              }}
              onKeyDown={(event) => {enterToNext(event)}}
              />
          </Box>
          <div>
            <Vcode
              id = "1"
              length={4}
              onChange={(v) => {setVCode(v)}}
              options={{ codes: [ "Q",	"W",	"E",	"R",	"T",	"Y",	"U",	"I",	"P",	"A",	"S",	"D",	"F",	"G",	"H",	"J",	"K",	"L",	"Z",	"X",	"C",	"V",	"B",	"N",	"M",	"1",	"2",	"3",	"4",	"5",	"6",	"7",	"8",	"9", ] }}
            />
            <p style={{fontSize : "12px",color:"#000000"}}>
              按一下圖片更新驗證碼
            </p>
          </div>
        </div>

        <div>
          <Button 
            name="next"
            onKeyDown={(event) => {enterToNext(event)}}
            onClick={(event)=>{handleNextButton(event)}}>
            下一頁
          </Button>
          <Button type="button" 
            name="Testing"
            onClick={(event)=>{handleNextButton(event)}}>
            Map testin
          </Button>
        </div>      

        <Snackbar open={openAlertBar} autoHideDuration={6000} onClose={handleAlertBarClose}>
          <Alert
            onClose={handleAlertBarClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {vCodeError}
          </Alert>
      </Snackbar>
    </main>
  );
}
