import { SidebarTrigger } from "./ui/sidebar";

interface HeaderProps {
  title: string;
  subtitle: string;
  content?: React.ReactNode;
}

export const Header = ({ title, subtitle, content }: HeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full p-4 border-b">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h3 className="text-primary font-bold">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">{content && content}</div>
      </div>
    </div>
  );
};
