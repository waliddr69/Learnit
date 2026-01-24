import type { Cardprops } from "@/types/domain";
import "./domain.css"




function DomainCard({ domain, isselected, onClick, icon: Icon }: Cardprops) {
    return (
        <div className={`domain-card flex gap-1  items-center ${isselected ? 'selected' : ''}`} onClick={onClick}>
            {Icon && <Icon color={isselected ? "#ECECEC" : "#0C2443"} />}
            <p>{domain}</p>
        </div>
    );
}

export default DomainCard