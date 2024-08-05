'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import MapComponent from '@/app/mapTesting/page';
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../portuguesePage.css";

function App() {
  const router = useRouter()

  const blanksurvey = {
    startTime: new Date(),
    // studentofRespondents: 999,
    residentPopulationStudent: 999,
    // otherOfStudentofRespondents: 999,
    address: 999,
    vehicle: 999
  }

  const blankHelpText = {
    // studentofRespondents: null,
    residentPopulationStudent: null,
    // otherOfStudentofRespondents: null,
    address: null,
    vehicle: null
  }

  const _studentNum = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const local_storage_studentNum = sessionStorage.getItem('studentNum');
      if (local_storage_studentNum) {
        return local_storage_studentNum
      }
    }
    return 0;
  }, [])

  const _initial_value = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const local_storage_value_str = sessionStorage.getItem('headHolder');
      // If there is a value stored in localStorage, use that
      if (local_storage_value_str) {
        return JSON.parse(local_storage_value_str);
      }
    }
    // Otherwise use initial_value that was passed to the function
    return blanksurvey;
  }, []);

  const _initial_pathListe = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      const local_storage_path_list = sessionStorage.getItem('pathList') ? sessionStorage.getItem('pathList').split(",") : null;
      // If there is a value stored in localStorage, use that
      if (local_storage_path_list) {
        return (local_storage_path_list);
      }
    }
  }, []);

  const [survey, setSurvey] = React.useState(_initial_value)
  const [helpText, setHelpText] = React.useState(blankHelpText)
  const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)
  const [progressBarValue, setProgressBarValue] = React.useState(0)
  const [vCodeError, setVCodeError] = React.useState(false)
  const [openAlertBar, setOpenAlertBar] = React.useState(false)

  const handleAlertBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertBar(false);
  };

  const handleAlertBarOpen = () => {
    setOpenAlertBar(true);
  };

  const getMapSelectedText = () => {

    if (survey.address.method == "input") {
      return (
        survey.address.name
      )
    }

    if (survey.address.method == "click") {
      return (
        survey.address.regeocode.formattedAddress
      )
    }

    if (survey.address.method == "autoComplete") {
      return (
        survey.address.poi.name
      )
    }

    if (survey.address.method == "geolocation") {
      return (
        survey.address.name.formattedAddress
      )
    }

    return null
  }

  const handleHelpText = (eventName, errorText) => {
    const objectName = eventName
    setHelpText((prevState) => (
      {
        ...prevState,
        [objectName]: errorText
      }
    ))
  }

  const handleChange = (event) => {

    const objectName = event.target.name
    setSurvey((prevState) => (
      {
        ...prevState,
        [objectName]: event.target.value

      }
    )
    )
  };

  const handleTextFieldChange = (event) => {

    const objectName = event.target.name
    setSurvey((prevState) => (
      {
        ...prevState,
        [objectName]: event.target.value
        // studentofRespondents : event.target.value

      }
    ))
  }

  
  const handleCustomAddress = (address, type) => {
    setSurvey((prevState) => ({
      ...prevState,
      address: null
    }))

    if (type == "geolocation") {
      setSurvey((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          name: address,
          method: type
        }
      }))
      return
    }

    if (type == "input") {
      setSurvey((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          name: address,
          method: type
        }
      }))
      return
    }

    setSurvey((prevState) => ({
      ...prevState,
      address: address,
    }))

    setSurvey((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        method: type
      }
    }))
  }


  const handleNextButton = () => {

    if (!survey.address.method) {
      handleAlertBarOpen()
      setVCodeError(`1) Preencha a morada`)
      handleHelpText("address", `Preencha a morada`)
      return
    }

    if (survey.address == "999" || survey.address == "") {
      handleAlertBarOpen()
      setVCodeError(`1) Preencha a morada`)
      handleHelpText("address", `Preencha a morada`)
      return
    }

    if (survey.residentPopulationStudent == "999") {
      handleAlertBarOpen()
      setVCodeError("2) Seleccione uma opção")
      handleHelpText("residentPopulationStudent", "Seleccione uma opção")
      return
    }

    if (survey.vehicle == "999") {
      handleAlertBarOpen()
      setVCodeError("3) Seleccione uma opção")
      handleHelpText("vehicle", "Seleccione uma opção")
      return
    }

    sessionStorage.setItem("totalStudentNum", survey.residentPopulationStudent)
    sessionStorage.setItem("pathList", storedPathList)
    router.push('/pt/surveystudentinfo')

  }



  React.useEffect(() => {
    survey && sessionStorage.setItem("headHolder", JSON.stringify(survey));
    setHelpText(blankHelpText)
  }, [survey])

  // React.useEffect(() => {
  //   if (survey.studentofRespondents != "其他監護人") {
  //     setSurvey((prevState) => (
  //       {
  //         ...prevState,

  //         otherOfStudentofRespondents: 999

  //       }
  //     ))
  //   }

  // }, [survey.studentofRespondents])

  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
    setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
  }, [])

  React.useEffect(() => {
    if (storedPathList != null) {
      setStoredPathList([...storedPathList, window.location.pathname])
    }
  }, [])

  React.useEffect(() => {
    console.log("storedPathList", _initial_pathListe)

    if (typeof _initial_pathListe === 'undefined' || _initial_pathListe == null) {
      router.push("./")
      return
    }

    if (sessionStorage.getItem('pathList') === null) {
      router.push("./")
      return
    }

    if (_initial_pathListe[_initial_pathListe.length - 1] != "/") {
      router.push("./")
    }
  }, [])


  const [finishStatus, setfinishStatus] = React.useState(false);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    // if (!finishStatus) {
    //   if (window.confirm("返回上一頁嗎?")) {
    //     setfinishStatus(true)
    const copyArr = [...storedPathList]
    const prevPath = copyArr[copyArr.length - 1]
    copyArr.splice(-1)
    sessionStorage.setItem('pathList', copyArr)
    // router.push(prevPath)
    router.back()
    // } else {
    //   window.history.pushState(null, null, window.location.pathname);
    //   setfinishStatus(false)
    // }
    // }
  }

  React.useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);

  React.useEffect(() => {
    if (survey.startTime != 999 &&
      survey.residentPopulationStudent != 999 &&
      survey.address != 999 &&
      survey.vehicle != 999) {
      setProgressBarValue(10)
      return
    } else {
      setProgressBarValue(0)
    }
  }, [survey]);

  React.useEffect(() => {
    sessionStorage.setItem('checkschoolName',null)
},[])


  return (
    <main className={styles.main}>
      {
        isClient ?
          <div className={styles.pageWidth}>
            <h1 className={styles.title}>
            1. Dados sobre o agregado familiar do aluno
            </h1>

            <div className={styles.question} style={{ justifyContent: 'center' }}>
              <FormControl sx={{ display: 'flex', flex: 1 }}>
                <FormLabel id="address-label">
                  <h3>
                    {`1) Designação do edifício da sua residência (pode ser uma localização aproximada, não é necessário preencher o andar e a unidade):`}
                  </h3>
                </FormLabel>
                <Box>
                  <p className={styles.mapHitText}>
                    {
                      getMapSelectedText() ? "Morada seleccionada: " + getMapSelectedText() : <p style={{ color: "#666666" }}>*Seleccione o destino no mapa ou insira a morada e clique em “confirmar”<br />**por ex.: Biblioteca Pública da Associação Comercial de Macau</p>
                    }
                  </p>
                </Box>

                <div style={{ zIndex: 1 }} >
                  <MapComponent handleCustomAddress={handleCustomAddress} />
                </div>

                <FormHelperText sx={{ color: 'red' }}>{helpText.address}</FormHelperText>
              </FormControl>
            </div>

            <div className={styles.question}>
              <FormControl>
                <FormLabel id="resident-population-student-label"><h3>2) Número de pessoas a frequentar jardim de infância, escolas primária ou secundária em Macau que residem na morada acima referida:</h3></FormLabel>
                <RadioGroup
                  aria-labelledby="resident-population-student-group-label"
                  value={survey.residentPopulationStudent}
                  name="residentPopulationStudent"
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ color: "black" }} value="1" control={<Radio />} label="1 pessoa" />
                  <FormControlLabel sx={{ color: "black" }} value="2" control={<Radio />} label="2 pessoas" />
                  <FormControlLabel sx={{ color: "black" }} value="3" control={<Radio />} label="3 pessoas" />
                  <FormControlLabel sx={{ color: "black" }} value="99" control={<Radio />} label="4 pessoas ou mais" />

                </RadioGroup>
                <FormHelperText sx={{ color: 'red' }}>{helpText.residentPopulationStudent}</FormHelperText>
              </FormControl>
            </div>

            {/* <div className={styles.question}>
          <FormControl>
            <FormLabel id="total-income-radio-buttons-group-label">4) 家庭總月收入是（每月可處置的收入總和，但不含住戶成員間的贈與，如生活費、零用等）：</FormLabel>
            <RadioGroup
              row
              aria-labelledby="total-income-radio-buttons-group-label"
              value={survey.headHolder.totalIncome}
              name="totalIncome"
              onChange={handleChange}
            >
              <FormControlLabel sx={{color:"black"}}  value="<$3,000" control={<Radio />} label="<$3,000" />
              <FormControlLabel sx={{color:"black"}}  value="$3,000~$3,999" control={<Radio />} label="$3,000~$3,999" />
              <FormControlLabel sx={{color:"black"}}  value="$4,000~$5,999" control={<Radio />} label="$4,000~$5,999" />
              <FormControlLabel sx={{color:"black"}}  value="$6,000~$7,999" control={<Radio />} label="$6,000~$7,999" />
              <FormControlLabel sx={{color:"black"}}  value="$8,000~$9,999" control={<Radio />} label="$8,000~$9,999" />
              <FormControlLabel sx={{color:"black"}}  value="$10,000~$11,999" control={<Radio />} label="$10,000~$11,999" />
              <FormControlLabel sx={{color:"black"}}  value="$12,000~$13,999" control={<Radio />} label="$12,000~$13,999" />
              <FormControlLabel sx={{color:"black"}}  value="$14,000~$14,999" control={<Radio />} label="$14,000~$14,999" />
              <FormControlLabel sx={{color:"black"}}  value="$15,000~$19,999" control={<Radio />} label="$15,000~$19,999" />
              <FormControlLabel sx={{color:"black"}}  value="$20,000~$39,999" control={<Radio />} label="$20,000~$39,999" />
              <FormControlLabel sx={{color:"black"}}  value="$40,000~$59,999" control={<Radio />} label="$40,000~$59,999" />
              <FormControlLabel sx={{color:"black"}}  value="$60,000~$99,999" control={<Radio />} label="$60,000~$99,999" />
              <FormControlLabel sx={{color:"black"}}  value=">=$100,000" control={<Radio />} label=">=$100,000" />
              <FormControlLabel sx={{color:"black"}}  value="不清楚" control={<Radio />} label="不清楚" />
            </RadioGroup>
          </FormControl>
        </div> */}
            <div className={styles.question}>
              <FormControl>
                <FormLabel id="vehicle-radio-buttons-group-label"><h3>3) Os membros do agregado familiar têm automóveis ou motas:</h3></FormLabel>
                <RadioGroup
                  aria-labelledby="vehicle-radio-buttons-group-label"
                  value={survey.vehicle}
                  name="vehicle"
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ color: "black" }} value="私家車及電單車" control={<Radio />} label="Automóvel e mota" />
                  <FormControlLabel sx={{ color: "black" }} value="私家車" control={<Radio />} label="Automóvel" />
                  <FormControlLabel sx={{ color: "black" }} value="電單車" control={<Radio />} label="Mota" />
                  <FormControlLabel sx={{ color: "black" }} value="都没有" control={<Radio />} label="Não" />

                </RadioGroup>
                <FormHelperText sx={{ color: 'red' }}>{helpText.vehicle}</FormHelperText>
              </FormControl>

            </div>
          </div>
          :
          null
      }

      <div className={styles.buttonGroup}>
        <LinearProgresss values={progressBarValue} />

        <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>
          <Button
            className={styles.buttonStyle}
            onClick={() => router.back()}
          >
            Voltar
          </Button>

          <Button
            className={styles.buttonStyle}
            onClick={handleNextButton}
          >
            Próximo
          </Button>
        </div>
      </div>

      <Snackbar 
        open={openAlertBar} 
        autoHideDuration={2000} 
        onClose={handleAlertBarClose}
        anchorOrigin={{vertical :'bottom', horizontal:'center'}}
      >
        <Alert
          autohideduration={2000}
          onClose={handleAlertBarClose}
          severity="error"
          variant="filled"
        >
          {vCodeError}
        </Alert>
      </Snackbar>

    </main>


  );
}

export default App;
