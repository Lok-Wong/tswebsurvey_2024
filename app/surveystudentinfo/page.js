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
    const router = useRouter();

    const blanksurvey = {
        surveystudentinfo: {
            classLevel: 999,
            schoolName: 999,
            gender: 999,
            age: 999,
            crossBorder: 999,
            startTime: new Date(),
        }
    }

    const blankHelpText = {
        classLevel: null,
        schoolName: null,
        gender: null,
        age: null,
        crossBorder: null,
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
            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'studentInfo'));
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
                surveystudentinfo: {
                    ...prevState.surveystudentinfo,
                    [objectName]: event.target.value
                }
            }
        )

        )
    };

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + "studentInfo"), JSON.stringify(survey))
        setHelpText(blankHelpText)
        console.log(survey)
    }, [survey])

    //   React.useEffect(()=>{
    //     history.pushState(null, null, location.href);
    //     window.onpopstate = function(event) {
    //         history.go(1);
    //     };
    //   },[history]);


    const handleNextButton = () => {

        if (survey.surveystudentinfo.classLevel == "999" || survey.surveystudentinfo.classLevel == "") {
            handleHelpText("classLevel", "請選擇年級")
            return
        }

        if (survey.surveystudentinfo.schoolName == "999" || survey.surveystudentinfo.schoolName == "") {    
            handleHelpText("schoolName", "請填寫學校名稱")
            return
        }

        if (survey.surveystudentinfo.gender == "999"){
            handleHelpText('gender', "請選擇性別")
            return
        }

        if (survey.surveystudentinfo.age == "999"){
            handleHelpText('age', "請選擇年齡")
            return
        }

        if (survey.surveystudentinfo.crossBorder == "999"){
            handleHelpText('crossBorder', "請選擇是否需跨境")
            return
        }

        if (survey.surveystudentinfo.crossBorder == "否") {
            sessionStorage.setItem("studentNum", _studentNum)
            router.push('/surveyNormalRd')
        }
        if (survey.surveystudentinfo.crossBorder == "是") {
            sessionStorage.setItem("studentNum", _studentNum)
            router.push('/surveyCrossRd')
        }

    }

    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div style={{ minWidth: "100%" }}>
                        <h1 style={{ color: "#ffffff" }}>
                            2 學生個人資料
                        </h1>
                        <div className={styles.question} >
                            <FormControl>
                                <FormLabel id="class-level-label">1)  就讀年級：</FormLabel>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '95%' },
                                    }}
                                    noValidate
                                >
                                    <TextField
                                        id="class-level"
                                        label="年級"
                                        variant="outlined"
                                        name='classLevel'
                                        onChange={handleChange}
                                        value={survey.surveystudentinfo.classLevel == 999 ? null : survey.surveystudentinfo.classLevel}
                                    />
                                </Box>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.classLevel}</FormHelperText>
                            </FormControl>

                            <FormControl sx={{ width: '50%' }}>
                                <FormLabel id="school-name-label">2)  學校名稱：</FormLabel>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '95%' },
                                    }}
                                    noValidate
                                >
                                    <TextField
                                        id="school-name"
                                        label="學校"
                                        variant="outlined"
                                        name='schoolName'
                                        onChange={handleChange}
                                        value={survey.surveystudentinfo.schoolName == 999 ? null : survey.surveystudentinfo.schoolName}
                                    />
                                </Box>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.schoolName}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="gender-label">3)  姓別：</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="studentofRespondents-radio-buttons-group-label"
                                    name="gender"
                                    onChange={handleChange}
                                    value={survey.surveystudentinfo.gender}
                                >
                                    <FormControlLabel value="男" control={<Radio />} label="男" />
                                    <FormControlLabel value="女" control={<Radio />} label="女" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.gender}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="age-label">4)  年齡</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="age-label"
                                    name="age"
                                    onChange={handleChange}
                                    value={survey.surveystudentinfo.age}
                                >
                                    <FormControlLabel value="0~4歲" control={<Radio />} label="0~4歲" />
                                    <FormControlLabel value="5~9歲" control={<Radio />} label="5~9歲" />
                                    <FormControlLabel value="10~14歲" control={<Radio />} label="10~14歲" />
                                    <FormControlLabel value="15~19歲" control={<Radio />} label="15~19歲" />
                                    <FormControlLabel value="≥20歲 " control={<Radio />} label="≥20歲" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.age}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="cross-border-student-label">5)  學生上學及放學是否需跨境：</FormLabel>
                                <RadioGroup
                                    row
                                    id="crossBorderCheck"
                                    // value = {crossBorderCheck}
                                    aria-labelledby="cross-border-student-label"
                                    name="crossBorder"
                                    onChange={handleChange}
                                    value={survey.surveystudentinfo.crossBorder}
                                >
                                    <FormControlLabel value="是" control={<Radio />} label="是" />
                                    <FormControlLabel value="否" control={<Radio />} label="否" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.crossBorder}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            {_studentNum == "0" ?
                                <Button onClick={() => router.back()}>
                                    back
                                </Button>
                                :
                                null
                            }

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
