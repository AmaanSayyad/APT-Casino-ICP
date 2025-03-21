import AiModal from "../components/AiModal";
import "../styles/globals.css";

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
      </body>
    </html>
  );
}
