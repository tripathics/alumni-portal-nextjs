const Footer = () => (
  <div className="bg-palette-accent-dark text-palette-foreground-dark py-8">
    <div className="container text-sm flex gap-1 sm:flex-row flex-col-reverse items-center justify-center sm:justify-start">
      <div>
        © {new Date().getFullYear()}{" "}
        <a className="link text-palette-link-dark" href="https://nitap.ac.in">
          NIT Arunachal Pradesh
        </a>
        . All rights reserved
      </div>
      <div className="mx-2 border-r-2 border-palette-foreground-dark h-4 sm:block hidden" />
      <div>
        Built by{" "}
        <a
          className="link text-palette-link-dark"
          href="https://github.com/tripathics"
        >
          tripathics
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
