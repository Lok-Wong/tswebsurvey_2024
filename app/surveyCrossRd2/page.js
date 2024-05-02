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
        surveyCrossRd2: {
            startTime: new Date(),
            leaveShcoolTime: 999,
            pickup: 999,
            otherOfPickup: 999,
            directToPort: 999,
            portForHome: 999,
            otherOfportForHome: 999,
            commonTransirtation: 999,
            otherOfCommonTransirtation: 999,
            arrivalPortTime: 999,
            arrivalHomeTime: 999,
        }
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

            const local_storage_value_str = sessionStorage.getItem(_studentNum + 'crossRd2');
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

    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)

    const [survey, setSurvey] = React.useState(_initial_value)


    const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                surveyCrossRd2: {
                    ...prevState.surveyCrossRd2,
                    [objectName]: event.target.value
                }
            }
        )

        )
    };

    const handleTimeChange = (event, name) => {
        setSurvey((prevState) => ({
            ...prevState,
            surveyCrossRd2: {
                ...prevState.surveyCrossRd2,
                [name]: event.$d
            }
        })
        )
    };

    const handleNextButton = (event) => {
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/surveyBadWeather')
    }

    

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(_studentNum + 'crossRd2', JSON.stringify(survey))
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (survey.surveyCrossRd2.pickup != "其他監護人") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyCrossRd2: {
                        ...prevState.surveyCrossRd2,
                        otherOfPickup: 999
                    }
                }
            ))
        }

        if (survey.surveyCrossRd2.commonTransirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyCrossRd2: {
                        ...prevState.surveyCrossRd2,
                        otherOfCommonTransirtation: 999
                    }
                }
            ))
        }

        if (survey.surveyCrossRd2.otherOfportForHome != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyCrossRd2: {
                        ...prevState.surveyCrossRd2,
                        otherOfportForHome: 999
                    }
                }
            ))
        }


    }, [survey.surveyCrossRd2.pickup,
    survey.surveyCrossRd2.commonTransirtation,
    survey.surveyCrossRd2.otherOfportForHome])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyCrossRd") {
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



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div style={{ minWidth: "100%" }}>
                        <h2 style={{ color: "#000000" }}>
                            4.2	一般情況下，學生下午放學的情況
                        </h2>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="leaveShcoolTime-label"><h3>7)	離校時間（24小時制）：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyCrossRd2.leaveShcoolTime)}
                                            onChange={(event) => handleTimeChange(event, "leaveShcoolTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>8)    有沒有人接送：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.surveyCrossRd2.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="學生自行上學" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社" control={<Radio />} label="補習社" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他監護人" control={<Radio />} label="其他監護人" />
                                    {survey.surveyCrossRd2.pickup === "其他監護人" ?
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
                                                value={survey.surveyCrossRd2.otherOfPickup == 999 ? null : survey.surveyCrossRd2.otherOfPickup}
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
                                <FormLabel id="directToPort-label"><h3>9)	放學是否直接前往通關口岸？</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="directToPort-label"
                                    name="directToPort"
                                    value={survey.surveyCrossRd2.directToPort}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="是" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="否" />

                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="portForHome-label"><h3>10)	回家使用的通關口岸：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForHome-label"
                                    name="portForHome"
                                    value={survey.surveyCrossRd2.portForHome}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="關閘" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂" control={<Radio />} label="青茂" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳" control={<Radio />} label="港珠澳" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴" control={<Radio />} label="橫琴" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港" control={<Radio />} label="內港" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />

                                    {survey.surveyCrossRd2.portForHome === "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                name='otherOfportForHome'
                                                id="otherOfportForHome-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.surveyCrossRd2.portForHome == 999 ? null : survey.surveyCrossRd2.portForHome}
                                            />
                                        </Box>
                                        :
                                        null
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl
                            >
                                <FormLabel
                                    component="commonTransiration"><h3>11)	過關後，前往學校的主要交通方式：</h3></FormLabel>
                                <RadioGroup
                                    name='commonTransirtation'
                                    value={survey.surveyCrossRd2.commonTransirtation}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        control={
                                            <Radio value="電單車（乘客）" />
                                        }
                                        label="電單車（乘客）"
                                        sx={{ color: "black" }}
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
                                    {survey.surveyCrossRd2.commonTransirtation === "其他" ?
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
                                                value={survey.surveyCrossRd2.otherOfCommonTransirtation == 999 ? null : survey.surveyCrossRd2.otherOfCommonTransirtation}
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
                                <FormLabel id="arrivalPortTime-label"><h3>12)	到達口岸的時間（24小時制）</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyCrossRd2.TimeEndToMacau)}
                                            onChange={(event) => handleTimeChange(event, "arrivalPortTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="arrivalHomeTime-label"><h3>13)	回到家的時間（24小時制）：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyCrossRd2.arrivalTimeToSchool)}
                                            onChange={(event) => handleTimeChange(event, "arrivalHomeTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
                    : null
            }
        </main>
    )

}
export default App;
