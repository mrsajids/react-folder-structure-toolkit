const NotFoundPage = () => {
  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="display-4">Page Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <p className="mt-4">
          <a href="/" className="btn btn-primary">
            Go to Home
          </a>
        </p>
      </div>
    </>
  );
};
export default NotFoundPage;
