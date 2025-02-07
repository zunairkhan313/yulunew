import Provider from "@/redux/Provider";
// import Footer from "./Components/Footer";
// import FooterTop from "./Components/FooterTop";
// import NavScrollExample from "./Components/Navbar";
// import NavbarScrollExample from "./Components/Navbar1";
// import Top from "./Components/TopButton";
import { AuthProvider } from "./Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar1 from "./components/Navbar1";
import Navbar2 from "./components/Navbar2";
import Footer from "./components/Footer";
// import Head from "next/head";
// import Whatsaap from "./Components/Whatsaap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Yulu Supply Chain | Hand Tools | Power Tools",
    template: "%s - Yulu Supply Chain | Hand Tools | Power Tools"
  },
  description: "Yulu Supply Chain is your go-to tool website for optimizing supply chain management. Discover innovative solutions, tools, and resources to streamline operations, enhance efficiency, and drive business growth.",
  
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <AuthProvider>
          <Provider>
          <Navbar1/>
          <Navbar2/>
            {children}
          <Footer/>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}


