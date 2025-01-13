const {DBConnection} = require('./db/dbConnect.js');
const mockSchema = require('./db/mockSchema.js');

require('dotenv').config()

DBConnection();

async function run () {
    const user = await mockSchema.create({
        exam: "Mock Exam for Science",
        questions: [
            {
                subject: "Physics",
                topicName: "Newton's Laws of Motion",
                imageURL: "https://example.com/images/newton-laws.jpg",
                answer: "A"
            },
            {
                subject: "Chemistry",
                topicName: "Periodic Table",
                imageURL: "https://example.com/images/periodic-table.jpg",
                answer: "B"
            },
            {
                subject: "Mathematics",
                topicName: "Integration",
                imageURL: "https://example.com/images/integration.jpg",
                answer: "D"
            }
        ],
        uid: "mock-exam-uid-12345"
    });
    console.log('User: ',user);
}

run();