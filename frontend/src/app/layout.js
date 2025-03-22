import AiModal from "../components/AiModal";
import "../styles/globals.css";
import toast, { Toaster } from 'react-hot-toast';
export const metadata = {
  title: "ICP-Casino",
  description: "Web3 gaming arena",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">

        <body>
          <AiModal />
          {children}
          <Toaster   position="top-center" />
        </body>
  
    </html>
  );
}
