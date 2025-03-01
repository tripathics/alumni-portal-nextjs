interface FormSectionHeadingProps {
  label: string;
}
const FormSectionHeading: React.FC<FormSectionHeadingProps> = ({ label }) => (
  <h3 className="text-sm tracking-wider font-mono font-bold">{label}</h3>
);

export default FormSectionHeading;
