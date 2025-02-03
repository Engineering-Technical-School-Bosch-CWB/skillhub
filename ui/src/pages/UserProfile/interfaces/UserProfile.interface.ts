export interface IStudentData {
    id: number,
    performance?: number,
    className: string,
    classPosition?: number,
    subjectResults:
    {
        id: number,
        curricularUnitId: number,
        name: string,
        instructor: string,
        performance?: number
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
    }[]
}

export interface IUserData {
    id: number,
    name: string,
    identification: string,
    birthday?: string,
    position: string,
    sector: string,
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