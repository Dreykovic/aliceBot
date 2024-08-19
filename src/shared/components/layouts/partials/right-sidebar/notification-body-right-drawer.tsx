function NotificationBodyRightDrawer() {
  return (
    <>
      {[...Array(15)].map((_, i) => {
        return (
          <div
            key={i}
            className={
              'grid mt-3 card bg-base-200 rounded-box p-3' +
              (i < 5 ? ' bg-ternary' : '')
            }
          >
            {i % 2 === 0
              ? `Transfert airtime éffectué hier`
              : `Vérification KYC succès `}
          </div>
        );
      })}
    </>
  );
}

export default NotificationBodyRightDrawer;
