import { ReactNode } from 'react';
import { FaGithub, FaHouse, FaLinkedin } from 'react-icons/fa6';

import { getYear } from 'date-fns';

import AriaLink from '../../navigation/link/AriaLink';

export default function Footer() {
  function SocialMediaLink({
    href,
    children,
  }: {
    href: string;
    children: string | ReactNode;
  }) {
    return (
      <AriaLink
        href={href}
        target="_blank"
        className="flex items-center justify-center gap-1"
        rel="noreferrer"
      >
        {children}
      </AriaLink>
    );
  }

  const year = getYear(new Date());

  return (
    <footer className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between p-3 bg-zinc-600 text-gray-900 dark:bg-zinc-900 dark:text-gray-100 text-lg">
      <div className="flex flex-col items-start justify-center order-1">
        <SocialMediaLink href="https://github.com/PSONetto/">
          <FaGithub /> GitHub
        </SocialMediaLink>
        <SocialMediaLink href="https://www.linkedin.com/in/plinio-netto/">
          <FaLinkedin /> Linkedin
        </SocialMediaLink>
        <SocialMediaLink href="https://psonetto-portfolio.vercel.app/">
          <FaHouse /> Portfolio
        </SocialMediaLink>
      </div>

      <span className="text-sm order-3 md:order-2">© {year} Vet CRUD</span>

      <span className="text-sm order-2 md:order-3">Made by PSONetto</span>
    </footer>
  );
}
