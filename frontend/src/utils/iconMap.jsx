import React from 'react';
import {
  Code, Smartphone, PenTool, Cloud, Brain, BarChart, Briefcase,
  Rocket, Globe, Database, Shield, Layers, Zap, Server, Palette,
} from 'lucide-react';

export const ICON_MAP = {
  Code, Smartphone, PenTool, Cloud, Brain, BarChart, Briefcase,
  Rocket, Globe, Database, Shield, Layers, Zap, Server, Palette,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export const getIcon = (name, size = 32) => {
  const IconComponent = ICON_MAP[name] || Code;
  return <IconComponent size={size} />;
};
