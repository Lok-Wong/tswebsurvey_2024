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
import { schoolName, school_type, region, schoolAddress, schoolLevel, levelType, schoolType } from '../../schoolDataEn'
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../portuguesePage.css";

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
    const [checkName, setCheckName] = React.useState()

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

    const [vCodeError, setVCodeError] = React.useState(false)

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

     const setStudentNum = React.useCallback((num) => {
        if (typeof num === 'undefined') {
            return (0)
        }

        if (num > 0) {
            const newStudentNum = num - 1
            return (newStudentNum)
        }
    }, [])


    const onBackButtonEvent = React.useCallback((e) => {
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
    }, [finishStatus])

    React.useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, [finishStatus]);

    const schoolDataFunc = (value) => {
        // alert("Before: " + sessionStorage.getItem('checkschoolName') + "\n" + (sessionStorage.getItem("checkschoolName") == ""));
        if (sessionStorage.getItem("checkschoolName") == "null") {
            sessionStorage.setItem("checkschoolName", "")
            return
        }
        if (sessionStorage.getItem("checkschoolName") == value) {
            sessionStorage.setItem("checkschoolName", value)
            // console.log("nochange")
            return
        }
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
        // console.log("changed")
        sessionStorage.setItem("checkschoolName", value)
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
        // console.log(survey);

        // if (survey.schoolType == "999") {
        //     handleAlertBarOpen()
        //     setVCodeError("2) Seleccione a modalidade de educação")
        //     handleHelpText('schoolType', "Seleccione a modalidade de educação")
        //     return
        // }

        if (survey.schoolArea == "999") {
            handleAlertBarOpen()
            setVCodeError("1) Seleccione a localização de escola")
            handleHelpText('schoolArea', "Seleccione a localização de escola")
            return
        }

        if (survey.schoolName == "999" || survey.schoolName == "" || survey.schoolName == null) {
            handleAlertBarOpen()
            setVCodeError("2) Seleccione a designação de escola")
            handleHelpText('schoolName', "Seleccione a designação de escola")
            return
        }

        if (survey.classLevel == "999" || survey.classLevel == "") {
            handleAlertBarOpen()
            setVCodeError("3) Seleccione o nível de ensino")
            handleHelpText('classLevel', "Seleccione o nível de ensino")
            return
        }

        if (survey.levelType == "999" || survey.levelType == "") {
            handleAlertBarOpen()
            setVCodeError("4) Seleccione o ano de escolaridade")
            handleHelpText('levelType', "Seleccione o ano de escolaridade")
            return
        }

        if (survey.gender == "999") {
            handleAlertBarOpen()
            setVCodeError("5) Seleccione o sexo")
            handleHelpText('gender', "Seleccione o sexo")
            return
        }

        if (survey.age == "999") {
            handleAlertBarOpen()
            setVCodeError("6) Seleccione a idade")
            handleHelpText('age', "Seleccione a idade")
            return
        }

        if (survey.crossBorder == "999") {
            handleAlertBarOpen()
            setVCodeError("7) Seleccione se a passagem fronteiriça é necessária")
            handleHelpText('crossBorder', "Seleccione se a passagem fronteiriça é necessária")
            return
        }

        if (survey.crossBorder == "否") {
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            sessionStorage.setItem((_studentNum + "crossRd"), JSON.stringify(blankSurveyCrd))
            sessionStorage.setItem((_studentNum + "crossRd2"), JSON.stringify(blankSurveyCrd2))
            router.push('/pt/surveyNormalRd')
        }
        if (survey.crossBorder == "是") {
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            sessionStorage.setItem((_studentNum + "normalRd"), JSON.stringify(blanksurveyRd))
            sessionStorage.setItem((_studentNum + "normalRd2"), JSON.stringify(blanksurveyRd2))

            router.push('/pt/surveyCrossRd')
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
                    <div className={styles.pageWidth}>
                        <h1 style={{ color: "#000000", marginBottom: "1vh" }}>
                        2. Dados pessoais do aluno
                        </h1>

                        <div key={1} className={styles.question}>
                            <FormControl>
                                <FormLabel id="school-area-label"><h3>1) Localização de escola:</h3></FormLabel>
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
                                    <FormControlLabel sx={{ color: "black" }} value="澳門" control={<Radio />} label="Macau" />
                                    <FormControlLabel sx={{ color: "black" }} value="氹仔" control={<Radio />} label="Taipa" />
                                    <FormControlLabel sx={{ color: "black" }} value="路環" control={<Radio />} label="Coloane" />
                                    {/* <FormControlLabel sx={{ color: "black" }} value="橫琴" control={<Radio />} label="橫琴" /> */}
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.schoolArea}</FormHelperText>
                            </FormControl>
                        </div>


                        <div key={2} className={styles.question}>
                            <FormControl>
                                <FormLabel id="school-name-label"><h3>2) Designação de escola: (*caso não haja opção adequada, insira a designação de escola)</h3></FormLabel>
                                    <div className={styles.schoolNameBox}>
                                    <Autocomplete
                                        sx={{
                                            m: 1
                                        }}
                                        freeSolo
                                        id="schoolName"
                                        name='schoolName'
                                        defaultValue={survey.schoolName}
                                        value={survey.schoolName == 999 ? "" : survey.schoolName}
                                        inputValue={shInputValue}
                                        onChange={(event, newValue) => {
                                            setShValue(newValue)
                                            schoolDataFunc(newValue)
                                            setSchoolNameSelectType("select")
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            if (newInputValue.length > 150) {
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
                                </div>
                                {/* </Box> */}
                                <p style={{ color: "#000000" }}>
                                    {adress[shInputValue] ?
                                        "Address: " + adress[shInputValue]
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
                                    <FormLabel id="school-type-label"><h3>2.1) Modalidade de educação</h3></FormLabel>
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

                                        <div className={styles.columnRadio}>
                                            <FormControlLabel sx={{ color: "black" }} value="正規教育" control={<Radio />} label="Educação regular" />
                                            <FormControlLabel sx={{ color: "black" }} value="回歸教育" control={<Radio />} label="Ensino recorrente" />
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
                                <FormLabel id="class-level-label"><h3>3) Nível de ensino</h3></FormLabel>
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
                                            <div className={styles.columnRadio}>
                                                <FormControlLabel key={1} sx={{ color: "black" }} value={"幼稚園"} control={<Radio />} label={"Jardim de infância"} />
                                                <FormControlLabel key={2} sx={{ color: "black" }} value={"小學"} control={<Radio />} label={"Escola primária "} />
                                                <FormControlLabel key={3} sx={{ color: "black" }} value={"中學"} control={<Radio />} label={"Escola secundária"} />
                                                <FormControlLabel key={4} sx={{ color: "black" }} value={"特殊教育"} control={<Radio />} label={"Ensino especial"} />

                                            </div>


                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.classLevel}</FormHelperText>
                            </FormControl>
                        </div>




                        <div key={5} className={styles.question} >
                            <FormControl>
                                <FormLabel id="level-type-label"><h3>4) Ano de escolaridade</h3></FormLabel>
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
                                                label={"Insira"}>
                                            </TextField>
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.levelType}</FormHelperText>
                            </FormControl>
                        </div>



                        <div key={6} className={styles.question}>
                            <FormControl>
                                <FormLabel id="gender-label"><h3>5) Sexo:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="studentofRespondents-radio-buttons-group-label"
                                    name="gender"
                                    onChange={handleChange}
                                    value={survey.gender}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="男" control={<Radio />} label="M" />
                                    <FormControlLabel sx={{ color: "black" }} value="女" control={<Radio />} label="F" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.gender}</FormHelperText>
                            </FormControl>
                        </div>

                        <div key={7} className={styles.question}>
                            <FormControl>
                                <FormLabel id="age-label"><h3>6) Idade:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="age-label"
                                    name="age"
                                    onChange={handleChange}
                                    value={survey.age}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="0~4歲" control={<Radio />} label="0~4 anos" />
                                    <FormControlLabel sx={{ color: "black" }} value="5~9歲" control={<Radio />} label="5~9 anos" />
                                    <FormControlLabel sx={{ color: "black" }} value="10~14歲" control={<Radio />} label="10~14 anos" />
                                    <FormControlLabel sx={{ color: "black" }} value="15~19歲" control={<Radio />} label="15~19 anos" />
                                    <FormControlLabel sx={{ color: "black" }} value="≥20歲 " control={<Radio />} label="≥20 anos" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.age}</FormHelperText>
                            </FormControl>
                        </div>

                        <div key={8} className={styles.question}>
                            <FormControl>
                                <FormLabel id="cross-border-student-label"><h3>7) É necessária a passagem fronteiriça para o aluno ir para a escola e regressar para a casa:</h3></FormLabel>
                                <RadioGroup
                                    id="crossBorderCheck"
                                    aria-labelledby="cross-border-student-label"
                                    name="crossBorder"
                                    onChange={handleChange}
                                    value={survey.crossBorder}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="Sim" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="Não" />
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
                        Voltar
                    </Button>

                    <Button className={styles.buttonStyle}
                        onClick={handleNextButton}>
                        Próximo
                    </Button>
                </div>
            </div>

            <Snackbar
                open={openAlertBar}
                autoHideDuration={2000}
                onClose={handleAlertBarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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


        </main >
    )

}
export default App;


