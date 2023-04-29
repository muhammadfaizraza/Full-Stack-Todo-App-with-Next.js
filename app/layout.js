import "../styles/app.scss";
import Header from "./header";
import { ContextProvider } from "../components/Clients";

export const metadata = {
  title: "Todo App",
  description: "Todo App will increase your Productivity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Header />

            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
