import { useState, useEffect } from 'react';

export interface Resume {
  type: string;
  url: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  details: string[];
  pdf: string | null;
  thumbnail: string | null;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  tools: string[];
  description: string;
  thumbnail: string | null;
}

export interface ContentManifest {
  profileImage: string | null;
  resumes: Resume[];
  certificates: Certificate[];
  projects: Project[];
}

export function useContent() {
  const [content, setContent] = useState<ContentManifest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/manifest.json')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load content manifest', err);
        setLoading(false);
      });
  }, []);

  return { content, loading };
}
