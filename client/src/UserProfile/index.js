export default function UserProfile() {
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("isLogin");
          window.location.replace("http://localhost:3000/");
        }}
      >
        Logout
      </button>
    </>
  );
}
