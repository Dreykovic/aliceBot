import ALICE from '@/assets/images/alice.png';
interface Props {
  type: 'RETRAIT' | 'DEPOT';
}

const ConfirmAlert = (props: Props) => {
  return (
    <div>
      <h1>{props.type} effectué avec succès !!!</h1>
      <img src={ALICE} alt="" />
    </div>
  );
};

export default ConfirmAlert;
