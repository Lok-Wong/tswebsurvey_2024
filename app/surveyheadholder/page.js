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



function App() {
  const router = useRouter()

  const blanksurvey = {
    headHolder: {
      startTime: new Date(),
      studentofRespondents: 999,
      residentPopulationStudent: 999,
      otherOfStudentofRespondents: 999,
      address: 999,
      vehicle: 999
    }
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
      const local_storage_value_str = sessionStorage.getItem(_studentNum + 'headHolder');
      // If there is a value stored in localStorage, use that
      if (local_storage_value_str) {
        return JSON.parse(local_storage_value_str);
      }
    }
    // Otherwise use initial_value that was passed to the function
    return blanksurvey;
  }, []);

  const [survey, setSurvey] = React.useState(_initial_value)
  const [helpText, setHelpText] = React.useState(blankHelpText)

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
        headHolder: {
          ...prevState.headHolder,
          [objectName]: event.target.value
        }
      }
    )
    )
  };

  const handleTextFieldChange = (event) => {

    const objectName = event.target.name
    setSurvey((prevState) => (
      {
        ...prevState,
        headHolder: {
          ...prevState.headHolder,
          [objectName]: event.target.value
          // studentofRespondents : event.target.value
        }
      }
    ))
  }

  const handleNextButton = () => {

    if (survey.headHolder.studentofRespondents == 999) {
      handleHelpText("studentofRespondents", "請選擇一個選項")
      return
    }

    if (survey.headHolder.studentofRespondents == "其他監護人") {
      if (survey.headHolder.otherOfStudentofRespondents == "999" || survey.headHolder.otherOfStudentofRespondents == "") {
        handleHelpText("studentofRespondents", "請填寫其他監護人名稱")
        return
      }
    }

    if (survey.headHolder.address == "999" || survey.headHolder.address == "") {
      handleHelpText("address", "請填寫地址")
      return
    }

    if (survey.headHolder.residentPopulationStudent == "999") {
      handleHelpText("residentPopulationStudent", "請選擇一個選項")
      return
    }

    if (survey.headHolder.vehicle == "999") {
      handleHelpText("vehicle", "請選擇一個選項")
      return
    }

    sessionStorage.setItem("totalStudentNum", survey.headHolder.residentPopulationStudent)
    router.push('/surveystudentinfo')

  }



  React.useEffect(() => {
    survey && sessionStorage.setItem(_studentNum + "headHolder", JSON.stringify(survey));
    setHelpText(blankHelpText)
    console.log(survey)
  }, [survey])

  React.useEffect(() => {
    if (survey.headHolder.studentofRespondents != "其他監護人") {
      setSurvey((prevState) => (
        {
          ...prevState,
          headHolder: {
            ...prevState.headHolder,
            otherOfStudentofRespondents: 999
          }
        }
      ))
    }

  }, [survey.headHolder.studentofRespondents])

  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className={styles.main}>
      {
        isClient ?
          <div>
            {/* <Survey model={survey} /> */}
            <h1 style={{ color: "#ffffff" }}>
              1.	學生家庭住戶資料
            </h1>
            <div className={styles.question}>
              <FormControl>
                <FormLabel id="studentofRespondents-radio-buttons-group-label">1) 你是學生（的）：</FormLabel>
                <RadioGroup
                  required
                  row
                  id="studentofRespondents"
                  aria-labelledby="studentofRespondents-radio-buttons-group-label"
                  value={survey.headHolder.studentofRespondents}
                  name="studentofRespondents"
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ color: "black" }} value="本人" control={<Radio />} label="本人" />
                  <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                  <FormControlLabel sx={{ color: "black" }} value="其他監護人" control={<Radio />} label="其他監護人" />

                  {
                    survey.headHolder.studentofRespondents == "其他監護人" ?
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
                          value={survey.headHolder.otherOfStudentofRespondents == 999 ? null : survey.headHolder.otherOfStudentofRespondents}
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
                <FormLabel id="address-label">2)	家庭住址建築物名稱（可填寫地標，無需填寫樓層及單位）：</FormLabel>
                <Box>
                  <TextField
                    id="studentofRespondents-other-textfill"
                    label="請輸入地址"
                    variant="filled"
                    name="address"
                    value={survey.headHolder.address == 999 ? null : survey.headHolder.address}
                    onChange={handleChange}
                  />
                </Box>
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
                <FormLabel id="resident-population-student-label">3) 長期固定居住於上述地址中，且現於澳門就讀幼稚園、小學或中學的成員人數為：</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="resident-population-student-group-label"
                  value={survey.headHolder.residentPopulationStudent}
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
                <FormLabel id="vehicle-radio-buttons-group-label">4)	所有家庭成員有沒有私家車或電單車：</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="vehicle-radio-buttons-group-label"
                  value={survey.headHolder.vehicle}
                  name="vehicle"
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ color: "black" }} value="都有" control={<Radio />} label="都有" />
                  <FormControlLabel sx={{ color: "black" }} value="私家車" control={<Radio />} label="私家車" />
                  <FormControlLabel sx={{ color: "black" }} value="電單車" control={<Radio />} label="電單車" />
                  <FormControlLabel sx={{ color: "black" }} value="都没有" control={<Radio />} label="都没有" />

                </RadioGroup>
                <FormHelperText sx={{ color: 'red' }}>{helpText.vehicle}</FormHelperText>
              </FormControl>

            </div>
            <div className={styles.question}>
              <Button
                onClick={handleNextButton}
              >
                Next
              </Button>
            </div>
          </div>
          :
          null
      }
    </main>

  );
}

export default App;
