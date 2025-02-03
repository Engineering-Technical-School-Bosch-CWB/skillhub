export interface IFeedbackCardProps {
    color: string
    title: string
    subtitle?: string
    editButton?: {
        label: string
        action: Function
    }
    content?: string
}