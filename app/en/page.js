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
      if (!infoSaveChecked) {
        handleAlertBarOpen()
        setVCodeError("Please read and agree to the Personal Data Collection Statement")
        return
      }

      if (!inputVcode) {
        handleAlertBarOpen()
        setVCodeError("The verification code is not filled in")
        return
      }

      if (vCode != inputVcode.toLocaleUpperCase()) {
        handleAlertBarOpen()
        setVCodeError("The validation code is incorrect")
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

      router.push('/en/surveyheadholder')
    }
  }


  async function handleNextButton(event) {

    if (!infoSaveChecked) {
      handleAlertBarOpen()
      setVCodeError("Please read and agree to the Personal Data Collection Statement")
      return
    }

    if (!inputVcode) {
      handleAlertBarOpen()
      setVCodeError("The verification code is not filled in")
      return
    }

    if (vCode != inputVcode.toLocaleUpperCase()) {
      handleAlertBarOpen()
      setVCodeError("The verification code is incorrect!")
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

      router.push('/en/surveyheadholder')
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
    { icon: <Link href="/">PT</Link>, name: 'em breve', },
  ];


  return (
    <main className={styles.main}>
      <Box sx={{ position: "fixed", right: 0, bottom: 0, zIndex: 100 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<TranslateIcon />}
          direction="left"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </StyledSpeedDial>
      </Box>
      <div className={styles.description}>
        <p>
          V1.3
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
          Dear Parents/Students:<br /><br />
          Welcome to participate in the Survey of Macao Students Travel Habits. The purpose of this survey is to understand the traveling habits of non-tertiary students in Macau, as well as gather your opinions and suggestions regarding commuting to and from school.
          <br />
          <br />
          Your valuable information and opinions are very important. This survey will only take around 5 minutes to complete, and the provided information will be used soely for analysis and will not be disclosed to the public. By you providing your contact information after completing the questionnaire, your name will be entered into a drawing to win a stationery gift voucher.
          <br />
          <br />
          If you have any inquiries regarding this survey, please feel free to contact us from Monday to Saturday 11 a.m. to 10 p.m. at the following phone numbers:<br /><br />
          63703082 <br />
          63703083 <br />
          63946045 <br /><br />

          or email to: <br />
          umtec.TS2024@um.edu.mo<br />
          <br /> <br />Thank you for your time and valuable information!

        </a>
        <a>
          <br />
        </a>
        <div className={styles.startTextcompany}>
          <a >
            <br />
            Entrusting Entity: DSAT
            <br />
            Coordinating Entity: DSEDJ
            <br />
            Executing Entity: UMtec Limited
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
            Agreed&nbsp;
            <span onClick={handleOpen} className={styles.linkText}>Personal Information Collection Statement</span>
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
              label="Verification Code"
              inputProps={{ style: { textTransform: "uppercase" }, maxLength: 4 }}
              onChange={(event) => {
                setInputVcode(event.target.value)
              }}
              onKeyDown={(event) => { enterToNext(event) }}
            />
          </Box>
          <div className={styles.verifyCodeBox}>
            <Vcode
              id="1"
              length={4}
              onChange={(v) => { setVCode(v) }}
              options={{ codes: ["Q", "W", "E", "R", "T", "Y", "U", "I", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "1", "2", "3", "4", "5", "6", "7", "8", "9",] }}
            />
            <p style={{ fontSize: "12px", color: "#000000" }}>
              Click the image to refresh the verification code
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
          Next Page
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
          <p>Your browser has disabled JavaScript, to visit this website need to activate Javascript</p>
          <p>If using Google Chrome browser, to activate JavaScript, you can make a reference to the link below:</p>
          <a href="https://support.google.com/admanager/answer/12654">https://support.google.com/admanager/answer/12654</a>
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
            1. Purpose of data collection and processing
            <br />
            When users use the electronic services provided by this website or fill in the relevant forms obtained by downloading from this website or other means for the various services, they may need to provide personal information depending on the requirements of the specific services. Such personal data collected will only be used for the purposes of the relevant services.
          </p>
          <p className={styles.signContentText}>
            2. Transfer of Personal Data
            <br />
            Depending on the actual need of the services, the personal data collected and handled by the Company may be transferred to other administrative organs, judicial organs, or private entities. Such organs or entities are required to comply with the relevant legislation while processing the personal data.            <br />
          </p>
          <p className={styles.signContentText}>
            3. Access and Correction of Personal Data
            <br />
            In accordance with the provisions of Law No. 8/2005 Personal Data Protection Law, users have the right to access and correct their personal data by writing to the Company, or directly to other administrative agencies, judicial agencies, private organizations or entities that receive such personal data from the Company.
            For the users convenience, some electronic services may display the information submitted in the past, so that the user is not required to fill it in again to save time. Any outdated information (for example, telephone number) can be updated immediately.
          </p>
          <p className={styles.signContentText}>
            4. Protection of Personal Data
            <br />
            All administrators of this website will follow the provisions of Law No. 8/2005 Personal Data Protection Law when handling the personal data of users, and take measures to ensure confidentiality and proper custody until the usage of data ceases and the retention period of data expires. The relevant data will then be destroyed or archived in accordance with the relevant regulations.
          </p>
          <p className={styles.signContentText}>
            5. Risk
            <br />
            This website has adopted a secure communication protocol technology based on SecureSocketsLayer (SSL) to protect the personal data that is being transmitted on the Internet. However, the transmission of relevant information on public networks may still carry certain risks, and the information may be seen and used by unauthorized third parties. If users feel uncomfortable about the risks, please use means other than the Internet to provide information to the Company.
          </p>
          <p className={styles.signContentText}>
            6. External Links
            <br />
            The content of this website contains hyperlinks to other websites, such as local or foreign public or private institutions, etc. Connection to those websites through these hyperlinks implies that the user has left this website. The privacy policies of these websites may be different from that of this website, and the Company is not responsible for their contents and privacy policies. Thus, the user should be aware of such privacy policies in advance.
          </p>
          <p className={styles.signContentText}>
            7. Changes to this Statement
            <br />
            If any changes occur to the Statement, the Company will replace the old version with a new one and the date of amendment will be stated without further notice.
          </p>
          <br />
          <p className={styles.signContentText}>
            Version: 2024/6/3
          </p>
        </Box>
      </Modal>
    </main>
  );
}
