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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';

function App() {
    const router = useRouter();
    
    const blanksurvey = {
        surveyNormalRd : {
            startTime : new Date(),
            pickup: 999,
            otherOfPickup:999,
            pickupTimeStart: 999,
            pickupTimeEnd: 999,
            commonTransirtation: 999,
            otherOfCommonTransirtation: 999,
        }}
    
    const _studentNum = React.useMemo(() => {
        const local_storage_studentNum = sessionStorage.getItem('studentNum');
        if (local_storage_studentNum){
            return local_storage_studentNum
        }
        return 0;
    },[])

    const _initial_value = React.useMemo(() => {
        const local_storage_value_str = sessionStorage.getItem((_studentNum + 'normalRd'));
        // If there is a value stored in localStorage, use that
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        } 
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
        }, []);

    const [survey, setSurvey] = React.useState(_initial_value)
 

      const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
          {
            ...prevState,
            surveyNormalRd:{
              ...prevState.surveyNormalRd,
              [objectName] : event.target.value
            }
          }
        )
        
        )
      };

      const handleTimeChange = (event,name) => {
        setSurvey((prevState) => ({
            ...prevState,
            surveyNormalRd:{
                ...prevState.surveyNormalRd,
                [name] : event.$d
            }
        })
        )
      };

      React.useEffect(()=>{
        survey && sessionStorage.setItem(( _studentNum + "normalRd"),JSON.stringify(survey))
        console.log(survey)
      },[survey])

      React.useEffect(()=>{
        if (survey.surveyNormalRd.pickup != "其他"){
          setSurvey((prevState) => (
            {
              ...prevState,
              surveyNormalRd:{
                ...prevState.surveyNormalRd,
                otherOfPickup : 999
              }
            }
          ))
        }

        if (survey.surveyNormalRd.commonTransirtation != "其他"){
            setSurvey((prevState) => (
              {
                ...prevState,
                surveyNormalRd:{
                  ...prevState.surveyNormalRd,
                  otherOfCommonTransirtation : 999
                }
              }
            ))
          }
      
    
      },[survey.surveyNormalRd.pickup,survey.surveyNormalRd.commonTransirtation])



    return(
        <main className={styles.main}>
            <div style={{minWidth:"100%"}}>

                <h1  style={{color:"#ffffff"}}>
                    3.1	一般情況下，學生早上上學的情況
                </h1>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="pickup-label">1)    有沒有人接送：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="pickup-label"
                            name="pickup"
                            value={survey.surveyNormalRd.pickup}
                            onChange={handleChange}
                            >
                            <FormControlLabel value="學生自行上學" control={<Radio />} label="學生自行上學" />
                            <FormControlLabel value="父母" control={<Radio />} label="父母" />
                            <FormControlLabel value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                            <FormControlLabel value="工人" control={<Radio />} label="工人" />
                            <FormControlLabel value="其他" control={<Radio />} label="其他" />
                            {survey.surveyNormalRd.pickup === "其他" ?
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        name='otherOfPickup' 
                                        id="pickup-other-textfill"
                                        label="其他" 
                                        variant="filled" 
                                        onChange={handleChange}
                                        value={survey.surveyNormalRd.otherOfPickup == 999 ? null : survey.surveyNormalRd.otherOfPickup}
                                    />
                                </Box>
                                :
                                null
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="pickup-time-start-label">2)     出發時間：</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={dayjs(survey.surveyNormalRd.pickupTimeStart)}
                                    onChange={(event) => handleTimeChange(event,"pickupTimeStart")}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="pickup-time-end-label">3)     到達時間：</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={dayjs(survey.surveyNormalRd.pickupTimeEnd)}
                                    onChange={(event) => handleTimeChange(event,"pickupTimeEnd")}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl
                        required
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        <FormLabel component="commonTransiration">4)	常用的交通方式：</FormLabel>
                        <RadioGroup 
                            row
                            name='commonTransirtation'
                            value={survey.surveyNormalRd.commonTransirtation}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                control={
                                <Radio value="電單車（乘客）" />
                                }
                                label="電單車（乘客）"
                            />
                            <FormControlLabel
                                control={
                                <Radio value="私家車（乘客）" />
                                }
                                label="私家車（乘客）"
                            />
                            <FormControlLabel
                                control={
                                <Radio value="校車" />
                                }
                                label="校車"
                            />
                            <FormControlLabel
                                control={
                                <Radio value="巴士" />
                                }
                                label="巴士"
                            />
                            <FormControlLabel
                                control={
                                <Radio value="輕軌" />
                                }
                                label="輕軌"
                            />
                            <FormControlLabel
                                control={
                                <Radio value="一般的士" />
                                }
                                label="一般的士"
                            />
                            <FormControlLabel
                                control={
                                <Radio  value="電召的士" />
                                }
                                label="電召的士"
                            />
                            <FormControlLabel
                                control={
                                <Radio value="步行" />
                                }
                                label="步行"
                            />
                            <FormControlLabel
                                control={
                                <Radio value="其他" />
                                }
                                label="其他"
                            />
                            { survey.surveyNormalRd.commonTransirtation === "其他" ?
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    <TextField 
                                        id="commonTransiration-other-textfill" 
                                        label="其他" 
                                        variant="filled"
                                        name='otherOfCommonTransirtation'
                                        onChange={handleChange}
                                        value={survey.surveyNormalRd.otherOfCommonTransirtation == 999 ? null : survey.surveyNormalRd.otherOfCommonTransirtation} 
                                        />
                                </Box>
                                :
                                null
                            }
                              
                            </RadioGroup>
                          
                    </FormControl>
                </div>

                {/* <h1>
                    2.4 學生出行意見和建議
                </h1>

                <div className={styles.question}>
                    <FormControl sx={{
                        m:1, width:"100%"
                    }}>
                        <FormLabel id="student-suggestion-label">13)	爲了更好服務學生，您對上下學出行有何意見或建議？（選填）：</FormLabel>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '60%' },
                            }}
                            noValidate
                            >
                            <TextField 
                                id="student-suggestion-text" 
                                label="年級" 
                                variant="outlined" 
                                multiline
                            />
                        </Box>
                    </FormControl>
                </div> */}

                <div className={styles.question}>
                    <Button onClick={() => router.back()}>
                        back
                    </Button>
                    <Button href={'/surveyNormalRd2'}>
                        next
                    </Button>
                </div>
                
            </div>         
        </main>
    )

}
export default App;
