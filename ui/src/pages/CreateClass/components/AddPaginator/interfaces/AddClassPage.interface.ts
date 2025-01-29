export interface IGetCourse {
    id?: number,
    name: string
}
export interface IAddClass {
    name: string,
    abbreviation: string,
    periods: number
}
export interface IAddStudent {
    name: string,
    identification: string
}
export interface IAddSubject {
    name: string,
    time: number
}

export interface INewClass {
    course: IGetCourse,
    class: IAddClass,
    students: IAddStudent[],
    subjects: IAddSubject[],
    template: boolean,
}

export interface  IAddClassPageProps{
    index: number,
    data: INewClass,
    setClass: (newClass: IAddClass) => void;
    setStudents: (students: IAddStudent[]) => void;
    setSubjects: (subjects: IAddSubject[]) => void;
    setIndex: (index: number) => void;
}