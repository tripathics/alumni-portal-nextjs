export default function FieldWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-6 pb-8">{children}</div>;
}
