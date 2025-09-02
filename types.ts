
export interface Requirements {
  cpu: string;
  ram: number; // in GB
  storage: number; // in GB
}

export interface Links {
  homepage: string;
  download: string;
  documentation: string;
}

export interface Distro {
  id: string;
  name: string;
  logo: string;
  description: string;
  longDescription: string;
  tags: string[];
  req: Requirements;
  req_rec?: Requirements;
  links: Links;
  base: 'Debian' | 'Ubuntu' | 'Arch' | 'Red Hat' | 'Independent';
  experience: 'beginner' | 'intermediate' | 'advanced';
  useCase: 'general' | 'development' | 'gaming' | 'privacy' | 'server' | 'lightweight';
}