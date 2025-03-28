const Footer = () => (
  <div className="bg-palette-accent-dark text-palette-foreground-dark py-8">
    <div className="container text-sm flex divide-x-2 divide-palette-foreground-dark ">
      <span className="pr-2">
        © {new Date().getFullYear()} NIT Arunachal Pradesh. All rights reserved
      </span>
      <span className="pl-2">
        Built by <a href="https://github.com/tripathics">tripathics</a>
      </span>
    </div>
  </div>
);

export default Footer;
