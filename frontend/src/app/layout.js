import "../styles/globals.css";
import AiModal from "../components/AiModal";
import toast, { Toaster } from 'react-hot-toast';
export const metadata = {
  title: "APT-Casino",
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
