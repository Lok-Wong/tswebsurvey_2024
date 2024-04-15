'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';// import RadioGroup from "@mui/material";
// import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



function App() {
  const blanksurvey = {
    headHolder : {
      startTime : new Date(),
      studentofRespondents: 999,
      residentPopulation: 999,
      residentPopulationStudent:999,
      totalIncome:999,
      vehicleCheck:999,
    }}

    const _initial_value = React.useMemo(() => {
      const local_storage_value_str = localStorage.getItem('2');
      // If there is a value stored in localStorage, use that
      if(local_storage_value_str) {
          return JSON.parse(local_storage_value_str);
      } 
      // Otherwise use initial_value that was passed to the function
      return blanksurvey;
  }, []);

  const [survey, setSurvey] = React.useState(_initial_value)
  const [studentofRespondents, setStudentofRespondents] = React.useState()
  const [residentPopulation, setResidentPopulation] = React.useState()
  const [residentPopulationStudent, setResidentPopulationStudent] = React.useState()
  const [totalIncome, setTotalIncome] = React.useState()
  const [vehicleCheck, setVehicleCheck] = React.useState()
  const [otherOfStudentofRespondents,setOtherOfStudentofRespondents] = React.useState()

  const handleChange = (event) => {
    // setStudentofRespondents(event.target.value);
    
    const objectName = event.target.name
    setSurvey((prevState) => (
      {
        ...prevState,
        headHolder:{
          ...prevState.headHolder,
          [objectName] : event.target.value
          // studentofRespondents : event.target.value
        }
      }
    )
    
    )

    // if (survey.headHolder.studentofRespondents != "其他"){
    //   setSurvey((prevState) => (
    //     {
    //       ...prevState,
    //       headHolder:{
    //         ...prevState.headHolder,
    //         otherOfStudentofRespondents : 999
    //       }
    //     }
    //   ))
    // }
  };

  const handleTextFieldChange = (event) => {
    
      const objectName = event.target.name
        setSurvey((prevState) => (
      {
        ...prevState,
        headHolder:{
          ...prevState.headHolder,
          [objectName] : event.target.value
          // studentofRespondents : event.target.value
        }
      }
    ))
  }


  React.useEffect(()=>{
    survey && localStorage.setItem("2",JSON.stringify(survey))

  },[survey])

  React.useEffect(()=>{
    if (survey.headHolder.studentofRespondents != "其他"){
      setSurvey((prevState) => (
        {
          ...prevState,
          headHolder:{
            ...prevState.headHolder,
            otherOfStudentofRespondents : otherOfStudentofRespondents == 999? null : otherOfStudentofRespondents
          }
        }
      ))
    }
    console.log("testSurvey",survey)

  },[survey.headHolder.studentofRespondents])

  // React.useEffect(()=>{
  //   console.log("testSurvey",survey)
  // },[survey])


  // React.useEffect(()=>{
  //   const data = localStorage.getItem("2");
  //   if (!!data && data.trim() !== 'undefined') {
  //     setSurvey(JSON.parse(data))
  //   } else {
  //     setSurvey(blanksurvey)
  //   }
  // },[])

  return (
    <main className={styles.main}>
      <div>
        {/* <Survey model={survey} /> */}
        <h1>
        1.	學生家庭住戶資料
        </h1>
        <div className={styles.question}>
          <FormControl>
            <FormLabel id="studentofRespondents-radio-buttons-group-label">1) 你是學生（的）：</FormLabel>
            <RadioGroup
              row
              id = "studentofRespondents"
              aria-labelledby="studentofRespondents-radio-buttons-group-label"
              value = {survey.headHolder.studentofRespondents}
              name="studentofRespondents"
              onChange={handleChange}
            >
              <FormControlLabel sx={{color:"black"}}  value="本人" control={<Radio />} label="本人" />
              <FormControlLabel sx={{color:"black"}}  value="父母" control={<Radio />} label="父母" />
              <FormControlLabel sx={{color:"black"}}  value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
              <FormControlLabel sx={{color:"black"}}  value="工人" control={<Radio />} label="工人" />
              <FormControlLabel sx={{color:"black"}}  value="其他" control={<Radio />} label="其他" />

              {
                survey.headHolder.studentofRespondents == "其他" ? 
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
                      label="其他" 
                      variant="filled"
                      value = {survey.headHolder.otherOfStudentofRespondents}
                      name = "otherOfStudentofRespondents"
                      onChange = {handleTextFieldChange}
                      />
                  </Box>
                :
                null
              }
            </RadioGroup>
          </FormControl>
        </div>

        

        <div className={styles.question}>
         <FormControl>
            <FormLabel id="resident-population-label">2)	家庭的長期固定居住人口（包括住家工人）：</FormLabel>
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
              <FormControlLabel sx={{color:"black"}}  value="6＋" control={<Radio />} label="6人以上" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className={styles.question}>
          <FormControl>
            <FormLabel id="resident-population-student-label">3)  長期固定居住人口中，在澳門幼兒園、小學、中學就讀的：</FormLabel>
            <RadioGroup
              row
              aria-labelledby="resident-population-student-group-label"
              value={survey.headHolder.residentPopulationStudent}
              name="residentPopulationStudent"
              onChange={handleChange}
            >
              <FormControlLabel sx={{color:"black"}}  value="1" control={<Radio />} label="1人" />
              <FormControlLabel sx={{color:"black"}}  value="2" control={<Radio />} label="2人" />
              <FormControlLabel sx={{color:"black"}}  value="3" control={<Radio />} label="3人" />
              <FormControlLabel sx={{color:"black"}}  value="4" control={<Radio />} label="4人" />
              <FormControlLabel sx={{color:"black"}}  value="5" control={<Radio />} label="5人" />
              <FormControlLabel sx={{color:"black"}}  value="6＋" control={<Radio />} label="6人以上" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className={styles.question}>
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
        </div>
        <div className={styles.question}>
          <FormControl>
            <FormLabel id="vehicle_check-radio-buttons-group-label">5)	所有家庭成員有沒有私人車輛?：</FormLabel>
            <RadioGroup
              row
              aria-labelledby="vehicle_check-radio-buttons-group-label"
              value={survey.headHolder.vehicleCheck}
              name="vehicleCheck"
              onChange={handleChange}
            >
              <FormControlLabel sx={{color:"black"}}  value="有" control={<Radio />} label="有" />
              <FormControlLabel sx={{color:"black"}}  value="無" control={<Radio />} label="無" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.question}>
          <Link 
            className={
              styles.nextPageButton
            }
            href={{
              pathname : "/surveyvehicleInfo"
            }} 
            // onClick={handleNextButton}
            >
              Next
          </Link>
        </div>
      </div>
    </main>
    
    );
}

export default App;
