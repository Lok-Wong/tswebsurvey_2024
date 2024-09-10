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
import FormHelperText from '@mui/material/FormHelperText';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../portuguesePage.css";

function App() {
    const router = useRouter();
    const blanksurvey = {
        startTime: new Date(),
        pickup: 999,
        otherOfPickup: 999,
        TimeStartFromHome: "",
        portForShcool: 999,
        otherOfpPortForShcool: 999,
        TimeEndToMacau: "",
        commonTransirtation: 999,
        otherOfCommonTransirtation: 999,
        arrivalTimeToSchool: "",
    }

    const blankHelpText = {}

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
            const local_storage_value_str = sessionStorage.getItem(_studentNum + 'crossRd');
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
    const [openAlertBar, setOpenAlertBar] = React.useState(false)
    const [survey, setSurvey] = React.useState(_initial_value)

    const [progressBarValue, setProgressBarValue] = React.useState(30)
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


    const handleChange = (event) => {
        // console.log(event.target.value)
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                [objectName]: event.target.value
            }
        )

        )
    };

    const handleTimeChange = (event, name) => {
        setSurvey((prevState) => ({
            ...prevState,
            [name]: event.$d
        })
        )
    };

    const handleNextButton = (event) => {
        if (survey.pickup == 999) {
            handleAlertBarOpen()
            setVCodeError("1) Seleccione uma opção")
            handleHelpText("pickup", "Seleccione uma opção")
            return
        }

        if (survey.pickup == "其他") {
            if (survey.otherOfPickup == 999 || survey.otherOfPickup == "") {
                handleAlertBarOpen()
                setVCodeError("1) Preencha outros")
                handleHelpText("pickup", "Preencha outros")
                return
            }
        }

        if (survey.TimeStartFromHome == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("2) Seleccione novamente o período de tempo")
            handleHelpText("TimeStartFromHome", "Seleccione novamente o período de tempo")
            return
        }
        if (survey.TimeStartFromHome == "") {
            handleAlertBarOpen()
            setVCodeError("2) Seleccione o período de tempo")
            handleHelpText("TimeStartFromHome", "Seleccione o período de tempo")
            return
        }

        if (survey.portForShcool == 999) {
            handleAlertBarOpen()
            setVCodeError("3) Seleccione uma opção")
            handleHelpText("portForShcool", "Seleccione uma opção")
            return
        }
        if (survey.portForShcool == "其他") {
            if (survey.otherOfpPortForShcool == 999 || survey.otherOfpPortForShcool == "") {
                handleAlertBarOpen()
                setVCodeError("3) Please fill in the other Border Checkpoint")
                handleHelpText("portForShcool", "Please fill in the other Border Checkpoint")
                return
            }
        }

        if (survey.TimeEndToMacau == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("4) Seleccione novamente o período de tempo")
            handleHelpText("TimeEndToMacau", "Seleccione novamente o período de tempo")
            return
        }
        if (survey.TimeEndToMacau == "") {
            handleAlertBarOpen()
            setVCodeError("4) Seleccione o período de tempo")
            handleHelpText("TimeEndToMacau", "Seleccione o período de tempo")
            return
        }
        if (JSON.stringify(survey.TimeStartFromHome) == JSON.stringify(survey.TimeEndToMacau)) {
            handleAlertBarOpen()
            setVCodeError(`4) Não pode ser igual à “2) Hora de partida da casa”`)
            handleHelpText("TimeEndToMacau", `Não pode ser igual à “2) Hora de partida da casa”`)
            return
        }
        if (dayjs(survey.TimeStartFromHome) > dayjs(survey.TimeEndToMacau)) {
            handleAlertBarOpen()
            setVCodeError(`4) Não pode ser mais cedo do que a “2) Hora de partida da casa”`)
            handleHelpText("TimeEndToMacau", `Não pode ser mais cedo do que a “2) Hora de partida da casa”`)
            return
        }

        if (survey.commonTransirtation == 999) {
            handleAlertBarOpen()
            setVCodeError("5) Seleccione uma opção")
            handleHelpText("commonTransirtation", "Seleccione uma opção")
            return
        }
        if (survey.commonTransirtation == "其他") {
            if (survey.otherOfCommonTransirtation == "" || survey.otherOfCommonTransirtation == 999) {
                handleAlertBarOpen()
                setVCodeError("5) Please fill in Other")
                handleHelpText("commonTransirtation", "Please fill in Other")
                return
            }
        }

        if (survey.arrivalTimeToSchool == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("6) Seleccione novamente o período de tempo")
            handleHelpText("arrivalTimeToSchool", "Seleccione novamente o período de tempo")
            return
        }
        if (survey.arrivalTimeToSchool == "") {
            handleAlertBarOpen()
            setVCodeError("6) Seleccione o período de tempo")
            handleHelpText("arrivalTimeToSchool", "Seleccione o período de tempo")
            return
        }
        if (dayjs(survey.TimeStartFromHome) > dayjs(survey.arrivalTimeToSchool)) {
            handleAlertBarOpen()
            setVCodeError(`6) Não pode ser mais cedo do que a “4) Hora de partida do posto fronteiriço da parte de Macau à escola”`)
            handleHelpText("arrivalTimeToSchool", `Não pode ser mais cedo do que a “4) Hora de partida do posto fronteiriço da parte de Macau à escola”`)
            return
        }
        if (dayjs(survey.TimeEndToMacau) > dayjs(survey.arrivalTimeToSchool)) {
            handleAlertBarOpen()
            setVCodeError(`6) Não pode ser mais cedo do que a “4) Hora de partida do posto fronteiriço da parte de Macau à escola”`)
            handleHelpText("arrivalTimeToSchool", `Não pode ser mais cedo do que a “4) Hora de partida do posto fronteiriço da parte de Macau à escola”`)
            return
        }
        if (JSON.stringify(survey.TimeEndToMacau) == JSON.stringify(survey.arrivalTimeToSchool)) {
            handleAlertBarOpen()
            setVCodeError(`6) Não pode ser igual à “4) Hora de partida do posto fronteiriço da parte de Macau à escola”`)
            handleHelpText("arrivalTimeToSchool", `Não pode ser igual à “4) Hora de partida do posto fronteiriço da parte de Macau à escola”`)
            return
        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/pt/surveyCrossRd2')
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(_studentNum + 'crossRd', JSON.stringify(survey))
        setHelpText(blankHelpText)
    }, [survey])

    React.useEffect(() => {
        if (survey.pickup != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfPickup: 999
                }
            )
            )
            return
        }

        if (survey.commonTransirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfCommonTransirtation: 999
                }
            ))
            return
        }

        if (survey.portForShcool != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfpPortForShcool: 999
                }
            ))
            return
        }


    }, [survey.pickup,
    survey.commonTransirtation,
    survey.portForShcool])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveystudentinfo") {
            router.replace("./")
        }
    }, [])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        //   if (!finishStatus) {
        //   if (window.confirm("Do you want to go back ?")) {
        //     setfinishStatus(true)
        const copyArr = [...storedPathList]
        const prevPath = copyArr[copyArr.length - 1]
        copyArr.splice(-1)
        sessionStorage.setItem('pathList', copyArr)
        router.back()
        //   } else {
        //       window.history.pushState(null, null, window.location.pathname);
        //       setfinishStatus(false)
        //   }
        //   }
    }

    React.useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        // console.log('i fire once');
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    React.useEffect(() => {
        if (survey.arrivalTimeToSchool != "") {
            setProgressBarValue(40)
            return
        } else {
            setProgressBarValue(30)
        }
    }, [survey]);

    React.useEffect(() => {
        sessionStorage.setItem('checkschoolName',null)
    }, [])



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div className={styles.pageWidth}>
                        <div>
                            <h1 style={{ color: "#000000"}}>
                            4. Deslocação casa-escola do aluno transfronteiriço
                            </h1>
                            <h2 style={{ color: "#000000" }}>
                            4.1 Deslocação à escola em regra geral
                            </h2>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>1) Na deslocação à escola, o aluno é acompanhado por:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行上學" control={<Radio />} label="Ninguém" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="Pais" />
                                    <FormControlLabel sx={{ color: "black" }} value="（外）祖父母" control={<Radio />} label="Avós" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="Trabalhador doméstico" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="Outros" />
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
                                                inputProps={{ maxLength: 10 }}
                                                name='otherOfPickup'
                                                id="pickup-other-textfill"
                                                label="Outros"
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
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="TimeStartFromHome-label"><h3>2) Hora de partida da casa (24 horas):</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker

                                            ampm={false}
                                            value={dayjs(survey.TimeStartFromHome)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                }
                                                handleTimeChange(event, "TimeStartFromHome")
                                            }
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.TimeStartFromHome}</FormHelperText>

                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="portForShcool-label"><h3>3) Posto fronteiriço utilizado para ir à escola:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForShcool-label"
                                    name="portForShcool"
                                    value={survey.portForShcool}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="Portas do Cerco" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂口岸" control={<Radio />} label="Posto fronteiriço Qingmao" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳大橋澳門口岸" control={<Radio />} label="Posto Fronteiriço de Macau da Ponte Hong Kong-Zhuhai-Macau" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴口岸澳門口岸區" control={<Radio />} label="Posto Fronteiriço de Macau do Posto fronteiriço Hengqin" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港客運碼頭" control={<Radio />} label="Terminal Marítimo de Passageiros do Porto Interior" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="Outros" />

                                    {survey.portForShcool === "其他" ?
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
                                                name='otherOfpPortForShcool'
                                                id="pickup-other-textfills"
                                                label="Outros"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.otherOfpPortForShcool == 999 ? null : survey.otherOfpPortForShcool}
                                            />
                                        </Box>
                                        :
                                        null
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.portForShcool}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="TimeEndToMacau-label"><h3>4) Hora de partida do posto fronteiriço da parte de Macau à escola após a passagem fronteiriça (24 horas):</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.TimeEndToMacau)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                };
                                                handleTimeChange(event, "TimeEndToMacau")
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.TimeEndToMacau}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl
                                variant="standard"
                            >
                                <FormLabel component="commonTransiration"><h3>5) Meio de transporte principal utilizado para ir à escola após a passagem fronteiriça:</h3></FormLabel>
                                <p className={styles.remind}>*(No caso de utilizar mais de um meio de transporte, seleccione o mais principal)</p>
                                <RadioGroup
                                    name='commonTransirtation'
                                    value={survey.commonTransirtation}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        control={
                                            <Radio value="步行" />
                                        }
                                        label="A pé"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="公共巴士" />
                                        }
                                        label="Autocarro público"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="私家車" />
                                        }
                                        label="Automóvel"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        sx={{ color: "black" }}
                                        control={
                                            <Radio value="電單車" />
                                        }
                                        label="Mota"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="輕軌" />
                                        }
                                        label="Metro ligeiro"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="校車" />
                                        }
                                        label="Automóvel de escola"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="的士" />
                                        }
                                        label="Táxi"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="復康巴士" />
                                        }
                                        label="Autocarro de reabilitação"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="其他" />
                                        }
                                        label="Outros"
                                        sx={{ color: "black" }}
                                    />
                                    {survey.commonTransirtation === "其他" ?
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
                                                id="commonTransiration-other-textfill"
                                                label="Outros"
                                                variant="filled"
                                                name='otherOfCommonTransirtation'
                                                onChange={handleChange}
                                                value={survey.otherOfCommonTransirtation == 999 ? null : survey.otherOfCommonTransirtation}
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
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="arrivalTimeToSchool-label"><h3>6) Hora de chegada à escola (24 horas):</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.arrivalTimeToSchool)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                }
                                                handleTimeChange(event, "arrivalTimeToSchool")
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalTimeToSchool}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    :
                    null
            }
            <div className={styles.buttonGroup}>
                <LinearProgresss values={progressBarValue} />
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>

                    <Button className={styles.buttonStyle} onClick={() => router.back()}>
                        Voltar
                    </Button>
                    <Button className={styles.buttonStyle} onClick={handleNextButton}>
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

        </main>
    )

}
export default App;
