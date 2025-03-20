export interface IAddCourse {
    id: number,
    name: string
}

export interface IAddClass {
    name?: string,
    startingYear?: number
    abbreviation?: string,
    durationPeriods?: number,
}

export interface IAddStudent {
    name: string,
    identification: string
}

export interface IAddSubject {
    curricularUnitId: number,
    duration: number,
    name?: string
}

export interface INewClass {
    course?: IAddCourse,
    class: IAddClass,
    students: IAddStudent[],
    subjects: IAddSubject[],
    template: boolean,
}

export interface  IAddClassPageProps{
    index: number,
    data: INewClass,
    isChecked: boolean,
    setClass: (newClass: IAddClass, getCourse?: IAddCourse) => void;
    setStudents: (students: IAddStudent[]) => void;
    setSubjects: (subjects: IAddSubject[]) => void;
    setIndex: (index: number) => void;
}