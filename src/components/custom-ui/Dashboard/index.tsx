interface DashboardLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}
const Dashboard: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebar, main] = children;
  return (
    <div className="grid gap-8 md:grid-cols-12 grid-cols-6">
      <div className="lg:col-span-3 md:col-span-4 col-span-6">
        <aside>{sidebar}</aside>
      </div>
      <div className="lg:col-span-9 md:col-span-8 col-span-6">{main}</div>
    </div>
  );
};

export default Dashboard;
