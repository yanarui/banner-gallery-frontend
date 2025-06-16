import { ReactNode } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./base/Header/Header";
import Footer from "./base/Footer/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-1">
          <main className="p-6">{children}</main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
