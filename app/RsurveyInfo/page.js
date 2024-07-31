'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';
import { Box, TextField } from '@mui/material';

function App() {
    const router = useRouter();
    const [progressBarValue, setProgressBarValue] = React.useState(10)
    const [schoolNameSelectType, setSchoolNameSelectType] = React.useState("")
    const [ages, setAges] = React.useState()
    const [salarys, setSalarys] = React.useState()
    const [walkTimes, setWalkTimes] = React.useState()
    const [days, setDays] = React.useState(new Date())

    const blanksurvey = {
        gender: 999,
        age: 999,
        workingStatus: 999,
        degree: 999,
        salary: 999,
        licenseCount: 999,
        commonTransportation: 999,
        IntentionOfPurchaseCar: 999,
        otherOfcommonTransportation: 999,
        walkTime: 999,
        OdDayType: 999,
        OdDayYes: 999,
        OdDayNo: 999,
        startTime: new Date(),
    }

    const blankHelpText = {
        classLevel: null,
        schoolName: null,
        gender: null,
        age: null,
        crossBorder: null,
    }

    // const _studentNum = React.useMemo(() => {
    //     if (typeof window !== 'undefined') {
    //         const local_storage_studentNum = sessionStorage.getItem('studentNum');
    //         if (local_storage_studentNum) {
    //             return local_storage_studentNum
    //         }
    //     }
    //     return 0;
    // }, [])

    const _initial_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_value_str = sessionStorage.getItem(('RsurveyInfo'));
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
        const objectName = event.target.name
        if (objectName === "age") {
            if (event.target.value === 85) {
                setSurvey((prevState) => (
                    {
                        ...prevState,
                        [objectName]: `>=85歲`
                    }
                ))
                return
            }

            setSurvey((prevState) => (
                {
                    ...prevState,
                    [objectName]: `${event.target.value}-${event.target.value + 4}歲`
                }
            ))
            return
        }

        if (objectName === "salary") {
            let storeValue = null;
            switch (event.target.value) {
                case 0:
                    storeValue = "<$3,000";
                    break;
                case 1:
                    storeValue = "$3,000-$3,999";
                    break;
                case 2:
                    storeValue = "$4,000-$5,999";
                    break;
                case 3:
                    storeValue = "$6,000-$7,999";
                    break;
                case 4:
                    storeValue = "$8,000-$9,999";
                    break;
                case 5:
                    storeValue = "$10,000-$11,999";
                    break;
                case 6:
                    storeValue = "$12,000-$13,999";
                    break;
                case 7:
                    storeValue = "$14,000-$14,999";
                    break;
                case 8:
                    storeValue = "$15,000-$19,999";
                    break;
                case 9:
                    storeValue = "$20,000-$39,999";
                    break;
                case 10:
                    storeValue = "$40,000-$59,999";
                    break;
                case 11:
                    storeValue = "$60,000-$99,999";
                    break;
                case 12:
                    storeValue = ">$100,000";
                    break;
            }
            setSurvey((prevState) => ({
                ...prevState,
                [objectName]: storeValue
            }))
            return
        }

        if (objectName === "walkTime") {
            if (event.target.value === 1) {
                setSurvey((prevState) => (
                    {
                        ...prevState,
                        [objectName]: `5分鐘內`
                    }
                ))
                return
            }
            if (event.target.value === 61) {
                setSurvey((prevState) => (
                    {
                        ...prevState,
                        [objectName]: `60分鐘以上`
                    }
                ))
                return
            }

            setSurvey((prevState) => (
                {
                    ...prevState,
                    [objectName]: `${event.target.value}-${event.target.value + 4}分鐘`
                }
            ))
            return
        }

        setSurvey((prevState) => (
            {
                ...prevState,
                [objectName]: event.target.value

            }
        )

        )
    };

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

    // React.useEffect(() => {
    //     if (sessionStorage.getItem('pathList') === null) {
    //         router.replace("./")
    //         return
    //     }
    //     if ((_initial_pathListe[_initial_pathListe.length - 1] == "/surveyheadholder"
    //         ||
    //         _initial_pathListe[_initial_pathListe.length - 1] == "/surveyStudentFinised")) {
    //         return
    //     } else {
    //         router.replace("./")
    //     }
    // }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(("RsurveyInfo"), JSON.stringify(survey))
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

    const handleNextButton = () => {

        sessionStorage.setItem("pathList", storedPathList)

        router.push('/RsurveyCheckOd')


    }

    React.useEffect(() => {
        if (survey.schoolArea != "999" && survey.schoolName != "999" && survey.classLevel != "999" && survey.levelType != "999" && survey.crossBorder != "999") {
            setProgressBarValue(30)
            return
        } else {
            setProgressBarValue(10)
        }
    }, [survey]);


    const getWorkingStatusContent = () => {
        if (survey.workingStatus === "就學") {
            return (
                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="degree-label"><h3>程度：</h3></FormLabel>
                        <RadioGroup
                            aria-labelledby="degree-label"
                            name="degree"
                            onChange={handleChange}
                            value={survey.degree}
                        >
                            <FormControlLabel sx={{ color: "black" }} value="大專院校及以上學校" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="大專院校及以上學校" />
                            <FormControlLabel sx={{ color: "black" }} value="職業學校學生" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="職業學校學生" />
                            <FormControlLabel sx={{ color: "black" }} value="中學" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="中學" />
                            <FormControlLabel sx={{ color: "black" }} value="小學" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="小學" />
                            <FormControlLabel sx={{ color: "black" }} value="幼稚園" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="幼稚園" />

                        </RadioGroup>
                        <FormHelperText sx={{ color: 'red' }}>{helpText.degree}</FormHelperText>
                    </FormControl>
                </div>
            )
        }

        if (survey.workingStatus === "就業") {
            return (
                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="job-categories-label"><h3>程度：</h3></FormLabel>
                        <RadioGroup
                            aria-labelledby="job-categories-label"
                            name="jobCategories"
                            onChange={handleChange}
                            value={survey.jobCategories}
                        >
                            <FormControlLabel sx={{ color: "black" }} value="醫療衛生及社會福利 " control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="醫療衛生及社會福利" />
                            <FormControlLabel sx={{ color: "black" }} value="文娛博彩及其他服務業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="文娛博彩及其他服務業" />
                            <FormControlLabel sx={{ color: "black" }} value="批發及零售業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="批發及零售業" />
                            <FormControlLabel sx={{ color: "black" }} value="教育" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="教育" />
                            <FormControlLabel sx={{ color: "black" }} value="公共行政及社保事務" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="公共行政及社保事務" />
                            <FormControlLabel sx={{ color: "black" }} value="運輸、倉儲及通訊業 " control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="運輸、倉儲及通訊業" />
                            <FormControlLabel sx={{ color: "black" }} value="酒店" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="酒店" />
                            <FormControlLabel sx={{ color: "black" }} value="金融業 " control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="金融業" />
                            <FormControlLabel sx={{ color: "black" }} value="不動產及工商服務業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="不動產及工商服務業" />
                            <FormControlLabel sx={{ color: "black" }} value="水電及氣體生產供應業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="水電及氣體生產供應業" />
                            <FormControlLabel sx={{ color: "black" }} value="飲食業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="飲食業" />
                            <FormControlLabel sx={{ color: "black" }} value="製造業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="製造業" />
                            <FormControlLabel sx={{ color: "black" }} value="家務工作" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="家務工作" />
                            <FormControlLabel sx={{ color: "black" }} value="建築業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="建築業" />
                            <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="其他" />

                        </RadioGroup>
                        <FormHelperText sx={{ color: 'red' }}>{helpText.jobCategories}</FormHelperText>
                    </FormControl>
                </div>
            )
        }
    }

    const getAgeValueLabel = (value) => {
        if (value === 85) {
            return ">=85歲"
        }
        return (`${value}-${value + 4}歲`)
    }

    const getSalaryValueLabel = (value) => {
        switch (value) {
            case 0:
                return "<$3,000";
            case 1:
                return "$3,000-$3,999";
            case 2:
                return "$4,000-$5,999";
            case 3:
                return "$6,000-$7,999";
            case 4:
                return "$8,000-$9,999";
            case 5:
                return "$10,000-$11,999";
            case 6:
                return "$12,000-$13,999";
            case 7:
                return "$14,000-$14,999";
            case 8:
                return "$15,000-$19,999";
            case 9:
                return "$20,000-$39,999";
            case 10:
                return "$40,000-$59,999";
            case 11:
                return "$60,000-$99,999";
            case 12:
                return ">$100,000";
        }
    }

    const getWalkTime = (value) => {
        if (value === 1) {
            return "5分鐘內"
        }
        if (value === 61) {
            return "60分鐘以上"
        }

        return (`${value}-${value + 4}分鐘`)
    }

    const getTime = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}/${month}/${day - 1} 03:00:00 至 ${year}/${month}/${day} 03:00:00`;
    }

    const getOdDayType = (booleans) => {
        if (booleans === "有") {
            return (
                <FormControl>
                    <FormLabel
                        id="OdDayYes-label">
                        <h3>
                            11) 昨天是你的甚麼日子?
                        </h3>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="OdDayYes-label"
                        name="OdDayYes"
                        onChange={handleChange}
                        value={survey.OdDayYes}
                    >
                        <FormControlLabel sx={{ color: "black" }} value="上班及上學日" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="上班及上學日" />
                        <FormControlLabel sx={{ color: "black" }} value="上班日" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="上班日" />
                        <FormControlLabel sx={{ color: "black" }} value="上學日" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="上學日" />
                        <FormControlLabel sx={{ color: "black" }} value="放假日" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="放假日" />
                        <FormControlLabel sx={{ color: "black" }} value="請假日" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="請假日" />
                        <FormControlLabel sx={{ color: "black" }} value="無薪假日" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="無薪假日" />

                    </RadioGroup>
                    <FormHelperText sx={{ color: 'red' }}>{helpText.OdDayYes}</FormHelperText>
                </FormControl>
            )
        }
        if (booleans === "沒有") {
            return (
                <FormControl>
                    <FormLabel
                        id="OdDayNo-label">
                        <h3>
                            11) 沒有行程的原因是？
                        </h3>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="OdDayNo-label"
                        name="OdDayNo"
                        onChange={handleChange}
                        value={survey.OdDayNo}
                    >
                        <FormControlLabel sx={{ color: "black" }} value="居家辨公" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="居家辨公" />
                        <FormControlLabel sx={{ color: "black" }} value="休假" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="休假" />
                        <FormControlLabel sx={{ color: "black" }} value="在家休息" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="在家休息" />
                        <FormControlLabel sx={{ color: "black" }} value="天氣" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="天氣" />
                        <FormControlLabel sx={{ color: "black" }} value="生病臥床" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="生病臥床" />
                        <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="其他" />

                    </RadioGroup>
                    <FormHelperText sx={{ color: 'red' }}>{helpText.OdDayNo}</FormHelperText>
                </FormControl>
            )
        }
    }



    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000", marginBottom: "1vh" }}>
                            二、個人資料
                        </h1>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="gender-label"><h3>5)  性別：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="gender-label"
                                    name="gender"
                                    onChange={handleChange}
                                    value={survey.gender}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="男" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="男" />
                                    <FormControlLabel sx={{ color: "black" }} value="女" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="女" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.gender}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="person-od-type-label"><h3>2) 閣下屬於哪種出行人群：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="person-od-type-label"
                                    value={survey.personOdType}
                                    name="personOdType"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="居民" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="居民" />
                                    <FormControlLabel sx={{ color: "black" }} value="外地僱員" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="外地僱員" />
                                    <FormControlLabel sx={{ color: "black" }} value="留學生" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="留學生" />
                                    <FormControlLabel sx={{ color: "black" }} value="旅客" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="旅客" />

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.personOdType}</FormHelperText>

                            </FormControl>
                        </div>

                        {
                            survey.personOdType == "旅客" ?
                                <p>不符合，感謝參與。</p>
                                :
                                <div>
                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="person-od-type-label"><h3>2.1) 居住地點（地標）：</h3></FormLabel>

                                            <p>
                                                打開地圖，選擇您的居住地點
                                            </p>

                                            <FormLabel id="person-od-type-label"><h3>2.2) 工作地點（地標）：</h3></FormLabel>

                                            <p>
                                                打開地圖，選擇您的居住地點
                                            </p>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="age-label"><h3>3)  年齡：</h3></FormLabel>
                                            <Box sx={{ width: "400%" }}>
                                                <Slider
                                                    sx={{ color: "#3E848C" }}
                                                    min={0}
                                                    max={85}
                                                    step={5}
                                                    valueLabelDisplay="auto"
                                                    aria-label="age"
                                                    name='age'
                                                    value={ages}
                                                    onChange={(value) => { handleChange(value), setAges(value.target.value) }}
                                                    valueLabelFormat={getAgeValueLabel}
                                                />
                                            </Box>
                                           
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.age}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="working-status-label"><h3>4)  就業／就學情況是（擇一主要身份）：</h3></FormLabel>
                                            <RadioGroup
                                                id="workingStatus"
                                                aria-labelledby="working-status-label"
                                                name="workingStatus"
                                                onChange={handleChange}
                                                value={survey.workingStatus}
                                            >
                                                <FormControlLabel sx={{ color: "black" }} value="就學" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="就學" />
                                                <FormControlLabel sx={{ color: "black" }} value="就業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="就業" />
                                                <FormControlLabel sx={{ color: "black" }} value="待業" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="待業" />
                                                <FormControlLabel sx={{ color: "black" }} value="無業（家庭主婦／退休）" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="無業（家庭主婦／退休）" />

                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.workingStatus}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    {getWorkingStatusContent()}

                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="salary-label"><h3>5) 閣下的月收入（或零用錢）是：</h3></FormLabel>
                                            <Box>
                                                <Slider
                                                    sx={{ color: "#3E848C" }}
                                                    min={0}
                                                    max={12}
                                                    step={1}
                                                    valueLabelDisplay="auto"
                                                    aria-label="salary"
                                                    name='salary'
                                                    value={salarys}
                                                    onChange={(value) => { handleChange(value), setSalarys(value.target.value) }}
                                                    valueLabelFormat={getSalaryValueLabel}
                                                />
                                            </Box>

                                            <FormHelperText sx={{ color: 'red' }}>{helpText.salary}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="license-count-label"><h3>6) 請問您有沒有電單車或私家車車牌（駕駛執照）？</h3></FormLabel>
                                            <RadioGroup
                                                id="licenseCount"
                                                aria-labelledby="license-count-label"
                                                name="licenseCount"
                                                onChange={handleChange}
                                                value={survey.licenseCount}
                                            >
                                                <FormControlLabel sx={{ color: "black" }} value="無" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="無" />
                                                <FormControlLabel sx={{ color: "black" }} value="私家車" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="私家車" />
                                                <FormControlLabel sx={{ color: "black" }} value="電單車" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="電單車" />
                                                <FormControlLabel sx={{ color: "black" }} value="都有" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="都有" />

                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.licenseCount}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="intention-purchase-car-label"><h3>7) 未來年是否有購車意願？</h3></FormLabel>
                                            <RadioGroup
                                                id="IntentionOfPurchaseCar"
                                                aria-labelledby="intention-purchase-car-label"
                                                name="IntentionOfPurchaseCar"
                                                onChange={handleChange}
                                                value={survey.IntentionOfPurchaseCar}
                                            >
                                                <FormControlLabel sx={{ color: "black" }} value="無" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="無" />
                                                <FormControlLabel sx={{ color: "black" }} value="1年內" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="1年內" />
                                                <FormControlLabel sx={{ color: "black" }} value="2年內" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="2年內" />
                                                <FormControlLabel sx={{ color: "black" }} value="3年內" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="3年內" />
                                                <FormControlLabel sx={{ color: "black" }} value="3年以上" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="3年以上" />

                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.IntentionOfPurchaseCar}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl
                                            variant="standard"
                                        >
                                            <FormLabel component="commonTransportation"><h3>8)	請問您上班或上學最常用的出行方式是：</h3></FormLabel>
                                            <RadioGroup
                                                name='commonTransportation'
                                                value={survey.commonTransportation}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                            value="電單車（駕駛）"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="電單車（駕駛）"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="私家車（駕駛）"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="私家車（駕駛）"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="電單車（乘客） "
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="電單車（乘客） "
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    sx={{ color: "black" }}
                                                    control={
                                                        <Radio value="私家車（乘客） "
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="私家車（乘客） "
                                                />
                                                <FormControlLabel
                                                    control={

                                                        <Radio value="巴士"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="巴士"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="輕軌"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="輕軌"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="一般的士"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="一般的士"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="電召的士"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="電召的士"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="員工巴士"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="員工巴士"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="校車"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="校車"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="娛樂場接駁車"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="娛樂場接駁車"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="步行"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="步行"
                                                    sx={{ color: "black" }}
                                                />

                                                <FormControlLabel
                                                    control={
                                                        <Radio value="其他"
                                                            sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }}
                                                        />
                                                    }
                                                    label="其他"
                                                    sx={{ color: "black" }}
                                                />
                                                {survey.commonTransportation === "其他" ?
                                                    <Box
                                                        component="form"
                                                        sx={{
                                                            '& > :not(style)': { m: 0.5, width: '10rem' },
                                                        }}
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                                                        <TextField
                                                            inputProps={{ maxLength: 10 }}
                                                            id="commonTransportation-other-textfill"
                                                            label="其他"
                                                            variant="filled"
                                                            name='otherOfcommonTransportation'
                                                            onChange={handleChange}
                                                            value={survey.otherOfcommonTransportation == 999 ? null : survey.otherOfcommonTransportation}
                                                        />
                                                    </Box>
                                                    :
                                                    null
                                                }

                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.commonTransirtation}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="walkTime-label"><h3>9) 如果要選擇步行前往目的地，而不使用交通工具，您能夠接受的步行時間上限是：</h3></FormLabel>
                                            <Box>
                                                <Slider
                                                    sx={{ color: "#3E848C" }}
                                                    min={1}
                                                    max={61}
                                                    step={5}
                                                    valueLabelDisplay="auto"
                                                    aria-label="walkTime"
                                                    name='walkTime'
                                                    value={walkTimes}
                                                    onChange={(value) => { handleChange(value), setWalkTimes(value.target.value) }}
                                                    valueLabelFormat={getWalkTime}
                                                />
                                            </Box>

                                            <FormHelperText sx={{ color: 'red' }}>{helpText.walkTime}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel
                                                id="OdDayType-label">
                                                <h3> 10) {getTime(days)} <br />
                                                    （即昨天凌晨3時 至 今天凌晨3時） <br />
                                                    你有沒有出行行程?
                                                </h3>
                                            </FormLabel>
                                            <RadioGroup
                                                aria-labelledby="OdDayType-label"
                                                name="OdDayType"
                                                onChange={handleChange}
                                                value={survey.OdDayType}
                                            >
                                                <FormControlLabel sx={{ color: "black" }} value="有" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="有" />
                                                <FormControlLabel sx={{ color: "black" }} value="沒有" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="沒有" />
                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.OdDayType}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        {getOdDayType(survey.OdDayType)}
                                    </div>
                                </div>

                        }

                    </div>
                    :
                    null
            }

            <div className={styles.buttonGroup}>
                <LinearProgresss values={progressBarValue} />
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>

                    <Button className={styles.buttonStyle}
                        onClick={() => router.back()}>
                        上一頁
                    </Button>

                    <Button className={styles.buttonStyle}
                        onClick={handleNextButton}>
                        {
                            survey.personOdType == "旅客" || survey.OdDayType == "沒有" ?
                                "完成"
                                :
                                "下一頁"
                        }
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


