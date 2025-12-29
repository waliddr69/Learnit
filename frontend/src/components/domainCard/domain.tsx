import "./domain.css"

interface Cardprops{
    domain: string;
    isselected: boolean;
    onClick: ()=>void;
    icon?: React.ComponentType<{color?:string}>;
}


function DomainCard({ domain, isselected, onClick, icon: Icon }: Cardprops) {
    return (
        <div className={`domain-card flex gap-1 items-center ${isselected ? 'selected' : ''}`} onClick={onClick}>
            {Icon && <Icon color={isselected ? "#ECECEC" : "#0C2443"} />}
            <p>{domain}</p>
        </div>
    );
}

export default DomainCard