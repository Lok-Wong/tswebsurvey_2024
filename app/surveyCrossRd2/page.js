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
import { useRouter } from 'next/navigation';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import FormHelperText from '@mui/material/FormHelperText';
import MapComponent from '@/app/mapTesting/page';

function App() {
    const router = useRouter();
    const blanksurvey = {
        startTime: new Date(),
        leaveShcoolTime: "",
        pickup: 999,
        otherOfPickup: 999,
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

    const blankHelpText = {}
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [key, setKey] = React.useState(0)

    const handleHelpText = (eventName, errorText) => {
        const objectName = eventName
        setHelpText((prevState) => (
            {
                ...prevState,
                [objectName]: errorText
            }
        ))
    }

    const getMapSelectedText = () => {

        if (survey.directToPortNo.address.method == "input") {
            return (
                survey.directToPortNo.address.name
            )
        }

        if (survey.directToPortNo.address.method == "click") {
            return (
                survey.directToPortNo.address.regeocode.formattedAddress
            )
        }

        if (survey.directToPortNo.address.method == "autoComplete") {
            return (
                survey.directToPortNo.address.poi.name
            )
        }

        return null
    }

    const handleCustomAddress = (address, type) => {
        console.log("address", address)
        setSurvey((prevState) => ({
            ...prevState,
            directToPortNo: {
                ...prevState.directToPortNo,
                address: null,
            }
        }))

        if (type == "input") {
            setSurvey((prevState) => ({
                ...prevState,
                directToPortNo: {
                    ...prevState.directToPortNo,
                    address: {
                        ...prevState.directToPortNo.address,
                        name: address,
                        method: type
                    }
                }

            }))
            return
        }

        setSurvey((prevState) => ({
            ...prevState,
            directToPortNo: {
                ...prevState.directToPortNo,
                address: address,
            }
        }))

        setSurvey((prevState) => ({
            ...prevState,
            directToPortNo: {
                ...prevState.directToPortNo,
                address: {
                    ...prevState.directToPortNo.address,
                    method: type
                }
            }
        }))
    }

    const clearbackHomeData = () => {
        if (survey.directToPort == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortYes: {
                        arrivalTime: "",
                        transirtation: 999,
                        othertransirtation: 999,
                    },
                }
            )
            )
        };

        if (survey.directToPort == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortNo: {
                        address: 999,
                        arrivalTime: "",
                        transirtation: 999,
                        othertransirtation: 999,
                    },
                }
            )
            )
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
            const local_storage_path_list = sessionStorage.getItem('pathList') ? sessionStorage.getItem('pathList').split(",") : null;
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
                [objectName]: event.target.value
            }
        )

        )
    };

    const handleChangedirectPort = (event) => {
        if (survey.directToPort == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortYes: {
                        ...prevState.directToPortYes,
                        [event.target.name]: event.target.value
                    }
                }
            )
            )
        };

        if (survey.directToPort == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortNo: {
                        ...prevState.directToPortNo,
                        [event.target.name]: event.target.value
                    }
                }
            )
            )
        };
    }

    const handleTimeChange = (event, name) => {
        if (name === "arrivalTime") {
            if (survey.directToPort === "是") {
                setSurvey((prevState) => ({
                    ...prevState,
                    directToPortYes: {
                        ...prevState.directToPortYes,
                        [name]: event.$d
                    }
                }))
                return
            }

            if (survey.directToPort === "否") {
                setSurvey((prevState) => ({
                    ...prevState,
                    directToPortNo: {
                        ...prevState.directToPortNo,
                        [name]: event.$d
                    }
                }))
                return
            }
        }

        setSurvey((prevState) => ({
            ...prevState,
            [name]: event.$d
        })
        )

    };


    const handleNextButton = (event) => {
        if (survey.leaveShcoolTime == "") {
            handleHelpText("leaveShcoolTime", "請選擇離校時間")
            return
        }
        if (survey.pickup == 999) {
            handleHelpText("pickup", "請選擇是否有人接送")
            return
        }
        if (survey.pickup == "其他監護人" && survey.otherOfPickup == 999) {
            handleHelpText("pickup", "請填寫其他監護人")
            return
        }
        if (survey.directToPort == 999) {
            handleHelpText("directToPort", "請選擇是否直接前往通關口岸")
            return
        }
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
        setHelpText(blankHelpText)
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        clearbackHomeData()
    }, [survey.directToPort])

    React.useEffect(() => {
        if (survey.pickup != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfPickup: 999
                }
            ))
        }

        if (survey.directToPortYes.transirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortYes: {
                        ...prevState.directToPortYes,
                        othertransirtation: 999
                    }
                }
            ))
        }

        if (survey.directToPortNo.transirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortNo: {
                        ...prevState.directToPortNo,
                        othertransirtation: 999
                    }
                }
            ))
        }


    }, [survey.pickup,
    survey.directToPortNo.transirtation,
    survey.directToPortYes.transirtation])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyCrossRd") {
            router.replace("./")
        }
    }, [])

    React.useEffect(() => {
        setKey((k) => k + 1)
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
        sessionStorage.setItem('pathList', copyArr)
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

                    <div>
                        <h2 style={{ color: "#000000" }}>
                            4.2	一般情況下，學生下午放學的情況
                        </h2>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="leaveShcoolTime-label"><h3>7)	離校時間（24小時制）：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.leaveShcoolTime)}
                                            onChange={(event) => handleTimeChange(event, "leaveShcoolTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveShcoolTime}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>8)    有沒有人接送：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="學生自行上學" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社/託管中心" control={<Radio />} label="補習社/託管中心" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他（如︰監護人、親戚等）" />
                                    {survey.pickup === "其他" ?
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
                                                value={survey.otherOfPickup == 999 ? null : survey.otherOfPickup}
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
                            <FormControl>
                                <FormLabel id="portForHome-label"><h3>9)	回家使用的通關口岸：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForHome-label"
                                    name="portForHome"
                                    value={survey.portForHome}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="關閘" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂" control={<Radio />} label="青茂" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳" control={<Radio />} label="港珠澳" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴" control={<Radio />} label="橫琴" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港" control={<Radio />} label="內港" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />

                                    {survey.portForHome === "其他" ?
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
                                                value={survey.portForHome == 999 ? null : survey.portForHome}
                                            />
                                        </Box>
                                        :
                                        null
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.portForHome}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="directToPort-label"><h3>10)	放學是否直接前往通關口岸？</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="directToPort-label"
                                    name="directToPort"
                                    value={survey.directToPort}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="是" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="否" />

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.directToPort}</FormHelperText>
                            </FormControl>
                        </div>

                        {
                            survey.directToPort == "是" ?
                                <div>
                                    <div className={styles.question}>
                                        <FormControl className={styles.inlineQuestion}>
                                            <FormLabel id="arrivalPortTime-label"><h3>	到達口岸的時間（24小時制）</h3></FormLabel>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                                    <DesktopTimePicker
                                                        ampm={false}
                                                        value={dayjs(survey.directToPortYes.arrivalTime)}
                                                        onChange={(event) => handleTimeChange(event, "arrivalTime")}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalPortTime}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl
                                        >
                                            <FormLabel
                                                component="transirtation"><h3>	前往口岸的主要交通方式：</h3></FormLabel>
                                            <RadioGroup
                                                name='transirtation'
                                                value={survey.directToPortYes.transirtation}
                                                onChange={handleChangedirectPort}
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
                                                        <Radio value="公共巴士" />
                                                    }
                                                    label="公共巴士"
                                                    sx={{ color: "black" }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio value="復康巴士" />
                                                    }
                                                    label="復康巴士"
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
                                                {survey.directToPortYes.transirtation === "其他" ?
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
                                                            name='othertransirtation'
                                                            onChange={handleChangedirectPort}
                                                            value={survey.directToPortYes.othertransirtation == 999 ? null : survey.otherOfCommonTransirtation}
                                                        />
                                                    </Box>
                                                    :
                                                    null
                                                }

                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.commonTransirtation}</FormHelperText>
                                        </FormControl>
                                    </div>

                                </div>
                                :
                                survey.directToPort == "否" ?
                                    <div key={key}>
                                        <div className={styles.question}>
                                            <FormControl>
                                                <FormLabel id="address-label"><h3>2)	放學後去了哪裏（地標）：</h3></FormLabel>
                                                <Box>
                                                    <p className={styles.mapHitText}>
                                                        {
                                                            getMapSelectedText() ? "已選擇目的地： " + getMapSelectedText() : "*請在以下地圖點選目的地或輸入相關地址後按下確定"
                                                        }
                                                    </p>


                                                </Box>
                                                {/* <Button onClick={() => { setKey((k) => k + 1) }}>
                                                    按下打開地圖
                                                </Button> */}
                                                <div>
                                                    <MapComponent handleCustomAddress={handleCustomAddress} />
                                                </div>

                                                <FormHelperText sx={{ color: 'red' }}>{helpText.address}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="directToPortNoarrivalTime-label"><h3>	到達時間（24小時制）</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <DesktopTimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.directToPortNo.arrivalTime)}
                                                            onChange={(event) => handleTimeChange(event, "arrivalTime")}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalPortTime}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className={styles.question}>
                                            <FormControl
                                            >
                                                <FormLabel
                                                    component="transirtation"><h3>	主要交通方式：</h3></FormLabel>
                                                <RadioGroup
                                                    name='transirtation'
                                                    value={survey.directToPortNo.transirtation}
                                                    onChange={handleChangedirectPort}
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
                                                            <Radio value="公共巴士" />
                                                        }
                                                        label="公共巴士"
                                                        sx={{ color: "black" }}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Radio value="復康巴士" />
                                                        }
                                                        label="復康巴士"
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
                                                    {survey.directToPortNo.transirtation === "其他" ?
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
                                                                name='othertransirtation'
                                                                onChange={handleChangedirectPort}
                                                                value={survey.directToPortNo.othertransirtation == 999 ? null : survey.otherOfCommonTransirtation}
                                                            />
                                                        </Box>
                                                        :
                                                        null
                                                    }

                                                </RadioGroup>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.commonTransirtation}</FormHelperText>
                                            </FormControl>
                                        </div>

                                    </div>
                                    :
                                    null
                        }
                    </div>
                    : null
            }
            <div className={styles.buttonGroup}>
                <Button className={styles.buttonStyle} onClick={() => router.back()}>
                    上一頁
                </Button>
                <Button className={styles.buttonStyle} onClick={handleNextButton}>
                    下一頁
                </Button>
            </div>
        </main>
    )

}
export default App;
