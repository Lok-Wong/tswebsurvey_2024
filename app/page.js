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
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { styled } from '@mui/material/styles';
import TranslateIcon from '@mui/icons-material/Translate';
import { useCookies } from "react-cookie";
import Link from "next/link";
import ConstructionIcon from '@mui/icons-material/Construction';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));


export default function Home() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [vCode, setVCode] = React.useState()
  const [inputVcode, setInputVcode] = React.useState()
  const [openAlertBar, setOpenAlertBar] = React.useState(false)
  const [vCodeError, setVCodeError] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)
  const [infoSaveChecked, setInfoSaveChecked] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['Csrf_tokens']);
  const [maintaining, setMaintaining] = React.useState(false);
  const [survey, setSurvey] = React.useState({
    startTime: 999,
    ip: 999,
    uuid: 999,
  })

  const uuid = uuidv4();


  const setCrsf = () => {
    setCookie('csrf_token', uuid, { path: '/' })
  }

  const [ip, setIP] = React.useState("");

  const enterToNext = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      // if (inputVcode === "67S7" || inputVcode === "67s7") {
      //   setSurvey((prevState) => ({
      //     ...prevState,
      //     ip: ip,
      //     uuid: uuid,
      //     startTime: new Date(),
      //   }))
      //   sessionStorage.setItem('pathList', window.location.pathname)
      //   setCrsf()
      //   sessionStorage.setItem('pathList', window.location.pathname)
      //   router.push('/surveyheadholder')
      //   return
      // } else {
      //   handleAlertBarOpen()
      //   setVCodeError("調查日期為：2024年9月16日 - 2024年9月30日")
      //   return
      // }

      if (!infoSaveChecked) {
        handleAlertBarOpen()
        setVCodeError("請先同意收集個人資料聲明")
        return
      }

      if (!inputVcode) {
        handleAlertBarOpen()
        setVCodeError("未填寫驗證碼！")
        return
      }



      if (vCode != inputVcode.toLocaleUpperCase()) {
        handleAlertBarOpen()
        setVCodeError("驗證碼錯誤！")
        return
      }

      setSurvey((prevState) => ({
        ...prevState,
        ip: ip,
        uuid: uuid,
        startTime: new Date(),
      }))
      sessionStorage.setItem('pathList', window.location.pathname)

      setCrsf()

      router.push('/surveyheadholder')
    }
  }


  async function handleNextButton(event) {
    setSurvey((prevState) => ({
      ...prevState,
      ip: ip,
      uuid: uuid,
      startTime: new Date(),
    }))
    setCrsf()
    // if (event.target.innerText == "倘") {
    //   sessionStorage.setItem('pathList', window.location.pathname)
    //   router.push('/surveyheadholder')
    //   return
    // }

    // if (inputVcode === "67S7" || inputVcode === "67s7") {
    //   sessionStorage.setItem('pathList', window.location.pathname)
    //   router.push('/surveyheadholder')
    //   return
    // } else {
    //   handleAlertBarOpen()
    //   setVCodeError("調查日期為：2024年9月16日 - 2024年9月30日")
    //   return
    // }

    if (!infoSaveChecked) {
      handleAlertBarOpen()
      setVCodeError("請先同意收集個人資料聲明")
      return
    }

    if (!inputVcode) {
      handleAlertBarOpen()
      setVCodeError("未填寫驗證碼！")
      return
    }

    if (vCode != inputVcode.toLocaleUpperCase()) {
      handleAlertBarOpen()
      setVCodeError("驗證碼錯誤！")
      return
    }



    setSurvey((prevState) => ({
      ...prevState,
      ip: ip,
      uuid: uuid,
      startTime: new Date(),
    }))
    setCrsf()

    if (event.target.name == "next") {
      sessionStorage.setItem('pathList', window.location.pathname)
      router.push('/surveyheadholder')
      return
    }

    if (event.target.name == "Testing") {
      sessionStorage.setItem('pathList', window.location.pathname)

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
    setIsClient(true)
    if (typeof window !== "undefined") {
      setCookie('jsEnabled', "true", { path: '/' })
    }
    sessionStorage.clear();
    window._AMapSecurityConfig = {
      securityJsCode: "5a70a60f476d153b9b6caa45864b605f",
    };
  }, [])


  React.useEffect(() => {
    getData()
    sessionStorage.setItem("home", JSON.stringify(survey))
  }, [ip, survey]);

  const actions = [
    { icon: <Link href="/">繁中</Link>, name: '繁中', },
    { icon: <Link href="/en">EN</Link>, name: 'English', },
    { icon: <Link href="/pt">PT</Link>, name: 'Português', },
  ];

  return (
    <main>
      {maintaining ?
        <div className={styles.main}>
          <div style={{ textAlign: 'center', lineHeight: "1.5" }}>
            <h1>調查結束</h1>
            <h1>Investigation ended</h1>
            <p>

             『澳門學生出行調查』線上進行的調查現已結束。此次調查旨在了解澳門非高等教育學生的出行習慣，並收集了相關數據和意見，以便更好地了解相關問題。

              我們感謝所有參與調查的家長和學生，您們的支持和合作對於我們的工作至關重要。
            </p>

            <p>
              The online survey regarding the Macau Students Travel Survey has concluded. The purpose of this survey was to understand the travel habits of non-higher education students in Macau and to collect relevant data and opinions in order to better understand the related issues.

              We would like to express our gratitude to all the parents and students who participated in the survey. Your support and cooperation are essential to our work.
            </p>
            {/* <ConstructionIcon sx={{ fontSize: 100 }} /> */}
          </div>
        </div>
        :
        <div className={styles.main}>
          <Box sx={{ position: "fixed", right: 0, bottom: 0, zIndex: 100 }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<TranslateIcon />}
              direction="left"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  to={action.to}
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </StyledSpeedDial>
          </Box>
          <div className={styles.description}>
            <p>
              V1.4
            </p>

            <div className={styles.imagecontenter}>
              <Image
                src="/mixed.png"
                alt="mixed Logo"
                width={350.75}
                height={95.875}
              // resizeMode="contain"
              />
            </div>
          </div>

          <div className={styles.startLetter}>
            <a className={styles.letterText}>
              親愛的家長/同學，您好：<br /><br />
              歡迎您參加『澳門學生出行調查』。這次調查的目的是想了解澳門非高等教育學生的出行習慣，以及您對上、放學出行的意見和建議。
              <br />
              <br />
              您的寶貴資料和意見非常重要。這份調查問卷只需五分鐘便可完成，所填寫的内容只會用於分析，絕不對外公開。您完成問卷後，若提供聯絡資料，將自動參與本次調查的抽獎活動，得獎者將會獲得文具禮券乙份。
              <br />
              <br />
              倘對本調查問卷有查詢，可於星期一至六早上十一時至晚上十時致電調查中心：<br />
              <br />
              63703082 <br />
              63703083 <br />
              63946045 <br /><br />

              或可電郵至：<br />
              umtec.TS2024@um.edu.mo<br />
              <br /><br />感謝您的支持與協助！
            </a>
            <a>
              <br />
            </a>
            <div className={styles.startTextcompany}>
              <a >
                <br />
                委託單位：交通事務局
                <br />
                協調單位：教育及青年發展局
                <br />
                執行單位：澳大創科有限公司


              </a>
            </div>
          </div>



          <div className={styles.block}>
            <div className={styles.signBlock}>

              <Checkbox
                checked={infoSaveChecked}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(event) => setInfoSaveChecked(event.target.checked)}
              />

              <p className={styles.letterText}>
                同意
                <span onClick={handleOpen} className={styles.linkText}>個人資料收集聲明</span>
              </p>

            </div>
            <div className={styles.verifyBlock}>
              <Box
                component="form"
                className={styles.verifyText}
                noValidate
                autoComplete="off"
              >

                <TextField
                  error={vCodeError}
                  sx={{ backgroundColor: "white" }}
                  id="verify_textField"
                  label="驗證碼"
                  inputProps={{ style: { textTransform: "uppercase" }, maxLength: 4 }}
                  onChange={(event) => {
                    setInputVcode(event.target.value)
                    console.log(event.target.value)
                  }}
                  onKeyDown={(event) => { enterToNext(event) }}
                />
              </Box>
              <div>
                <Vcode
                  id="1"
                  length={4}
                  onChange={(v) => { setVCode(v) }}
                  options={{ codes: ["Q", "W", "E", "R", "T", "Y", "U", "I", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "1", "2", "3", "4", "5", "6", "7", "8", "9",] }}
                />
                <p style={{ fontSize: "12px", color: "#000000" }}>
                  按一下圖片更新驗證碼
                </p>
              </div>
            </div>
          </div>

          <div className={styles.buttonDiv} >
            <Button
              className={styles.button}
              name="next"
              onKeyDown={(event) => { enterToNext(event) }}
              onClick={(event) => { handleNextButton(event) }}>
              下一頁
            </Button>
            {/* <Button type="button"
          name="Testing"
          onClick={(event) => { handleNextButton(event) }}>
          Map testin
        </Button>
        <Button onClick={handleOpen}>
          openModel
        </Button> */}
          </div>
          <noscript className={styles.noScriptBox}>
            <div className={styles.noScriptBoxText}>
              <p>你的瀏覽器停用了JavaScript，需要啟用JavaScript才可使用本網頁。</p>
              <p>如使用Google Chrome瀏覽器，可參考以下網址，以啟用JavaScript：</p>
              <a href="https://support.google.com/admanager/answer/12654?hl=zh-Hant">https://support.google.com/admanager/answer/12654?hl=zh-Hant</a>
            </div>
          </noscript>

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

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.signContentBox}>
              <p className={styles.signContentText}>
                1. 收集及處理的目的
                <br />
                使用者在使用本網站提供的電子服務或下載並填寫各項服務的相關表格時，將視乎具體服務的要求而有可能需要提供個人資料，該等個人資料僅用於處理相關的目的。
              </p>
              <p className={styles.signContentText}>
                2. 個人資料之轉移
                <br />
                收集及處理的個人資料，將視乎具體服務的需要，有關資料可能被轉移予其他行政機關、司法機關或私人實體使用，該等機關或實體在處理有關個人資料時，亦需符合相關法律的規定。
              </p>
              <p className={styles.signContentText}>
                3. 個人資料的查閱及更正
                <br />
                按第8/2005號法律《個人資料保護法》的規定，使用者有權透過書面，查閱及更正與其有關的個人資料，或直接向接收由本公司轉移有關個人資料的其他行政機關、司法機關、私人機構或實體作出查閱及更正該等個人資料。
                為方便使用者，部分電子服務會顯示使用者曾經提交的資料，這樣可以令使用者無需重新填寫這些資料而縮短整個服務時間。如果這些資料已經過時（例如電話號碼），使用者可以作出更新。
              </p>
              <p className={styles.signContentText}>
                4. 個人資料的保護
                <br />
                本網站的所有管理人員在處理使用者的個人資料時，均會按照第8/2005號法律《個人資料保護法》的規定，作出保密及妥善保管的措施，直至該等資料使用完畢及保存期限結束，屆時將按規定對有關資料進行銷毀或封存。
              </p>
              <p className={styles.signContentText}>
                5. 風險
                <br />
                本網站已採用了基於SecureSocketsLayer(SSL)的安全通訊協議技術，保護個人資料在互聯網上傳輸。但有關資料在公開網絡上傳送仍會存在一定的風險，有可能被未經許可的第三者看到和使用。倘使用者對有關風險感到不安，請使用網絡以外的其他方式向本公司提供資料。
              </p>
              <p className={styles.signContentText}>
                6. 對外連結
                <br />
                本網站內容含有外連到其他網站的超連結，例如本地或外地公共或私人機構等，倘透過這些超連結連接到其他網站時，表示使用者已經離開了本網站。這些網站的私隱政策有可能有別於本網站，本公司對這些網站的內容及其私隱政策不承擔任何責任，故使用者應事先了解這些網站倘有的私隱政策。
              </p>
              <p className={styles.signContentText}>
                7. 本聲明的變更
                <br />
                本聲明若有任何變更，本公司將用新的文本代替舊的文本，且會在新文本中列明修訂的日期，恕不另行公告。
              </p>
              <br />
              <p className={styles.signContentText}>
                版本：2024/6/3
              </p>
            </Box>
          </Modal>
        </div>
      }
    </main>

  );
}
