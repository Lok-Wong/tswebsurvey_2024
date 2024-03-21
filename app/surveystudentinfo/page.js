'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Link from "next/link";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';// import RadioGroup from "@mui/material";
import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function App() {
    const [ToSchoolstartTime, setToSchoolStartTime] = React.useState(dayjs());
    const [ToSchoolEndTime, setToSchoolEndTime] = React.useState(dayjs());
    const [afternoonLeaveTime, setAfternoonLeaveTime] = React.useState(dayjs());
    const [afternoonLeaveArrivalTime, setAfternoonLeaveArrivalTime] = React.useState(dayjs());
    const [afternoonbackstartTime, setAfternoonbackstartTime] = React.useState(dayjs());
    const [afternoonbackendTime, setAfternoonbackendTime] = React.useState(dayjs());

    const [commonTransirtationState, setCommonTransirtationState] = React.useState({
        motorcyclePassenger: false,
        carPassenger: false,
        schoolBus: false,
        bus: false,
        lightRail: false,
        taxi:false,
        onlineTaxi:false,
        walk:false,
        other:false
      });
    
      const commonTransirtationStatehandleChange = (event) => {
        setCommonTransirtationState({
          ...commonTransirtationState,
          [event.target.name]: event.target.checked,
        });
      };
    
      const { motorcyclePassenger, carPassenger, schoolBus,bus,lightRail,taxi,onlineTaxi,walk,other } = commonTransirtationState;
      const commonTransirtationerror = 
      [motorcyclePassenger, carPassenger, schoolBus,bus,lightRail,taxi,onlineTaxi,walk,other]
      .filter((v) => v).length !== 3;

    return(
        <main className={styles.main}>
            <div style={{minWidth:"100%"}}>
                <h1>
                    2 學生個人資料
                </h1>
                <div  className={styles.question} >
                    <FormControl>
                        <FormLabel id="class-level-label">1)  就讀年級：</FormLabel>
                        <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '95%' },
                        }}
                        noValidate
                        >
                        <TextField id="class-level" label="年級" variant="outlined" />
                        </Box>
                    </FormControl>

                    <FormControl sx={{width:'50%'}}>
                        <FormLabel id="school-name-label">2)  學校名稱：</FormLabel>
                        <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '95%' },
                        }}
                        noValidate
                        >
                        <TextField id="school-name" label="學校" variant="outlined" />
                        </Box>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="gender-label">3)  姓別：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="studentofRespondents-radio-buttons-group-label"
                            name="studentofRespondents-radio-buttons-group"
                            >
                            <FormControlLabel value="男" control={<Radio />} label="男" />
                            <FormControlLabel value="女" control={<Radio />} label="女" />
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="age-label">4)  年齡</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="age-label"
                            name="age-group"
                            >
                            <FormControlLabel value="0~4歲" control={<Radio />} label="0~4歲" />
                            <FormControlLabel value="5~9歲" control={<Radio />} label="5~9歲" />
                            <FormControlLabel value="10~14歲" control={<Radio />} label="10~14歲" />
                            <FormControlLabel value="15~19歲" control={<Radio />} label="15~19歲" />
                        </RadioGroup>
                    </FormControl>
                </div>

                <h1>
                    2.1	一般情況下，學生早上上學的情況
                </h1>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="pickup-label">5)    有沒有人接送：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="pickup-label"
                            name="pickup-group"
                            >
                            <FormControlLabel value="學生自行上學" control={<Radio />} label="學生自行上學" />
                            <FormControlLabel value="父母" control={<Radio />} label="父母" />
                            <FormControlLabel value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                            <FormControlLabel value="工人" control={<Radio />} label="工人" />
                            <FormControlLabel value="其他" control={<Radio />} label="其他" />
                            <Box
                                component="form"
                                sx={{
                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="pickup-other-textfill" label="其他" variant="filled" />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="pickup-time-start-label">6)     出發時間：</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={ToSchoolstartTime}
                                    onChange={(newValue) => setToSchoolStartTime(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="pickup-time-end-label">7)     到達時間：</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={ToSchoolEndTime}
                                    onChange={(newValue) => setToSchoolEndTime(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl
                        required
                        error={commonTransirtationerror}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        <FormLabel component="commonTransiration">8)	常用的交通方式（按使用頻率排序，最多可選3個）：</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                <Checkbox checked={motorcyclePassenger} onChange={commonTransirtationStatehandleChange} name="motorcyclePassenger" />
                                }
                                label="電單車（乘客）"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={carPassenger} onChange={commonTransirtationStatehandleChange} name="carPassenger" />
                                }
                                label="私家車（乘客）"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={schoolBus} onChange={commonTransirtationStatehandleChange} name="schoolBus" />
                                }
                                label="校車"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={bus} onChange={commonTransirtationStatehandleChange} name="bus" />
                                }
                                label="巴士"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={lightRail} onChange={commonTransirtationStatehandleChange} name="lightRail" />
                                }
                                label="輕軌"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={taxi} onChange={commonTransirtationStatehandleChange} name="taxi" />
                                }
                                label="一般的士"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={onlineTaxi} onChange={commonTransirtationStatehandleChange} name="onlineTaxi" />
                                }
                                label="電召的士"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={walk} onChange={commonTransirtationStatehandleChange} name="walk" />
                                }
                                label="步行"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={other} onChange={commonTransirtationStatehandleChange} name="other" />
                                }
                                label="其他"
                            />
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    <TextField id="commonTransiration-other-textfill" label="其他" variant="filled" />
                                </Box>
                            </FormGroup>
                          
                            {
                                commonTransirtationerror ? <FormHelperText>最多可選3個</FormHelperText> : null

                            }
                    </FormControl>
                </div>
                <h1>
                    2.2	一般情況下，學生中午離校的情況
                </h1>
                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="afternoon-leave-label">9)	是否離校？</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="afternoon-leave-label"
                            name="afternoon-leave-group"
                            >
                            <FormControlLabel value="是" control={<Radio />} label="是" />
                            <FormControlLabel value="否" control={<Radio />} label="否" />
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="afternoon-leave-time-label">離校時間（24小時制）</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={afternoonLeaveTime}
                                    onChange={(newValue) => setAfternoonLeaveTime(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>

                    
                    <FormControl>
                        <FormLabel id="afternoon-leave-where-label">離校去了哪裏：</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="afternoon-leave-where-label"
                                name="afternoon-leave-where-group"
                                >
                                <FormControlLabel value="家" control={<Radio />} label="家" />
                                <FormControlLabel value="其他" control={<Radio />} label="其他" />
                                <Button>
                                    選擇地標
                                </Button>
                                <p style={{alignSelf:'center'}}>
                                    地標文字
                                </p>
                            </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="afternoon-leave-purpose-label">離校目的：</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="afternoon-leave-purpose-label"
                                name="afternoon-leave-purpose-group"
                                >
                                <FormControlLabel value="回家" control={<Radio />} label="回家" />
                                <FormControlLabel value="托管" control={<Radio />} label="托管" />
                                <FormControlLabel value="家在外就餐" control={<Radio />} label="在外就餐" />
                                <FormControlLabel value="其他" control={<Radio />} label="其他" />
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    <TextField id="afternoon-leave-purpose-other-textfill" label="其他" variant="filled" />
                                </Box>
                            </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="afternoon-leave-arrival-time-label">到達時間（24小時制）：</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={afternoonLeaveArrivalTime}
                                    onChange={(newValue) => setAfternoonLeaveArrivalTime(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="afternoon-leave-transition-label">離校主要的交通方式：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="afternoon-leave-transition-label"
                            name="afternoon-leave-transition-group"
                            >
                            <FormControlLabel value="電單車（乘客）" control={<Radio />} label="電單車（乘客）" />
                            <FormControlLabel value="私家車（乘客）" control={<Radio />} label="私家車（乘客）" />
                            <FormControlLabel value="校車" control={<Radio />} label="校車" />
                            <FormControlLabel value="巴士" control={<Radio />} label="巴士" />
                            <FormControlLabel value="輕軌" control={<Radio />} label="輕軌" />
                            <FormControlLabel value="一般的士" control={<Radio />} label="一般的士" />
                            <FormControlLabel value="電召的士" control={<Radio />} label="電召的士" />
                            <FormControlLabel value="步行" control={<Radio />} label="步行" />
                            <FormControlLabel value="其他" control={<Radio />} label="其他" />
                            <Box
                                component="form"
                                sx={{
                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="afternoon-leave-transition-other-textfill" label="其他" variant="filled" />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="afternoon-back-time-start-label">出發返校時間</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={afternoonbackstartTime}
                                    onChange={(newValue) => setAfternoonbackstartTime(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="afternoon-back-time-end-label">到達學校時間</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer className={styles.question} components={['TimePicker']}>
                                <TimePicker
                                    ampm={false}
                                    value={afternoonbackendTime}
                                    onChange={(newValue) => setAfternoonbackendTime(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="afternoon-back-transition-label">回校主要的交通方式：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="afternoon-back-transition-label"
                            name="afternoon-back-transition-group"
                            >
                            <FormControlLabel value="電單車（乘客）" control={<Radio />} label="電單車（乘客）" />
                            <FormControlLabel value="私家車（乘客）" control={<Radio />} label="私家車（乘客）" />
                            <FormControlLabel value="校車" control={<Radio />} label="校車" />
                            <FormControlLabel value="巴士" control={<Radio />} label="巴士" />
                            <FormControlLabel value="輕軌" control={<Radio />} label="輕軌" />
                            <FormControlLabel value="一般的士" control={<Radio />} label="一般的士" />
                            <FormControlLabel value="電召的士" control={<Radio />} label="電召的士" />
                            <FormControlLabel value="步行" control={<Radio />} label="步行" />
                            <FormControlLabel value="其他" control={<Radio />} label="其他" />
                            <Box
                                component="form"
                                sx={{
                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="afternoon-back-transition-other-textfill" label="其他" variant="filled" />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </div>
                <h1>
                    2.3	一般情況下，學生下午放學的情況
                </h1>
                
            </div>         
        </main>
    )

}
export default App;
