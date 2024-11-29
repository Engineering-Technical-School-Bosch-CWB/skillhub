import { MouseEventHandler, ReactNode } from "react";
import styles from "./styles.module.css"

interface IModalProps {
    open: boolean;
    handleClose: () => void;
    children?: ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
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
    maxWidth = "md" 
}:IModalProps) => {

    const handleModalClick:MouseEventHandler = (e) => {
        e.stopPropagation()
    }

    return open && (
        <div 
            className={styles.modal_container}
            onClick={handleClose}
        >
            <div 
                className={`${styles.modal} ${styles[maxWidth]}`}
                onClick={handleModalClick}
            >
                <button 
                    className={styles.close_button}
                    onClick={handleClose}
                >X</button>

                { children }
            </div>
        </div>
    )
}

export default Modal
