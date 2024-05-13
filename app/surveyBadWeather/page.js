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
            startTime: new Date(),
            badWeatherPickup: 999,
            otherbadWeatherPickup: 999,
            badWeatherTransition: 999,
            otherbadWeatherTransition: 999,
            comment: 999,
    }
    const blankHelpText = {}
    const [helpText, setHelpText] = React.useState(blankHelpText)


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
          const local_storage_path_list = sessionStorage.getItem('pathList')? sessionStorage.getItem('pathList').split(",") : null;
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
        if (survey.Pickup == 999) {
            handleHelpText("badWeatherPickup", "請選擇選項")
            return
        }

        if (survey.Transition == 999) {
            handleHelpText("badWeatherTransition", "請選擇主要使用的交通工具")
            return
        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push("/surveyStudentFinised")
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)

    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + 'badWeather'), JSON.stringify(survey))
        setHelpText(blankHelpText)
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (survey.Pickup != "其他監護人") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                        otherbadWeatherPickup: 999
                }
            ))
        }

        if (survey.Transition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                        otherbadWeatherTransition: 999
                }
            ))
        }


    }, [survey.badWeatherPickup,
    survey.badWeatherTransition])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] == "/surveyNormalRd2" 
            ||
            _initial_pathListe[_initial_pathListe.length - 1] == "/surveyCrossRd2"  ) {
          return
        } else {
            router.replace("./")
            return
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
                            五、惡劣天氣情況下，學生上學及放學出行情況
                        </h1>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="badWeatherPickup-label"><h3>1) 有沒有人接送：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="badWeatherPickup-label"
                                    name="badWeatherPickup"
                                    value={survey.badWeatherPickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行上（放）學 " control={<Radio />} label="學生自行上（放）學 " />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他監護人" control={<Radio />} label="其他監護人" />
                                    {
                                        survey.badWeatherPickup == "其他監護人" ?

                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    id="otherbadWeatherPickup-textfill"
                                                    label="其他"
                                                    variant="filled"
                                                    onChange={handleChange}
                                                    value={survey.otherbadWeatherPickup == 999 ? null : survey.otherbadWeatherPickup}
                                                    name="otherbadWeatherPickup"
                                                />
                                            </Box>
                                            :
                                            null
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.Pickup}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="badWeatherransition-label"><h3>2) 主要使用的交通工具:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="badWeathertransition-label"
                                    name="badWeatherTransition"
                                    value={survey.badWeatherTransition}
                                    onChange={handleChange}
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
                                        survey.badWeatherTransition == "其他" ?

                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    id="otherbadWeatherTransition-textfill"
                                                    label="其他"
                                                    variant="filled"
                                                    name="otherbadWeatherTransition"
                                                    onChange={handleChange}
                                                    value={survey.otherbadWeatherTransition == 999 ? null : survey.otherbadWeatherTransition}
                                                />
                                            </Box>
                                            :
                                            null
                                    }

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.Transition}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl sx={{
                                m: 1, width: "100%"
                            }}>
                                <FormLabel id="comment-label"><h3>3)	爲了更好服務學生，您對上下學出行有何意見或建議？（選填）：</h3></FormLabel>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': {  width: '80%' },
                                    }}
                                    noValidate
                                >
                                    <TextField
                                        sx={{marginTop: "1rem"}}
                                        id="comment-text"
                                        label="請輸入您的意見"
                                        variant="outlined"
                                        name='comment'
                                        multiline
                                        value={survey.comment == 999 ? null : survey.comment}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <Button onClick={() => router.back()}>
                                上一頁
                            </Button>
                            <Button onClick={handleNextButton}>
                                下一頁
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
