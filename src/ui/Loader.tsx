/**
 * A functional React component that renders a full-screen loader overlay.
 *
 * The loader is centered both vertically and horizontally, with a semi-transparent
 * background and a blurred effect to indicate a loading state. The actual loader
 * animation is represented by a child element with the class `loader`.
 *
 * @returns {JSX.Element} The JSX representation of the loader overlay.
 */
function Loader(): JSX.Element {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
