import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Fade = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      }
    </AnimatePresence>
  );
};

export default Fade;
