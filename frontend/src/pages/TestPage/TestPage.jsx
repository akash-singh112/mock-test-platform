import './TestPage.css'
import { useState, useEffect, useRef } from 'react';

import NotVisitedBox from '../../components/NotVisitedBox/NotVisitedBox';
import AnsweredBox from '../../components/AnsweredBox/AnsweredBox';
import NotAnsweredBox from '../../components/NotAnsweredBox/NotAnsweredBox';
import MarkedforReviewBox from '../../components/MarkedforReviewBox/MarkedforReviewBox';
import AnsweredandMarkedforReviewBox from '../../components/AnsweredandMarkedforReviewBox/AnsweredandMarkedforReviewBox';

// Need this array from the backend
const quesArray = {
    Physics: Array(125).fill("https://picsum.photos/id/1/120/120"),
    Chemistry: Array(125).fill("https://picsum.photos/id/210/1200/1200"),
    Maths: Array(125).fill("https://picsum.photos/id/200/1200/1200")
}

function TestPage() {
    const [currQNo, setCurrQNo] = useState(0);
    const [currSub, setCurrSub] = useState('Physics');
    const initialQuesStateArray = {
        Physics: Array(quesArray.Physics.length).fill(0),
        Chemistry: Array(quesArray.Chemistry.length).fill(0),
        Maths: Array(quesArray.Maths.length).fill(0)
    };
    const [quesStateArray, setQuesStateArray] = useState(initialQuesStateArray);
    const initialAnsArray = {
        Physics: Array(quesArray.Physics.length).fill(0),
        Chemistry: Array(quesArray.Chemistry.length).fill(0),
        Maths: Array(quesArray.Maths.length).fill(0),
    }
    const [ansArray, setAnsArray] = useState(initialAnsArray);
    const [count0, setCount0] = useState(0);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    useEffect(() => {
        const allValues = Object.values(quesStateArray).flat();
        console.log('All values:', allValues);
        const count0 = allValues.filter(num => num === 0).length;
        const count1 = allValues.filter(num => num === 1).length;
        const count2 = allValues.filter(num => num === 2).length;
        const count3 = allValues.filter(num => num === 3).length;
        const count4 = allValues.filter(num => num === 4).length;
        setCount0(count0);
        setCount1(count1);
        setCount2(count2);
        setCount3(count3);
        setCount4(count4);
    }, [quesStateArray]);
    function updateQuesState(currSub, currQNo, newValue) {
        quesStateArray[currSub][currQNo] = newValue;
        setQuesStateArray(prevState => ({
            ...prevState,
            [currSub]: prevState[currSub].map((item, index) =>
                index === currQNo ? newValue : item
            ),
        }));
    };
    function updateAnsArray(newValue) {
        ansArray[currSub][currQNo] = newValue;
        setAnsArray(prevState => ({
            ...prevState,
            [currSub]: prevState[currSub].map((item, index) =>
                index === currQNo ? newValue : item
            ),
        }));
    };
    function handleOptionClick(optionValue) {
        updateAnsArray(optionValue);
    };
    function fromToFunc(toSub, toQNo) {
        if (quesStateArray[currSub][currQNo] === 0) {
            updateQuesState(currSub, currQNo, 2);
        }
        setCurrQNo(toQNo);
        setCurrSub(toSub);
    };
    function renderComponent(value, index) {
        if (value === 0) {
            return <NotVisitedBox value={index + 1}></NotVisitedBox>
        }
        else if (value === 1) {
            return <AnsweredBox value={index + 1}></AnsweredBox>
        }
        else if (value === 2) {
            return <NotAnsweredBox value={index + 1}></NotAnsweredBox>
        }
        else if (value === 3) {
            return <MarkedforReviewBox value={index + 1}></MarkedforReviewBox>
        }
        else if (value === 4) {
            return <AnsweredandMarkedforReviewBox value={index + 1}></AnsweredandMarkedforReviewBox>
        }
    };
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currQNo, currSub]);
    function saveAndNextFunc() {
        if (ansArray[currSub][currQNo] === 0) {
            alert("Please choose an option");
        }
        else {
            updateQuesState(currSub, currQNo, 1);
            if (currQNo === quesStateArray[currSub].length - 1) {
                if (currSub === "Physics") {
                    fromToFunc("Chemistry", 0);
                }
                else if (currSub === "Chemistry") {
                    fromToFunc("Maths", 0);
                }
                else {
                    fromToFunc("Maths", quesArray.Maths.length - 1);
                }
            }
            else {
                fromToFunc(currSub, currQNo + 1);
            }
        }
    };
    function clearFunc() {
        updateQuesState(currSub, currQNo, 2);
        handleOptionClick(0);
    };
    function markAndNextFunc() {
        updateQuesState(currSub, currQNo, 3);
        if (currQNo === quesStateArray[currSub].length - 1) {
            if (currSub === "Physics") {
                fromToFunc("Chemistry", 0);
            }
            else if (currSub === "Chemistry") {
                fromToFunc("Maths", 0);
            }
            else {
                fromToFunc("Maths", quesArray.Maths.length - 1);
            }
        }
        else {
            fromToFunc(currSub, currQNo + 1);
        }
    };
    function MarkAndSaveAndNextFunc() {
        if (ansArray[currSub][currQNo] === 0) {
            alert("Please choose an option");
        }
        else {
            updateQuesState(currSub, currQNo, 4);
            if (currQNo === quesStateArray[currSub].length - 1) {
                if (currSub === "Physics") {
                    fromToFunc("Chemistry", 0);
                }
                else if (currSub === "Chemistry") {
                    fromToFunc("Maths", 0);
                }
                else {
                    fromToFunc("Maths", quesArray.Maths.length - 1);
                }
            }
            else {
                fromToFunc(currSub, currQNo + 1);
            }
        }
    }
    function backFunc() {
        if (currQNo === 0) {
            if (currSub === "Chemistry") {
                fromToFunc("Physics", quesStateArray.Physics.length - 1);
            }
            else if (currSub === "Maths") {
                fromToFunc("Chemistry", quesStateArray.Chemistry.length - 1);
            }
            else {
                fromToFunc("Physics", 0);
            }
        }
        else {
            fromToFunc(currSub, currQNo - 1);
        }
    };
    function nextFunc() {
        if (currQNo === quesStateArray[currSub].length - 1) {
            if (currSub === "Physics") {
                fromToFunc("Chemistry", 0);
            }
            else if (currSub === "Chemistry") {
                fromToFunc("Maths", 0);
            }
            else {
                fromToFunc("Maths", quesArray.Maths.length - 1);
            }
        }
        else {
            fromToFunc(currSub, currQNo + 1);
        }
    };
    function submitFunc() {
        // Need to post the ansArray as JSON to the backend server
    }
    return (
        <>
            <div className='test-top'>
                <div className='font-mono'>Exam Name: </div>
                <div className='font-mono'>Remaining Time: </div>
            </div>
            <hr></hr>
            <div className='test-bottom'>
                <div className='test-bottom-left'>
                    <div ref={scrollRef} className='test-bottom-left-top'>
                        <div className='font-bold text-lg font-mono'>{currSub}</div>
                        <hr></hr>
                        <div className='font-bold text-lg font-mono'>Question {currQNo + 1}:</div>
                        <hr></hr>
                        <img src={quesArray[currSub][currQNo]} alt={currSub + " : " + Number(currQNo + 1)}></img>
                        <hr></hr>
                        <div className="flex justify-around p-5">
                            {[1, 2, 3, 4].map((buttonValue) => (
                                <button key={buttonValue} className={`${ansArray[currSub][currQNo] === buttonValue ? 'selected-option' : 'not-selected-option'}`} onClick={() => { handleOptionClick(buttonValue) }}>
                                    {buttonValue}
                                </button>
                            ))}
                        </div>
                        <hr></hr>
                    </div>
                    <hr></hr>
                    <div className='test-bottom-left-bottom'>
                        <div className='test-bottom-left-bottom-top'>
                            <button className='save-button' onClick={saveAndNextFunc}>SAVE & NEXT</button>
                            <button className='clear-button' onClick={clearFunc}>CLEAR</button>
                            <button className='save-mark-button' onClick={MarkAndSaveAndNextFunc}>SAVE & MARK FOR REVIEW</button>
                            <button className='mark-button' onClick={markAndNextFunc}>MARK FOR REVIEW & NEXT</button>
                        </div>
                        <div className='test-bottom-left-bottom-bottom'>
                            <button className='back-button' onClick={backFunc}>← BACK</button>
                            <button className='next-button' onClick={nextFunc}>NEXT →</button>
                            <button className='submit-button' onClick={submitFunc}>SUBMIT</button>
                        </div>
                    </div>
                </div>
                <div className='test-bottom-right'>
                    <div className='test-bottom-right-top'>
                        <div className='flex justify-around'>
                            <div className='flex items-center gap-1'>
                                <NotVisitedBox value={count0}></NotVisitedBox>
                                <div>Not Visited</div>
                            </div>
                            <div className='flex items-center gap-1'>
                                <NotAnsweredBox value={count2}></NotAnsweredBox>
                                <div>Not Answered</div>
                            </div>
                        </div>
                        <div className='flex justify-around'>
                            <div className='flex items-center gap-1'>
                                <AnsweredBox value={count1}></AnsweredBox>
                                <div>Answered</div>
                            </div>
                            <div className='flex items-center gap-1'>
                                <MarkedforReviewBox value={count3}></MarkedforReviewBox>
                                <div>Marked for Review</div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className='flex items-center gap-1'>
                                <AnsweredandMarkedforReviewBox value={count4}></AnsweredandMarkedforReviewBox>
                                <div>Answered and Marked for Review</div>
                            </div>
                        </div>
                    </div>
                    <div className='test-bottom-right-bottom'>
                        <div className='flex justify-around bg-orange-200'>
                            <button className='p-1 text-lg font-extrabold font-sans' onClick={() => { fromToFunc("Physics", 0) }}>PHYSICS</button>
                            <button className='p-1 text-lg font-extrabold font-sans' onClick={() => { fromToFunc("Chemistry", 0) }}>CHEMISTRY</button>
                            <button className='p-1 text-lg font-extrabold font-sans' onClick={() => { fromToFunc("Maths", 0) }}>MATHS</button>
                        </div>
                        <div className='flex flex-wrap m-2 gap-1 overflow-y-auto'>
                            {quesStateArray[currSub].map((value, index) => (
                                <div className="cursor-pointer" key={index} onClick={() => { fromToFunc(currSub, index) }}>
                                    {renderComponent(value, index)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestPage;