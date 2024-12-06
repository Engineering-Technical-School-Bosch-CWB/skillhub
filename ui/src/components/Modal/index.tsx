import styled from "./styles.module.css"
import { MouseEventHandler, ReactNode } from "react";
import Text from "../../typography";
import Icon from "../Icon";
import Divider from "../Divider";

interface IModalProps {
    open: boolean;
    handleClose: () => void;
    children?: ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    title: string;
}

/**
 * `Modal` component: A customizable modal dialog with optional content and size control.
 *
 * Props:
 * - `open` (boolean, required): Controls whether the modal is visible.
 * - `handleClose` (function, required): Callback function to close the modal. 
 *   Triggered when the background or close button is clicked.
 * - `children` (ReactNode, optional): Content to display inside the modal.
 * - `maxWidth` (string, optional): Defines the maximum width of the modal. Options are:
 *   - `"xs"`: Extra small.
 *   - `"sm"`: Small.
 *   - `"md"` (default): Medium.
 *   - `"lg"`: Large.
 *   - `"xl"`: Extra large.
 *
 * Example usage:
 * ```
 * import Modal from "./Modal";
 * 
 * function App() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *       <Modal 
 *         open={isOpen} 
 *         handleClose={() => setIsOpen(false)} 
 *         maxWidth="sm"
 *       >
 *         <p>This is modal content</p>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 *
 * Notes:
 * - Clicking outside the modal content or the close button triggers `handleClose`.
 */
const Modal = ({ 
    children,
    open,
    handleClose,
    maxWidth = "md",
    title 
}:IModalProps) => {

    const handleModalClick:MouseEventHandler = (e) => {
        e.stopPropagation()
    }

    return open && (
        <div 
            className={styled.modal_container}
            onClick={handleClose}
        >
            <div 
                className={`${styled.modal} ${styled[maxWidth]}`}
                onClick={handleModalClick}
            >
                <div className={styled.header}>
                    <Text fontWeight="bold" fontSize="xl">{ title }</Text>
                    <div onClick={handleClose} className={styled.close}><Icon name="close" size="md"/></div>
                </div>
                <Divider size="small"/>

                { children }
            </div>
        </div>
    )
}

export default Modal
