const express = require('express');
const router = express.Router();
const mockSchema = require('../db/mockSchema.js');

router.post('/',async (req,res)=>{
    try {
        const {markedArray,uid} = req.body;
        // markedArray[i] = [subject,image_url,optionMarked]
        // markedArray.size() = n
        // uid: unique-id of test (will help in DB querying) and will be returned to admin to keep track of
        // mock test

        // Fetch mock test correct answers
        const result = await mockSchema.findOne({uid:uid});
        const questions = result.questions;
        const exam = result.exam;

        let questionCountCorrect = {};
        let questionCountWrong = {};
        // object of each subject acc to JEE/NEET (Key) and correct/incorrect answers for all subjects (value)

        questionCountCorrect['Physics'] = 0;
        questionCountCorrect['Chemistry'] = 0;
        questionCountWrong['Physics'] = 0;
        questionCountWrong['Chemistry'] = 0;
        if(exam == 'JEE'){
            questionCountCorrect['Mathematics'] = 0;
            questionCountWrong['Mathematics'] = 0;
        }
        else{
            questionCountCorrect['Botany'] = 0;
            questionCountCorrect['Zoology'] = 0;
            questionCountWrong['Botany'] = 0;
            questionCountWrong['Zoology'] = 0;
        }

        let sum = 0;
        
        let i = 0;
        for(let question of questions){
            // console.log(`${i + 1}${i==0 ? 'st' : (i==1 ? 'nd' : 'rd')} question\n`,question);
            
            let answer = question.answer;
            let subject = question.subject;
            
            if(markedArray[i] == answer){
                sum += 4;
                questionCountCorrect[subject] += 1;
            }
            else{
                sum -= 1;
                questionCountWrong[subject] += 1;
            }
            i += 1;
        }

        res.status(200).json({message:"Success",
            ok:true,
            total_marks:sum,
            questionCountCorrect:questionCountCorrect,
            questionCountWrong:questionCountWrong
        });
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router

