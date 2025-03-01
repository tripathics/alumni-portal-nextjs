import { LucideIcon } from "lucide-react";

export const SectionHeader: React.FC<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = ({ title, description, icon: Icon }) => (
  <header className="mb-8">
    <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
      <Icon className="text-primary w-6 h-6" strokeWidth={2.25} />
    </div>
    <h1 className="text-3xl font-normal font-sans mb-2">{title}</h1>
    <p className="text-muted">{description}</p>
  </header>
);
