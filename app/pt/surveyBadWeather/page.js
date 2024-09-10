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
import Checkbox from '@mui/material/Checkbox';
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../portuguesePage.css";


function App() {
    const router = useRouter();

    const blanksurvey = {
        startTime: new Date(),
        tripChange: {
            noChange: {
                state: false,
                value: 999
            },
            earlyOutDooring: {
                state: false,
                value: 999
            },
            transitionChange: {
                state: false,
                value: 999
            },
            parentPickUp: {
                state: false,
                value: 999
            },
            waitForNews: {
                state: false,
                value: 999
            },
            other: {
                state: false,
                value: 999
            }
        },
        comment: 999,
    }
    const blankHelpText = {}
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [progressBarValue, setProgressBarValue] = React.useState(80)
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
            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'badWeather'));
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
    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)

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

    const handleTextInputChange = (event) => {
        setSurvey((prevState) => ({
            ...prevState,
            tripChange: {
                ...prevState.tripChange,
                [event.target.name]: {
                    ...prevState.tripChange[event.target.name],
                    value: event.target.value
                }
            }
        }))
    }

    const handleCheckBoxChange = (event) => {
        if (event.target.name === "noChange") {
            setSurvey((prevState) => ({
                ...prevState,
                tripChange: {
                    noChange: {
                        state: event.target.checked,
                        value: 999
                    },
                    earlyOutDooring: {
                        state: false,
                        value: 999
                    },
                    transitionChange: {
                        state: false,
                        value: 999
                    },
                    parentPickUp: {
                        state: false,
                        value: 999
                    },
                    waitForNews: {
                        state: false,
                        value: 999
                    },
                    other: {
                        state: false,
                        value: 999
                    }
                }
            }))

            return
        }

        setSurvey((prevState) => ({
            ...prevState,
            tripChange: {
                ...prevState.tripChange,
                [event.target.name]: {
                    ...prevState.tripChange[event.target.name],
                    state: event.target.checked
                }
            }
        }))

        if (event.target.checked == false) {
            setSurvey((prevState) => ({
                ...prevState,
                tripChange: {
                    ...prevState.tripChange,
                    [event.target.name]: {
                        ...prevState.tripChange[event.target.name],
                        value: 999
                    }
                }
            }))
        }
    }

    const handleHelpText = (eventName, errorText) => {
        const objectName = eventName
        setHelpText((prevState) => (
            {
                ...prevState,
                [objectName]: errorText
            }
        ))
    }



    const handleNextButton = () => {
        if (!survey.tripChange.noChange.state &&
            !survey.tripChange.earlyOutDooring.state &&
            !survey.tripChange.transitionChange.state &&
            !survey.tripChange.parentPickUp.state &&
            !survey.tripChange.waitForNews.state &&
            !survey.tripChange.other.state
        ) {
            handleAlertBarOpen()
            setVCodeError("1) Seleccione uma opção")
            handleHelpText("tripChange", "Seleccione uma opção")
            return
        }

        if (survey.tripChange.earlyOutDooring.state) {
            if (survey.tripChange.earlyOutDooring.value === 999 
                ||
                survey.tripChange.earlyOutDooring.value === ""
                ||
                survey.tripChange.earlyOutDooring.value === null
            ) {
                handleAlertBarOpen()
                setVCodeError("Preencha o tempo de antecedência")
                handleHelpText("tripChange", "Preencha o tempo de antecedência")
                return
            }
        }

        if (survey.tripChange.transitionChange.state) {
            if (survey.tripChange.transitionChange.value === 999 || survey.tripChange.transitionChange.value === "" || survey.tripChange.transitionChange.value === null
            ) {
                handleAlertBarOpen()
                setVCodeError("Preencha o meio de transporte alternativo")
                handleHelpText("tripChange", "Preencha o meio de transporte alternativo")
                return
            }
        }

        if (survey.tripChange.other.state) {
            if (survey.tripChange.other.value === 999 || survey.tripChange.other.value === "" || survey.tripChange.other.value === null) {
                handleAlertBarOpen()
                setVCodeError("Preencha outros")
                handleHelpText("tripChange", "Preencha outros")
                return
            }
        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push("/pt/surveyStudentFinised")
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)

    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + 'badWeather'), JSON.stringify(survey))
        setHelpText(blankHelpText)
        // console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (survey.tripChange.noChange.state != false || survey.tripChange.earlyOutDooring.state != false || survey.tripChange.transitionChange.state != false || survey.tripChange.parentPickUp.state != false || survey.tripChange.waitForNews.state != false || survey.tripChange.other.state != false) {
            setProgressBarValue(100)
        } else {
            setProgressBarValue(80)
        }

    }, [survey.tripChange])

    // React.useEffect(() => {
    //     if (survey.Pickup != "其他監護人") {
    //         setSurvey((prevState) => (
    //             {
    //                 ...prevState,
    //                 otherbadWeatherPickup: 999
    //             }
    //         ))
    //     }

    //     if (survey.Transition != "其他") {
    //         setSurvey((prevState) => (
    //             {
    //                 ...prevState,
    //                 otherbadWeatherTransition: 999
    //             }
    //         ))
    //     }


    // }, [survey.badWeatherPickup,
    // survey.badWeatherTransition])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] == "/pt/surveyNormalRd2"
            ||
            _initial_pathListe[_initial_pathListe.length - 1] == "/pt/surveyCrossRd2") {
            return
        } else {
            router.replace("./")
            return
        }
    }, [])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const checkBoxLogict = () => {
        if (survey.tripChange.noChange.state) {
            return (true)
        }
    }

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
                        <h1 style={{ color: "#000000" }}>
                        5. Deslocação casa-escola durante o sinal de chuva intensa amarelo
                        </h1>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="badWeatherPickup-label"><h3>1) O seu modo de deslocação tem as seguintes alterações? (Pode assinalar mais do que uma opção)</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="badWeatherPickup-label"
                                    name="badWeatherPickup"
                                    value={survey.badWeatherPickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="沒有變化" control={
                                        <Checkbox
                                            checked={survey.tripChange.noChange.state}
                                            onChange={handleCheckBoxChange}
                                            name='noChange' />
                                    } label="Não tem alterações" />
                                    <FormControlLabel sx={{ color: "black" }} value="提早出門上學" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.earlyOutDooring.state}
                                            onChange={handleCheckBoxChange}
                                            name='earlyOutDooring' />
                                    }
                                        label="Sair de casa com antecedência"
                                    />
                                    {
                                        survey.tripChange.earlyOutDooring.state == true ?
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off" >
                                                <p>
                                                    Quantos minutos de antecedência?
                                                </p>
                                                <TextField
                                                    inputProps={{ maxLength: 5 }}
                                                    id="earlyOutDooring"
                                                    label="minutos"
                                                    variant="filled"
                                                    onChange={handleTextInputChange}
                                                    name="earlyOutDooring"
                                                    value={survey.tripChange.earlyOutDooring.value == 999 ? "" : survey.tripChange.earlyOutDooring.value}
                                                />
                                            </Box>
                                            :
                                            null
                                    }
                                    <FormControlLabel sx={{ color: "black" }} value="改變交通方式" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.transitionChange.state}
                                            onChange={handleCheckBoxChange}
                                            name='transitionChange' />
                                    }
                                        label="Alteração do meio de transporte"
                                    />
                                    {
                                        survey.tripChange.transitionChange.state == true ?
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off" >
                                                <p>
                                                    Qual é o meio de transporte alternativo?  
                                                </p>
                                                <TextField
                                                    inputProps={{ maxLength: 10 }}
                                                    id="transitionChange"
                                                    label="Meio de transporte "
                                                    variant="filled"
                                                    onChange={handleTextInputChange}
                                                    name="transitionChange"
                                                    value={survey.tripChange.transitionChange.value == 999 ? "" : survey.tripChange.transitionChange.value}
                                                />
                                            </Box>
                                            :
                                            null
                                    }

                                    <FormControlLabel sx={{ color: "black" }} value="轉由家長接送上學" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.parentPickUp.state}
                                            onChange={handleCheckBoxChange}
                                            name='parentPickUp' />} label="Ir para a escola com a companhia dos pais"
                                    />

                                    <FormControlLabel sx={{ color: "black" }} value="不出門上學和等待教青局的消息" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.waitForNews.state}
                                            onChange={handleCheckBoxChange}
                                            name='waitForNews' />} label="Ficar em casa à espera da notificação da DSEDJ" />

                                    <FormControlLabel sx={{ color: "black" }} value="其它" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}

                                            checked={survey.tripChange.other.state}
                                            onChange={handleCheckBoxChange}
                                            name='other' />} label="Outros" />
                                    {
                                        survey.tripChange.other.state == true ?
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off" >
                                                <p>
                                                    Preencha outros
                                                </p>
                                                <TextField
                                                    inputProps={{ maxLength: 10 }}
                                                    id="other"
                                                    label="Outros"
                                                    variant="filled"
                                                    onChange={handleTextInputChange}
                                                    name="other"
                                                    value={survey.tripChange.other.value == 999 ? "" : survey.tripChange.other.value}
                                                />
                                            </Box>
                                            :
                                            null
                                    }

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.tripChange}</FormHelperText>
                            </FormControl>
                        </div>

                        <h1 style={{ color: "#000000" }}>
                            6. Outras opiniões ou sugestões
                        </h1>

                        <div className={styles.question}>
                            <FormControl sx={{
                                m: 1, width: "100%"
                            }}>
                                <FormLabel id="comment-label"><h3>2) Tem opiniões ou sugestões relativas à deslocação casa-escola? (Preenchimento facultativo)</h3></FormLabel>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { width: '80%' },
                                    }}
                                    noValidate
                                >
                                    <TextField
                                        inputProps={{ maxLength: 500 }}
                                        sx={{ marginTop: "1rem" }}
                                        id="comment-text"
                                        label="Preencha as suas opiniões (com limitação de 500 caracteres)"
                                        variant="outlined"
                                        name='comment'
                                        multiline
                                        value={survey.comment == 999 ? null : survey.comment}
                                        onChange={handleChange}
                                    />
                                </Box>
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
