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
        surveyNormalRd2: {
            startTime: new Date(),
            leaveSchoolTime: 999,
            otherleavePickUp: 999,
            leavePickUp: 999,
            directToHomeState: 999,
            directToHomeYes: {
                arivalHomeTime: 999,
                arivalHomeTransition: 999,
                otherarivalHomeTransition: 999
            },
            directToHomeNo: {
                leaveDestination: 999,
                leaveDestinationTime: 999,
                leaveDestinationTransition: 999,
                otherLeaveDestinationTransition: 999,
                destinationBackHomeStartTime: 999,
                destinationBackHomeEndTime: 999,
                leaveDestinationBackHomeTransition: 999,
                otherLeaveDestinationBackHomeTransition: 999
            }
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

            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'normalRd2'));
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
    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)

    const handleChangeBackHomeTime = (event, name) => {
        if (survey.surveyNormalRd2.directToHomeState == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeYes: {
                            ...prevState.surveyNormalRd2.directToHomeYes,
                            [name]: event.$d
                        }
                    }
                }
            )
            )
        };

        if (survey.surveyNormalRd2.directToHomeState == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeNo: {
                            ...prevState.surveyNormalRd2.directToHomeNo,
                            [name]: event.$d
                        }
                    }
                }
            )
            )
        };
    }

    const handleChangeBackHome = (event) => {
        if (survey.surveyNormalRd2.directToHomeState == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeYes: {
                            ...prevState.surveyNormalRd2.directToHomeYes,
                            [event.target.name]: event.target.value
                        }
                    }
                }
            )
            )
        };

        if (survey.surveyNormalRd2.directToHomeState == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeNo: {
                            ...prevState.surveyNormalRd2.directToHomeNo,
                            [event.target.name]: event.target.value
                        }
                    }
                }
            )
            )
        };
    }

    const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                surveyNormalRd2: {
                    ...prevState.surveyNormalRd2,
                    [objectName]: event.target.value
                }
            }
        )

        )
    };

    const handleTimeChange = (event, name) => {
        setSurvey((prevState) => ({
            ...prevState,
            surveyNormalRd2: {
                ...prevState.surveyNormalRd2,
                [name]: event.$d
            }
        })
        )
    };

    const handleNextButton = () => {
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/surveyBadWeather')
    }

    const clearbackHomeData = () => {
        if (survey.surveyNormalRd2.directToHomeState == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeYes: {
                            arivalHomeTime: 999,
                            arivalHomeTransition: 999,
                            otherarivalHomeTransition: 999
                        }
                    }
                }
            )
            )
        };

        if (survey.surveyNormalRd2.directToHomeState == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeNo: {
                            leaveDestination: 999,
                            leaveDestinationTime: 999,
                            leaveDestinationTransition: 999,
                            otherLeaveDestinationTransition: 999,
                            destinationBackHomeStartTime: 999,
                            destinationBackHomeEndTime: 999,
                            leaveDestinationBackHomeTransition: 999,
                            otherLeaveDestinationBackHomeTransition: 999
                        }
                    }
                }
            )
            )
        }
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + 'normalRd2'), JSON.stringify(survey))
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        clearbackHomeData()
    }, [survey.surveyNormalRd2.directToHomeState])

    React.useEffect(() => {
        if (survey.surveyNormalRd2.leavePickUp != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        otherleavePickUp: 999
                    }
                }
            ))
        };

        if (survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeYes: {
                            ...prevState.surveyNormalRd2.directToHomeYes,
                            otherarivalHomeTransition: 999
                        }
                    }
                }
            ))
        };

        if (survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeNo: {
                            ...prevState.surveyNormalRd2.directToHomeNo,
                            otherLeaveDestinationTransition: 999
                        }
                    }
                }
            ))
        };

        if (survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyNormalRd2: {
                        ...prevState.surveyNormalRd2,
                        directToHomeNo: {
                            ...prevState.surveyNormalRd2.directToHomeNo,
                            otherLeaveDestinationBackHomeTransition: 999
                        }
                    }
                }
            ))
        };
    }, [survey.surveyNormalRd2.leavePickUp, survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition, survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition, survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyNormalRd") {
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
                        <h1 style={{ color: "#000000" }}>
                            3.2	一般情況下，學生下午放學的情況
                        </h1>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="evening-leave-school-time-label"><h3>5) 離校時間（24小時制）:</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyNormalRd2.leaveSchoolTime)}
                                            onChange={(event) => handleTimeChange(event, "leaveSchoolTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </div>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="pickup-leave-school-way-label"><h3>6)	有沒有人接送:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-leave-school-way-label"
                                    name="leavePickUp"
                                    value={survey.surveyNormalRd2.leavePickUp}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="學生自行離校" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社" control={<Radio />} label="補習社" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />
                                    {survey.surveyNormalRd2.leavePickUp == "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                id="pickup-leave-school-way-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                name="otherleavePickUp"
                                                value={survey.surveyNormalRd2.otherleavePickUp == 999 ? "" : survey.surveyNormalRd2.otherleavePickUp}
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
                                <FormLabel id="back-home-dircetly-label"><h3>7)	放學是否直接回家？</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="back-home-dircetly-label"
                                    name="directToHomeState"
                                    onChange={handleChange}
                                    value={survey.surveyNormalRd2.directToHomeState}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="是" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="否" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {
                            survey.surveyNormalRd2.directToHomeState == "是" ?
                                <div>
                                    <div className={styles.question}>
                                        <FormControl className={styles.inlineQuestion}>
                                            <FormLabel id="arrival-home-time-label"><h3>到達家時間（24小時制）:</h3></FormLabel>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                                    <TimePicker
                                                        ampm={false}
                                                        value={dayjs(survey.surveyNormalRd2.directToHomeYes.arivalHomeTime)}
                                                        onChange={(event) => handleChangeBackHomeTime(event, "arivalHomeTime")}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </div>
                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="arrival-home-transition-label"><h3>回家主要的交通方式：</h3></FormLabel>
                                            <RadioGroup
                                                aria-labelledby="arrival-home-transition-label"
                                                name="arivalHomeTransition"
                                                onChange={handleChangeBackHome}
                                                value={survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition}
                                            >
                                                <FormControlLabel sx={{ color: "black" }} value="電單車（乘客）" control={<Radio />} label="電單車（乘客）" />
                                                <FormControlLabel sx={{ color: "black" }} value="私家車（乘客）" control={<Radio />} label="私家車（乘客）" />
                                                <FormControlLabel sx={{ color: "black" }} value="校車" control={<Radio />} label="校車" />
                                                <FormControlLabel sx={{ color: "black" }} value="巴士" control={<Radio />} label="巴士" />
                                                <FormControlLabel sx={{ color: "black" }} value="輕軌" control={<Radio />} label="輕軌" />
                                                <FormControlLabel sx={{ color: "black" }} value="一般的士" control={<Radio />} label="一般的士" />
                                                <FormControlLabel sx={{ color: "black" }} value="電召的士" control={<Radio />} label="電召的士" />
                                                <FormControlLabel sx={{ color: "black" }} value="步行" control={<Radio />} label="步行" />
                                                <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />
                                                {
                                                    survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition == "其他" ?
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <TextField
                                                                id="arrival-home-transition-other-textfill"
                                                                label="其他"
                                                                variant="filled"
                                                                onChange={handleChangeBackHome}
                                                                name="otherarivalHomeTransition"
                                                                value={survey.surveyNormalRd2.directToHomeYes.otherarivalHomeTransition == 999 ? "" : survey.surveyNormalRd2.directToHomeYes.otherarivalHomeTransition}
                                                            />
                                                        </Box>
                                                        :
                                                        null
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                :
                                survey.surveyNormalRd2.directToHomeState == "否" ?
                                    <div>
                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-label"><h3>放學後去了哪裏:</h3></FormLabel>
                                                <p>choose loaction</p>
                                                <Button>
                                                    touch and choose loaction
                                                </Button>
                                            </FormControl>
                                        </div>
                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-time-label"><h3>到達目的地時間（24小時制）:</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <TimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.surveyNormalRd2.directToHomeNo.leaveDestinationTime)}
                                                            onChange={(event) => handleChangeBackHomeTime(event, "leaveDestinationTime")}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </FormControl>
                                        </div>
                                        <div className={styles.question}>
                                            <FormControl>
                                                <FormLabel id="leave-shcool-arrival-destination-transition-label"><h3>回家主要的交通方式：</h3></FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="leave-shcool-arrival-destination-transition-label"
                                                    name="leaveDestinationTransition"
                                                    onChange={handleChangeBackHome}
                                                    value={survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition}
                                                >
                                                    <FormControlLabel sx={{ color: "black" }} value="電單車（乘客）" control={<Radio />} label="電單車（乘客）" />
                                                    <FormControlLabel sx={{ color: "black" }} value="私家車（乘客）" control={<Radio />} label="私家車（乘客）" />
                                                    <FormControlLabel sx={{ color: "black" }} value="校車" control={<Radio />} label="校車" />
                                                    <FormControlLabel sx={{ color: "black" }} value="巴士" control={<Radio />} label="巴士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="輕軌" control={<Radio />} label="輕軌" />
                                                    <FormControlLabel sx={{ color: "black" }} value="一般的士" control={<Radio />} label="一般的士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="電召的士" control={<Radio />} label="電召的士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="步行" control={<Radio />} label="步行" />
                                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />
                                                    {
                                                        survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition == "其他" ?
                                                            <Box
                                                                component="form"
                                                                sx={{
                                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                                }}
                                                                noValidate
                                                                autoComplete="off"
                                                            >
                                                                <TextField
                                                                    id="leave-shcool-arrival-destination-transition-other-textfill"
                                                                    label="其他"
                                                                    variant="filled"
                                                                    onChange={handleChangeBackHome}
                                                                    name="otherLeaveDestinationTransition"
                                                                    value={survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationTransition == 999 ? "" : survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationTransition}
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
                                                <FormLabel id="leave-shcool-arrival-destination-time-label"><h3>從上述地方出發回家的時間（24小時制）:</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <TimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.surveyNormalRd2.directToHomeNo.destinationBackHomeStartTime)}
                                                            onChange={(event) => handleChangeBackHomeTime(event, "destinationBackHomeStartTime")}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </FormControl>
                                        </div>
                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-time-label"><h3>到達家時間（24小時制）:</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <TimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.surveyNormalRd2.directToHomeNo.destinationBackHomeEndTime)}
                                                            onChange={(event) => { handleChangeBackHomeTime(event, "destinationBackHomeEndTime") }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </FormControl>
                                        </div>
                                        <div className={styles.question}>

                                            <FormControl>
                                                <FormLabel id="leave-shcool-and-back-home-transition-label"><h3>前目的地回家主要的交通方式：</h3></FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="leave-shcool-and-back-home-transition-label"
                                                    name="leaveDestinationBackHomeTransition"
                                                    value={survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition}
                                                    onChange={handleChangeBackHome}
                                                >
                                                    <FormControlLabel sx={{ color: "black" }} value="電單車（乘客）" control={<Radio />} label="電單車（乘客）" />
                                                    <FormControlLabel sx={{ color: "black" }} value="私家車（乘客）" control={<Radio />} label="私家車（乘客）" />
                                                    <FormControlLabel sx={{ color: "black" }} value="校車" control={<Radio />} label="校車" />
                                                    <FormControlLabel sx={{ color: "black" }} value="巴士" control={<Radio />} label="巴士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="輕軌" control={<Radio />} label="輕軌" />
                                                    <FormControlLabel sx={{ color: "black" }} value="一般的士" control={<Radio />} label="一般的士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="電召的士" control={<Radio />} label="電召的士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="步行" control={<Radio />} label="步行" />
                                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />
                                                    {
                                                        survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition == "其他" ?
                                                            <Box
                                                                component="form"
                                                                sx={{
                                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                                }}
                                                                noValidate
                                                                autoComplete="off"
                                                            >
                                                                <TextField
                                                                    id="leave-shcool-and-back-home-transition-other-textfill"
                                                                    label="其他"
                                                                    variant="filled"
                                                                    value={survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationBackHomeTransition == 999 ? "" : survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationBackHomeTransition}
                                                                    name='otherLeaveDestinationBackHomeTransition'
                                                                    onChange={handleChangeBackHome}
                                                                />
                                                            </Box>
                                                            :
                                                            null
                                                    }
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                    :
                                    null
                        }



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
