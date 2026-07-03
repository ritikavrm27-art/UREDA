import { useEffect } from "react";

function Headerjs() {
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;

        document.body.appendChild(script);
      });

    const loadAll = async () => {
      try {
        await loadScript("/assets/dashboard/js/core/libs.min.js");
        await loadScript("/assets/dashboard/js/core/external.min.js");
        await loadScript("/assets/dashboard/js/charts/widgetcharts.js");
        await loadScript("/assets/dashboard/js/charts/vectore-chart.js");
        await loadScript("/assets/dashboard/js/charts/dashboard.js");
        await loadScript("/assets/dashboard/js/plugins/fslightbox.js");
        await loadScript("/assets/dashboard/js/plugins/setting.js");
        await loadScript("/assets/dashboard/js/plugins/slider-tabs.js");
        await loadScript("/assets/dashboard/js/plugins/form-wizard.js");
        await loadScript("/assets/dashboard/vendor/aos/dist/aos.js");
        await loadScript("/assets/dashboard/js/hope-ui.js");
        await loadScript("/assets/vendor/bootstrap/js/bootstrap.min.js");

        console.log("All scripts loaded");
      } catch (err) {
        console.error("Error loading scripts:", err);
      }
    };

    loadAll();
  }, []);

  
}

export default Headerjs;