import React, { useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image} from 'react-bootstrap'

function Logout() {  
  useEffect(() => async () =>{
    const cssFiles = [
      "assets/login/vendors/bootstrap/css/bootstrap.min.css",
      "assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
      "assets/login/vendors/animate/animate.css",
      "assets/login/vendors/css-hamburgers/hamburgers.min.css",
      "assets/login/vendors/select2/select2.min.css",
      "assets/login/css/util.css",
      "assets/login/css/main.css",
    ];

    const links = cssFiles.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

  const loadedScripts = [];

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);

      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = false;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));

      document.body.appendChild(script);
      loadedScripts.push(script);
    });

  const loadAll = async () => {
    try {
      await loadScript("/assets/login/vendors/jquery/jquery-3.2.1.min.js");
      await loadScript("/assets/login/vendors/bootstrap/js/popper.js");
      await loadScript("/assets/login/vendors/bootstrap/js/bootstrap.min.js");
      await loadScript("/assets/login/vendors/select2/select2.min.js");
      await loadScript("/assets/login/vendors/tilt/tilt.jquery.min.js");
      await loadScript("/assets/login/js/main.js");

      if (window.$ && window.$.fn.tilt) {
        window.$(".js-tilt").tilt({
          scale: 1.1,
        });
      }
    } catch (err) {
      console.error("Script loading failed:", err);
    }
  };

  loadAll();

   // Cleanup when leaving Login page
  return () => {

    links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
      
    loadedScripts.forEach((script) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });

    if (window.$) {
      window.$(".js-tilt").tilt?.destroy?.call(
        window.$(".js-tilt")
      );
    }
  };
}, []);
  
  return (
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 text-center">
				<div className="login100-pic js-tilt w-100" data-tilt>
					<span className="login100-form-title">
						<h2 class="mb-0 mt-4">User Logout successfully.</h2>
					</span>
					<Image src="/assets/images/logo.png" alt="IMG" fluid className="w-25" />
					<div className="text-center p-t-5"><br/>
						Uttarakhand Renewable Energy Development Agency (UREDA)<br/><br/>
                         <Link to="/" className="btn bg-white text-primary d-inline-flex align-items-center">  Back to Login</Link>
					</div>
				</div>
        				
			</div>
		</div>
	</div>
  
  );
}

export default Logout;