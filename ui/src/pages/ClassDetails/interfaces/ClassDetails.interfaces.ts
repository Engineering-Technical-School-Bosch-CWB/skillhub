import { IStudentCardProps } from "../../../components/StudentCard/interfaces/IStudentCard.interfaces"
export interface ISubjectBarChatProps {
    data: SubjectExploitation[]
}

export interface IGeneralChart {
    data: StudentSubject[]
}

export interface StudentSubject {
    name?: string,
    grade?: number
}

export interface AddModalProps {
    isOpened: boolean,
    onClose: Function
}

export interface ModalContentProps {
    subject: string,
    time: number
}

export interface SubjectExploitation {
    subjectId: number, 
    subject: string,
    result: number
}

export interface GeneralExplotaitionChartProps {
    student: string,
    grade?: number
}

export interface ContentAreaChartProps {
    data?: ContentAreaChartValues[],
    onColumnClicked?: Function
}

export interface ContentAreaChartValues {
    contentAreaId?: number,
    area?: string,
    performance?: number
}

export interface RankingChartProps {
    data: StudentSubject[]
}