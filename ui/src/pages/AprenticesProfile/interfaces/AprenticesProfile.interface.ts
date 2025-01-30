export interface IStudentData {
    id: number,
    userId: number,
    name: string,
    identification: string,
    birthday: string,
    className: string,
    classPosition: number,
    performance: number,
    position: string,
    sector: string
}

export interface IRankingData {
    position: number,
    exploitation: number
}

export interface ISubjectData {
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

export interface IFeedback {
    id: number, 
    date: Date,
    user: {
        name: string,
        userId: number
    },
    feedback: string
}

export interface IStudentProfileData {
    student: IStudentData,
    ranking: IRankingData,
    subjectFeedbacks: ISubjectData[],
    personalFeedbacks: IFeedback[]
}