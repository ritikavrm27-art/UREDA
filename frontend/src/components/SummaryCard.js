
function SummaryCard({ count, title, bgColor, iconColor, icon }) {
  return (
    
      <div className="acard summary mb-2">
         <div className="icon-wrap" style={{background:bgColor, color:iconColor}}>
            <i className={icon}></i>
         </div>
            <div className="d-flex flex-column align-items-end">
               <p className="acard-stat mb-0" id="hdTotHQOffice">{count}</p>
               <p className="acard-title mb-0"  style={{color:iconColor}}>{title}</p>
            </div>
         </div>
  );
}

export default SummaryCard;