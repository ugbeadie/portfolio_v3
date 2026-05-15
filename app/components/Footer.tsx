export function Footer() {
  return (
    <footer
      className="
        bg-background
        py-8
        px-6
        md:px-12
        border-t
        border-border
        text-text
        font-sans
        uppercase
        transition-colors
        duration-300
      "
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-center">
        <div className="text-text-secondary font-sans text-xs text-center">
          © {new Date().getFullYear()} Ugbe Adie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
