import { Link } from "react-router-dom";

function CatalogueCard({ link, title, subtitle, bgColor, iconColor, icon }) {
  return (
    <div className="col-4 col-md-2">
      <Link to={link} className="text-decoration-none">
        <div className="acard">
          <div className="icon-wrap" style={{ background: bgColor, color: iconColor }}>
            <i className={icon}></i>
          </div>
          <p className="acard-title">{title}</p>
          <p className="acard-delta" style={{ color: iconColor }}>
            <i className="ti ti-arrow-up" style={{ fontSize: "12px" }}></i> {subtitle}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default CatalogueCard;