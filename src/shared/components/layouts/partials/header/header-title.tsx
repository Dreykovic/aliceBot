import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Subtitle from '@/shared/components/ui/Typography/subtitle';
import { RootState } from '@/stores';

export default function HeaderTitle() {
  const { pageTitle } = useSelector((state: RootState) => state.header);

  useEffect(() => {
    // This effect can be used to handle any additional logic when the title changes
  }, [pageTitle]);

  return (
    <motion.div
      key={pageTitle} // Key to ensure motion div re-renders when pageTitle changes
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Subtitle className="">{pageTitle}</Subtitle>
    </motion.div>
  );
}
