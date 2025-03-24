import Header from "../Header";
import { t } from 'i18next';

/**
 * `NotFound` component: Displays a "Not Found" message with a header.
 *
 * Features:
 * - Includes the `Header` component for consistent navigation or branding.
 * - Shows a centered "Not Found" message to indicate an unavailable page or resource.
 *
 * Example usage:
 * ```
 * import NotFound from "./NotFound";
 * 
 * function App() {
 *   return (
 *     <Routes>
 *       <Route path="*" element={<NotFound />} />
 *     </Routes>
 *   );
 * }
 * ```
 */
const NotFound = () => {
    return (
        <>
            <Header/>

            <div style={{ margin: "20vh auto" }}>
                <h3 style={{ textAlign: "center" }}>{t('components.notFound')}</h3>
            </div>
        </>
    )
}

export default NotFound
