export default function FieldWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-4 mb-10">{children}</div>;
}
