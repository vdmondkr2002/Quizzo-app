import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {postQuestion} from '../../actions/questions'
import clsx from 'clsx'
import {Paper,makeStyles,Grid,Button,Snackbar,Select,MenuItem, TextField,Box,FormHelperText, InputLabel,FormControl,OutlinedInput,InputAdornment,IconButton, Typography, CardMedia} from '@material-ui/core'

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


import contriImg from '../../images/undraw_collaborators.svg'
import Alert from '../Utils/Alert'
import { checkLoggedIn } from '../../actions/auth'

const useStyles = makeStyles((theme)=>({
    title:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        alignItems:"center",
        position:"relative",
        height:"auto",
        backgroundColor:"rgb(288,30,21)",
        padding:"0.5em 0 0.5em 0",
        color:"white",
        borderRadius:"0.5em",
        fontWeight:"bold"
    },
    root:{
        maxWidth:"700px",
        marginTop:"5em",
        padding:"1em",
        margin:"auto"
    },
    inputField:{
        marginTop:"1em"
    },
    displayIcon:{
        display:"none"
    },
    btnContainer:{
        textAlign:"center"
    }
}))
const Form = () => {
    const classes = useStyles();
    // const [choice,setChoice] = useState('')
    // const [doneChoice,setDoneChoice] = useState(true);
    const [questionData,setQuestionData]=useState({
        category:'',question:'',choices:{"op1":{choice:'',isCorrect:false},"op2":{choice:'',isCorrect:false},"op3":{choice:'',isCorrect:false},op4:{choice:'',isCorrect:false}}
    })
    // const [addoption,setAddoption] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const [correctChoiceNum,setcorrectChoiceNum] = useState("0");
    // const [doneCorrectChoice,setDoneCorrectChoice] = useState(false);
    
    const [togglesOptions,setToggleOptions] = useState({op1:false,op2:false,op3:false,op4:false})
    const [displayIcons,setDisplayIcons] = useState(false);

    // const addChoice =(e)=>{
    //     const choiceObj = {choice:choice,isCorrect:false}
    //     setQuestionData({...questionData,choices:[...questionData.choices,choiceObj]})
    //     setAddoption(false)
    //     setChoice('')
    // }

    // const changeOption = (e)=>{
    //     e.preventDefault()
    //     setAddoption(true)
    // }

    // useEffect(()=>{
    //     dispatch(checkLoggedIn(history))
    // },[])
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(postQuestion(questionData,history))
    }

    // const doneWithChoice = (e)=>{
    //     e.preventDefault()
    //     setDoneChoice(prevChoice=>!prevChoice)

    //     setDoneCorrectChoice(false)
    //     const choices = questionData.choices
    //     choices[correctChoiceNum-1].isCorrect = false;
    //     setQuestionData({...questionData,choices:choices})
    // }

    // const setCorrectChoice = (e)=>{
    //     e.preventDefault()
    //     const choices = questionData.choices
    //     choices[correctChoiceNum-1].isCorrect = true;
    //     setQuestionData({...questionData,choices:choices})
    //     setDoneCorrectChoice(true)
    // }

    const handleOptionChange = (e)=>{
        const choiceObj = {choice:e.target.value,isCorrect:false}
        setQuestionData({...questionData,choices:{...questionData.choices,[e.target.name]:choiceObj}})
    }


    const handleClickToggle = (e)=>{
        const opt = e.target.className.baseVal.split(" ")[1]
        console.log(opt)
        if(togglesOptions[opt])
            setToggleOptions({...togglesOptions,[opt]:false})
        else
            setToggleOptions({...togglesOptions,[opt]:true})
    }

    useEffect(()=>{
        handleChoiceChange();
    },[correctChoiceNum])

    const handleChoiceChange = ()=>{
        const choiceObj1 = questionData.choices.op1
        const choiceObj2 = questionData.choices.op2
        const choiceObj3 = questionData.choices.op3
        const choiceObj4 = questionData.choices.op4
        // console.log(typeof e.target.value)
        if(correctChoiceNum==="1"){
            setDisplayIcons(true)
            setToggleOptions({...togglesOptions,op1:true,op2:false,op3:false,op4:false})
            
            choiceObj1.isCorrect=true
            choiceObj2.isCorrect=false
            choiceObj3.isCorrect=false 
            choiceObj4.isCorrect=false
        }else if(correctChoiceNum==="2"){
            setDisplayIcons(true)
            setToggleOptions({...togglesOptions,op1:false,op2:true,op3:false,op4:false})

            choiceObj1.isCorrect=false
            choiceObj2.isCorrect=true
            choiceObj3.isCorrect=false 
            choiceObj4.isCorrect=false
            
        }else if(correctChoiceNum==="3"){
            setDisplayIcons(true)
            setToggleOptions({...togglesOptions,op1:false,op2:false,op3:true,op4:false})
            choiceObj1.isCorrect=false
            choiceObj2.isCorrect=false
            choiceObj3.isCorrect=true 
            choiceObj4.isCorrect=false
        }else if(correctChoiceNum==="4"){
            setDisplayIcons(true)
            setToggleOptions({...togglesOptions,op1:false,op2:false,op3:false,op4:true})
            choiceObj1.isCorrect=false
            choiceObj2.isCorrect=false
            choiceObj3.isCorrect=false 
            choiceObj4.isCorrect=true
        }else{
            setDisplayIcons(false)
        }
        setQuestionData({...questionData,choices:{...questionData.choices,"op1":choiceObj1}})
        setQuestionData({...questionData,choices:{...questionData.choices,"op2":choiceObj2}})
        setQuestionData({...questionData,choices:{...questionData.choices,"op3":choiceObj3}})
        setQuestionData({...questionData,choices:{...questionData.choices,"op4":choiceObj4}})
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    

    return (
        <Grid container>
            <Alert/>
            <Grid item xs={12} sm={4}>
                <Paper className={classes.root}>
                    <CardMedia
                        component="img"
                        alt="Enlighten"
                        image={contriImg}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Paper className={classes.root}>
                    <form 
                    autoComplete="off"
                    noValidate
                    className={classes.form}
                    onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper className={classes.title}>
                                    <Box>
                                        <Typography variant="h6" className={classes.title}>
                                            Contribute a Question and Help to Grow!
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Enter the category</InputLabel>
                                    <Select
                                    name="category"
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={questionData.category}
                                    onChange={e=>setQuestionData({...questionData,category:e.target.value})}
                                    label="Enter the category"
                                    labelWidth={100}
                                    >
                                    <MenuItem value="History">
                                        <em>History</em>
                                    </MenuItem>
                                    <MenuItem value="Science">Science</MenuItem>
                                    <MenuItem value="Geography">Geography</MenuItem>
                                    <MenuItem value="Maths">Maths</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                name="question"
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                label="Enter the question"
                                onChange={e=>setQuestionData({...questionData,question:e.target.value})}
                                value={questionData.question}
                                className={classes.inputField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{marginTop:"0.5em"}}>
                                    Add the options
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                            <InputLabel htmlFor="op1">Option 1</InputLabel>
                                            <OutlinedInput
                                                name="op1"
                                                type='text'
                                                value={questionData.choices.op1.choice}
                                                onChange={handleOptionChange}
                                                endAdornment={
                                                <InputAdornment  position="end">
                                                    <IconButton
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                        <Box display={displayIcons?"block":"none"}>
                                                            {togglesOptions.op1 ? <CheckCircleIcon color="primary" /> : <CancelIcon color="secondary" />}
                                                        </Box>
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                labelWidth={80}
                                            />
                                        </FormControl>
                                    </Grid> 
                                    <Grid item xs={6}>
                                        <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                            <InputLabel htmlFor="op2">Option 2</InputLabel>
                                            <OutlinedInput
                                                name="op2"
                                                type='text'
                                                value={questionData.choices.op2.choice}
                                                onChange={handleOptionChange}
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                        <Box display={displayIcons?"block":"none"}>
                                                        {togglesOptions.op2 ? <CheckCircleIcon  color="primary" /> : <CancelIcon color="secondary"/>}
                                                        </Box>
                                                    
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                labelWidth={80}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                            <InputLabel htmlFor="op3">Option 3</InputLabel>
                                            <OutlinedInput
                                                name="op3"
                                                type='text'
                                                value={questionData.choices.op3.choice}
                                                onChange={handleOptionChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        >
                                                        <Box display={displayIcons?"block":"none"}>
                                                        {togglesOptions.op3 ? <CheckCircleIcon  color="primary" /> : <CancelIcon color="secondary"/>}
                                                        </Box>   
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={80}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl required fullWidth className={clsx(classes.margin, classes.inputField)} variant="outlined">
                                            <InputLabel htmlFor="op4">Option 4</InputLabel>
                                            <OutlinedInput
                                                id="op4"
                                                name="op4"
                                                type='text'
                                                value={questionData.choices.op4.choice}
                                                onChange={handleOptionChange}
                                                endAdornment={
                                                    <InputAdornment display="none" className="op4" position="end">
                                                        <IconButton
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                        <Box display={displayIcons?"block":"none"}>
                                                        {togglesOptions.op4 ? <CheckCircleIcon  color="primary" /> : <CancelIcon color="secondary"/>}
                                                        </Box>
                                                        
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={80}
                                            />
                                            <FormHelperText required  variant="outlined" children="Password must be atleast 6 characters"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            name="correctOption"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            label="Set The Correct Choice No"
                                            onChange={e=>setcorrectChoiceNum(e.target.value)}
                                            value={correctChoiceNum}
                                            className={classes.inputField}
                                        />
                                    </Grid>
                                    <Grid className={classes.btnContainer} item xs={12}>
                                        <Button type="submit"  color="secondary" variant="contained">
                                            <Typography>
                                                Submit Question
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                
                                
                    
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
            
        </Grid>
            
        
        
        // <div className="row mt-5">
        //     <div className="col-md-6 m-auto">
        //         <div className="card card-body">
        //                 <form>
        //                     <div className="form-group">
        //                         <label htmlFor="category">Category</label>
        //                         <input type="text" id="category" name="category" className="form-control" value={questionData.category} onChange={e=>setQuestionData({...questionData,category:e.target.value})} />
        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="question">Question</label>
        //                         <input type="text" id="question" name="question" className="form-control" value={questionData.question} onChange={e=>setQuestionData({...questionData,question:e.target.value})} />
        //                     </div>
        //                     {
        //                         questionData.choices.map(({choice},index)=>(
        //                             <div>
        //                                 <div style={{height:'150%'}} key={index} className="btn btn-warning btn-block text-left">{index+1}. {choice}
        //                                 {
        //                                     doneChoice?(
        //                                         <button style={{float:'right'}} onClick={(e,index)=>{
        //                                             const choices = questionData.choices
        //                                             choices.splice(index,1)
        //                                             console.log(choices);
        //                                             e.preventDefault()
        //                                             setQuestionData({...questionData,choices:choices})
        //                                         }}  className="btn btn-primary btn-sm" >X</button>
        //                                     ):null
        //                                 }
        //                                 </div>    
        //                                 <br/>
        //                             </div>
        //                         ))
        //                     }
        //                     {
        //                         addoption?(
        //                             <div className="row mt-2">  
        //                                 <div className="col-8">
        //                                     <div className="form-group">
        //                                         <label htmlFor="choice" className="sr-only">Choice</label>
        //                                         <input type="text" className="form-control" id="inputPassword2" value={choice} onChange={e=>setChoice(e.target.value)} placeholder="Enter choice"/>
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-4">
        //                                     <div className="form-group">
        //                                         <button className="btn btn-info btn-block" onClick={addChoice}>Add Option</button>
        //                                     </div>   
        //                                 </div>                                                    
        //                             </div>
        //                         ):null
        //                     }
        //                     {
        //                         doneChoice?(
        //                             <div className="text-center mt-2">
        //                             <button type="button" onClick={changeOption} className="btn btn-success">
        //                                 {
        //                                     questionData.choices.length===0?(
        //                                         'Add an option'
        //                                     ):('Add another Option') 
        //                                 }</button>
        //                             </div>
        //                         ):null
        //                     }
                            
        //                     {
        //                         questionData.choices.length>=2?(
        //                             <button type="button" onClick={doneWithChoice} className="btn btn-success">
        //                              {
        //                                  doneChoice?('Done'):('Make changes')
        //                              }
        //                             </button>
        //                         ):null
        //                     }
        //                     {
        //                         !doneChoice && !doneCorrectChoice?(
        //                             <div className="row mt-2">  
        //                                 <div className="col-8">
        //                                     <div className="form-group">
        //                                         <label htmlFor="choice" className="sr-only">Enter correct choice Id</label>
        //                                         <input type="text" className="form-control" id="inputPassword2" value={correctChoiceNum} onChange={e=>setcorrectChoiceNum(e.target.value)} placeholder="Enter correct choice Number"/>
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-4">
        //                                     <div className="form-group">
        //                                         <button className="btn btn-info btn-block" onClick={setCorrectChoice}>Add</button>
        //                                     </div>   
        //                                 </div>      
        //                             </div>
        //                         ):null
        //                     }
        //                     {
        //                         !doneChoice?(
        //                             <div className="text-center mt-2">
        //                                 <button type="button" onClick={handleSubmit} data-toggle="modal" data-target="#exampleModal" className="btn btn-success">Submit Question</button>
        //                             </div>
        //                         ):null
        //                     }
        //                 </form>
        //         </div>
        //     </div>
        // </div>
        
    )
}

export default Form
