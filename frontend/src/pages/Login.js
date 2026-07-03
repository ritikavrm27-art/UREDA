import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Form} from 'react-bootstrap'
import BASE_URL from "../config";
import MessageModal from "../components/MessageModal";
import axiosApi  from "../utils/axiosApi";
import SHA256 from "crypto-js/sha256";

function Login() {
  const [t, setT] = useState({});
  const [language, setLanguage] = useState("en");

  const [captchaText, setCaptchaText] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [loginSalt, setLoginSalt] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [messageModal, setMessageModal] = useState({ show: false, title: "", message: "", type: "success",isConfirmation: false, onConfirm: null,});
  const showMessage = ( title, message, type = "success", isConfirmation = false, onConfirm = null ) => {
                           setMessageModal({ show: true, title, message, type,isConfirmation, onConfirm });};

  const [user, setUser] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  
  useEffect(() => {

  const loadedScripts = [];

  const loadScript = (src) =>
    new Promise((resolve, reject) => {

      const existing = document.querySelector(
        `script[src="${src}"]`
      );

      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement("script");

      script.src = src;
      script.async = false;

      script.onload = () => resolve();

      script.onerror = () =>
        reject(new Error(`Failed to load ${src}`));

      document.body.appendChild(script);

      loadedScripts.push(script);
    });

  const init = async () => {

    try {

      // language
      const lang =
        localStorage.getItem("language") || "en";

      setLanguage(lang);

      // translations
      const trRes = await axiosApi.get(`/api/translations?lang=${lang}`);
      const trData = trRes.data;

      setT(trData);

      // captcha
      setCaptchaImage(
        `${BASE_URL}/auth/captcha?${Date.now()}`
      );

      // login salt
      const saltRes = await axiosApi.get(`/auth/login-salt`);
      console.log("Salt response:", saltRes);
      console.log("Salt data:", saltRes.data);
      setLoginSalt(saltRes.data.salt);

      // scripts
      await loadScript(
        "/assets/login/vendors/jquery/jquery-3.2.1.min.js"
      );

      await loadScript(
        "/assets/login/vendors/bootstrap/js/popper.js"
      );

      await loadScript(
        "/assets/login/vendors/bootstrap/js/bootstrap.min.js"
      );

      await loadScript(
        "/assets/login/vendors/select2/select2.min.js"
      );

      await loadScript(
        "/assets/login/vendors/tilt/tilt.jquery.min.js"
      );

      await loadScript(
        "/assets/login/js/main.js"
      );

      // tilt init
      if (window.$ && window.$.fn.tilt) {

        window.$(".js-tilt").tilt({
          scale: 1.1,
        });

      }

    } catch (err) {

      console.error(err);

    }
  };

  init();

  return () => {

    loadedScripts.forEach((script) => {

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

    });

    if (window.$) {

      window.$(".js-tilt")
        .tilt?.destroy?.call(
          window.$(".js-tilt")
        );

    }
  };

}, []);

  // helper function for sha256
  // const sha256 = async (message) => {
  //     const msgBuffer = new TextEncoder().encode(message);

  //     const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  //     const hashArray = Array.from(new Uint8Array(hashBuffer));

  //     return hashArray
  //       .map((b) => b.toString(16).padStart(2, "0"))
  //       .join("");
  // };

  const sha256 = (message) => {
    return SHA256(message).toString();
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
    console.log("Current loginSalt =", loginSalt);
    try {

      if (showCaptcha && !captchaText) {
        showMessage("Error", "Please enter captcha");
          return;
      }
      // Step 1: Convert password to SHA256
      const passwordHash = sha256(user.password);

      // Step 2: Create request hash using session salt
      const finalHash = sha256( passwordHash + loginSalt);

      // Step 3: Change textbox value
      setUser((prev) => ({
        ...prev,
        password: finalHash
      }));

      // Step 4: API Call
      const res = await axiosApi.post(`/user/login`,{username: user.username, password: passwordHash, finalHash: finalHash, captcha: showCaptcha ? captchaText : "",loginSalt:loginSalt});

      const data = res.data;

      if (data.success) {
        setFailedAttempts(0);
        setShowCaptcha(false);
        setCaptchaText("");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
       // alert(data.role_id);
        if (Number(data.role_id) === 1) {
          navigate("/dashboard");
        } else {
          navigate("/empdashboard");
        }
      } 
      else {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
          if (attempts >= 2) {
              setShowCaptcha(true);
              setCaptchaImage(`${BASE_URL}/auth/captcha?${Date.now()}`);
              setCaptchaText("");
          }
          showMessage("Error", data.message || "Invalid credentials");
    } 
  }
  catch (err) {
          console.error(err);
          setCaptchaImage(`${BASE_URL}/auth/captcha?${Date.now()}`);
          const message = err.response?.data?.message || err.response?.data?.error || err.message || "Error while login";
          showMessage("Error", message, "error");
          setCaptchaText("");
    }
  };
  const loadtranslations = async (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("language", lang);

    const response = await axiosApi.get(`/translations`, { params: { lang: lang, }, });
    setT(response.data);
  };

  return (
         
         <div className="limiter">
		<div className="container-login100">
        <div style={{width:"100px",display:"none"}}>
          <select value={language} onChange={(e) => { loadtranslations(e); }} >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select></div>
        <br />
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<span className="login100-form-title">
						{t.ureda_online || "UREDA Online"}
					</span>
					<Image src="/assets/images/logo.png" alt="IMG" fluid  />
					<div className="text-center p-t-5">
						{t.ureda_name || "Uttarakhand Renewable Energy Development Agency (UREDA)"}
					</div>
				</div>
        
				<Form onSubmit={handleLogin} className="login100-form validate-form">        

					<span className="login100-form-title">
						{t.login_title || "Authorised Login"}
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100"  name="username" placeholder={t.username || "Username"} value={user.username} onChange={handleChange} />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>

					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input type="password" className="input100" name="password" placeholder={t.password || "Password"} value={user.password} onChange={handleChange} />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					 {showCaptcha && ( 
            <div>
               <div className="wrap-input100 text-center">
                  <img src={captchaImage} alt="captcha" style={{ height: "55px", marginBottom: "10px", background:"#d9e2e8" }} />
                  <button type="button" className="ml-2" onClick={() => setCaptchaImage( `${BASE_URL}/auth/captcha?${Date.now()}` ) }  
                  style={{color:" #004f5c",width:"35px",height:"35px",border:"1px solid #a6bdc8",borderRadius:"50%"}}> 
                    <i className="fa fa-refresh fa-spin" style={{fontSize:"24px",padding:"4px"}}></i> </button>
                    </div>
                    <div className="wrap-input100 text-center">
                  <input className="input100" name="captcha" placeholder={t.captcha || "Enter Captcha"} value={captchaText} onChange={(e) => setCaptchaText(e.target.value) } />
                  <span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-check-square-o" aria-hidden="true"></i>
						</span>
               </div>
               </div>
					 )} 
					<div className="container-login100-form-btn">
						<button type="submit" className="login100-form-btn"> {t.login || "Login"} </button>
					</div>

					<div className="text-center p-t-12">
						<span className="txt1">
							{t.forgot  || "Forgot"}
						</span>
						<a className="txt2" href="#">
							{t.forgot_password || "Username / Password?"}
						</a>
					</div>
				</Form>
			</div>
		</div>    
         <MessageModal show={messageModal.show} title={messageModal.title} message={messageModal.message} type={messageModal.type}
         isConfirmation={messageModal.isConfirmation} onConfirm={messageModal.onConfirm} 
         onClose={() => setMessageModal((prev) => ({ ...prev, show: false, })) } />
	</div>
  );
}

export default Login;