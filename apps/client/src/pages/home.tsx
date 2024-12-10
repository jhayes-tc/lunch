import { Modals } from "../components/modals/core/modalConfig";
import useModal from "../components/modals/core/useModal";

const Home = () => {
  const authModal = useModal(Modals.Auth);

  const showAuthModal = () => {
    authModal.open({
      onClose: authModal.close,
    });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1627662236973-4fd8358fa206)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">Get help with the question "what's for lunch?"</p>
          <button onClick={showAuthModal} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
