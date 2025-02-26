export interface IStudentData {
    id: number,
    performance?: number,
    classId: number,
    className: string,
    classPosition?: number,
    subjectAreaResults: {
        grade: number
        id: number,
        name: string,
    }[],
    subjectResults:
    {
        id: number,
        curricularUnitId: number,
        name: string,
        instructor: string,
        grade?: number
        aptitude?: number
    }[],
    subjectFeedBacks:
    {
        id: number,
        content: string,
        updatedAt: string,
        instructor: string,
        subject: string,
        instructorId: number
    }[],
    feedbacks: {
        id: number,
        content: string,
        updatedAt: string,
        instructor: string,
        instructorId: number
        studentMayVisualize?: boolean
    }[]
}

export interface IUserData {
    id: number
    name: string
    identification: string
    birthday?: string
    position: string
    sector: string
    occupationArea?: string
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
    personalFeedbacks: IFeedback[],
    id: number,
    identification: string,
    name:string 
    position: string,
    sector: string,
    birthday: string
}

// export interface IRadarData {
//     subject
// }