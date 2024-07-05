'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete from '@mui/material/Autocomplete';
import { schoolName, school_type, region, schoolAddress, schoolLevel, levelType, schoolType } from '../schoolData'
import LinearProgresss from '@/app/utils/progress';
function App() {
    const router = useRouter();


    const [slValue, setSlValue] = React.useState('')
    const [sltValue, setSltValue] = React.useState('')
    const [stValue, setStValue] = React.useState('')
    const [rgValue, setRgValue] = React.useState('')
    const [shValue, setShValue] = React.useState('');
    const [shInputValue, setShInputValue] = React.useState('')
    const [progressBarValue, setProgressBarValue] = React.useState(10)
    const [schoolNameSelectType, setSchoolNameSelectType] = React.useState("")
    const [studnetNumbcount, setStudentNumCount] = React.useState()

    const blanksurvey = {
        schoolType: 999,
        schoolArea: 999,
        schoolName: 999,
        classLevel: 999,
        levelType: 999,
        gender: 999,
        age: 999,
        crossBorder: 999,
        startTime: new Date(),
    }

    const blankSurveyCrd = {
        startTime: 999,
        pickup: 999,
        otherOfPickup: 999,
        TimeStartFromHome: 999,
        portForShcool: 999,
        otherOfpPortForShcool: 999,
        TimeEndToMacau: 999,
        commonTransirtation: 999,
        otherOfCommonTransirtation: 999,
        arrivalTimeToSchool: 999,
    }

    const blankSurveyCrd2 = {
        startTime: 999,
        leaveShcoolTime: "",
        pickup: 999,
        otherOfPickup: 999,
        portForHome: 999,
        directToPort: 999,
        directToPortYes: {
            arrivalTime: "",
            transirtation: 999,
            othertransirtation: 999,
        },
        directToPortNo: {
            address: 999,
            arrivalTime: "",
            transirtation: 999,
            othertransirtation: 999,
        },

    }

    const blanksurveyRd = {
        startTime: 999,
        pickup: 999,
        otherOfPickup: 999,
        pickupTimeStart: 999,
        pickupTimeEnd: 999,
        commonTransirtation: 999,
        otherOfCommonTransirtation: 999,
    }

    const blanksurveyRd2 = {
        startTime: 999,
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
            address: 999,
            leaveDestinationTime: "",
            leaveDestinationTransition: 999,
            otherLeaveDestinationTransition: 999,
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
    const [schoolData, setSchoolData] = React.useState(schoolName)
    const [school_types, setSchool_types] = React.useState(school_type)
    const [regions, setReginos] = React.useState(region)
    const [adress, setAdress] = React.useState(schoolAddress)
    const [schoolLevels, setSchoolLevels] = React.useState(schoolLevel)
    const [levelTypes, setLevelTypes] = React.useState(levelType)

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

        if (event.target.name == "schoolArea") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    schoolArea: event.target.value,
                    schoolName: 999,
                    schoolType: 999,
                    classLevel: 999,
                    levelType: 999,
                }
            )
            )
            setShValue("")
            setShInputValue("")
            setStValue("")
            setSchoolNameSelectType("")
            return
        }

        if (event.target.name == "classLevel") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    classLevel: event.target.value,
                    levelType : 999
                }
            )
            )
            return
        }


        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                [objectName]: event.target.value

            }
        )

        )
    };

    const getSchoolTypeFromSchoolName = () => {
        setSurvey((prevState) => (
            {
                ...prevState,
                schoolType: schoolType[survey.schoolName]
            }
        ))
    }

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
            router.replace("./")
            return
        }
        if ((_initial_pathListe[_initial_pathListe.length - 1] == "/surveyheadholder"
            ||
            _initial_pathListe[_initial_pathListe.length - 1] == "/surveyStudentFinised")) {
            return
        } else {
            router.replace("./")
        }
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + "studentInfo"), JSON.stringify(survey))
        setHelpText(blankHelpText)
    }, [survey])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const  setStudentNum = React.useCallback ( (num) => {
        if (typeof num === 'undefined') {
            return(0)
        }
        
        if (num > 0) {
            const newStudentNum = num - 1
            return(newStudentNum)
        }
    },[])


    const onBackButtonEvent = React.useCallback ( (e) => {
        setfinishStatus(true)

        e.preventDefault();
        if (typeof setStudentNum(_studentNum) === 'undefined') {
            sessionStorage.setItem("studentNum", 0)
        } else {
            sessionStorage.setItem("studentNum", setStudentNum(_studentNum))
        }
        // if (!finishStatus) {
        //     if (window.confirm("返回上一頁嗎?")) {
        //         setfinishStatus(true)
        const copyArr = [...storedPathList]
        const prevPath = copyArr[copyArr.length - 1]
        copyArr.splice(-1)
        sessionStorage.setItem('pathList', copyArr)
        router.back()

        //     } else {
        //         window.history.pushState(null, null, window.location.pathname);
        //         setfinishStatus(false)
        //     }
        // }
    },[finishStatus])

    React.useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, [finishStatus]);

    const schoolDataFunc = (value) => {

        setSurvey((prevState) => (
            {
                ...prevState,
                schoolName: value,
                schoolType: 999,
                classLevel: 999,
                levelType: 999,
            }
        )
        )
    }

    const getSchoolObject = (rgValue) => {
        if (rgValue == "999") {
            return
        }

        let area
        if (rgValue) {
            switch (rgValue) {
                case "澳門":
                    area = "macau";
                    break;
                case "氹仔":
                    area = "taipa";
                    break;
                case "路環":
                    area = "colane";
                    break;
            }

            return schoolData[area];
        }
    }

    const handleNextButton = () => {

        if (survey.schoolType == "999") {
            handleHelpText('schoolType', "請選擇教育類型")
            return
        }

        if (survey.schoolArea == "999") {
            handleHelpText('schoolArea', "請選擇學校所屬地區")
            return
        }

        if (survey.schoolName == "999" || survey.schoolName == "" || survey.schoolName == null) {
            handleHelpText('schoolName', "請選擇學校名稱")
            return
        }

        if (survey.classLevel == "999" || survey.classLevel == "") {
            handleHelpText('classLevel', "請選擇就讀程度")
            return
        }

        if (survey.levelType == "999" || survey.levelType == "") {
            handleHelpText('levelType', "請選擇就讀年級")
            return
        }

        if (survey.gender == "999") {
            handleHelpText('gender', "請選擇性別")
            return
        }

        if (survey.age == "999") {
            handleHelpText('age', "請選擇年齡")
            return
        }

        if (survey.crossBorder == "999") {
            handleHelpText('crossBorder', "請選擇是否需跨境")
            return
        }

        if (survey.crossBorder == "否") {
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            sessionStorage.setItem((_studentNum + "crossRd"), JSON.stringify(blankSurveyCrd))
            sessionStorage.setItem((_studentNum + "crossRd2"), JSON.stringify(blankSurveyCrd2))
            router.push('/surveyNormalRd')
        }
        if (survey.crossBorder == "是") {
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            sessionStorage.setItem((_studentNum + "normalRd"), JSON.stringify(blanksurveyRd))
            sessionStorage.setItem((_studentNum + "normalRd2"), JSON.stringify(blanksurveyRd2))

            router.push('/surveyCrossRd')
        }

    }

    React.useEffect(() => {
        if (survey.schoolArea != "999" && survey.schoolName != "999" && survey.classLevel != "999" && survey.levelType != "999" && survey.crossBorder != "999") {
            setProgressBarValue(30)
            return
        } else {
            setProgressBarValue(10)
        }
    }, [survey]);

    React.useEffect(() => {
        getSchoolTypeFromSchoolName()
    }, [survey.schoolName])



    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000", marginBottom: "1vh" }}>
                            二、學生個人資料
                        </h1>

                        <div key={1} className={styles.question}>
                            <FormControl>
                                <FormLabel id="school-area-label"><h3>1)  學校所屬地區：</h3></FormLabel>
                                <RadioGroup
                                    id="school-area"
                                    aria-labelledby="school-area-label"
                                    name="schoolArea"
                                    onChange={(event) => {
                                        setRgValue(event.target.value);
                                        handleChange(event);
                                    }}
                                    value={survey.schoolArea}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="澳門" control={<Radio />} label="澳門" />
                                    <FormControlLabel sx={{ color: "black" }} value="氹仔" control={<Radio />} label="氹仔" />
                                    <FormControlLabel sx={{ color: "black" }} value="路環" control={<Radio />} label="路環" />
                                    {/* <FormControlLabel sx={{ color: "black" }} value="橫琴" control={<Radio />} label="橫琴" /> */}
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.schoolArea}</FormHelperText>
                            </FormControl>
                        </div>


                        <div key={2} className={styles.question}>
                            <FormControl>
                                <FormLabel id="school-name-label"><h3>2)  學校名稱：(*如無合適選項，請輸入學校名稱。)</h3></FormLabel>
                                <Autocomplete
                                    sx={{
                                        m: 1
                                    }}
                                    freeSolo
                                    id="schoolName"
                                    name='schoolName'
                                    value={survey.schoolName == 999 ? "" : survey.schoolName}
                                    inputValue={shInputValue}
                                    onChange={(event, newValue) => {
                                        setShValue(newValue)
                                        schoolDataFunc(newValue)
                                        setSchoolNameSelectType("select")
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        if (newInputValue.length > 30) {
                                            return
                                        }
                                        setShInputValue(newInputValue);
                                        schoolDataFunc(newInputValue);
                                        setSchoolNameSelectType("input")
                                    }}
                                    options={getSchoolObject(survey.schoolArea) ? getSchoolObject(survey.schoolArea) : []}
                                    renderInput={(params) =>
                                        <TextField
                                            inputProps={{ maxLength: 3 }}
                                            name='schoolName'
                                            {...params}
                                        >
                                        </TextField>
                                    }
                                />
                                {/* </Box> */}
                                <p style={{ color: "#000000" }}>
                                    {adress[shInputValue] ?
                                        "地址：" + adress[shInputValue]
                                        :
                                        null
                                    }
                                </p>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.schoolName}</FormHelperText>
                            </FormControl>
                        </div>

                        {schoolNameSelectType == "input" ?
                            <div key={323} className={styles.question}>
                                <FormControl>
                                    <FormLabel id="school-type-label"><h3>2.1)  教育類型：</h3></FormLabel>
                                    <RadioGroup
                                        id="school-type"
                                        aria-labelledby="school-type-label"
                                        name="schoolType"
                                        onChange={(event) => {
                                            setStValue(event.target.value);
                                            handleChange(event);
                                        }}
                                        value={survey.schoolType}
                                    >

                                        <div>
                                            <FormControlLabel sx={{ color: "black" }} value="正規教育" control={<Radio />} label="正規教育" />
                                            <FormControlLabel sx={{ color: "black" }} value="回歸教育" control={<Radio />} label="回歸教育" />
                                        </div>

                                    </RadioGroup>
                                    <FormHelperText sx={{ color: 'red' }}>{helpText.schoolType}</FormHelperText>
                                </FormControl>
                            </div>
                            :
                            null
                        }


                        <div key={4} className={styles.question} >
                            <FormControl>
                                <FormLabel id="class-level-label"><h3>3)  就讀程度：</h3></FormLabel>
                                <RadioGroup
                                    id="class-level"
                                    aria-labelledby="class-level-label"
                                    name="classLevel"
                                    onChange={(event) => {
                                        setSlValue(event.target.value);
                                        handleChange(event);
                                    }}
                                    value={survey.classLevel}
                                >
                                    {
                                        schoolLevels[shInputValue] ?
                                            schoolLevels[shInputValue].map((item, index) => {
                                                return (
                                                    <FormControlLabel key={index} sx={{ color: "black" }} value={item} control={<Radio />} label={item} />
                                                )
                                            })
                                            :
                                            <div>
                                                <FormControlLabel key={1} sx={{ color: "black" }} value={"幼稚園"} control={<Radio />} label={"幼稚園"} />
                                                <FormControlLabel key={2} sx={{ color: "black" }} value={"小學"} control={<Radio />} label={"小學"} />
                                                <FormControlLabel key={3} sx={{ color: "black" }} value={"中學"} control={<Radio />} label={"中學"} />
                                                <FormControlLabel key={4} sx={{ color: "black" }} value={"特殊教育"} control={<Radio />} label={"特殊教育"} />

                                            </div>


                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.classLevel}</FormHelperText>
                            </FormControl>
                        </div>




                        <div key={5} className={styles.question} >
                            <FormControl>
                                <FormLabel id="level-type-label"><h3>4)  就讀年級：</h3></FormLabel>
                                <RadioGroup
                                    id="level-Type"
                                    aria-labelledby="level-type-label"
                                    name="levelType"
                                    onChange={(event) => {
                                        setSltValue(event.target.value)
                                        handleChange(event);
                                    }}
                                    value={survey.levelType}
                                >
                                    {
                                        levelTypes[survey.classLevel] ?
                                            levelTypes[survey.classLevel].map((item, index) => {
                                                return (
                                                    <FormControlLabel key={index} sx={{ color: "black" }} value={item} control={<Radio />} label={item} />
                                                )
                                            })
                                            :
                                            <TextField onChange={(event) => {
                                                setSltValue(event.target.value);
                                                handleChange(event);
                                            }}
                                                inputProps={{ maxLength: 6 }}
                                                sx={{ m: 1 }}
                                                label={"請輸入"}>
                                            </TextField>
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.levelType}</FormHelperText>
                            </FormControl>
                        </div>



                        <div key={6} className={styles.question}>
                            <FormControl>
                                <FormLabel id="gender-label"><h3>5)  姓別：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="studentofRespondents-radio-buttons-group-label"
                                    name="gender"
                                    onChange={handleChange}
                                    value={survey.gender}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="男" control={<Radio />} label="男" />
                                    <FormControlLabel sx={{ color: "black" }} value="女" control={<Radio />} label="女" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.gender}</FormHelperText>
                            </FormControl>
                        </div>

                        <div key={7} className={styles.question}>
                            <FormControl>
                                <FormLabel id="age-label"><h3>6)  年齡：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="age-label"
                                    name="age"
                                    onChange={handleChange}
                                    value={survey.age}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="0~4歲" control={<Radio />} label="0~4歲" />
                                    <FormControlLabel sx={{ color: "black" }} value="5~9歲" control={<Radio />} label="5~9歲" />
                                    <FormControlLabel sx={{ color: "black" }} value="10~14歲" control={<Radio />} label="10~14歲" />
                                    <FormControlLabel sx={{ color: "black" }} value="15~19歲" control={<Radio />} label="15~19歲" />
                                    <FormControlLabel sx={{ color: "black" }} value="≥20歲 " control={<Radio />} label="≥20歲" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.age}</FormHelperText>
                            </FormControl>
                        </div>

                        <div key={8} className={styles.question}>
                            <FormControl>
                                <FormLabel id="cross-border-student-label"><h3>7)  學生上學及放學是否需跨境：</h3></FormLabel>
                                <RadioGroup
                                    id="crossBorderCheck"
                                    aria-labelledby="cross-border-student-label"
                                    name="crossBorder"
                                    onChange={handleChange}
                                    value={survey.crossBorder}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="是" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="否" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.crossBorder}</FormHelperText>
                            </FormControl>
                        </div>

                    </div>
                    :
                    null
            }

            <div key={9} className={styles.buttonGroup}>
                <LinearProgresss values={progressBarValue} />
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>

                    <Button className={styles.buttonStyle}
                        onClick={() => router.back()}>
                        上一頁
                    </Button>

                    <Button className={styles.buttonStyle}
                        onClick={handleNextButton}>
                        下一頁
                    </Button>
                </div>

            </div>

        </main >
    )

}
export default App;


