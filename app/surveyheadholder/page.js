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
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import MapComponent from '@/app/mapTesting/page';



function App() {
  const router = useRouter()

  const blanksurvey = {
    startTime: new Date(),
    studentofRespondents: 999,
    residentPopulationStudent: 999,
    otherOfStudentofRespondents: 999,
    address: 999,
    vehicle: 999
  }

  const blankHelpText = {
    studentofRespondents: null,
    residentPopulationStudent: null,
    otherOfStudentofRespondents: null,
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
  const [mapSelectText, setMapSelectText] = React.useState()

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

    if (survey.studentofRespondents == 999) {
      handleHelpText("studentofRespondents", "請選擇一個選項")
      return
    }

    if (survey.studentofRespondents == "其他監護人") {
      if (survey.otherOfStudentofRespondents == "999" || survey.otherOfStudentofRespondents == "") {
        handleHelpText("studentofRespondents", "請填寫其他監護人名稱")
        return
      }
    }

    if (survey.address == "999" || survey.address == "") {
      handleHelpText("address", "請填寫地址")
      return
    }

    if (survey.residentPopulationStudent == "999") {
      handleHelpText("residentPopulationStudent", "請選擇一個選項")
      return
    }

    if (survey.vehicle == "999") {
      handleHelpText("vehicle", "請選擇一個選項")
      return
    }

    sessionStorage.setItem("totalStudentNum", survey.residentPopulationStudent)
    sessionStorage.setItem("pathList", storedPathList)
    router.push('/surveystudentinfo')

  }



  React.useEffect(() => {
    survey && sessionStorage.setItem("headHolder", JSON.stringify(survey));
    setHelpText(blankHelpText)
  }, [survey])

  React.useEffect(() => {
    if (survey.studentofRespondents != "其他監護人") {
      setSurvey((prevState) => (
        {
          ...prevState,

          otherOfStudentofRespondents: 999

        }
      ))
    }

  }, [survey.studentofRespondents])

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
    if (sessionStorage.getItem('pathList') === null) {
      router.push("./")
      return
    }
    if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyMain") {
      router.push("./")
    }
  }, [])


  const [finishStatus, setfinishStatus] = React.useState(false);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to go back ?")) {
        setfinishStatus(true)
        const copyArr = [...storedPathList]
        const prevPath = copyArr[copyArr.length - 1]
        copyArr.splice(-1)
        sessionStorage.setItem('pathList', copyArr)
        // router.push(prevPath)
        router.back()
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false)
      }
    }
  }

  React.useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);


  return (
    <main className={styles.main}>
      {
        isClient ?
          <div>
            <h1 className={styles.title}>
              一、學生家庭住戶資料
            </h1>
            <div className={styles.question}>
              <FormControl>
                <FormLabel id="studentofRespondents-radio-buttons-group-label"><h3>1) 你是學生（的）：</h3></FormLabel>
                <RadioGroup
                  required
                  id="studentofRespondents"
                  aria-labelledby="studentofRespondents-radio-buttons-group-label"
                  value={survey.studentofRespondents}
                  name="studentofRespondents"
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ color: "black" }} value="本人" control={<Radio />} label="本人" />
                  <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                  <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他（如︰監護人、親戚等）" />

                  {
                    survey.studentofRespondents == "其他" ?
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 0.5, width: '10rem' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="studentofRespondents-other-textfill"
                          label="請輸入其他監護人名稱"
                          variant="filled"
                          value={survey.otherOfStudentofRespondents == 999 ? null : survey.otherOfStudentofRespondents}
                          name="otherOfStudentofRespondents"
                          onChange={handleTextFieldChange}
                        />
                      </Box>
                      :
                      null
                  }
                </RadioGroup>
                <FormHelperText sx={{ color: 'red' }}>{helpText.studentofRespondents}</FormHelperText>
              </FormControl>
            </div>

            <div className={styles.question}>
              <FormControl>
                <FormLabel id="address-label"><h3>2)	家庭住址建築物名稱（可填寫地標，無需填寫樓層及單位）：</h3></FormLabel>
                <Box>
                  <p className={styles.mapHitText}>
                    {
                      getMapSelectedText() ? "已選擇目的地： " + getMapSelectedText() : "*請在以下地圖點選目的地或輸入相關地址後按下確定"
                    }
                  </p>


                </Box>
                {/* <Button>
                  按下打開地圖
                </Button> */}
                <div>
                  <MapComponent handleCustomAddress={handleCustomAddress} />
                </div>

                <FormHelperText sx={{ color: 'red' }}>{helpText.address}</FormHelperText>
              </FormControl>
            </div>



            {/* <div className={styles.question}>
         <FormControl>
            <FormLabel id="resident-population-label">3)	上述地址中，長期固定居住人口（包括留宿工人）：</FormLabel>
            <RadioGroup
              row
              aria-labelledby="resident-population-group-label"
              value={survey.headHolder.residentPopulation}
              name="residentPopulation"
              onChange={handleChange}
            >
              <FormControlLabel sx={{color:"black"}}  value="1" control={<Radio />} label="1人" />
              <FormControlLabel sx={{color:"black"}}  value="2" control={<Radio />} label="2人" />
              <FormControlLabel sx={{color:"black"}}  value="3" control={<Radio />} label="3人" />
              <FormControlLabel sx={{color:"black"}}  value="4" control={<Radio />} label="4人" />
              <FormControlLabel sx={{color:"black"}}  value="5" control={<Radio />} label="5人" />
              <FormControlLabel sx={{color:"black"}}  value="6＋" control={<Radio />} label="6人或以上" />
            </RadioGroup>
          </FormControl>
        </div> */}

            <div className={styles.question}>
              <FormControl>
                <FormLabel id="resident-population-student-label"><h3>3) 長期固定居住於上述地址中，且現於澳門就讀幼稚園、小學或中學的成員人數為：</h3></FormLabel>
                <RadioGroup
                  aria-labelledby="resident-population-student-group-label"
                  value={survey.residentPopulationStudent}
                  name="residentPopulationStudent"
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ color: "black" }} value="1" control={<Radio />} label="1人" />
                  <FormControlLabel sx={{ color: "black" }} value="2" control={<Radio />} label="2人" />
                  <FormControlLabel sx={{ color: "black" }} value="3" control={<Radio />} label="3人" />
                  <FormControlLabel sx={{ color: "black" }} value="4" control={<Radio />} label="4人" />
                  <FormControlLabel sx={{ color: "black" }} value="5" control={<Radio />} label="5人" />
                  <FormControlLabel sx={{ color: "black" }} value="6＋" control={<Radio />} label="6人或以上" />
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
                <FormLabel id="vehicle-radio-buttons-group-label"><h3>4)	所有家庭成員有沒有私家車或電單車：</h3></FormLabel>
                <RadioGroup
                  aria-labelledby="vehicle-radio-buttons-group-label"
                  value={survey.vehicle}
                  name="vehicle"
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ color: "black" }} value="私家車及電單車" control={<Radio />} label="私家車及電單車" />
                  <FormControlLabel sx={{ color: "black" }} value="私家車" control={<Radio />} label="私家車" />
                  <FormControlLabel sx={{ color: "black" }} value="電單車" control={<Radio />} label="電單車" />
                  <FormControlLabel sx={{ color: "black" }} value="都没有" control={<Radio />} label="都没有" />

                </RadioGroup>
                <FormHelperText sx={{ color: 'red' }}>{helpText.vehicle}</FormHelperText>
              </FormControl>

            </div>
          </div>
          :
          null
      }
      <div className={styles.buttonGroup}>
        <Button
          className={styles.buttonStyle}
          onClick={() => router.back()}
        >
          上一頁
        </Button>

        <Button
          className={styles.buttonStyle}
          onClick={handleNextButton}
        >
          下一頁
        </Button>
      </div>
    </main>


  );
}

export default App;
