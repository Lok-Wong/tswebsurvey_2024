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
import FormHelperText from '@mui/material/FormHelperText';

function App() {
    const router = useRouter();

    const blanksurvey = {
        surveyNormalRd: {
            startTime: new Date(),
            pickup: 999,
            otherOfPickup: 999,
            pickupTimeStart: 999,
            pickupTimeEnd: 999,
            commonTransirtation: 999,
            otherOfCommonTransirtation: 999,
        }
    }

    const blankHelpText = {
        pickup: null,
        otherOfPickup: null,
        pickupTimeStart: null,
        pickupTimeEnd: null,
        commonTransirtation: null,
        otherOfCommonTransirtation: null,
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

            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'normalRd'));
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
          const local_storage_path_list = sessionStorage.getItem('pathList')? sessionStorage.getItem('pathList').split(",") : null;
          // If there is a value stored in localStorage, use that
          if (local_storage_path_list) {
            return (local_storage_path_list);
          }
        }
      }, []);

    const [survey, setSurvey] = React.useState(_initial_value)
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)


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
                surveyNormalRd: {
                    ...prevState.surveyNormalRd,
                    [objectName]: event.target.value
                }
            }
        )

        )
    };

    const handleTimeChange = (event, name) => {
        setSurvey((prevState) => ({
            ...prevState,
            surveyNormalRd: {
                ...prevState.surveyNormalRd,
                [name]: event.$d
            }
        })
        )
    };

    const handleNextButton = () => {

        if (survey.surveyNormalRd.pickup == "999") {
            handleHelpText("pickup", "請選擇一個選項")
            return
        }

        if (survey.surveyNormalRd.pickup == "其他"){
            if (survey.surveyNormalRd.otherOfPickup == "999" || survey.surveyNormalRd.otherOfPickup == ""){
                handleHelpText("pickup", "請填寫其他")
                return
            }
        }

        if ((survey.surveyNormalRd.pickupTimeStart > survey.surveyNormalRd.pickupTimeEnd) || (survey.surveyNormalRd.pickupTimeEnd < survey.surveyNormalRd.pickupTimeStart) ) {
            handleHelpText("pickupTimeStart", "出發時間不能大於到達時間")
            handleHelpText("pickupTimeEnd", "到達時間不能小於出發時間")
            return
        }       

        if (survey.surveyNormalRd.commonTransirtation == "999") {
            handleHelpText("commonTransirtation", "請選擇一個選項")
            return
        }

        if (survey.surveyNormalRd.commonTransirtation == "其他") {
            if(survey.surveyNormalRd.otherOfCommonTransirtation == "999" || survey.surveyNormalRd.otherOfCommonTransirtation == ""){
                handleHelpText("commonTransirtation", "請填寫其他")
                return
            }
        }

        sessionStorage.setItem("pathList", storedPathList)
        router.push('/surveyNormalRd2')
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + "normalRd"), JSON.stringify(survey))
        setHelpText(blankHelpText)
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (storedPathList != null) {
        console.log("storedPathList12", storedPathList)
        setStoredPathList([...storedPathList, window.location.pathname])
        }
      }, [])

      React.useEffect(() => {
        if (sessionStorage.getItem('pathList') === null) {
          router.replace("./")
          return
        }
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveystudentinfo") {
          router.replace("./")
        }
      }, [])

      const [finishStatus, setfinishStatus] = React.useState(false);

      const onBackButtonEvent = (e) => {
        e.preventDefault();
      //   if (!finishStatus) {
      //       if (window.confirm("Do you want to go back ?")) {
      //         setfinishStatus(true)
              const copyArr = [...storedPathList]
              const prevPath = copyArr[copyArr.length - 1]
              copyArr.splice(-1)
              sessionStorage.setItem('pathList',copyArr)
              router.back()
      //       } else {
      //           window.history.pushState(null, null, window.location.pathname);
      //           setfinishStatus(false)
      //       }
      //   }
      }
    
      React.useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
          window.removeEventListener('popstate', onBackButtonEvent);  
        };
      }, []);

    React.useEffect(() => {
        if (survey.surveyNormalRd.pickup != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd: {
                        ...prevState.surveyNormalRd,
                        otherOfPickup: 999
                    }
                }
            ))
        }

        if (survey.surveyNormalRd.commonTransirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd: {
                        ...prevState.surveyNormalRd,
                        otherOfCommonTransirtation: 999
                    }
                }
            ))
        }


    }, [survey.surveyNormalRd.pickup, survey.surveyNormalRd.commonTransirtation])



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div style={{ minWidth: "100%" }}>

                        <h1 style={{ color: "#000000" }}>
                            三、一般情況下，學生早上上學的情況
                        </h1>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>1)    有沒有人接送：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.surveyNormalRd.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行上學" control={<Radio />} label="學生自行上學" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />
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
                                <FormHelperText sx={{ color: 'red' }}>{helpText.pickup}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="pickup-time-start-label"><h3>2)     出發時間：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyNormalRd.pickupTimeStart)}
                                            onChange={(event) => handleTimeChange(event, "pickupTimeStart")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.pickupTimeStart}</FormHelperText>
                            </FormControl>
                            </div>
                            <div className={styles.question}>

                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="pickup-time-end-label"><h3>3)     到達時間：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyNormalRd.pickupTimeEnd)}
                                            onChange={(event) => handleTimeChange(event, "pickupTimeEnd")}
                                        />
                                    </DemoContainer>
                                    <FormHelperText sx={{ color: 'red' }}>{helpText.pickupTimeEnd}</FormHelperText>
                                </LocalizationProvider>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl
                                variant="standard"
                            >
                                <FormLabel component="commonTransiration"><h3>4)	常用的交通方式：</h3></FormLabel>
                                <RadioGroup
                                    name='commonTransirtation'
                                    value={survey.surveyNormalRd.commonTransirtation}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        sx={{ color: "black" }}
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
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="校車" />
                                        }
                                        label="校車"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="巴士" />
                                        }
                                        label="巴士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="輕軌" />
                                        }
                                        label="輕軌"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="一般的士" />
                                        }
                                        label="一般的士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="電召的士" />
                                        }
                                        label="電召的士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="步行" />
                                        }
                                        label="步行"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="其他" />
                                        }
                                        label="其他"
                                        sx={{ color: "black" }}
                                    />
                                    {survey.surveyNormalRd.commonTransirtation === "其他" ?
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
                                <FormHelperText sx={{ color: 'red' }}>{helpText.commonTransirtation}</FormHelperText>
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
                            <Button onClick={handleNextButton}>
                                next
                            </Button>
                        </div>

                    </div>
                    :
                    null
            }
        </main>
    )

}
export default App;
