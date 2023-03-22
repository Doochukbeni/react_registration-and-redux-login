import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
      <header>
        <h1>Welcome to Roi Store</h1>
      </header>
      <main>
        <p>Located at Agoe wages Lome Togo </p>
        <p> &nbsp; </p>

        <address>
          car spare parts <br />
          Agoe wages gandamerie <br />
          Lome Togo <br />
        </address>
      </main>

      <footer>
        <Link to="/login">Login</Link>
        <p>
          Don't have an account ? <br /> <Link to="/login">Register</Link>
        </p>
      </footer>
    </section>
  );
};

export default Public;
