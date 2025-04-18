export interface IClass {
    id: number
    name: string
    abbreviation?: string
    startingYear: number
    durationPeriods?: number
    courseId: number
    isArchived: boolean
}

export interface IUpdateModalProps {
    isUpdateModalOpen: boolean
}

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
    isOpen: boolean,
    onClose: Function,
    classId: number
}

export interface ModalContentProps {
    id: number,
    subject: string,
    curricularUnitId: number,
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
