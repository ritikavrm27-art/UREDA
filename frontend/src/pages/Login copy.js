import ReCAPTCHA from "react-google-recaptcha";
import React, { useState, useRef, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, Form, Button, ListGroup, } from 'react-bootstrap'
import Card from '../components/Card'

import "../assets/scss/hope-ui.scss"
import "../assets/scss/custom.scss"
import "../assets/scss/dark.scss"
import "../assets/scss/rtl.scss"
import "../assets/scss/customizer.scss"
// img
import auth1 from '../assets/images/auth/d.jpg'
import logo from '../assets/images/logo.png'

function Login() {
  const [captchaToken, setCaptchaToken] = useState("");
  const [loginSalt, setLoginSalt] = useState("");
  const recaptchaRef = useRef(null);

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();
  // =========================
  // Fetch session salt on page load
  // =========================
  useEffect(() => {

    fetch("http://localhost:8002/auth/login-salt", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginSalt(data.salt);
        console.log(data.salt);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  // helper function for sha256
  const sha256 = async (message) => {
      const msgBuffer = new TextEncoder().encode(message);

      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

      const hashArray = Array.from(new Uint8Array(hashBuffer));

      return hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
  };

  // handle input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // login api
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      if (!captchaToken) {
      alert("Please verify captcha");
      return;
    }
      // Step 1: Convert password to SHA256
      const passwordHash = await sha256(user.password);

      // Step 2: Create request hash using session salt
      const finalHash = await sha256( passwordHash + loginSalt);

      // Step 3: Change textbox value
      setUser((prev) => ({
        ...prev,
        password: finalHash
      }));

      // Step 4: API Call
      const res = await fetch(
        "http://localhost:8002/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: user.username,

            password: passwordHash,

            finalHash: finalHash,

            captcha: captchaToken
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        console.log("loginSalt:"+loginSalt);
        console.log("finalHash:"+finalHash);
        alert(data.message || "Invalid credentials");
      }
      recaptchaRef.current?.reset();
      setCaptchaToken("");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white vh-100">
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card border-0">
                           <Card.Body>
                              <Link to="/dashboard" className="navbar-brand d-flex align-items-center justify-content-center mb-3">
                                 <Image src={logo} width="150px" height="150px"/>
                              </Link>
                              <h2 className="mb-2 text-center">Sign In</h2>
                              <p className="text-center">Login to stay connected.</p>
                              <Form onSubmit={handleLogin}>                                          
                                 <Row>
                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email</Form.Label>
                                          <Form.Control type="text" className="form-control mb-3" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Password</Form.Label>
                                          <Form.Control type="password" className="form-control mb-3" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="">
                                    <ReCAPTCHA sitekey="6LcwsfYsAAAAAPKN3tf0rRt1zBI3ZVhJFw50CHJL" onChange={(token) => setCaptchaToken(token)} />
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Link to="/auth/recoverpw" style={{color: "079aa2"}}>Forgot Password?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button disabled={!captchaToken} type="submit" variant="btn btn-info">Login</Button>
                                 </div>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
                  <div className="sign-bg">
                     <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.05">
                           <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                           <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                           <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                           <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                        </g>
                     </svg>
                  </div>
               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
            </Row>
         </section>
      
  );
}

export default Login;