
'use client';

import { Inter } from "next/font/google";
import React from 'react';
import Head from 'next/head';
import "./globals.css";
import NavLayout from "@/components/nav-layout";
import FirebaseUserProvider from "../lib/firebase-user";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInContainer from "@/components/signin-container";
import { NotebookProvider } from "@/lib/notebookContext"


const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Edusys</title>
        <meta name="description" content="Your Personalised Learning with Gemini API Firebase Extensions" />
      </Head>
      <body className={inter.className}>
        <FirebaseUserProvider>
          <NotebookProvider>
            <Router>
              <NavLayout>
                <Routes>
                  <Route path="/signin" element={<SignInContainer />} />
                </Routes>
                {children}
              </NavLayout>
            </Router>
          </NotebookProvider>
        </FirebaseUserProvider>
      </body>
    </html>
  );
};

export default RootLayout;