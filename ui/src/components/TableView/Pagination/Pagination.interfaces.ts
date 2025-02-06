export default interface IPaginationProps {
    pages: number,
    current: number,
    onChange: (index: number) => void
}