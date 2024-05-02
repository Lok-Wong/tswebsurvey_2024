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

function App() {
    const router = useRouter();

    const blanksurvey = {
        badWeather: {
            startTime: new Date(),
            badWeatherPickup: 999,
            otherbadWeatherPickup: 999,
            badWeatherTransition: 999,
            otherbadWeatherTransition: 999,
            comment: 999,
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
            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'badWeather'));
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str);
            }
        }
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
    }, []);

    const [survey, setSurvey] = React.useState(_initial_value)

    const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                badWeather: {
                    ...prevState.badWeather,
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

    // const handleNextButton = () => {
    //     sessionStorage.getItem("totalStudentNum",_studentNum)
    // }
    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + 'badWeather'), JSON.stringify(survey))
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (survey.badWeather.badWeatherPickup != "其他監護人") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    badWeather: {
                        ...prevState.badWeather,
                        otherbadWeatherPickup: 999
                    }
                }
            ))
        }

        if (survey.badWeather.badWeatherTransition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    badWeather: {
                        ...prevState.badWeather,
                        otherbadWeatherTransition: 999
                    }
                }
            ))
        }


    }, [survey.badWeather.badWeatherPickup,
    survey.badWeather.badWeatherTransition])



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
                                    value={survey.badWeather.badWeatherPickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行上（放）學 " control={<Radio />} label="學生自行上（放）學 " />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他監護人" control={<Radio />} label="其他監護人" />
                                    {
                                        survey.badWeather.badWeatherPickup == "其他監護人" ?

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
                                                    value={survey.badWeather.otherbadWeatherPickup == 999 ? null : survey.badWeather.otherbadWeatherPickup}
                                                    name="otherbadWeatherPickup"
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
                                <FormLabel id="badWeatherransition-label"><h3>2) 主要使用的交通工具:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="badWeathertransition-label"
                                    name="badWeatherTransition"
                                    value={survey.badWeather.badWeatherTransition}
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
                                        survey.badWeather.badWeatherTransition == "其他" ?

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
                                                    value={survey.badWeather.otherbadWeatherTransition == 999 ? null : survey.badWeather.otherbadWeatherTransition}
                                                />
                                            </Box>
                                            :
                                            null
                                    }

                                </RadioGroup>
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
                                        id="comment-text"
                                        label="請輸入您的意見"
                                        variant="outlined"
                                        name='comment'
                                        multiline
                                        value={survey.badWeather.comment == 999 ? null : survey.badWeather.comment}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <Button onClick={() => router.back()}>
                                back
                            </Button>
                            <Button href={'/surveyStudentFinised'}>
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
