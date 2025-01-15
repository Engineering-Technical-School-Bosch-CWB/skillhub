export interface studentData {
    userId: number,
    image?: string,
    name: string,
    class: {
        name: string
    }
}

export interface rankingData {
    position: number,
    exploitation: number
}

export interface subjectFeedback {
    id: number, 
    date: Date,
    user: {
        name: string,
        userId: number
    },
    subject: {
        subjectId: number,
        name: string
    }
    feedback: string
}

export interface personalFeedback {
    id: number, 
    date: Date,
    user: {
        name: string,
        userId: number
    },
    feedback: string
}

export interface IStudentProfileData {
    student: studentData,
    ranking: rankingData,
    subjectFeedbacks: subjectFeedback[],
    personalFeedbacks: personalFeedback[]
}