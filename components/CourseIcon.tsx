import {
  Code,
  FileCode,
  Layers,
  Server,
  BookOpen,
  Database,
  Globe,
  Cpu,
  BrainCircuit,
  Terminal,
  Zap,
  Lock,
  GitBranch,
  Monitor,
  Smartphone,
  Cloud,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Code,
  FileCode,
  Layers,
  Server,
  BookOpen,
  Database,
  Globe,
  Cpu,
  BrainCircuit,
  Terminal,
  Zap,
  Lock,
  GitBranch,
  Monitor,
  Smartphone,
  Cloud,
};

interface CourseIconProps {
  iconName: string;
  size?: number;
  className?: string;
}

export default function CourseIcon({
  iconName,
  size = 20,
  className,
}: CourseIconProps) {
  const IconComponent = ICON_MAP[iconName] ?? Code;
  return <IconComponent size={size} className={className} />;
}
