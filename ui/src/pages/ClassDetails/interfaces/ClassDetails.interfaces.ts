export interface ISubjectBarChatProps {
    data: SubjectExploitation[]
    selectedId: number | null
    onBarClick: Function
}

export interface IGeneralChart {
    data: StudentSubject[]
    selectedId: number | null
    onBarClick: Function
}

export interface StudentSubject {
    id: number
    name?: string
    performance?: number
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
    selectedId: number | null
    onBarClick: Function
}

export interface ContentAreaChartValues {
    contentAreaId?: number,
    area?: string,
    performance?: number
}

export interface RankingChartProps {
    data: StudentSubject[]
    onClick: Function
}