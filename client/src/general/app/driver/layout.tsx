const DriverLayout = ({ children }: _IChildren) => {
  return (
    <section className="pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">{children}</div>
    </section>
  );
};

export default DriverLayout;
