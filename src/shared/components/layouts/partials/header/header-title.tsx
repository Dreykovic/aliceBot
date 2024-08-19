import { useSelector } from 'react-redux';

import Subtitle from '@/shared/components/ui/Typography/subtitle';
import { RootState } from '@/stores';

export default function HeaderTitle() {
  const { pageTitle } = useSelector((state: RootState) => state.header);
  return (
    <>
      <Subtitle className="">{pageTitle}</Subtitle>
    </>
  );
}
