'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
// import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';

function App() {
    const router = useRouter();
    const [ToSchoolstartTime, setToSchoolStartTime] = React.useState(dayjs());
    const [ToSchoolEndTime, setToSchoolEndTime] = React.useState(dayjs());
    const [afternoonLeaveTime, setAfternoonLeaveTime] = React.useState(dayjs());
    const [afternoonLeaveArrivalTime, setAfternoonLeaveArrivalTime] = React.useState(dayjs());
    const [afternoonbackstartTime, setAfternoonbackstartTime] = React.useState(dayjs());
    const [afternoonbackendTime, setAfternoonbackendTime] = React.useState(dayjs());
    const [eveningLeaveSchoolTime, setEveningLeaveSchoolTime] = React.useState(dayjs());
    const [arivalHomeTime, setArivalHomeTime] = React.useState(dayjs());
    const [destinationBackHomeStartTime, setdestinationBackHomeStartTime] = React.useState(dayjs());
    const [destinationBackHomeEndTime, setdestinationBackHomeEndTime] = React.useState(dayjs());
    const [nextpageOpenState, setNextpageOpenState] = React.useState(false)
    const nextpageOpenHandleOpen = () => setNextpageOpenState(true);
    const nextpageOpenHandleClose = () => setNextpageOpenState(false);

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
      .filter((v) => v).length > 3;


    return(
        <main className={styles.main}>
            <div style={{minWidth:"100%"}}>

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
                    2.3	一般情況下，學生下午放學的情況
                </h1>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="evening-leave-school-time-label">10) 離校時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={eveningLeaveSchoolTime}
                                        onChange={(newValue) => setEveningLeaveSchoolTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>
                </div>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="pickup-leave-school-way-label">11)	有沒有人接送:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="pickup-leave-school-way-label"
                            name="pickup-leave-school-way-group"
                            >
                            <FormControlLabel value="學生自行離校" control={<Radio />} label="學生自行離校" />
                            <FormControlLabel value="父母" control={<Radio />} label="父母" />
                            <FormControlLabel value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                            <FormControlLabel value="工人" control={<Radio />} label="工人" />
                            <FormControlLabel value="輕補習社" control={<Radio />} label="補習社" />
                            <FormControlLabel value="其他" control={<Radio />} label="其他" />
                            <Box
                                component="form"
                                sx={{
                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="pickup-leave-school-way-other-textfill" label="其他" variant="filled" />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="back-home-dircetly-label">12)	放學是否直接回家？</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="back-home-dircetly-label"
                            name="back-home-dircetly-group"
                            >
                            <FormControlLabel value="是" control={<Radio />} label="是" />
                            <FormControlLabel value="否" control={<Radio />} label="否" />
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <p>/choose Yes</p>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="arrival-home-time-label">到達家時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={arivalHomeTime}
                                        onChange={(newValue) => setArivalHomeTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="arrival-home-transition-label">回家主要的交通方式：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="arrival-home-transition-label"
                            name="arrival-home-transition-group"
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
                                <TextField id="arrival-home-transition-other-textfill" label="其他" variant="filled" />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <p>/choose No</p>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-label">放學後去了哪裏:</FormLabel>
                          <p>choose loaction</p>
                          <Button>
                            touch and choose loaction
                          </Button>
                        </FormControl>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-time-label">到達目的地時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={arivalHomeTime}
                                        onChange={(newValue) => setArivalHomeTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="leave-shcool-arrival-destination-transition-label">回家主要的交通方式：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="leave-shcool-arrival-destination-transition-label"
                            name="leave-shcool-arrival-destination-transition-group"
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
                                <TextField id="leave-shcool-arrival-destination-transition-other-textfill" label="其他" variant="filled" />
                            </Box>
                        </RadioGroup>
                    </FormControl>

                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-time-label">從上述地方出發回家的時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={destinationBackHomeStartTime}
                                        onChange={(newValue) => setdestinationBackHomeStartTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>

                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-time-label">到達家時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={destinationBackHomeEndTime}
                                        onChange={(newValue) => setdestinationBackHomeEndTime(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>

                                
                    <FormControl>
                        <FormLabel id="leave-shcool-and-back-home-transition-label">前目的地回家主要的交通方式：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="leave-shcool-and-back-home-transition-label"
                            name="leave-shcool-and-back-home-transition-group"
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
                                <TextField id="leave-shcool-and-back-home-transition-other-textfill" label="其他" variant="filled" />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </div>

                {/* <h1>
                    2.4 學生出行意見和建議
                </h1>

                <div className={styles.question}>
                    <FormControl sx={{
                        m:1, width:"100%"
                    }}>
                        <FormLabel id="student-suggestion-label">13)	爲了更好服務學生，您對上下學出行有何意見或建議？（選填）：</FormLabel>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '60%' },
                            }}
                            noValidate
                            >
                            <TextField 
                                id="student-suggestion-text" 
                                label="年級" 
                                variant="outlined" 
                                multiline
                            />
                        </Box>
                    </FormControl>
                </div> */}

                <div className={styles.question}>
                    <Button onClick={() => router.back()}>
                        previous *need check which is previous page
                    </Button>
                    <Button href={'/surveystudentconfirmfinshed'}>
                        next
                    </Button>
                    {/* <Button onClick={nextpageOpenHandleOpen}>
                        next
                    </Button> */}
                    {/* <Modal
                        open={nextpageOpenState}
                        onClose={nextpageOpenHandleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={nextPageModelstyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           注意!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            還有其他學生家庭成員未填寫本調查問卷嗎?                        
                        </Typography>
                        <div className={styles.buttonGroupStyle}>
                            <Button>
                                有
                            </Button>
                            <Button >
                                冇
                            </Button>
                        </div>
                     
                        </Box>
                    </Modal> */}
                </div>
                
            </div>         
        </main>
    )

}
export default App;
