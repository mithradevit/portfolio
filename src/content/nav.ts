export type NavItem = {
  href: string;
  /** Rendered uppercase by the Header — store it in normal case here. */
  label: string;
  /** Opens in a new tab and renders as a plain <a> rather than a Link. */
  external?: boolean;
};

/** The primary nav, rendered as a segmented pill in the Header. */
export const navItems: NavItem[] = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/fun", label: "Fun" },
  {
    href: "https://drive.google.com/file/d/1E3nt7TDm6jTCg5RmGJRj487b71H2yAhl/view?usp=sharing",
    label: "Resume",
    external: true,
  },
];
