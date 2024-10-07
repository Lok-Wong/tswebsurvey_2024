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
      if (!infoSaveChecked) {
        handleAlertBarOpen()
        setVCodeError("Concorde primeiro com a declaração de recolha de dados pessoais")
        return
      }

      if (!inputVcode) {
        handleAlertBarOpen()
        setVCodeError("Insira o código de verificação!")
        return
      }

      if (vCode != inputVcode.toLocaleUpperCase()) {
        handleAlertBarOpen()
        setVCodeError("Código de verificação errado!")
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

      router.push('/pt/surveyheadholder')
    }
  }


  async function handleNextButton(event) {

    if (!infoSaveChecked) {
      handleAlertBarOpen()
      setVCodeError("Concorde primeiro com a declaração de recolha de dados pessoais")
      return
    }

    if (!inputVcode) {
      handleAlertBarOpen()
      setVCodeError("Insira o código de verificação!")
      return
    }

    if (vCode != inputVcode.toLocaleUpperCase()) {
      handleAlertBarOpen()
      setVCodeError("Código de verificação errado!")
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

      router.push('/pt/surveyheadholder')
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
        Caros pais/aluno, <br /><br />
        Bem-vindo ao Estudo da Matriz de Origem-Destino dos Estudantes de Macau. O presente inquérito tem como objectivo conhecer os hábitos de deslocação dos estudantes do ensino não superior de Macau e recolher as suas opiniões e sugestões em relação às deslocações casa-escola.
        <br />
            <br />
        Os seus dados e opiniões são muito importantes, sendo os conteúdos preenchidos exclusivamente destinados a análise e tratados de forma confidencial. Basta apenas cinco minutos para concluir este questionário, e se prestar as informações de contacto após a conclusão, participará automaticamente num sorteio, podendo os vencedores obter um cupão de papelaria.
        <br />
            <br />
          Em caso de dúvidas sobre o inquérito, queira ligar para as seguintes linhas do centro do estudo de segunda-feira a sábado, das 11h00 às 22h00 <br />
        <br />
            63703082 <br />
            63703083 <br />
            63946045 <br /><br />

        ou contactá-lo através do correio electrónico 
        umtec.TS2024@um.edu.mo<br />
        <br /><br /> Agradecemos o seu apoio!

        </a>
        <a>
          <br />
        </a>
        <div className={styles.startTextcompany}>
          <a >
            <br />
            Entidade mandante: DSAT
            <br />
            Entidade coordenadora: DSEDJ
            <br /> 
            Entidade encarregada: UMTEC Limitada

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
            Concordar&nbsp;
            <span onClick={handleOpen} className={styles.linkText}>Declaração de recolha de dados pessoais</span>
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
              Clique na imagem para actualizar o código de verificação 
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
          Próximo
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
            1. Objectivo de recolha e tratamento
            <br />
            No decurso de utilização dos serviços electrónicos disponibilizados por este website, ou nas circunstâncias de descarregamento e preenchimento dos impressos referentes ao requerimento dos diversos serviços, para o efeito, poderão ser solicitados aos utentes destes serviços, os dados pessoais, consoante as condições e os requisitos estabelecidos para o serviço em concreto, sendo que os referidos dados pessoais são utilizados, exclusivamente, para fins de tratamento do pedido.
          </p>
          <p className={styles.signContentText}>
            2. Transferência de dados pessoais
            <br />
            Os dados pessoais recolhidos e tratados poderão ser transferidos para outros serviços públicos, órgãos judiciais ou entidades privadas, consoante as necessidades dos serviços em questão. Os referidos órgãos e entidades devem respeitar as disposições legais aplicáveis, no tratamento dos dados pessoais.
          </p>
          <p className={styles.signContentText}>
            3. Rectificação e acesso a dados pessoais
            <br />
            Ao abrigo do disposto na Lei n.º 8/2005 (Lei da Protecção de Dados Pessoais), os utentes têm o direito de aceder aos seus dados pessoais e de os rectificar, mediante requerimento escrito ou requerer, directamente, a outros serviços públicos, órgãos judiciais ou entidades privadas, para os quais os seus dados pessoais tenham sido transferidos por esta empresa, o acesso a esses dados pessoais, bem como a rectificação dos mesmos.
            Para facilitar os utentes, alguns serviços electrónicos irão mostrar os dados que os utentes submeteram anteriormente, o que permite a dispensa de preenchimento desses dados e acelerar o processo de serviço. Se esses dados estiverem desatualizados (por ex.: n.º de contacto), os utentes podem efectuar a actualização.
          </p>
          <p className={styles.signContentText}>
            4. Protecção de dados pessoais
            <br />
            No tratamento de dados pessoais do utente, todos os responsáveis pela gestão deste website providenciarão no sentido de manter a confidencialidade dos dados e de os conservar, de forma adequada, nos termos do estabelecido na Lei n.º 8/2005 (Lei da Protecção de Dados Pessoais), até ao termo da sua utilização ou do seu prazo de conservação, altura em que os dados serão destruídos ou selados conforme estipulado.
          </p>
          <p className={styles.signContentText}>
            5. Riscos
            <br />
            Neste website, utiliza-se a técnica de protocolo de comunicação segura baseada em “SecureSocketsLayer (SSL)”, no sentido de proteger a transmissão através da Internet dos dados pessoais. Apesar disto, a transmissão de dados na rede pública corre determinados riscos potenciais, podendo os quais ser consultados e utilizados por terceiros não autorizados. Se o utente não se dispuser a assumir tais riscos, recomenda-se a utilização de outro meio, para além da rede, para prestar dados a esta empresa.
          </p>
          <p className={styles.signContentText}>
            6. Ligação ao exterior
            <br />
            Este website contém “Hyperlinks” para facilitar o acesso a outras páginas electrónicas, designadamente páginas electrónicas de organismos públicos ou privados de Macau ou do exterior. O estabelecimento de uma ligação a essas páginas electrónicas, através desses “Hyperlinks”, implica a saída do utente deste website. Assim sendo, esta empresa não se responsabiliza pelo conteúdo, nem pelas políticas de privacidade indicados nessas páginas electrónicas a que o utente tenha acesso, no caso concreto, uma vez que as políticas de privacidade contidas nessas páginas electrónicas podem divergir das políticas adoptadas no website desta empresa. Assim, sugere-se ao utente a realização de uma consulta das eventuais políticas de privacidade contidas nessas páginas electrónicas, antes de aceder às mesmas.
          </p>
          <p className={styles.signContentText}>
            7. Alteração desta declaração
            <br />
            Nas situações em que se verifiquem alterações desta declaração, esta empresa substituirá a versão antiga pela versão nova, onde será indicada a data da última revisão, sem necessidade de qualquer outro aviso.
          </p>
          <br />
          <p className={styles.signContentText}>
            Última revisão: 2024-06-03
          </p>
        </Box>
      </Modal>
    </main>
  );
}
